import { useState, useEffect } from "react";

const projects = [
  // ── TIER 1: FOUNDATION (Weeks 1–4) ──
  { id:1, tier:1, title:"End-to-End 5G SA Network Lab", difficulty:"Intermediate", duration:"2 weeks", color:"#2563EB",
    tagline:"Deploy a full 5G standalone network on your laptop using only open-source tools.",
    why:"Every single 5G job — from Qualcomm to Nokia to T-Mobile — expects you to understand the E2E network. This project proves you can build one from scratch.",
    skills:["5G Core","Linux","Docker","Networking","Wireshark","Python"],
    mapsTo:["Qualcomm","Nokia","Ericsson","Samsung","T-Mobile","DISH","Spectrum"],
    jobTitles:["Wireless Systems Engineering Intern","5G/Wireless Engineering Intern","Network Engineer Intern"],
    steps:[
      "Install Ubuntu 22.04 VM (8GB RAM, 4 cores minimum)",
      "Deploy Open5GS 5G Core via Docker Compose (AMF, SMF, UPF, NRF, etc.)",
      "Configure subscriber database via Open5GS WebUI (IMSI, Ki, OPc)",
      "Build srsRAN gNB from source with ZMQ virtual RF backend",
      "Connect srsUE → gNB → Open5GS and achieve PDU session",
      "Capture full registration + PDU session PCAP with Wireshark",
      "Measure throughput (iperf3) and latency (ping) through the 5G tunnel",
      "Document architecture diagram + all config files on GitHub",
      "Bonus: Swap Open5GS for free5GC and compare performance",
    ],
    tools:["Open5GS","srsRAN Project","UERANSIM","Docker","Wireshark","iperf3"],
    repos:["https://github.com/ngkore/Open5GS-srsRAN","https://open5gs.org/open5gs/docs/","https://docs.srsran.com"],
    deliverables:["GitHub repo with all configs + Dockerfiles","Architecture diagram (draw.io/Mermaid)","PCAP analysis report (PDF)","Performance benchmarks table","LinkedIn post: 'I built a 5G network on my laptop'"],
  },
  { id:2, tier:1, title:"Automated RF Test Suite with PyVISA", difficulty:"Intermediate", duration:"1 week", color:"#10B981",
    tagline:"Build a Python framework to automate VNA measurements — the skill every RF lab wants.",
    why:"40+ of the top 100 companies need automated test engineers. You already use VNA in your THz research. This turns that into a portable, reusable skill.",
    skills:["Python","RF Testing","VNA","SCPI/VISA","Automation","Data Viz"],
    mapsTo:["Keysight","Rohde & Schwarz","Lockheed Martin","BAE Systems","Aerospace Corp","Qorvo","Skyworks"],
    jobTitles:["RF Engineering Intern","Signal Processing & RF Grad Intern","RF/Wireless Engineering Intern"],
    steps:[
      "Install PyVISA and PyVISA-py (no NI drivers needed)",
      "Connect to VNA (or use simulated instrument for demo)",
      "Write SCPI commands to configure frequency sweep (start, stop, points, power)",
      "Automate S-parameter measurement (S11, S21) capture",
      "Build data pipeline: raw data → NumPy array → Pandas DataFrame",
      "Plot Smith Chart + magnitude/phase using Matplotlib/Plotly",
      "Add automated pass/fail criteria (e.g., S11 < -10 dB in band)",
      "Generate PDF test report with plots + metadata",
      "Create CLI interface: python rf_test.py --start 8e9 --stop 12e9 --points 401",
    ],
    tools:["PyVISA","Python","NumPy","Pandas","Matplotlib","scikit-rf"],
    repos:["https://pyvisa.readthedocs.io","https://scikit-rf.readthedocs.io","https://github.com/scikit-rf/scikit-rf"],
    deliverables:["GitHub repo: 'rf-test-automation'","Smith Chart + S-param plots","Automated PDF report generator","README with equipment setup guide","LinkedIn post: 'Automated my lab's VNA measurements'"],
  },
  { id:3, tier:1, title:"5G NR Signal Analysis Dashboard", difficulty:"Intermediate", duration:"1.5 weeks", color:"#8B5CF6",
    tagline:"Build a Python dashboard that decodes and visualizes 5G NR signals — SSB, CORESET, PDSCH.",
    why:"Signal processing is your core strength. This project makes it visual and portfolio-ready, directly relevant to Qualcomm, MathWorks, and every RF company.",
    skills:["Signal Processing","Python","5G NR","OFDM","DSP","Data Viz"],
    mapsTo:["Qualcomm","MathWorks","Keysight","NI","Rohde & Schwarz","Intel"],
    jobTitles:["Wireless Systems Engineering Intern","Signal Processing & RF Grad Intern","Wireless Comms Engineer Intern"],
    steps:[
      "Generate 5G NR downlink waveform using MATLAB 5G Toolbox or Python",
      "Implement OFDM demodulation: FFT, CP removal, resource grid extraction",
      "Detect and decode SSB (PSS/SSS/PBCH) — cell ID determination",
      "Visualize resource grid: frequency vs time, color-coded by channel type",
      "Calculate and plot: constellation diagram (QPSK, 16QAM, 64QAM, 256QAM)",
      "Compute EVM, SNR, throughput estimates from decoded signals",
      "Build interactive Plotly/Dash dashboard with real-time controls",
      "Add support for different numerologies (μ=0,1,2)",
      "Compare FR1 vs FR2 signal characteristics visually",
    ],
    tools:["Python","NumPy","SciPy","Plotly/Dash","MATLAB (optional)"],
    repos:["https://github.com/pysdr/pysdr","https://www.mathworks.com/help/5g/"],
    deliverables:["GitHub repo: '5g-nr-signal-analyzer'","Interactive web dashboard","Resource grid visualization","Constellation + EVM plots","LinkedIn article: 'Visualizing the 5G NR Air Interface'"],
  },

  // ── TIER 2: CORE SKILLS (Weeks 5–12) ──
  { id:4, tier:2, title:"ML-Based Physical Layer Authentication System", difficulty:"Advanced", duration:"3 weeks", color:"#E8553D",
    tagline:"Port your thesis research into an industry-grade, deployable Python package with real-time inference.",
    why:"This is YOUR competitive advantage — nobody else has this. Turn your autoencoder PLA research into a polished, demo-ready system that hiring managers can see and run.",
    skills:["ML/DL","Python","TensorFlow","Physical Layer Security","CSI","Autoencoder"],
    mapsTo:["Google","Qualcomm","MITRE","Booz Allen","Lockheed Martin","BAE Systems"],
    jobTitles:["Research Intern PhD","ML Engineering Intern","Applied Research Intern"],
    steps:[
      "Refactor your thesis code into clean Python package structure (src/tests/docs)",
      "Implement autoencoder architecture in TensorFlow with configurable layers",
      "Create data pipeline: raw CSI → preprocessing → feature extraction → model input",
      "Train on legitimate user CSI data, test anomaly detection on adversary data",
      "Build real-time inference demo: feed live CSI → authenticate → display result",
      "Implement comparison models: OSVM, K-means, Random Forest",
      "Generate performance metrics: ROC curve, AUC, FAR, MDR vs distance",
      "Containerize with Docker + create docker-compose for easy demo",
      "Write comprehensive README with architecture diagrams",
      "Add unit tests with pytest (>80% coverage)",
    ],
    tools:["TensorFlow/Keras","Python","Docker","pytest","Matplotlib","scikit-learn"],
    repos:["https://github.com/topics/physical-layer-authentication","https://www.tensorflow.org/tutorials"],
    deliverables:["GitHub repo: 'pla-autoencoder' (polished, documented)","Docker container for one-click demo","Performance comparison paper-quality plots","PyPI-installable package","LinkedIn article: 'From Thesis to Industry: ML for Wireless Security'"],
  },
  { id:5, tier:2, title:"O-RAN Security xApp: Anomaly Detection", difficulty:"Advanced", duration:"3 weeks", color:"#F59E0B",
    tagline:"Build an O-RAN xApp that detects RAN anomalies using ML — the hottest skill in telecom right now.",
    why:"O-RAN + AI/ML + Security = the #1 hiring priority at Nokia, Ericsson, DISH, and every Open RAN company. This project combines your PLA research with the O-RAN stack.",
    skills:["O-RAN","xApp Dev","Python","ML","5G Security","Docker","Kubernetes"],
    mapsTo:["Nokia","Ericsson","DISH","Mavenir","Parallel Wireless","MITRE","Booz Allen"],
    jobTitles:["5G/Telecom Research Intern","ML Engineering Intern","Engineering Intern (5G/Wireless)"],
    steps:[
      "Deploy O-RAN SC Near-RT RIC on Docker using NIST automation scripts",
      "Deploy OAI gNB with E2 agent connected to the RIC",
      "Study E2SM-KPM service model: understand KPM indication messages",
      "Build xApp skeleton using O-RAN SC Python SDK (RMR messaging)",
      "Subscribe to KPM data from gNB via E2 interface",
      "Implement anomaly detection: collect baseline KPIs → train autoencoder → flag anomalies",
      "Add dashboard: Flask/FastAPI endpoint showing real-time RAN health",
      "Simulate attack scenario: jamming → KPI degradation → xApp alert",
      "Package as Docker container, deploy on RIC platform",
      "Write xApp onboarding descriptor (JSON config for RIC)",
    ],
    tools:["O-RAN SC RIC","FlexRIC","OAI","Docker","Python","TensorFlow","Flask"],
    repos:["https://github.com/usnistgov/O-RAN-Testbed-Automation","https://github.com/5GSEC/MobiFlow-Auditor","https://wiki.o-ran-sc.org"],
    deliverables:["GitHub repo: 'oran-anomaly-xapp'","Live demo video (2-3 min)","Architecture diagram showing E2 data flow","Anomaly detection accuracy report","LinkedIn article: 'I Built an AI-Powered O-RAN Security xApp'"],
  },
  { id:6, tier:2, title:"5G Network Slicing Orchestrator", difficulty:"Advanced", duration:"2 weeks", color:"#06B6D4",
    tagline:"Deploy and manage multiple network slices on Open5GS — eMBB, URLLC, mMTC — with a Python API.",
    why:"Network slicing is the business model of 5G. Every carrier (Verizon, T-Mobile, AT&T) and infrastructure vendor needs engineers who can configure and manage slices.",
    skills:["5G Core","Network Slicing","Python","Docker","REST APIs","Cloud"],
    mapsTo:["Verizon","T-Mobile","AT&T","DISH","Nokia","Ericsson","Samsung"],
    jobTitles:["Wireless Systems Engineering Intern","Network Engineer Intern","5G/Wireless Engineering Intern"],
    steps:[
      "Deploy Open5GS with 3 distinct slices: eMBB (SST=1), URLLC (SST=2), mMTC (SST=3)",
      "Configure separate UPFs per slice with different QoS profiles",
      "Connect multiple UEs via UERANSIM, each requesting a different slice",
      "Build Python REST API (FastAPI) to manage slices: create, modify, delete",
      "Implement slice admission control: max UEs per slice, bandwidth limits",
      "Monitor per-slice KPIs: throughput, latency, connected UEs",
      "Build dashboard showing real-time slice utilization (React or Plotly)",
      "Demonstrate slice isolation: congestion in eMBB doesn't affect URLLC",
      "Deploy entire stack on Kubernetes with Helm charts",
    ],
    tools:["Open5GS","UERANSIM","FastAPI","Docker","Kubernetes","Helm","React"],
    repos:["https://open5gs.org","https://gradiant.github.io/5g-charts/","https://github.com/aligungr/UERANSIM"],
    deliverables:["GitHub repo: '5g-slice-orchestrator'","REST API documentation (Swagger)","Slice isolation proof (benchmarks)","K8s deployment manifests","LinkedIn post: 'Managing 5G Network Slices with Python'"],
  },

  // ── TIER 3: DIFFERENTIATORS (Weeks 13–20) ──
  { id:7, tier:3, title:"THz Channel Estimation with Deep Learning", difficulty:"Expert", duration:"3 weeks", color:"#EC4899",
    tagline:"Bridge your THz research with industry ML — build a neural network for THz channel estimation.",
    why:"THz is the future (6G). You're one of the few PhD students with actual VNA measurement data. This project bridges your research to companies investing in 6G: Google, Qualcomm, Nokia Bell Labs.",
    skills:["THz","Deep Learning","Python","Channel Estimation","MATLAB","Research"],
    mapsTo:["Google","Nokia Bell Labs","Qualcomm","Meta","Apple","Keysight"],
    jobTitles:["Research Intern PhD","Applied Research Intern","Signal Processing Intern"],
    steps:[
      "Prepare your THz CIR dataset from VNA measurements (clean, normalize, split)",
      "Implement classical channel estimation: LS, MMSE as baselines",
      "Design CNN-based channel estimator: input = received pilots, output = full channel",
      "Design transformer-based estimator for comparison",
      "Train on simulated THz channels (3GPP TR 38.901 extended to THz)",
      "Validate on your real VNA measurement data (domain adaptation)",
      "Compare NMSE vs SNR for all methods, generate paper-quality plots",
      "Implement inference pipeline: real-time estimation from streaming data",
      "Publish as a Python package with pretrained models",
      "Write technical blog post explaining THz channel challenges",
    ],
    tools:["PyTorch","Python","MATLAB","NumPy","Matplotlib","HuggingFace (optional)"],
    repos:["https://www.deepmimo.net/","https://github.com/topics/channel-estimation"],
    deliverables:["GitHub repo: 'thz-channel-estimation-dl'","Pretrained models + inference script","NMSE comparison plots (paper-quality)","Technical blog post for LinkedIn","Potential IEEE conference paper"],
  },
  { id:8, tier:3, title:"AI-Powered RF Coverage Predictor", difficulty:"Advanced", duration:"2 weeks", color:"#14B8A6",
    tagline:"Build an ML model that predicts RF coverage from building maps — like what Verizon and T-Mobile use internally.",
    why:"RF planning is a $2B+ market. Every carrier and infrastructure company needs coverage prediction. This shows you can apply ML to real-world RF problems.",
    skills:["ML","RF Propagation","Python","GIS","Data Science","Signal Processing"],
    mapsTo:["Verizon","T-Mobile","AT&T","Ericsson","Nokia","CommScope"],
    jobTitles:["Data Science Intern","ML Engineering Intern","RF Engineering Intern","Wireless Systems Intern"],
    steps:[
      "Collect/generate training data: building geometry + tx location + measured RSRP",
      "Use OpenStreetMap data for building footprints (osmnx Python library)",
      "Implement ray-tracing baseline for path loss prediction",
      "Engineer features: distance, building count, elevation, frequency band",
      "Train Random Forest → XGBoost → CNN on path loss prediction",
      "Build coverage heatmap visualization on top of real maps (Folium/Mapbox)",
      "Evaluate: RMSE vs empirical models (Okumura-Hata, 3GPP)",
      "Add frequency band selection: sub-6 GHz vs mmWave",
      "Build web interface: drop a pin → see predicted coverage",
    ],
    tools:["Python","scikit-learn","XGBoost","PyTorch","Folium","osmnx","Pandas"],
    repos:["https://github.com/topics/rf-propagation","https://osmnx.readthedocs.io"],
    deliverables:["GitHub repo: 'rf-coverage-predictor'","Interactive coverage map demo","Model comparison report","Web interface for predictions","LinkedIn article: 'Predicting 5G Coverage with Machine Learning'"],
  },
  { id:9, tier:3, title:"LNA Design Portfolio (8–12 GHz)", difficulty:"Intermediate", duration:"2 weeks", color:"#F97316",
    tagline:"Take your thesis LNA design, optimize it in ADS, and build a complete RF design portfolio page.",
    why:"You already did this — now make it portfolio-perfect. Lockheed, BAE, Raytheon, Skyworks, and Qorvo all want to see your design methodology and simulation results.",
    skills:["RF Design","ADS","HFSS","LNA","S-Parameters","EM Simulation"],
    mapsTo:["Lockheed Martin","BAE Systems","Raytheon","Skyworks","Qorvo","MACOM","Analog Devices"],
    jobTitles:["RF Engineering Intern","Signal Processing & RF Grad Intern"],
    steps:[
      "Document complete LNA design methodology from your thesis",
      "Recreate in ADS with full schematic + EM co-simulation",
      "Optimize: gain > 12 dB, NF < 1.2 dB, stability factor K > 1 across band",
      "Design input/output matching networks with Smith Chart analysis",
      "Run Monte Carlo analysis for yield estimation",
      "Create layout and run EM simulation (Momentum or HFSS)",
      "Generate professional design report: specs, schematic, layout, results",
      "Build a portfolio webpage showcasing the design (HTML/React)",
      "Add comparison table: your design vs published LNA papers",
    ],
    tools:["Keysight ADS","Ansys HFSS","MATLAB","Python (scikit-rf)"],
    repos:["https://scikit-rf.readthedocs.io","https://www.keysight.com/us/en/products/software/pathwave-design-software/pathwave-advanced-design-system.html"],
    deliverables:["Design report PDF (10–15 pages)","ADS project files on GitHub","Portfolio webpage with interactive S-param plots","Smith Chart analysis visualization","LinkedIn post: 'Designing a Wideband LNA for X-Band'"],
  },

  // ── TIER 4: MOONSHOTS (Weeks 21–30) ──
  { id:10, tier:4, title:"Full O-RAN Testbed with AI-RAN", difficulty:"Expert", duration:"4 weeks", color:"#7C3AED",
    tagline:"Deploy a complete O-RAN testbed: RIC + gNB + Core + multiple xApps — the ultimate 5G portfolio project.",
    why:"This is what Nokia, Ericsson, and DISH build in their labs. Having a working O-RAN testbed on your GitHub puts you ahead of 99% of applicants.",
    skills:["O-RAN","5G","Kubernetes","Docker","Python","AI/ML","C/C++","Linux"],
    mapsTo:["Nokia","Ericsson","DISH","Samsung","Mavenir","Parallel Wireless","Intel","Google"],
    jobTitles:["Research Intern PhD","5G/Telecom Research Intern","Wireless Systems Engineering Intern"],
    steps:[
      "Deploy full stack using NIST O-RAN Testbed Automation",
      "Configure: Near-RT RIC (O-RAN SC) + OAI gNB + Open5GS Core",
      "Deploy 3 xApps: KPM Monitor, Traffic Steering, Anomaly Detection",
      "Add your custom security xApp (from Project 5)",
      "Implement FlexRIC alternative with KPM + RC xApps",
      "Deploy on Kubernetes cluster (minikube or cloud)",
      "Build monitoring dashboard: Grafana + Prometheus for RIC metrics",
      "Run load tests: multiple UEs, varying traffic patterns",
      "Document: architecture, deployment steps, xApp descriptions",
      "Create 5-minute demo video walking through the entire system",
      "Bonus: Integrate with Powder Wireless testbed for OTA testing",
    ],
    tools:["O-RAN SC RIC","FlexRIC","OAI","Open5GS","Kubernetes","Grafana","Prometheus","Docker"],
    repos:["https://github.com/usnistgov/O-RAN-Testbed-Automation","https://github.com/srsran/oran-sc-ric","https://gitlab.eurecom.fr/mosaic5g/flexric"],
    deliverables:["GitHub repo: 'oran-ai-testbed' (comprehensive)","Kubernetes manifests + Helm charts","5-min demo video","Architecture documentation","LinkedIn article: 'Building an AI-Native O-RAN Testbed from Scratch'"],
  },
  { id:11, tier:4, title:"5G Digital Twin with Real-Time KPI Dashboard", difficulty:"Expert", duration:"3 weeks", color:"#059669",
    tagline:"Build a digital twin of a 5G network that mirrors real-time KPIs — the future of network management.",
    why:"Digital twins are the #1 trend in telecom operations. Accenture, Nokia, and Ericsson are all investing billions. This shows you understand next-gen network management.",
    skills:["Python","React","Data Streaming","5G","ML","Cloud","Visualization"],
    mapsTo:["Accenture","Nokia","Ericsson","Verizon","T-Mobile","Google","Microsoft"],
    jobTitles:["Data Science Intern","ML Engineering Intern","Research Intern PhD"],
    steps:[
      "Deploy Open5GS + srsRAN with KPI logging enabled",
      "Build data pipeline: gNB logs → parser → time-series DB (InfluxDB)",
      "Create 3D visualization of cell tower coverage (Three.js or Cesium)",
      "Real-time KPI streaming: RSRP, SINR, throughput, connected UEs",
      "Implement predictive model: forecast traffic load 1-hour ahead (LSTM)",
      "Add anomaly detection layer: flag unusual KPI patterns",
      "Build React dashboard: live map + charts + alerts",
      "Simulate scenarios: increased load, cell failure, weather impact",
      "Deploy on AWS/Azure with auto-scaling",
      "Create product demo video",
    ],
    tools:["React","Three.js","InfluxDB","Python","TensorFlow","FastAPI","AWS"],
    repos:["https://github.com/topics/digital-twin","https://threejs.org"],
    deliverables:["GitHub repo: '5g-digital-twin'","Live web dashboard","Predictive model with accuracy metrics","AWS deployment guide","LinkedIn article: 'Building a 5G Digital Twin'"],
  },
  { id:12, tier:4, title:"Open-Source Contribution: srsRAN or OAI", difficulty:"Expert", duration:"Ongoing", color:"#DC2626",
    tagline:"Contribute to srsRAN or OpenAirInterface — the two most important open-source 5G projects in the world.",
    why:"Open-source contributions are the ultimate proof of skill. srsRAN and OAI are used by Nokia, Ericsson, Qualcomm, and every research lab. Contributors get noticed.",
    skills:["C/C++","5G NR","O-RAN","Git","Linux","DSP","Protocol Stack"],
    mapsTo:["All 100 companies — this is the universal credential"],
    jobTitles:["All wireless engineering roles"],
    steps:[
      "Fork srsRAN_Project or OAI on GitHub",
      "Build from source, run tests, understand code structure",
      "Read open issues labeled 'good first issue' or 'help wanted'",
      "Start with documentation fixes or small bug fixes",
      "Progress to: adding a new test case, fixing a protocol edge case",
      "Tackle larger features: new KPI metric, O-RAN E2 enhancement",
      "Submit PRs with clean code, tests, and documentation",
      "Engage in code review discussions",
      "Attend community meetings (srsRAN has monthly calls)",
      "Aim for 3+ merged PRs within 3 months",
    ],
    tools:["C/C++","CMake","Git","Linux","GDB","Wireshark"],
    repos:["https://github.com/srsran/srsRAN_Project","https://gitlab.eurecom.fr/oai/openairinterface5g","https://github.com/srsran/oran-sc-ric"],
    deliverables:["3+ merged pull requests","Contributor badge on GitHub","Code review participation","LinkedIn post per merged PR","Reference from maintainers (invaluable for job apps)"],
  },
];

const tierMeta = {
  1:{label:"Foundation",color:"#2563EB",desc:"Build your base — these prove fundamental competency"},
  2:{label:"Core Skills",color:"#10B981",desc:"These are what hiring managers actually test for"},
  3:{label:"Differentiators",color:"#F59E0B",desc:"These set you apart from 95% of candidates"},
  4:{label:"Moonshots",color:"#E8553D",desc:"These put you in the top 1% — portfolio legends"},
};

const diffColors = { Intermediate:"#2563EB", Advanced:"#F59E0B", Expert:"#E8553D" };

export default function ProjectPortfolio(){
  const[selected,setSelected]=useState(null);
  const[tierFilter,setTierFilter]=useState("all");
  const[progress,setProgress]=useState({});
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    (async()=>{
      try{const r=await window.storage.get("project-progress");if(r)setProgress(JSON.parse(r.value));}catch(e){}
      setLoading(false);
    })();
  },[]);

  const toggleStep=async(projId,stepIdx)=>{
    const key=`${projId}-${stepIdx}`;
    const np={...progress,[key]:!progress[key]};
    setProgress(np);
    try{await window.storage.set("project-progress",JSON.stringify(np));}catch(e){}
  };

  const getProjectProgress=(projId,totalSteps)=>{
    let done=0;
    for(let i=0;i<totalSteps;i++){if(progress[`${projId}-${i}`])done++;}
    return{done,pct:Math.round((done/totalSteps)*100)};
  };

  const filtered=tierFilter==="all"?projects:projects.filter(p=>p.tier===parseInt(tierFilter));
  const totalSteps=projects.reduce((a,p)=>a+p.steps.length,0);
  const totalDone=projects.reduce((a,p)=>{const{done}=getProjectProgress(p.id,p.steps.length);return a+done;},0);
  const overallPct=Math.round((totalDone/totalSteps)*100);

  const S={card:{background:"linear-gradient(150deg,#0C1020,#111828)",border:"1px solid #19223A",borderRadius:14}};

  if(loading) return (
    <div style={{fontFamily:"'DM Sans',sans-serif",background:"#06080F",color:"#CBD5E1",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>Loading projects...</div>
  );

  return(
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif",background:"#06080F",color:"#CBD5E1",minHeight:"100vh"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#19223A;border-radius:4px}
        @keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .up{animation:up .4s ease forwards}.d1{animation-delay:.05s;opacity:0}.d2{animation-delay:.1s;opacity:0}
        button{cursor:pointer;border:none;outline:none;font-family:inherit}a{text-decoration:none;color:inherit}
        .ck{width:20px;height:20px;border-radius:5px;border:2px solid #19223A;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;flex-shrink:0;transition:all .2s}
        .ck.on{background:#10B981;border-color:#10B981}
        .bar{height:5px;border-radius:3px;background:#0C1020;overflow:hidden}.bf{height:100%;border-radius:3px;transition:width .8s ease}
        .tag{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:.5px;white-space:nowrap}
      `}</style>

      {/* HEADER */}
      <header style={{background:"linear-gradient(180deg,#0A0E1A,#06080F)",borderBottom:"1px solid #111828",padding:"18px 16px 10px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:880,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:11}}>
              <div style={{width:36,height:36,borderRadius:9,background:"linear-gradient(135deg,#E8553D,#7C3AED)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,fontFamily:"Syne",color:"#fff"}}>⚡</div>
              <div>
                <h1 style={{fontSize:15,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9"}}>Project Portfolio Builder</h1>
                <p style={{fontSize:9,color:"#334155",fontFamily:"Space Mono",letterSpacing:1}}>12 PROJECTS · 4 TIERS · HANDS-ON · PORTFOLIO-READY</p>
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:18,fontWeight:800,fontFamily:"Syne",color:overallPct>=50?"#10B981":"#2563EB"}}>{overallPct}%</div>
              <div style={{fontSize:8,color:"#334155"}}>{totalDone}/{totalSteps} steps</div>
            </div>
          </div>
          <div style={{display:"flex",gap:4}}>
            {["all","1","2","3","4"].map(f=>(
              <button key={f} onClick={()=>{setTierFilter(f);setSelected(null)}}
                style={{padding:"6px 12px",borderRadius:7,fontSize:10,fontWeight:600,
                  background:tierFilter===f?(f==="all"?"#2563EB":tierMeta[parseInt(f)]?.color||"#666")+"18":"transparent",
                  color:tierFilter===f?(f==="all"?"#60A5FA":tierMeta[parseInt(f)]?.color||"#fff"):"#334155",
                  border:`1px solid ${tierFilter===f?"#253060":"transparent"}`}}>
                {f==="all"?"All 12":`T${f}: ${tierMeta[parseInt(f)]?.label}`}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main style={{maxWidth:880,margin:"0 auto",padding:16}}>

        {/* Selected project detail */}
        {selected!==null&&(()=>{
          const p=projects.find(pr=>pr.id===selected);
          if(!p)return null;
          const{done,pct}=getProjectProgress(p.id,p.steps.length);
          return(
            <div className="up">
              <button onClick={()=>setSelected(null)} style={{fontSize:12,color:"#475569",marginBottom:12,background:"none",padding:0}}>← Back to all projects</button>

              <div style={{...S.card,padding:20,marginBottom:14,borderLeft:`4px solid ${p.color}`}}>
                <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
                  <span className="tag" style={{background:tierMeta[p.tier].color+"18",color:tierMeta[p.tier].color}}>Tier {p.tier}</span>
                  <span className="tag" style={{background:(diffColors[p.difficulty]||"#666")+"18",color:diffColors[p.difficulty]||"#666"}}>{p.difficulty}</span>
                  <span className="tag" style={{background:"#19223A",color:"#94A3B8"}}>{p.duration}</span>
                </div>
                <h2 style={{fontSize:20,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9",marginBottom:4}}>{p.title}</h2>
                <p style={{fontSize:13,color:p.color,fontWeight:600,fontStyle:"italic",marginBottom:10}}>{p.tagline}</p>
                <p style={{fontSize:12,color:"#94A3B8",lineHeight:1.7,marginBottom:14}}><span style={{fontWeight:700,color:"#F1F5F9"}}>Why this matters: </span>{p.why}</p>

                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
                  {p.skills.map((s,i)=><span key={i} className="tag" style={{background:"#2563EB14",color:"#60A5FA"}}>{s}</span>)}
                </div>
                <div style={{fontSize:11,color:"#475569",marginBottom:4}}><span style={{fontWeight:600,color:"#94A3B8"}}>Target companies: </span>{p.mapsTo.join(", ")}</div>
                <div style={{fontSize:11,color:"#475569"}}><span style={{fontWeight:600,color:"#94A3B8"}}>Matching job titles: </span>{p.jobTitles.join(", ")}</div>
              </div>

              {/* Steps */}
              <div style={{...S.card,padding:18,marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <h3 style={{fontSize:13,fontWeight:700,fontFamily:"Syne",color:"#F1F5F9"}}>Steps ({done}/{p.steps.length})</h3>
                  <span style={{fontSize:14,fontWeight:800,fontFamily:"Syne",color:pct===100?"#10B981":p.color}}>{pct}%</span>
                </div>
                {p.steps.map((step,i)=>{
                  const isDone=progress[`${p.id}-${i}`];
                  return(
                    <div key={i} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:i<p.steps.length-1?"1px solid #111828":"none",opacity:isDone?.4:1,transition:"opacity .3s"}}>
                      <button className={`ck ${isDone?"on":""}`} onClick={()=>toggleStep(p.id,i)}>{isDone?"✓":""}</button>
                      <div style={{flex:1}}>
                        <span style={{fontSize:12,color:isDone?"#334155":"#E2E8F0",textDecoration:isDone?"line-through":"none",lineHeight:1.6}}>{step}</span>
                      </div>
                      <span style={{fontSize:10,color:"#253060",fontFamily:"Space Mono",flexShrink:0}}>#{i+1}</span>
                    </div>
                  );
                })}
                <div className="bar" style={{marginTop:12}}><div className="bf" style={{width:`${pct}%`,background:pct===100?"#10B981":p.color}}/></div>
              </div>

              {/* Tools + Repos + Deliverables */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                <div style={{...S.card,padding:16}}>
                  <h4 style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#475569",letterSpacing:1.2,marginBottom:8}}>TOOLS</h4>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                    {p.tools.map((t,i)=><span key={i} className="tag" style={{background:"#10B98114",color:"#10B981"}}>{t}</span>)}
                  </div>
                </div>
                <div style={{...S.card,padding:16}}>
                  <h4 style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#475569",letterSpacing:1.2,marginBottom:8}}>KEY REPOS</h4>
                  {p.repos.map((r,i)=>(
                    <a key={i} href={r} target="_blank" rel="noopener noreferrer" style={{display:"block",fontSize:10,color:"#60A5FA",padding:"3px 0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.replace("https://","")}</a>
                  ))}
                </div>
              </div>

              <div style={{...S.card,padding:16}}>
                <h4 style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#F59E0B",letterSpacing:1.2,marginBottom:8}}>DELIVERABLES (what goes on your portfolio)</h4>
                {p.deliverables.map((d,i)=>(
                  <div key={i} style={{fontSize:12,color:"#94A3B8",padding:"4px 0",borderBottom:i<p.deliverables.length-1?"1px solid #0C1020":"none",lineHeight:1.5}}>
                    <span style={{color:"#F59E0B",marginRight:6}}>→</span>{d}
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Project cards list */}
        {selected===null&&(<div>
          {[1,2,3,4].filter(t=>tierFilter==="all"||parseInt(tierFilter)===t).map(tier=>(
            <div key={tier} style={{marginBottom:20}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <div style={{width:4,height:20,borderRadius:2,background:tierMeta[tier].color}}/>
                <div>
                  <h3 style={{fontSize:14,fontWeight:700,fontFamily:"Syne",color:"#F1F5F9"}}>Tier {tier}: {tierMeta[tier].label}</h3>
                  <p style={{fontSize:10,color:"#475569"}}>{tierMeta[tier].desc}</p>
                </div>
              </div>

              {filtered.filter(p=>p.tier===tier).map((p,i)=>{
                const{done,pct}=getProjectProgress(p.id,p.steps.length);
                return(
                  <button key={p.id} onClick={()=>setSelected(p.id)} className="up"
                    style={{...S.card,padding:16,marginBottom:8,width:"100%",textAlign:"left",borderLeft:`3px solid ${p.color}30`,display:"block",animationDelay:`${i*.05}s`,opacity:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",gap:10}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{display:"flex",gap:5,marginBottom:5,flexWrap:"wrap"}}>
                          <span className="tag" style={{background:(diffColors[p.difficulty]||"#666")+"14",color:diffColors[p.difficulty]}}>{p.difficulty}</span>
                          <span className="tag" style={{background:"#19223A",color:"#64748B"}}>{p.duration}</span>
                          {pct===100&&<span className="tag" style={{background:"#10B98118",color:"#10B981"}}>✓ Complete</span>}
                        </div>
                        <div style={{fontSize:14,fontWeight:600,color:"#F1F5F9",marginBottom:3}}>{p.title}</div>
                        <div style={{fontSize:11,color:"#64748B",lineHeight:1.5}}>{p.tagline}</div>
                        <div style={{display:"flex",gap:3,marginTop:8,flexWrap:"wrap"}}>
                          {p.skills.slice(0,5).map((s,si)=><span key={si} className="tag" style={{background:"#0C1020",color:"#64748B"}}>{s}</span>)}
                        </div>
                      </div>
                      <div style={{textAlign:"center",flexShrink:0,minWidth:50}}>
                        <div style={{fontSize:20,fontWeight:800,fontFamily:"Syne",color:pct===100?"#10B981":pct>0?p.color:"#253060"}}>{pct}%</div>
                        <div style={{fontSize:8,color:"#334155"}}>{done}/{p.steps.length}</div>
                      </div>
                    </div>
                    {pct>0&&pct<100&&(
                      <div className="bar" style={{marginTop:10}}><div className="bf" style={{width:`${pct}%`,background:p.color}}/></div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>)}
      </main>

      <footer style={{textAlign:"center",padding:"28px 16px 36px",fontSize:9,fontFamily:"Space Mono",color:"#111828",letterSpacing:1.5}}>
        PROJECT PORTFOLIO BUILDER · RALPH KUMAH · 2026
      </footer>
    </div>
  );
}
