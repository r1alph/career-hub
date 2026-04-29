import { useState, useEffect, useCallback } from "react";

// ─── HELPERS ────────────────────────────────────────────────────────────
const fmt = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const today = () => new Date();
const yesterday = () => { const d = new Date(); d.setDate(d.getDate()-1); return d; };
const dayOfWeek = (d) => { const w = d.getDay(); return w === 0 ? 6 : w - 1; }; // Mon=0..Sun=6
const dayNames = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const dayShort = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

// ─── TASK TEMPLATES BY DAY ─────────────────────────────────────────────
const taskTemplates = [
  { theme: "APPLICATION BLITZ", emoji: "🚀", color: "#E8553D", tasks: [
    { time: "6:00–7:00 AM", task: "Search & bookmark 10 new job/internship listings", cat: "Jobs" },
    { time: "7:00–7:30 AM", task: "Tailor resume keywords to top 3 job matches", cat: "Resume" },
    { time: "7:30–8:30 AM", task: "Submit 3–5 targeted applications with cover letters", cat: "Jobs" },
    { time: "8:30–9:00 AM", task: "LinkedIn: Comment on 3 posts from hiring managers in RF/wireless", cat: "LinkedIn" },
  ]},
  { theme: "SKILL BUILDING", emoji: "📚", color: "#10B981", tasks: [
    { time: "6:00–7:30 AM", task: "Coursera/edX: Work on monthly certification module", cat: "Learning" },
    { time: "7:30–8:00 AM", task: "LeetCode or HackerRank (Python / signal processing)", cat: "Skills" },
    { time: "8:00–8:30 AM", task: "LinkedIn: Post a technical insight or mini-article", cat: "LinkedIn" },
    { time: "8:30–9:00 AM", task: "Connect with 5 new professionals on LinkedIn", cat: "Network" },
  ]},
  { theme: "NETWORKING DAY", emoji: "🤝", color: "#8B5CF6", tasks: [
    { time: "6:00–6:30 AM", task: "Send 5 personalized LinkedIn connection requests", cat: "Network" },
    { time: "6:30–7:00 AM", task: "Follow up on 3 pending connections with a thoughtful message", cat: "Network" },
    { time: "7:00–8:00 AM", task: "Research 3 target companies → find team leads → draft outreach", cat: "Network" },
    { time: "8:00–9:00 AM", task: "Submit 2–3 applications + tailor resume for each", cat: "Jobs" },
  ]},
  { theme: "PORTFOLIO DAY", emoji: "💻", color: "#F59E0B", tasks: [
    { time: "6:00–7:30 AM", task: "GitHub: Push research code (MATLAB→Python port or new project)", cat: "Portfolio" },
    { time: "7:30–8:00 AM", task: "Write a detailed README for a GitHub repository", cat: "Portfolio" },
    { time: "8:00–8:30 AM", task: "LinkedIn: Share a project update or research finding", cat: "LinkedIn" },
    { time: "8:30–9:00 AM", task: "Apply to 2 stretch-opportunity roles outside comfort zone", cat: "Jobs" },
  ]},
  { theme: "INTERVIEW PREP", emoji: "🎯", color: "#EC4899", tasks: [
    { time: "6:00–7:00 AM", task: "Practice 3 behavioral questions using STAR method", cat: "Interview" },
    { time: "7:00–7:45 AM", task: "Technical deep-dive: review RF/wireless concept (e.g., OFDM, beamforming)", cat: "Interview" },
    { time: "7:45–8:30 AM", task: "Mock coding session: Python data structures & algorithms", cat: "Interview" },
    { time: "8:30–9:00 AM", task: "LinkedIn: Engage with 5 posts + publish 1 original insight", cat: "LinkedIn" },
  ]},
  { theme: "DEEP LEARNING", emoji: "🧠", color: "#06B6D4", tasks: [
    { time: "9:00–11:00 AM", task: "Certification course: complete a full module (2-hour deep session)", cat: "Learning" },
    { time: "11:00–12:00 PM", task: "Build or update personal portfolio website", cat: "Portfolio" },
    { time: "12:00–12:30 PM", task: "Week review: tally applications, responses, and plan next actions", cat: "Review" },
  ]},
  { theme: "REFLECT & PLAN", emoji: "📋", color: "#64748B", tasks: [
    { time: "10:00–10:30 AM", task: "Review all weekly metrics: apps sent, connections made, posts published", cat: "Review" },
    { time: "10:30–11:00 AM", task: "Set next week's priorities and specific daily targets", cat: "Review" },
    { time: "11:00–12:00 PM", task: "Draft LinkedIn article content for monthly recap", cat: "LinkedIn" },
  ]},
];

// ─── JOB DATA ───────────────────────────────────────────────────────────
const jobListings = [
  { title: "Wireless Systems Engineering Intern", company: "Qualcomm", location: "San Diego, CA", salary: "$7,500–9,500/mo", skills: ["Wireless","Signal Processing","Python","MATLAB"], link: "https://careers.qualcomm.com/careers/job/446707492863", score: 96, tier: 1, reason: "Direct wireless systems match. Your CSI, PLA, and 5G research align perfectly with Qualcomm's modem R&D." },
  { title: "Wireless Comms Engineer – Summer Intern", company: "MathWorks", location: "Natick, MA", salary: "$6,800–8,500/mo", skills: ["MATLAB","Wi-Fi","Wireless Standards","DSP"], link: "https://www.mathworks.com/company/jobs/opportunities/27722", score: 94, tier: 1, reason: "Your MATLAB mastery + wireless standards knowledge is a direct fit for Wi-Fi system simulation." },
  { title: "Signal Processing & RF Grad Intern", company: "Aerospace Corp", location: "El Segundo, CA", salary: "$5,600–8,300/mo", skills: ["Python","DSP","GNU Radio","RF"], link: "https://spacecrew.com/space-jobs/mi74ccc8", score: 93, tier: 1, reason: "SDR + GNU Radio + signal processing matches your USRP testbed and 5G sniffer work." },
  { title: "RF Engineering Intern – Summer 2026", company: "Lockheed Martin", location: "Littleton, CO", salary: "$30–42/hr", skills: ["RF Design","Antennas","MATLAB","EM Sim"], link: "https://www.lockheedmartinjobs.com/job/littleton/rf-engineering-intern/694/91280624592", score: 91, tier: 1, reason: "Your LNA design (8–12 GHz), HFSS/ADS simulation, and antenna coursework are strong matches." },
  { title: "RF Engineering Intern – Summer 2026", company: "BAE Systems", location: "Nashua, NH", salary: "$30–40/hr", skills: ["RF/Microwave","EM Theory","MATLAB","Antenna"], link: "https://jobs.baesystems.com/global/en/job/121546BR", score: 90, tier: 1, reason: "EM fields theory, LNA design, and RF hardware background align with BAE's defense comms." },
  { title: "Research Intern, PhD – Summer 2026", company: "Google", location: "Multiple (incl. Portland)", salary: "$9,400–12,500/mo", skills: ["ML","Python","Research","Networking"], link: "https://www.google.com/about/careers/applications/jobs/results/100216277234000582", score: 89, tier: 1, reason: "PhD + publications + ML + Portland location. Networking/systems research track fits." },
  { title: "RF/Wireless Engineering Intern", company: "Arlo Technologies", location: "Carlsbad, CA", salary: "$35–45/hr", skills: ["RF Testing","Wireless","Python","Lab"], link: "https://www.ziprecruiter.com/Jobs/Rf-Engineer-Internship", score: 88, tier: 1, reason: "Wireless testing/validation maps to your testbed experience with USRPs and VNA." },
  { title: "Summer Intern: Wireless Engineer I", company: "Spectrum", location: "Greenwood Village, CO", salary: "$25–35/hr", skills: ["Wireless Networks","Process","Telecom"], link: "https://jobs.spectrum.com/job/greenwood-village/2026-summer-intern-wireless-engineer-i/4673/85818838784", score: 78, tier: 2 },
  { title: "Engineering Intern (5G/Wireless)", company: "Samsung", location: "Plano, TX", salary: "$4,200–6,300/mo", skills: ["5G","Systems Eng","EE","Lab Work"], link: "https://www.glassdoor.com/Job/wireless-communication-systems-engineering-intern-jobs-SRCH_KO0,49.htm", score: 76, tier: 2 },
  { title: "ML Engineering Internship", company: "T-Mobile", location: "Atlanta / Bellevue", salary: "$20–40/hr", skills: ["Python","ML","TensorFlow","AI"], link: "https://careers.t-mobile.com/summer-2026-machine-learning-engineering-internship/job/D718A8A6F66C83E8D4C96E439283937D", score: 75, tier: 2 },
  { title: "Data Science Intern – Equipment Intel", company: "Lam Research", location: "Tualatin, OR", salary: "$35–50/hr", skills: ["Python","ML","Signal Processing","Sensors"], link: "https://www.indeed.com/q-data-science-intern-l-portland,-or-jobs.html", score: 74, tier: 2 },
  { title: "RF Engineering Intern – Summer 2026", company: "FIRST RF", location: "Boulder, CO", salary: "$25–38/hr", skills: ["RF Systems","Antennas","Radar","MATLAB"], link: "https://www.ziprecruiter.com/Jobs/Rf-Intern", score: 73, tier: 2 },
  { title: "Data Science Intern (Remote)", company: "RTX (Raytheon)", location: "Remote", salary: "$30–45/hr", skills: ["Python","SQL","ML","Tableau"], link: "https://jobgether.com/offer/69deea4fc646310ee38ec581", score: 72, tier: 2, remote: true },
  { title: "Predictive Data Analytics Intern", company: "Lam Research", location: "Tualatin, OR", salary: "$35–48/hr", skills: ["Signal Processing","ML","Python"], link: "https://www.indeed.com/q-intern-data-analysis-l-portland,-or-jobs.html", score: 71, tier: 2 },
  { title: "AI/ML Intern", company: "Qorvo", location: "Hillsboro, OR", salary: "$30–45/hr", skills: ["AI/ML","Python","TensorFlow"], link: "https://www.indeed.com/q-data-science-intern-l-portland,-or-jobs.html", score: 70, tier: 2 },
  { title: "Comms & Signal Processing Intern", company: "ARKA Group", location: "Multiple", salary: "$28–40/hr", skills: ["MATLAB","DSP","Digital Comms"], link: "https://www.glassdoor.com/Job/signal-processing-intern-jobs-SRCH_KO0,24.htm", score: 68, tier: 2 },
  { title: "Software Engineering Intern, Grad", company: "Intel", location: "Hillsboro, OR", salary: "$35–55/hr", skills: ["Python","C/C++","Cloud","SW Dev"], link: "https://www.indeed.com/q-data-science-intern-l-portland,-or-jobs.html", score: 58, tier: 3 },
  { title: "Applied Research Intern – PhD", company: "Capital One", location: "NYC / McLean / SJ", salary: "$95–105/hr", skills: ["PyTorch","ML Research","Publications"], link: "https://www.capitalonecareers.com/job/new-york/current-phd-applied-research-internship-program-summer-2026/31238/84906606144", score: 55, tier: 3 },
  { title: "ML Research Intern – Summer 2026", company: "IMC Trading", location: "Chicago, IL", salary: "$65–80/hr", skills: ["PhD","ML","Python","Statistics"], link: "https://www.imc.com/us/careers/jobs/4608584101", score: 52, tier: 3 },
  { title: "Network Engineer Intern", company: "Tesla", location: "Fremont, CA", salary: "$30–50/hr", skills: ["Networking","Simulation","Python"], link: "https://www.indeed.com/q-Wireless-Network-Engineer-Summer-Intern-jobs.html", score: 50, tier: 3 },
];

const certifications = [
  { month: "Month 1 · May", title: "Cloud & MATLAB Foundations", color: "#2D6BCF", certs: [
    { name: "AWS Cloud Practitioner (CLF-C02)", provider: "Amazon Web Services", hours: 20, priority: "CRITICAL", why: "Cloud skills expected in every role. Foundational cert that unlocks all AWS paths.", cost: "$100", link: "https://aws.amazon.com/certification/certified-cloud-practitioner/" },
    { name: "MATLAB Onramp + Signal Processing Onramp", provider: "MathWorks (Free)", hours: 8, priority: "HIGH", why: "Free badges. Validates MATLAB skills officially.", cost: "Free", link: "https://matlabacademy.mathworks.com/" },
  ], skills: ["AWS Console","Cloud Architecture","S3/EC2/Lambda","MATLAB Badge"] },
  { month: "Month 2 · June", title: "Deep Learning Mastery", color: "#10B981", certs: [
    { name: "Deep Learning Specialization", provider: "Coursera — Andrew Ng", hours: 40, priority: "CRITICAL", why: "Gold standard. CNNs, RNNs, optimization — maps to your autoencoder research.", cost: "$49/mo", link: "https://www.coursera.org/specializations/deep-learning" },
    { name: "Python for Data Science (IBM)", provider: "Coursera / IBM", hours: 15, priority: "MEDIUM", why: "IBM badge validates Python + data analysis.", cost: "$49/mo", link: "https://www.coursera.org/professional-certificates/ibm-data-science" },
  ], skills: ["CNNs","RNNs","Hyperparameter Tuning","IBM Badge"] },
  { month: "Month 3 · July", title: "5G & Visualization", color: "#8B5CF6", certs: [
    { name: "5G NR Fundamentals", provider: "IEEE / Qualcomm Academy", hours: 20, priority: "CRITICAL", why: "Validates 5G research for Qualcomm, Nokia, Ericsson.", cost: "Varies", link: "https://ieeexplore.ieee.org" },
    { name: "Tableau Desktop Specialist", provider: "Salesforce", hours: 15, priority: "MEDIUM", why: "Data visualization for presenting research in industry.", cost: "$100", link: "https://www.tableau.com/learn/certification" },
  ], skills: ["5G NR","Network Slicing","OFDM","Tableau"] },
  { month: "Month 4 · August", title: "TensorFlow & Git", color: "#E8553D", certs: [
    { name: "TensorFlow Developer Certificate", provider: "Google", hours: 30, priority: "CRITICAL", why: "Validates TensorFlow from your autoencoder PLA research.", cost: "$100", link: "https://www.tensorflow.org/certificate" },
    { name: "Git & GitHub Professional", provider: "LinkedIn Learning", hours: 8, priority: "HIGH", why: "Version control is non-negotiable. LinkedIn badge.", cost: "Free w/ Premium", link: "https://www.linkedin.com/learning" },
  ], skills: ["TF Deployment","TF Serving","Git Workflows","CI/CD"] },
  { month: "Month 5 · September", title: "Multi-Cloud & DevOps", color: "#F59E0B", certs: [
    { name: "Azure AI Fundamentals (AI-900)", provider: "Microsoft", hours: 15, priority: "MEDIUM", why: "Multi-cloud differentiates. Enterprise Azure skills.", cost: "$165", link: "https://learn.microsoft.com" },
    { name: "Docker & Kubernetes Essentials", provider: "KodeKloud", hours: 20, priority: "HIGH", why: "Containerization for ML deployment.", cost: "$15–30", link: "https://kodekloud.com" },
  ], skills: ["Azure AI","Docker","K8s","MLOps"] },
  { month: "Month 6 · October", title: "RF Tools & PM", color: "#06B6D4", certs: [
    { name: "Keysight ADS / HFSS Advanced", provider: "Keysight / Ansys", hours: 25, priority: "HIGH", why: "Industry RF design tools for defense & telecom.", cost: "Varies", link: "https://www.keysight.com" },
    { name: "Google Project Management", provider: "Coursera", hours: 15, priority: "MEDIUM", why: "PM skills for senior intern and tech lead roles.", cost: "$49/mo", link: "https://www.coursera.org/professional-certificates/google-project-management" },
  ], skills: ["EM Simulation","RF Optimization","Agile","PM Frameworks"] },
];

const linkedinTemplates = {
  connectionReq: `Hi [Name],\n\nI'm a PhD student at Portland State researching THz communications and physical layer security. I noticed your work at [Company] on [specific topic] — it closely relates to my research on [your relevant project].\n\nI'd love to connect and learn from your experience.\n\nBest,\nRalph`,
  infoInterview: `Hi [Name],\n\nI'm a PhD researcher at Portland State specializing in THz/5G wireless systems and ML-based physical layer authentication.\n\nI've been following [Company]'s innovations in [area], and your role really resonates with my research direction.\n\nWould you have 15 minutes for a virtual coffee? I'd value your perspective on [specific question].\n\nThank you,\nRalph`,
  recruiterOutreach: `Hi [Name],\n\nI see you recruit for [RF/Wireless/ML] roles at [Company]. I'm a PhD student at Portland State with:\n\n• Published research in THz systems & 5G security\n• Hands-on USRP SDR testbed experience\n• ML pipeline expertise (TensorFlow, Scikit-Learn)\n\nI'm seeking Summer 2026 internships. Would my background fit any open roles?\n\nBest regards,\nRalph`,
};

const catColors = { Jobs:"#E8553D", Resume:"#D4793A", LinkedIn:"#2D6BCF", Network:"#8B5CF6", Learning:"#10B981", Skills:"#06B6D4", Portfolio:"#F59E0B", Interview:"#EC4899", Review:"#64748B" };
const tierMeta = { 1:{color:"#10B981",label:"HIGH"}, 2:{color:"#F59E0B",label:"MED"}, 3:{color:"#A78BFA",label:"STRETCH"} };

const TABS = [
  {label:"Today",icon:"⚡"},{label:"History",icon:"📊"},{label:"Jobs",icon:"💼"},
  {label:"LinkedIn",icon:"🔗"},{label:"Certs",icon:"🎓"},{label:"Network",icon:"🌐"},
];

// ─── COMPONENTS ─────────────────────────────────────────────────────────
function Ring({value,size=48,sw=3,color}){
  const r=(size-sw)/2,c=2*Math.PI*r;
  return(
    <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#111827" strokeWidth={sw}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw}
        strokeDasharray={c} strokeDashoffset={c-(value/100)*c} strokeLinecap="round"
        style={{transition:"stroke-dashoffset .8s ease"}}/>
    </svg>
  );
}

function CopyBtn({text}){
  const[ok,setOk]=useState(false);
  return(
    <button onClick={()=>{navigator.clipboard.writeText(text).then(()=>{setOk(true);setTimeout(()=>setOk(false),2000)})}}
      style={{padding:"5px 14px",borderRadius:7,fontSize:11,fontWeight:700,background:ok?"#10B98118":"#1A2240",color:ok?"#10B981":"#60A5FA",border:`1px solid ${ok?"#10B98140":"#253060"}`,cursor:"pointer",transition:"all .2s",fontFamily:"inherit"}}>
      {ok?"✓ Copied":"⎘ Copy"}
    </button>
  );
}

function Tag({bg,fg,children}){
  return <span style={{display:"inline-flex",alignItems:"center",padding:"3px 10px",borderRadius:20,fontSize:10,fontWeight:700,letterSpacing:.5,whiteSpace:"nowrap",background:bg,color:fg}}>{children}</span>;
}

// ─── MAIN ───────────────────────────────────────────────────────────────
export default function CareerCommandCenter(){
  const[tab,setTab]=useState(0);
  const[loading,setLoading]=useState(true);
  const[todayData,setTodayData]=useState(null);
  const[yesterdayData,setYesterdayData]=useState(null);
  const[stats,setStats]=useState({streak:0,totalCompleted:0,applied:0,responses:0,interviews:0,bestStreak:0});
  const[history,setHistory]=useState([]);
  const[expandedJob,setExpandedJob]=useState(null);
  const[jobFilter,setJobFilter]=useState("all");
  const[search,setSearch]=useState("");
  const[selTpl,setSelTpl]=useState(0);
  const[selMonth,setSelMonth]=useState(0);
  const[saving,setSaving]=useState(false);

  const todayStr=fmt(today());
  const yesterdayStr=fmt(yesterday());
  const todayDow=dayOfWeek(today());
  const template=taskTemplates[todayDow];

  // ── LOAD ──
  useEffect(()=>{
    (async()=>{
      try{
        // Load today
        let td=null;
        try{ const r=await window.storage.get(`daily:${todayStr}`); if(r) td=JSON.parse(r.value); }catch(e){}
        // If no today data, create it
        if(!td){
          td={ date:todayStr, dow:todayDow, tasks:template.tasks.map(()=>false), allDone:false };
          try{ await window.storage.set(`daily:${todayStr}`,JSON.stringify(td)); }catch(e){}
        }
        setTodayData(td);

        // Load yesterday
        let yd=null;
        try{ const r=await window.storage.get(`daily:${yesterdayStr}`); if(r) yd=JSON.parse(r.value); }catch(e){}
        setYesterdayData(yd);

        // Load stats
        let st={streak:0,totalCompleted:0,applied:0,responses:0,interviews:0,bestStreak:0};
        try{ const r=await window.storage.get("career-stats"); if(r) st=JSON.parse(r.value); }catch(e){}
        setStats(st);

        // Load last 7 days history
        const hist=[];
        for(let i=1;i<=7;i++){
          const d=new Date();d.setDate(d.getDate()-i);
          const key=fmt(d);
          try{
            const r=await window.storage.get(`daily:${key}`);
            if(r){ const p=JSON.parse(r.value); hist.push({date:key,dow:dayOfWeek(d),...p}); }
          }catch(e){}
        }
        setHistory(hist);
      }catch(e){ console.error("Load error:",e); }
      setLoading(false);
    })();
  },[]);

  // ── SAVE TASK TOGGLE ──
  const toggleTask=useCallback(async(idx)=>{
    if(!todayData) return;
    setSaving(true);
    const newTasks=[...todayData.tasks];
    newTasks[idx]=!newTasks[idx];
    const allDone=newTasks.every(Boolean);
    const updated={...todayData,tasks:newTasks,allDone};
    setTodayData(updated);

    // Update streak if just completed all
    if(allDone && !todayData.allDone){
      const newStats={...stats,totalCompleted:stats.totalCompleted+1};
      // Check if yesterday was also complete for streak
      if(yesterdayData?.allDone || stats.streak>0){
        newStats.streak=stats.streak+1;
      } else {
        newStats.streak=1;
      }
      if(newStats.streak>newStats.bestStreak) newStats.bestStreak=newStats.streak;
      setStats(newStats);
      try{ await window.storage.set("career-stats",JSON.stringify(newStats)); }catch(e){}
    }
    // If un-completing, reduce
    if(!allDone && todayData.allDone){
      const newStats={...stats,totalCompleted:Math.max(0,stats.totalCompleted-1),streak:Math.max(0,stats.streak-1)};
      setStats(newStats);
      try{ await window.storage.set("career-stats",JSON.stringify(newStats)); }catch(e){}
    }

    try{ await window.storage.set(`daily:${todayStr}`,JSON.stringify(updated)); }catch(e){}
    setSaving(false);
  },[todayData,stats,yesterdayData,todayStr]);

  // ── UPDATE STATS ──
  const updateStat=useCallback(async(key,delta)=>{
    const newStats={...stats,[key]:Math.max(0,(stats[key]||0)+delta)};
    setStats(newStats);
    try{ await window.storage.set("career-stats",JSON.stringify(newStats)); }catch(e){}
  },[stats]);

  // ── TOGGLE YESTERDAY TASK ──
  const toggleYesterdayTask=useCallback(async(idx)=>{
    if(!yesterdayData) return;
    setSaving(true);
    const newTasks=[...yesterdayData.tasks];
    newTasks[idx]=!newTasks[idx];
    const allDone=newTasks.every(Boolean);
    const updated={...yesterdayData,tasks:newTasks,allDone};
    setYesterdayData(updated);

    if(allDone && !yesterdayData.allDone){
      const newStats={...stats,totalCompleted:stats.totalCompleted+1,streak:stats.streak+1};
      if(newStats.streak>newStats.bestStreak) newStats.bestStreak=newStats.streak;
      setStats(newStats);
      try{ await window.storage.set("career-stats",JSON.stringify(newStats)); }catch(e){}
    }
    if(!allDone && yesterdayData.allDone){
      const newStats={...stats,totalCompleted:Math.max(0,stats.totalCompleted-1),streak:Math.max(0,stats.streak-1)};
      setStats(newStats);
      try{ await window.storage.set("career-stats",JSON.stringify(newStats)); }catch(e){}
    }

    try{ await window.storage.set(`daily:${yesterdayStr}`,JSON.stringify(updated)); }catch(e){}
    setSaving(false);
  },[yesterdayData,stats,yesterdayStr]);

  // ── RESET ALL DATA ──
  const resetAll=async()=>{
    if(!confirm("Reset ALL saved data? This cannot be undone.")) return;
    try{
      await window.storage.delete("career-stats");
      await window.storage.delete(`daily:${todayStr}`);
      for(let i=1;i<=30;i++){const d=new Date();d.setDate(d.getDate()-i);try{await window.storage.delete(`daily:${fmt(d)}`);}catch(e){}}
    }catch(e){}
    window.location.reload();
  };

  const yesterdayComplete=!yesterdayData || yesterdayData.allDone;
  const todayUnlocked=yesterdayComplete;
  const todayDoneCount=todayData?.tasks.filter(Boolean).length||0;
  const todayTotal=template.tasks.length;
  const todayPct=Math.round((todayDoneCount/todayTotal)*100);

  const fJobs=jobListings.filter(j=>jobFilter==="all"||j.tier===parseInt(jobFilter)).filter(j=>!search||[j.title,j.company,...j.skills].some(s=>s.toLowerCase().includes(search.toLowerCase())));
  const tpls=[{key:"connectionReq",label:"Connection",color:"#2D6BCF"},{key:"infoInterview",label:"Info Interview",color:"#10B981"},{key:"recruiterOutreach",label:"Recruiter",color:"#F59E0B"}];

  const S={
    card:{background:"linear-gradient(150deg,#0C1020,#111828)",border:"1px solid #19223A",borderRadius:14,transition:"all .25s"},
  };

  if(loading) return(
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif",background:"#06080F",color:"#CBD5E1",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:12}}>
      <div style={{width:40,height:40,borderRadius:10,background:"linear-gradient(135deg,#2563EB,#7C3AED)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:800,fontFamily:"Syne",color:"#fff"}}>R</div>
      <p style={{fontSize:13,color:"#475569"}}>Loading your career data...</p>
    </div>
  );

  return(
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif",background:"#06080F",color:"#CBD5E1",minHeight:"100vh"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#19223A;border-radius:4px}
        @keyframes up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pop{0%{transform:scale(1)}50%{transform:scale(1.15)}100%{transform:scale(1)}}
        .up{animation:up .4s ease forwards}
        .d1{animation-delay:.06s;opacity:0}.d2{animation-delay:.12s;opacity:0}.d3{animation-delay:.18s;opacity:0}
        button{cursor:pointer;border:none;outline:none;font-family:inherit}
        a{text-decoration:none}
        .ck{width:24px;height:24px;border-radius:7px;border:2px solid #19223A;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:12px;color:#fff;flex-shrink:0;transition:all .25s}
        .ck.on{background:#10B981;border-color:#10B981;animation:pop .3s ease}
        .ck.locked{opacity:.3;cursor:not-allowed}
        .bar{height:5px;border-radius:3px;background:#0C1020;overflow:hidden}
        .bf{height:100%;border-radius:3px;transition:width 1s cubic-bezier(.22,1,.36,1)}
        .counter-btn{width:28px;height:28px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;cursor:pointer;transition:all .15s}
      `}</style>

      {/* ── HEADER ── */}
      <header style={{background:"linear-gradient(180deg,#0A0E1A,#06080F)",borderBottom:"1px solid #111828",padding:"18px 16px 10px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:11}}>
              <div style={{width:36,height:36,borderRadius:9,background:"linear-gradient(135deg,#2563EB,#7C3AED)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:800,fontFamily:"Syne",color:"#fff"}}>R</div>
              <div>
                <h1 style={{fontSize:15,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9",letterSpacing:-.3}}>Career Command Center</h1>
                <p style={{fontSize:9,color:"#334155",fontFamily:"Space Mono",letterSpacing:1}}>RALPH KUMAH · {todayStr} · DAY {stats.totalCompleted+1}</p>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              {saving && <span style={{fontSize:9,color:"#2563EB",fontFamily:"Space Mono"}}>saving...</span>}
              <div style={{display:"flex",alignItems:"center",gap:4,padding:"4px 10px",borderRadius:8,background:stats.streak>0?"#10B98114":"#19223A14",border:`1px solid ${stats.streak>0?"#10B98130":"#19223A"}`}}>
                <span style={{fontSize:14}}>🔥</span>
                <span style={{fontSize:12,fontWeight:800,fontFamily:"Syne",color:stats.streak>0?"#10B981":"#334155"}}>{stats.streak}</span>
              </div>
            </div>
          </div>
          <nav style={{display:"flex",gap:3,overflowX:"auto",paddingBottom:2}}>
            {TABS.map((t,i)=>(
              <button key={i} onClick={()=>setTab(i)}
                style={{padding:"6px 11px",borderRadius:7,fontSize:11,fontWeight:600,display:"flex",alignItems:"center",gap:4,whiteSpace:"nowrap",
                  background:tab===i?"linear-gradient(135deg,#162044,#1E1650)":"transparent",
                  color:tab===i?"#D6E0F0":"#334155",
                  border:tab===i?"1px solid #253060":"1px solid transparent"}}>
                <span style={{fontSize:12}}>{t.icon}</span>{t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main style={{maxWidth:860,margin:"0 auto",padding:16}}>

        {/* ═══ TODAY ═══ */}
        {tab===0&&(<div>
          {/* Greeting */}
          <div className="up" style={{marginBottom:16}}>
            <h2 style={{fontSize:22,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9",marginBottom:3}}>
              Good {new Date().getHours()<12?"morning":new Date().getHours()<17?"afternoon":"evening"}, Ralph.
            </h2>
            <p style={{fontSize:13,color:"#475569"}}>
              {dayNames[todayDow]} — <span style={{color:template.color,fontWeight:700}}>{template.emoji} {template.theme}</span>
            </p>
          </div>

          {/* Stats */}
          <div className="up d1" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:14}}>
            {[
              {l:"Progress",v:todayPct,s:"%",c:"#2563EB",sub:`${todayDoneCount}/${todayTotal} tasks`},
              {l:"Streak",v:stats.streak,c:"#10B981",sub:`best: ${stats.bestStreak}`},
              {l:"Applied",v:stats.applied,c:"#F59E0B",sub:"total"},
              {l:"Interviews",v:stats.interviews,c:"#EC4899",sub:"total"},
            ].map((s,i)=>(
              <div key={i} style={{...S.card,padding:"12px 8px",textAlign:"center"}}>
                <div style={{fontSize:22,fontWeight:800,fontFamily:"Syne",color:s.c}}>{s.v}{s.s||""}</div>
                <div style={{fontSize:9,color:"#475569",fontWeight:700,letterSpacing:.8,marginTop:1}}>{s.l}</div>
                <div style={{fontSize:8,color:"#253060",marginTop:1}}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Application Tracker */}
          <div className="up d2" style={{...S.card,padding:14,marginBottom:14}}>
            <h3 style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#475569",letterSpacing:1.5,marginBottom:10}}>APPLICATION TRACKER</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
              {[{k:"applied",l:"Applied",c:"#10B981"},{k:"responses",l:"Responses",c:"#F59E0B"},{k:"interviews",l:"Interviews",c:"#EC4899"}].map(s=>(
                <div key={s.k} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  <button className="counter-btn" onClick={()=>updateStat(s.k,-1)} style={{background:"#0C1020",color:"#475569",border:"1px solid #19223A"}}>−</button>
                  <div style={{textAlign:"center",minWidth:40}}>
                    <div style={{fontSize:20,fontWeight:800,fontFamily:"Syne",color:s.c}}>{stats[s.k]||0}</div>
                    <div style={{fontSize:8,color:"#334155",fontWeight:600}}>{s.l}</div>
                  </div>
                  <button className="counter-btn" onClick={()=>updateStat(s.k,1)} style={{background:s.c+"18",color:s.c,border:`1px solid ${s.c}30`}}>+</button>
                </div>
              ))}
            </div>
          </div>

          {/* Yesterday blocker or today tasks */}
          {!todayUnlocked && yesterdayData && (
            <div className="up d2" style={{...S.card,padding:20,marginBottom:14,borderLeft:"3px solid #F59E0B"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <div style={{fontSize:28}}>⚠️</div>
                <div>
                  <h3 style={{fontSize:16,fontWeight:700,fontFamily:"Syne",color:"#F1F5F9"}}>Finish yesterday first</h3>
                  <p style={{fontSize:12,color:"#64748B",marginTop:2}}>
                    {yesterdayData.tasks.filter(Boolean).length}/{yesterdayData.tasks.length} done on {yesterdayStr} · <span style={{color:taskTemplates[yesterdayData.dow]?.color,fontWeight:600}}>{taskTemplates[yesterdayData.dow]?.emoji} {taskTemplates[yesterdayData.dow]?.theme}</span>
                  </p>
                </div>
              </div>
              <p style={{fontSize:12,color:"#94A3B8",lineHeight:1.6,marginBottom:14}}>
                Check off what you completed yesterday to unlock today's tasks.
              </p>

              {(() => {
                const ydTemplate = taskTemplates[yesterdayData.dow];
                const ydDoneCount = yesterdayData.tasks.filter(Boolean).length;
                const ydTotal = ydTemplate?.tasks.length || 0;
                const ydPct = ydTotal ? Math.round((ydDoneCount / ydTotal) * 100) : 0;
                return (
                  <>
                    {ydTemplate?.tasks.map((t, i) => {
                      const isDone = yesterdayData.tasks[i];
                      return (
                        <div key={i} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:i<ydTemplate.tasks.length-1?"1px solid #111828":"none",alignItems:"flex-start",opacity:isDone?.45:1,transition:"opacity .3s"}}>
                          <button className={`ck ${isDone?"on":""}`} onClick={()=>toggleYesterdayTask(i)}>{isDone?"✓":""}</button>
                          <div style={{flex:1}}>
                            <div style={{fontSize:13,color:isDone?"#334155":"#E2E8F0",textDecoration:isDone?"line-through":"none",lineHeight:1.5}}>{t.task}</div>
                            <div style={{fontSize:10,color:"#19223A",fontFamily:"Space Mono",marginTop:2}}>{t.time}</div>
                          </div>
                          <Tag bg={catColors[t.cat]+"14"} fg={catColors[t.cat]}>{t.cat}</Tag>
                        </div>
                      );
                    })}
                    <div className="bar" style={{marginTop:12}}>
                      <div className="bf" style={{width:`${ydPct}%`,background:ydPct===100?"linear-gradient(90deg,#10B981,#059669)":`linear-gradient(90deg,#F59E0B,#F59E0B80)`}}/>
                    </div>
                    <p style={{fontSize:11,color:"#475569",textAlign:"center",marginTop:10}}>
                      {ydPct===100 ? "✅ All done! Scroll down for today's tasks." : `${ydTotal - ydDoneCount} remaining — check them off to unlock today`}
                    </p>
                  </>
                );
              })()}
            </div>
          )}

          {todayUnlocked && todayData && (
            <div className="up d2" style={{...S.card,padding:18,marginBottom:14}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:22}}>{template.emoji}</span>
                  <div>
                    <h3 style={{fontSize:15,fontWeight:700,fontFamily:"Syne",color:"#F1F5F9"}}>{dayNames[todayDow]}'s Tasks</h3>
                    <span style={{fontSize:10,color:template.color,fontWeight:700}}>{template.theme}</span>
                  </div>
                </div>
                <div style={{position:"relative",width:48,height:48}}>
                  <Ring value={todayPct} size={48} sw={3} color={todayData.allDone?"#10B981":template.color}/>
                  <span style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,fontFamily:"Syne",color:todayData.allDone?"#10B981":template.color}}>{todayPct}%</span>
                </div>
              </div>

              {template.tasks.map((t,i)=>{
                const isDone=todayData.tasks[i];
                return(
                  <div key={i} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:i<template.tasks.length-1?"1px solid #111828":"none",alignItems:"flex-start",opacity:isDone?.45:1,transition:"opacity .3s"}}>
                    <button className={`ck ${isDone?"on":""}`} onClick={()=>toggleTask(i)}>{isDone?"✓":""}</button>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,color:isDone?"#334155":"#E2E8F0",textDecoration:isDone?"line-through":"none",lineHeight:1.5}}>{t.task}</div>
                      <div style={{fontSize:10,color:"#19223A",fontFamily:"Space Mono",marginTop:2}}>{t.time}</div>
                    </div>
                    <Tag bg={catColors[t.cat]+"14"} fg={catColors[t.cat]}>{t.cat}</Tag>
                  </div>
                );
              })}

              <div className="bar" style={{marginTop:12}}>
                <div className="bf" style={{width:`${todayPct}%`,background:todayData.allDone?"linear-gradient(90deg,#10B981,#059669)":`linear-gradient(90deg,${template.color},${template.color}80)`}}/>
              </div>

              {todayData.allDone && (
                <div style={{marginTop:14,padding:14,background:"#10B98110",borderRadius:10,textAlign:"center",border:"1px solid #10B98125"}}>
                  <div style={{fontSize:24,marginBottom:4}}>🎉</div>
                  <p style={{fontSize:14,fontWeight:700,fontFamily:"Syne",color:"#10B981"}}>All tasks complete!</p>
                  <p style={{fontSize:11,color:"#64748B",marginTop:4}}>Tomorrow's tasks will be unlocked: <span style={{color:taskTemplates[(todayDow+1)%7].color,fontWeight:600}}>{taskTemplates[(todayDow+1)%7].theme}</span></p>
                </div>
              )}
            </div>
          )}

          {/* Quick links */}
          <div className="up d3" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <button onClick={()=>setTab(2)} style={{...S.card,padding:14,textAlign:"left"}}>
              <div style={{fontSize:18,marginBottom:4}}>💼</div>
              <div style={{fontSize:12,fontWeight:700,color:"#F1F5F9"}}>Browse Jobs</div>
              <div style={{fontSize:10,color:"#334155"}}>{jobListings.length} roles</div>
            </button>
            <button onClick={()=>setTab(3)} style={{...S.card,padding:14,textAlign:"left"}}>
              <div style={{fontSize:18,marginBottom:4}}>🔗</div>
              <div style={{fontSize:12,fontWeight:700,color:"#F1F5F9"}}>LinkedIn Templates</div>
              <div style={{fontSize:10,color:"#334155"}}>Copy & send</div>
            </button>
          </div>
        </div>)}

        {/* ═══ HISTORY ═══ */}
        {tab===1&&(<div>
          <h2 className="up" style={{fontSize:20,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9",marginBottom:4}}>Progress History</h2>
          <p className="up" style={{fontSize:12,color:"#334155",marginBottom:16}}>Your daily completion over the past week</p>

          <div className="up d1" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
            {[{l:"Current Streak",v:stats.streak,c:"#10B981",s:"🔥"},{l:"Best Streak",v:stats.bestStreak,c:"#F59E0B",s:"⭐"},{l:"Days Completed",v:stats.totalCompleted,c:"#2563EB",s:"✅"},{l:"Total Applied",v:stats.applied,c:"#EC4899",s:"📨"}].map((s,i)=>(
              <div key={i} style={{...S.card,padding:14,textAlign:"center"}}>
                <div style={{fontSize:14,marginBottom:4}}>{s.s}</div>
                <div style={{fontSize:22,fontWeight:800,fontFamily:"Syne",color:s.c}}>{s.v}</div>
                <div style={{fontSize:9,color:"#334155",fontWeight:600,marginTop:2}}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* History list */}
          <div className="up d2" style={{...S.card,padding:18,marginBottom:14}}>
            <h3 style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#475569",letterSpacing:1.5,marginBottom:12}}>LAST 7 DAYS</h3>
            {history.length===0 && <p style={{fontSize:12,color:"#334155",textAlign:"center",padding:20}}>No history yet. Complete today's tasks to start tracking!</p>}
            {history.map((h,i)=>{
              const t=taskTemplates[h.dow];
              const done=h.tasks?.filter(Boolean).length||0;
              const total=t?.tasks.length||0;
              const pct=total?Math.round(done/total*100):0;
              return(
                <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<history.length-1?"1px solid #111828":"none"}}>
                  <div style={{width:36,height:36,borderRadius:8,background:h.allDone?"#10B98114":"#19223A14",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>
                    {h.allDone?"✅":t?.emoji||"📋"}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600,color:h.allDone?"#10B981":"#94A3B8"}}>{dayNames[h.dow]||"?"} <span style={{fontWeight:400,color:"#334155",fontSize:11}}>· {h.date}</span></div>
                    <div style={{fontSize:11,color:"#334155"}}>{t?.theme||"—"} · {done}/{total} tasks</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:14,fontWeight:800,fontFamily:"Syne",color:h.allDone?"#10B981":pct>50?"#F59E0B":"#E8553D"}}>{pct}%</div>
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={resetAll} style={{padding:"10px 20px",borderRadius:8,background:"#E8553D14",color:"#E8553D",fontSize:11,fontWeight:600,border:"1px solid #E8553D30",width:"100%"}}>
            Reset All Data
          </button>
        </div>)}

        {/* ═══ JOBS ═══ */}
        {tab===2&&(<div>
          <h2 className="up" style={{fontSize:20,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9",marginBottom:4}}>Job Dashboard</h2>
          <p className="up" style={{fontSize:11,color:"#334155",marginBottom:14}}>{fJobs.length} roles · Tap Tier 1 for match analysis</p>
          <div className="up d1" style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search roles, companies, skills..."
              style={{flex:1,minWidth:160,padding:"8px 14px",borderRadius:8,border:"1px solid #19223A",background:"#0A0E1A",color:"#D6E0F0",fontSize:12,outline:"none",fontFamily:"inherit"}}/>
            <div style={{display:"flex",gap:4}}>
              {[["all","All"],["1","T1"],["2","T2"],["3","T3"]].map(([v,l])=>(
                <button key={v} onClick={()=>setJobFilter(v)}
                  style={{padding:"7px 12px",borderRadius:7,fontSize:11,fontWeight:600,
                    background:jobFilter===v?(v==="all"?"#2563EB":tierMeta[parseInt(v)]?.color)+"20":"#0A0E1A",
                    color:jobFilter===v?(v==="all"?"#60A5FA":tierMeta[parseInt(v)]?.color):"#334155",
                    border:`1px solid ${jobFilter===v?"#253060":"#19223A"}`}}>{l}</button>
              ))}
            </div>
          </div>
          {fJobs.map((j,i)=>{const tm=tierMeta[j.tier];const exp=expandedJob===i;return(
            <div key={i} className="up" style={{...S.card,padding:14,marginBottom:7,cursor:j.reason?"pointer":"default",borderLeft:`3px solid ${tm.color}30`,animationDelay:`${Math.min(i*.03,.25)}s`,opacity:0}}
              onClick={()=>j.reason&&setExpandedJob(exp?null:i)}>
              <div style={{display:"flex",justifyContent:"space-between",gap:10}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",gap:5,marginBottom:4,flexWrap:"wrap"}}>
                    <Tag bg={tm.color+"14"} fg={tm.color}>T{j.tier}</Tag>
                    {j.remote&&<Tag bg="#06B6D414" fg="#06B6D4">REMOTE</Tag>}
                  </div>
                  <div style={{fontSize:13,fontWeight:600,color:"#F1F5F9",marginBottom:2}}>{j.title}</div>
                  <div style={{fontSize:11,color:"#64748B"}}>{j.company} · {j.location}</div>
                  <div style={{fontSize:10,color:"#334155",marginTop:2}}>{j.salary}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:3,marginTop:6}}>
                    {j.skills.map((s,si)=><Tag key={si} bg="#0C1020" fg="#64748B">{s}</Tag>)}
                  </div>
                </div>
                <div style={{textAlign:"center",flexShrink:0,minWidth:64}}>
                  <div style={{position:"relative",display:"inline-block"}}>
                    <Ring value={j.score} size={48} sw={3} color={tm.color}/>
                    <span style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,fontFamily:"Syne",color:tm.color}}>{j.score}</span>
                  </div>
                  <a href={j.link} target="_blank" rel="noopener noreferrer"
                    style={{display:"block",marginTop:6,padding:"5px 14px",background:`${tm.color}CC`,color:"#fff",borderRadius:6,fontSize:11,fontWeight:700}}
                    onClick={e=>e.stopPropagation()}>Apply</a>
                </div>
              </div>
              {exp&&j.reason&&(
                <div style={{marginTop:10,padding:12,background:"#06080F",borderRadius:10,fontSize:12,color:"#94A3B8",lineHeight:1.7,borderLeft:`3px solid ${tm.color}`}}>
                  <span style={{fontWeight:700,color:"#F1F5F9",fontFamily:"Syne"}}>Match analysis: </span>{j.reason}
                </div>
              )}
            </div>
          );})}
          {fJobs.length===0&&<div style={{textAlign:"center",padding:40,color:"#334155"}}>No matches found.</div>}
        </div>)}

        {/* ═══ LINKEDIN ═══ */}
        {tab===3&&(<div>
          <h2 className="up" style={{fontSize:20,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9",marginBottom:16}}>LinkedIn Strategy</h2>
          <div className="up d1" style={{...S.card,padding:18,marginBottom:12}}>
            <h3 style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#2563EB",letterSpacing:1.5,marginBottom:12}}>PROFILE OPTIMIZATION</h3>
            {["Headline → 'PhD Researcher | THz & 5G | ML for PL Security | Summer 2026 Intern'",
              "About → Research story + skills + what you seek (3 paragraphs)",
              "Featured → Pin best paper, GitHub repo, portfolio",
              "Experience → Frame research as deliverables with metrics",
              "Skills → Add 50 ATS keywords (RF, 5G, MATLAB, Python, TF, SDR...)",
              "Recommendations → Get 5+ from professors & collaborators",
              "Creator Mode → Turn on for boosted visibility"
            ].map((it,i)=>(
              <div key={i} style={{display:"flex",gap:8,padding:"5px 0",borderBottom:i<6?"1px solid #0C1020":"none"}}>
                <span style={{color:"#10B981",fontSize:11,marginTop:2}}>○</span>
                <span style={{fontSize:12,color:"#94A3B8",lineHeight:1.6}}>{it}</span>
              </div>
            ))}
          </div>
          <div className="up d2" style={{...S.card,padding:18,marginBottom:12}}>
            <h3 style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#F59E0B",letterSpacing:1.5,marginBottom:12}}>OUTREACH TEMPLATES</h3>
            <div style={{display:"flex",gap:5,marginBottom:12}}>
              {tpls.map((t,i)=>(
                <button key={i} onClick={()=>setSelTpl(i)}
                  style={{padding:"6px 14px",borderRadius:7,fontSize:11,fontWeight:600,
                    background:selTpl===i?t.color+"16":"#0A0E1A",color:selTpl===i?t.color:"#334155",
                    border:`1px solid ${selTpl===i?t.color+"40":"#19223A"}`}}>{t.label}</button>
              ))}
            </div>
            <div style={{position:"relative"}}>
              <pre style={{background:"#06080F",borderRadius:10,padding:16,fontSize:12,color:"#CBD5E1",lineHeight:1.8,whiteSpace:"pre-wrap",fontFamily:"DM Sans",borderLeft:`3px solid ${tpls[selTpl].color}`,maxHeight:280,overflow:"auto"}}>
                {linkedinTemplates[tpls[selTpl].key]}
              </pre>
              <div style={{position:"absolute",top:8,right:8}}><CopyBtn text={linkedinTemplates[tpls[selTpl].key]}/></div>
            </div>
          </div>
          <div className="up d3" style={{...S.card,padding:18}}>
            <h3 style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#8B5CF6",letterSpacing:1.5,marginBottom:12}}>MONTHLY CONTENT CALENDAR</h3>
            {linkedinTemplates.postIdeas?.map((p,i)=>(
              <div key={i} style={{padding:"9px 0",borderBottom:i<3?"1px solid #0C1020":"none"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                  <Tag bg="#8B5CF614" fg="#A78BFA">{p.week}</Tag>
                  <span style={{fontSize:12,fontWeight:600,color:"#F1F5F9"}}>{p.type}</span>
                </div>
                <p style={{fontSize:12,color:"#94A3B8",lineHeight:1.6}}>{p.prompt}</p>
                <p style={{fontSize:10,color:"#2563EB",marginTop:3}}>{p.hashtags}</p>
              </div>
            ))}
          </div>
        </div>)}

        {/* ═══ CERTS ═══ */}
        {tab===4&&(<div>
          <h2 className="up" style={{fontSize:20,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9",marginBottom:14}}>6-Month Certification Roadmap</h2>
          <div className="up d1" style={{display:"flex",gap:4,marginBottom:16,overflowX:"auto"}}>
            {certifications.map((c,i)=>(
              <button key={i} onClick={()=>setSelMonth(i)}
                style={{padding:"8px 14px",borderRadius:8,fontSize:11,fontWeight:600,whiteSpace:"nowrap",
                  background:selMonth===i?c.color+"16":"#0A0E1A",color:selMonth===i?c.color:"#334155",
                  border:`1px solid ${selMonth===i?c.color+"40":"#19223A"}`}}>M{i+1}</button>
            ))}
          </div>
          {certifications[selMonth]&&(<div className="up d2">
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <div style={{width:4,height:24,borderRadius:2,background:certifications[selMonth].color}}/>
              <div>
                <h3 style={{fontSize:15,fontWeight:700,fontFamily:"Syne",color:"#F1F5F9"}}>{certifications[selMonth].month}</h3>
                <p style={{fontSize:11,color:"#475569"}}>{certifications[selMonth].title}</p>
              </div>
            </div>
            {certifications[selMonth].certs.map((cert,i)=>(
              <div key={i} style={{...S.card,padding:16,marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",gap:8,flexWrap:"wrap"}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600,color:"#F1F5F9",marginBottom:3}}>{cert.name}</div>
                    <div style={{fontSize:11,color:"#475569"}}>{cert.provider}</div>
                    <div style={{fontSize:10,color:"#253060",marginTop:4}}>⏱ {cert.hours}h · 💰 {cert.cost}</div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5}}>
                    <Tag bg={cert.priority==="CRITICAL"?"#E8553D16":"#10B98116"} fg={cert.priority==="CRITICAL"?"#E8553D":"#10B981"}>{cert.priority}</Tag>
                    <a href={cert.link} target="_blank" rel="noopener noreferrer"
                      style={{padding:"4px 12px",borderRadius:6,background:certifications[selMonth].color+"16",color:certifications[selMonth].color,fontSize:10,fontWeight:700,border:`1px solid ${certifications[selMonth].color}30`}}>Start →</a>
                  </div>
                </div>
                <div style={{marginTop:8,padding:10,background:"#06080F",borderRadius:8,fontSize:11,color:"#94A3B8",lineHeight:1.6}}>
                  <span style={{fontWeight:600,color:"#CBD5E1"}}>Why: </span>{cert.why}
                </div>
              </div>
            ))}
            <div style={{...S.card,padding:12,marginTop:4}}>
              <div style={{fontSize:9,fontWeight:700,fontFamily:"Space Mono",color:"#253060",letterSpacing:1.5,marginBottom:6}}>SKILLS UNLOCKED</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                {certifications[selMonth].skills.map((s,i)=><Tag key={i} bg={certifications[selMonth].color+"14"} fg={certifications[selMonth].color}>{s}</Tag>)}
              </div>
            </div>
          </div>)}
        </div>)}

        {/* ═══ NETWORK ═══ */}
        {tab===5&&(<div>
          <h2 className="up" style={{fontSize:20,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9",marginBottom:16}}>Networking Playbook</h2>
          <div className="up d1" style={{...S.card,padding:18,marginBottom:12}}>
            <h3 style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#8B5CF6",letterSpacing:1.5,marginBottom:12}}>TARGET COMPANIES</h3>
            {[{co:"Qualcomm",dept:"Modem / Wireless R&D",who:"Wireless Engineers",fit:96},
              {co:"Nokia Bell Labs",dept:"5G/6G Research",who:"Research Scientists",fit:92},
              {co:"Lockheed Martin",dept:"RF / Space",who:"RF Managers",fit:91},
              {co:"Ericsson",dept:"Radio Systems",who:"Senior Engineers",fit:90},
              {co:"Google",dept:"Networking Research",who:"PhD Recruiters",fit:89},
              {co:"Samsung Research",dept:"Next-Gen Comms",who:"Lab Leads",fit:76},
              {co:"Intel",dept:"5G Platform",who:"Modem Engineers",fit:75},
              {co:"Keysight",dept:"5G Test",who:"App Engineers",fit:72},
            ].map((c,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",padding:"8px 0",borderBottom:i<7?"1px solid #0C1020":"none",gap:10}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:600,color:"#F1F5F9"}}>{c.co}</div>
                  <div style={{fontSize:10,color:"#253060"}}>{c.dept} · {c.who}</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:5}}>
                  <div className="bar" style={{width:36}}><div className="bf" style={{width:`${c.fit}%`,background:c.fit>=90?"#10B981":c.fit>=75?"#F59E0B":"#8B5CF6"}}/></div>
                  <span style={{fontSize:10,fontFamily:"Space Mono",fontWeight:700,color:c.fit>=90?"#10B981":c.fit>=75?"#F59E0B":"#8B5CF6",minWidth:20,textAlign:"right"}}>{c.fit}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="up d2" style={{...S.card,padding:18,marginBottom:12}}>
            <h3 style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#10B981",letterSpacing:1.5,marginBottom:12}}>MONTHLY GOALS</h3>
            {[{n:"10",d:"RF/Wireless Eng. Managers",c:"#2563EB"},{n:"5",d:"Career Center contacts",c:"#10B981"},{n:"5",d:"ECE/Telecom Recruiters",c:"#F59E0B"},{n:"5",d:"PhD→Industry contacts",c:"#8B5CF6"},{n:"3",d:"Defense hiring managers",c:"#EC4899"},{n:"2",d:"Info interviews done",c:"#06B6D4"}].map((g,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:i<5?"1px solid #0C1020":"none"}}>
                <div style={{width:28,height:28,borderRadius:7,background:g.c+"14",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,fontFamily:"Syne",color:g.c,flexShrink:0}}>{g.n}</div>
                <span style={{fontSize:12,color:"#94A3B8"}}>{g.d}</span>
              </div>
            ))}
          </div>
          <div className="up d3" style={{...S.card,padding:18}}>
            <h3 style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#F59E0B",letterSpacing:1.5,marginBottom:12}}>QUICK OPENERS</h3>
            {[{l:"Cold Connect",m:"\"Hi [Name], I'm a PhD student at PSU researching THz comms. I noticed your work at [Company]...\"",c:"#2563EB"},
              {l:"Info Interview",m:"\"Would you have 15 minutes for a virtual coffee? I'd value your perspective on [topic]...\"",c:"#10B981"},
              {l:"Post-Event",m:"\"Great connecting at [event]. Your talk on [topic] aligned with my research...\"",c:"#8B5CF6"},
              {l:"Alumni",m:"\"Fellow [PSU/KNUST/HBNU] alum here! I'm researching wireless security and saw you're at [Company]...\"",c:"#F59E0B"},
            ].map((s,i)=>(
              <div key={i} style={{padding:"8px 0",borderBottom:i<3?"1px solid #0C1020":"none"}}>
                <Tag bg={s.c+"14"} fg={s.c}>{s.l}</Tag>
                <p style={{fontSize:12,color:"#94A3B8",lineHeight:1.6,marginTop:4,fontStyle:"italic"}}>{s.m}</p>
              </div>
            ))}
          </div>
        </div>)}

      </main>
      <footer style={{textAlign:"center",padding:"28px 16px 36px",fontSize:9,fontFamily:"Space Mono",color:"#111828",letterSpacing:1.5}}>
        CAREER COMMAND CENTER · PERSISTENT · {todayStr}
      </footer>
    </div>
  );
}
