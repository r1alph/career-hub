import { useState, useEffect } from "react";

// 24-WEEK MASTER PLAN — maps to all dashboards
const plan = [
  { wk:1, phase:"Foundation", color:"#3B82F6", focus:"Python core + SQL basics + 5G intro",
    daily:[
      {t:"6:00–7:30",task:"Python: variables, types, OOP, decorators, error handling, file I/O",dash:"Tech Skills → Python → Core Python"},
      {t:"7:30–8:30",task:"SQL: SELECT, WHERE, JOINs, GROUP BY, HAVING — SQLZoo + LeetCode SQL",dash:"Tech Skills → SQL → Fundamentals"},
      {t:"8:30–9:30",task:"5G Pathway S1: LTE fundamentals + 5G NR basics + 3GPP TS 38.300",dash:"5G Path → S1: Foundations"},
      {t:"9:30–10:15",task:"5G Pathway S6: 5G intro, KPIs (eMBB/URLLC/mMTC), SBA architecture",dash:"5G Path → S6: 5G Mastery"},
      {t:"10:15–11:00",task:"LeetCode: 2 easy Python problems + career: search 5 jobs, send 3 connections",dash:"Career Center → Jobs + Network"},
      {t:"11:00–11:30",task:"LinkedIn: comment on 3 posts from wireless engineers",dash:"Career Center → LinkedIn"},
    ],
    certs:["Start: MATLAB Onramp (MathWorks, free — do in evenings)"],
    project:null,
    linkedin:"Post: 'Starting my 24-week tech skills + 5G mastery journey. Here's my roadmap...'",
    tickOff:["Tech Skills: Python core topics","Tech Skills: SQL fundamentals","5G Path S1: LTE Fundamentals topic","5G Path S6: 5G Fundamentals topic","Career Center: 5 job bookmarks"] },

  { wk:2, phase:"Foundation", color:"#3B82F6", focus:"Python data + SQL advanced + 5G protocols",
    daily:[
      {t:"6:00–7:30",task:"Python: NumPy, Pandas, Matplotlib, SciPy — data analysis pipeline",dash:"Tech Skills → Python → Data & Scientific"},
      {t:"7:30–8:30",task:"SQL: window functions, CTEs, CASE WHEN, indexing, EXPLAIN ANALYZE",dash:"Tech Skills → SQL → Intermediate + Advanced"},
      {t:"8:30–9:30",task:"5G Pathway S1: RF propagation, path loss models, MIMO basics",dash:"5G Path → S1: RF + Propagation"},
      {t:"9:30–10:15",task:"5G Pathway S6: NSA vs SA modes, 5G protocol stack overview",dash:"5G Path → S6: NSA & SA + Protocol Stack"},
      {t:"10:15–11:00",task:"LeetCode: 2 medium Python + 2 SQL problems",dash:"Tech Skills → Practice"},
      {t:"11:00–11:30",task:"Career: apply to 3 jobs + follow up on connections",dash:"Career Center → Jobs"},
    ],
    certs:["Complete: MATLAB Onramp + Signal Processing Onramp"],
    project:null,
    linkedin:"Post: '5 Python one-liners every engineer should know' (code snippet post)",
    tickOff:["Tech Skills: Python data topics","Tech Skills: SQL intermediate + advanced","5G Path S1: RF + Propagation","5G Path S6: NSA/SA + Protocol Stack","MATLAB Onramp certification ✓"] },

  { wk:3, phase:"Foundation", color:"#3B82F6", focus:"Python APIs + 5G PHY + Linux",
    daily:[
      {t:"6:00–7:30",task:"Python: FastAPI REST endpoints, Pydantic, SQLAlchemy, JWT auth",dash:"Tech Skills → Python → Web & API"},
      {t:"7:30–8:30",task:"Python: pytest, code coverage, linting (black, flake8), packaging",dash:"Tech Skills → Python → Testing"},
      {t:"8:30–9:30",task:"5G Pathway S1: Linux CLI, networking commands, Docker basics",dash:"5G Path → S1: Linux + CLI"},
      {t:"9:30–10:15",task:"5G Pathway S6: Physical layer, frame structure, CORESET, BWP, channels",dash:"5G Path → S6: Physical Layer"},
      {t:"10:15–11:00",task:"5G Pathway S1: Wireshark + PCAP analysis for telecom protocols",dash:"5G Path → S1: Wireshark"},
      {t:"11:00–11:30",task:"Career: apply to 3 jobs + LinkedIn engagement",dash:"Career Center"},
    ],
    certs:["Start: AWS Cloud Practitioner study (evenings)"],
    project:"Start: Project 1 — Full-Stack 5G Lab API (Python + SQL)",
    linkedin:"Post: 'Built my first REST API this week. Here's what I learned about FastAPI...'",
    tickOff:["Tech Skills: Python API + Testing topics","5G Path S1: Linux + Wireshark","5G Path S6: Physical Layer + Channels","Project Portfolio: P1 steps 1-4"] },

  { wk:4, phase:"Foundation", color:"#3B82F6", focus:"Finish Python/SQL + 5G call flows + AWS start",
    daily:[
      {t:"6:00–7:30",task:"Complete Project 1: Full-Stack 5G Lab API — dockerize + deploy",dash:"Project Portfolio → P1"},
      {t:"7:30–8:30",task:"5G Pathway S6: Network slicing (eMBB/URLLC/mMTC) + NSA→SA migration",dash:"5G Path → S6: Slicing + Migration"},
      {t:"8:30–9:30",task:"5G Pathway S6: Call flows (NSA attach, SA registration, PDU session)",dash:"5G Path → S6: Call Flows"},
      {t:"9:30–10:15",task:"AWS: IAM, EC2, S3, VPC foundations — AWS Skill Builder",dash:"Tech Skills → AWS → Foundations"},
      {t:"10:15–11:00",task:"AWS CCP exam study + practice questions",dash:"Certification prep"},
      {t:"11:00–11:30",task:"Push Project 1 to GitHub + LinkedIn post about it",dash:"Career Center → LinkedIn"},
    ],
    certs:["Target: AWS Cloud Practitioner exam end of week 5"],
    project:"Complete: Project 1 — Full-Stack 5G Lab API ✓",
    linkedin:"Post: 'Built a 5G subscriber management API with Python + FastAPI + PostgreSQL'",
    tickOff:["Tech Skills: Python ALL complete ✓","Tech Skills: SQL ALL complete ✓","5G Path S6: ALL complete ✓","Project Portfolio: P1 complete ✓","5G Path S6: Call Flows + Testing"] },

  // ── PHASE 2: CORE (Weeks 5–10) ──
  { wk:5, phase:"Core", color:"#FF9900", focus:"AWS deep + 5G Core network",
    daily:[
      {t:"6:00–7:30",task:"AWS: Lambda, API Gateway, ECS/EKS, RDS, DynamoDB, CloudFormation",dash:"Tech Skills → AWS → Compute + Data"},
      {t:"7:30–8:30",task:"AWS: 5G on AWS — Wavelength, Private 5G, IoT Core, SageMaker overview",dash:"Tech Skills → AWS → 5G & Telecom"},
      {t:"8:30–9:30",task:"5G Pathway S3: AMF/SMF/UPF functions, SBA, N1-N6 interfaces",dash:"5G Path → S3: 5G Core"},
      {t:"9:30–10:15",task:"5G Pathway S3: UE registration flow, PDU session establishment",dash:"5G Path → S3: Procedures"},
      {t:"10:15–11:00",task:"AWS CCP final prep + practice exam",dash:"Certification"},
      {t:"11:00–11:30",task:"Career: apply to 5 jobs + connect with AWS/5G professionals",dash:"Career Center"},
    ],
    certs:["PASS: AWS Cloud Practitioner (CLF-C02) ☁️"],
    project:"Start: Project 2 — E2E 5G SA Network (Open5GS + srsRAN)",
    linkedin:"Post: 'Passed AWS Cloud Practitioner! Here are my 3 biggest takeaways...'",
    tickOff:["Tech Skills: AWS all topics","5G Path S3: NFs + SBA + Interfaces","AWS CCP certification ✓"] },

  { wk:6, phase:"Core", color:"#2496ED", focus:"Docker + 5G Core hands-on",
    daily:[
      {t:"6:00–7:30",task:"Docker: Dockerfiles, multi-stage builds, Docker Compose, networking",dash:"Tech Skills → Docker → Fundamentals + Compose"},
      {t:"7:30–8:30",task:"Docker for telecom: containerize Open5GS NFs, build 5G lab",dash:"Tech Skills → Docker → Telecom"},
      {t:"8:30–9:30",task:"Project 2: Deploy Open5GS + srsRAN + UERANSIM on Docker",dash:"Project Portfolio → P2 (E2E 5G)"},
      {t:"9:30–10:15",task:"5G Pathway S3: Network slicing config, PCAP capture of registration flow",dash:"5G Path → S3: Slicing + Procedures"},
      {t:"10:15–11:00",task:"Project 2: iperf3 benchmarks, PCAP analysis, documentation",dash:"Project Portfolio → P2"},
      {t:"11:00–11:30",task:"LinkedIn engagement + push Docker configs to GitHub",dash:"Career Center → LinkedIn"},
    ],
    certs:null,
    project:"Complete: Project 2 — E2E 5G SA Network ✓",
    linkedin:"Post: 'Deployed a full 5G network on my laptop using Docker + Open5GS + srsRAN'",
    tickOff:["Tech Skills: Docker ALL complete ✓","5G Path S3: ALL complete ✓","Project Portfolio: P2 complete ✓"] },

  { wk:7, phase:"Core", color:"#326CE5", focus:"Kubernetes + 5G RAN",
    daily:[
      {t:"6:00–7:30",task:"K8s: architecture, pods, deployments, services, namespaces, kubectl",dash:"Tech Skills → K8s → Architecture + Workloads"},
      {t:"7:30–8:30",task:"K8s: StatefulSets, ConfigMaps, Secrets, PVs, Helm charts",dash:"Tech Skills → K8s → Storage + Helm"},
      {t:"8:30–9:30",task:"5G Pathway S2: gNB architecture, NR numerology, OFDM, slot structure",dash:"5G Path → S2: Master the RAN"},
      {t:"9:30–10:15",task:"5G Pathway S2: Massive MIMO, beamforming, PDSCH/PUSCH/PDCCH",dash:"5G Path → S2: MIMO + Channels"},
      {t:"10:15–11:00",task:"K8s hands-on: deploy app on minikube, write Helm chart",dash:"Tech Skills → K8s practice"},
      {t:"11:00–11:30",task:"Career: apply to 3 K8s/cloud jobs + networking outreach",dash:"Career Center"},
    ],
    certs:["Start: CKA exam study (KodeKloud labs)"],
    project:"Start: Project 3 — 5G NR Signal Analysis Dashboard",
    linkedin:"Post: 'Deployed my first app on Kubernetes. Here's my mental model for pods, services, and deployments...'",
    tickOff:["Tech Skills: K8s architecture + workloads + storage","5G Path S2: gNB + numerology + MIMO + channels"] },

  { wk:8, phase:"Core", color:"#326CE5", focus:"K8s for telecom + 5G RAN complete",
    daily:[
      {t:"6:00–7:30",task:"K8s: Ingress, network policies, Multus CNI, SCTP, HPA, RBAC",dash:"Tech Skills → K8s → Networking + Telecom"},
      {t:"7:30–8:30",task:"K8s: deploy Open5GS on K8s with Helm + Gradiant 5G charts",dash:"Tech Skills → K8s → Telecom hands-on"},
      {t:"8:30–9:30",task:"Complete Project 3: 5G NR Signal Analysis Dashboard",dash:"Project Portfolio → P3"},
      {t:"9:30–10:15",task:"5G Pathway S2: carrier aggregation + 5G testing types",dash:"5G Path → S2: complete remaining"},
      {t:"10:15–11:00",task:"CKA practice labs: troubleshooting, cluster maintenance",dash:"Certification prep"},
      {t:"11:00–11:30",task:"Push projects to GitHub + LinkedIn monthly article",dash:"Career Center → LinkedIn"},
    ],
    certs:["Target: CKA exam week 9-10"],
    project:"Complete: Project 3 — 5G NR Signal Analysis ✓",
    linkedin:"ARTICLE: 'Month 2 recap — AWS certified, 5G network deployed, K8s mastered'",
    tickOff:["Tech Skills: K8s ALL complete ✓","5G Path S2: ALL complete ✓","Project Portfolio: P3 complete ✓"] },

  { wk:9, phase:"Core", color:"#7B42BC", focus:"Terraform + O-RAN foundations",
    daily:[
      {t:"6:00–7:30",task:"Terraform: HCL, providers, resources, state, modules, workspaces",dash:"Tech Skills → Terraform → Core + Advanced"},
      {t:"7:30–8:30",task:"Terraform: provision AWS VPC + EC2 + S3 for 5G testbed",dash:"Tech Skills → Terraform → Telecom"},
      {t:"8:30–9:30",task:"5G Pathway S4/S7: O-RAN intro, architecture, 7.2x split, components",dash:"5G Path → S4 + S7: O-RAN"},
      {t:"9:30–10:15",task:"5G Pathway S7: Near-RT RIC, xApps, E2 interface, E2SM-KPM/RC",dash:"5G Path → S7: RIC + xApps"},
      {t:"10:15–11:00",task:"CKA final prep + Terraform Associate study",dash:"Certification prep"},
      {t:"11:00–11:30",task:"Career: apply to 5 O-RAN/cloud jobs + LinkedIn post",dash:"Career Center"},
    ],
    certs:["PASS: CKA (Kubernetes) ☸️","Start: Terraform Associate study"],
    project:"Start: Project 4 — ML-Based PLA System (your thesis port)",
    linkedin:"Post: 'Passed CKA! Here's how Kubernetes powers cloud-native 5G networks...'",
    tickOff:["Tech Skills: Terraform all topics","5G Path S7: O-RAN architecture + RIC","CKA certification ✓"] },

  { wk:10, phase:"Core", color:"#EE0000", focus:"Ansible + O-RAN interfaces + PLA project",
    daily:[
      {t:"6:00–7:30",task:"Ansible: playbooks, roles, templates, Vault, network modules",dash:"Tech Skills → Ansible → All topics"},
      {t:"7:30–8:30",task:"Ansible for telecom: deploy Docker + NFs on EC2, NETCONF automation",dash:"Tech Skills → Ansible → Network/Telecom"},
      {t:"8:30–9:30",task:"Project 4: refactor thesis PLA code into Python package + Docker",dash:"Project Portfolio → P4 (ML PLA)"},
      {t:"9:30–10:15",task:"5G Pathway S7: Non-RT RIC, rApps, A1/O1/O2 interfaces",dash:"5G Path → S7: complete"},
      {t:"10:15–11:00",task:"Terraform Associate exam prep + practice",dash:"Certification prep"},
      {t:"11:00–11:30",task:"Career: networking outreach to O-RAN companies + LinkedIn",dash:"Career Center"},
    ],
    certs:["PASS: Terraform Associate 🏗️"],
    project:"Progress: Project 4 — ML PLA System (60% done)",
    linkedin:"Post: 'Infrastructure-as-Code changed how I deploy. Terraform vs Ansible — when to use each...'",
    tickOff:["Tech Skills: Ansible ALL complete ✓","5G Path S7: ALL complete ✓","Terraform Associate ✓","Project Portfolio: P4 steps 1-6"] },

  // ── PHASE 3: ADVANCED (Weeks 11–16) ──
  { wk:11, phase:"Advanced", color:"#D33833", focus:"Jenkins CI/CD + O-RAN xApp project",
    daily:[
      {t:"6:00–7:30",task:"Jenkins: pipelines, stages, agents, multibranch, shared libraries",dash:"Tech Skills → Jenkins → Core + Advanced"},
      {t:"7:30–8:30",task:"CI/CD: GitHub Actions, ArgoCD GitOps, Tekton overview",dash:"Tech Skills → Jenkins → Beyond Jenkins"},
      {t:"8:30–9:30",task:"Complete Project 4: ML PLA System — pytest, Docker, comparison models",dash:"Project Portfolio → P4 complete"},
      {t:"9:30–10:15",task:"Start Project 5: O-RAN xApp — deploy Near-RT RIC + OAI gNB",dash:"Project Portfolio → P5 (O-RAN xApp)"},
      {t:"10:15–11:00",task:"5G Pathway S4: Near-RT RIC xApp dev, FlexRIC, NIST automation",dash:"5G Path → S4: O-RAN + AI/ML"},
      {t:"11:00–11:30",task:"Career: apply to 5 jobs + build Jenkins pipeline for a project",dash:"Career Center"},
    ],
    certs:["Start: Keysight RF & Microwave cert (free via PSU)"],
    project:"Complete: Project 4 — ML PLA System ✓ | Start: Project 5 — O-RAN xApp",
    linkedin:"Post: 'From thesis to industry: how I turned my ML research into a deployable Python package'",
    tickOff:["Tech Skills: Jenkins ALL complete ✓","Project Portfolio: P4 complete ✓","5G Path S4: O-RAN + xApp topics"] },

  { wk:12, phase:"Advanced", color:"#D33833", focus:"O-RAN xApp complete + AI/ML in Telecom",
    daily:[
      {t:"6:00–7:30",task:"Project 5: build xApp (Python), E2SM-KPM subscription, anomaly detection",dash:"Project Portfolio → P5"},
      {t:"7:30–8:30",task:"Project 5: Flask dashboard, simulate jamming attack, Docker package",dash:"Project Portfolio → P5 complete"},
      {t:"8:30–9:30",task:"5G Pathway S8: AI/ML fundamentals for telecom, NWDAF architecture",dash:"5G Path → S8: AI/ML Telecom"},
      {t:"9:30–10:15",task:"5G Pathway S8: ML use cases in RAN — traffic, mobility, slicing, anomaly",dash:"5G Path → S8: RAN use cases"},
      {t:"10:15–11:00",task:"Keysight RF cert study + ADS practice",dash:"Certification prep"},
      {t:"11:00–11:30",task:"LinkedIn monthly article + push xApp project to GitHub",dash:"Career Center → LinkedIn"},
    ],
    certs:["PASS: Keysight RF & Microwave Industry-Ready 📡"],
    project:"Complete: Project 5 — O-RAN Security xApp ✓",
    linkedin:"ARTICLE: 'Month 3 — Built an AI-powered O-RAN xApp for anomaly detection'",
    tickOff:["Project Portfolio: P5 complete ✓","5G Path S8: fundamentals + NWDAF + use cases","Keysight RF cert ✓"] },

  { wk:13, phase:"Advanced", color:"#10B981", focus:"Network Security + 5G Security + PHY/MAC AI",
    daily:[
      {t:"6:00–7:30",task:"Security: encryption, TLS, firewalls, VPN, IDS/IPS fundamentals",dash:"Tech Skills → Security → Fundamentals"},
      {t:"7:30–8:30",task:"Security: 5G-AKA, SUPI/SUCI, NAS/RAN security, core security",dash:"Tech Skills → Security → 5G Security"},
      {t:"8:30–9:30",task:"5G Pathway S8: PHY layer AI (channel estimation, beam mgmt, CSI)",dash:"5G Path → S8: PHY/MAC Intelligence"},
      {t:"9:30–10:15",task:"5G Pathway S8: RL, federated learning, GenAI, 3GPP Rel-18 AI/ML",dash:"5G Path → S8: Advanced + 6G"},
      {t:"10:15–11:00",task:"Start Project 6: Network Slicing Orchestrator (Open5GS + FastAPI + K8s)",dash:"Project Portfolio → P6"},
      {t:"11:00–11:30",task:"Career: connect with 5G security professionals + apply to 3 jobs",dash:"Career Center"},
    ],
    certs:["Start: CompTIA Security+ study"],
    project:"Start: Project 6 — Network Slicing Orchestrator",
    linkedin:"Post: '3 things about 5G security that surprised me — and why physical layer security matters'",
    tickOff:["Tech Skills: Security fundamentals + 5G security","5G Path S8: ALL complete ✓"] },

  { wk:14, phase:"Advanced", color:"#10B981", focus:"Security deep + DevOps for Telecom start",
    daily:[
      {t:"6:00–7:30",task:"Security: container security (Trivy, Falco), secrets mgmt (Vault), Zero Trust",dash:"Tech Skills → Security → Operations"},
      {t:"7:30–8:30",task:"Security: your PLA research connection — CSI auth, jamming, spoofing",dash:"Tech Skills → Security → PLA"},
      {t:"8:30–9:30",task:"Complete Project 6: K8s deployment, React dashboard, slice isolation proof",dash:"Project Portfolio → P6 complete"},
      {t:"9:30–10:15",task:"5G Pathway S9: DevOps fundamentals, CALMS, Agile, CI/CD for telecom",dash:"5G Path → S9: DevOps Telecom"},
      {t:"10:15–11:00",task:"Security+ exam practice questions",dash:"Certification prep"},
      {t:"11:00–11:30",task:"Career: apply to 5 security/DevOps roles + LinkedIn post",dash:"Career Center"},
    ],
    certs:["PASS: CompTIA Security+ (SY0-701) 🔒"],
    project:"Complete: Project 6 — Network Slicing Orchestrator ✓",
    linkedin:"Post: 'How network slicing enables 3 completely different services on one 5G network'",
    tickOff:["Tech Skills: Security ALL complete ✓","Project Portfolio: P6 complete ✓","Security+ certification ✓","5G Path S9: DevOps fundamentals"] },

  { wk:15, phase:"Advanced", color:"#EC4899", focus:"DevOps integration + THz project",
    daily:[
      {t:"6:00–7:30",task:"5G Pathway S9: Docker+K8s for 5GC, Helm, IaC, GitOps, Prometheus+Grafana",dash:"5G Path → S9: Containers + Monitoring"},
      {t:"7:30–8:30",task:"5G Pathway S9: DevSecOps, network automation (YANG, NETCONF, Nornir)",dash:"5G Path → S9: Security + Automation"},
      {t:"8:30–9:30",task:"Start Project 7: THz Channel Estimation with Deep Learning",dash:"Project Portfolio → P7"},
      {t:"9:30–10:15",task:"Project 7: CNN + transformer architectures, train on simulated + VNA data",dash:"Project Portfolio → P7"},
      {t:"10:15–11:00",task:"DevOps: build full pipeline — code → Jenkins → Terraform → K8s → Grafana",dash:"Tech Skills → DevOps → Integration"},
      {t:"11:00–11:30",task:"Career: connect with 5 defense/research companies + LinkedIn",dash:"Career Center"},
    ],
    certs:["Start: TensorFlow Developer cert study"],
    project:"Start: Project 7 — THz Channel Estimation with DL",
    linkedin:"Post: 'DevOps for telecom: why CI/CD + K8s + GitOps is the future of 5G deployment'",
    tickOff:["5G Path S9: ALL complete ✓","Tech Skills: DevOps integration topics","Project Portfolio: P7 steps 1-5"] },

  { wk:16, phase:"Advanced", color:"#EC4899", focus:"DevOps mastery + THz + RF coverage projects",
    daily:[
      {t:"6:00–7:30",task:"Complete Project 7: validate with real VNA data, NMSE plots, publish",dash:"Project Portfolio → P7 complete"},
      {t:"7:30–8:30",task:"Start Project 8: AI-Powered RF Coverage Predictor (ML + GIS)",dash:"Project Portfolio → P8"},
      {t:"8:30–9:30",task:"DevOps: NFV lifecycle, SDN, 5G Core DevOps, network slicing automation",dash:"5G Path → S9: NFV + Capstone"},
      {t:"9:30–10:15",task:"Tech Skills DevOps: SRE, DORA metrics, blameless postmortems, chaos eng",dash:"Tech Skills → DevOps → Principles"},
      {t:"10:15–11:00",task:"TensorFlow Developer cert study + practice",dash:"Certification prep"},
      {t:"11:00–11:30",task:"LinkedIn monthly article + GitHub cleanup",dash:"Career Center → LinkedIn"},
    ],
    certs:["PASS: TensorFlow Developer Certificate 🤖"],
    project:"Complete: P7 (THz) ✓ | Start: P8 (RF Coverage)",
    linkedin:"ARTICLE: 'Month 4 — Security certified, O-RAN xApp built, THz + ML research bridged'",
    tickOff:["Tech Skills: DevOps ALL complete ✓","Project Portfolio: P7 complete ✓","TensorFlow cert ✓"] },

  // ── PHASE 4: EXPERT (Weeks 17–20) ──
  { wk:17, phase:"Expert", color:"#F59E0B", focus:"RF Coverage + LNA portfolio + 5G Real Systems",
    daily:[
      {t:"6:00–7:30",task:"Complete Project 8: RF coverage predictor — XGBoost, Folium maps, web UI",dash:"Project Portfolio → P8 complete"},
      {t:"7:30–8:30",task:"Project 9: LNA Design Portfolio — optimize in ADS, Monte Carlo, portfolio page",dash:"Project Portfolio → P9 (LNA)"},
      {t:"8:30–9:30",task:"5G Pathway S5: free5GC + Open5GS lab, srsRAN + OAI deployment",dash:"5G Path → S5: Build Real Systems"},
      {t:"9:30–10:15",task:"5G Pathway S5: FlexRIC xApp development, KPM monitor xApp",dash:"5G Path → S5: xApp Dev"},
      {t:"10:15–11:00",task:"Start: IEEE WCET certification study",dash:"Certification prep"},
      {t:"11:00–11:30",task:"Career: apply to 5 RF/research roles + networking",dash:"Career Center"},
    ],
    certs:["Start: IEEE WCET study (the gold standard)"],
    project:"Complete: P8 (RF Coverage) ✓ | Complete: P9 (LNA) ✓",
    linkedin:"Post: 'Predicting 5G coverage with machine learning — here's how I built it'",
    tickOff:["Project Portfolio: P8 + P9 complete ✓","5G Path S5: Open5GS + srsRAN + xApp dev"] },

  { wk:18, phase:"Expert", color:"#F59E0B", focus:"5G Real Systems + PyVISA + Digital Twin start",
    daily:[
      {t:"6:00–7:30",task:"Project 10: Automated RF Test Suite (PyVISA) — VNA automation + reports",dash:"Project Portfolio → P10 (PyVISA)"},
      {t:"7:30–8:30",task:"5G Pathway S5: Drive test, KPI analysis, private 5G (CBRS), 6G research",dash:"5G Path → S5: Testing + Private 5G"},
      {t:"8:30–9:30",task:"Start Project 11: 5G Digital Twin — data pipeline + InfluxDB + LSTM model",dash:"Project Portfolio → P11 (Digital Twin)"},
      {t:"9:30–10:15",task:"5G Pathway S4: NWDAF analytics, AI for beamforming + SON",dash:"5G Path → S4: remaining AI/ML topics"},
      {t:"10:15–11:00",task:"IEEE WCET study: RF, propagation, antennas, access technologies",dash:"Certification prep"},
      {t:"11:00–11:30",task:"LinkedIn + career activities",dash:"Career Center"},
    ],
    certs:["PASS: 5G NR Fundamentals (Qualcomm Academy) 📶"],
    project:"Complete: P10 (PyVISA) ✓ | Progress: P11 (Digital Twin)",
    linkedin:"Post: 'Automated my lab's VNA measurements with Python — here's the framework'",
    tickOff:["Project Portfolio: P10 complete ✓","5G Path S5: ALL complete ✓","5G Path S4: ALL complete ✓","5G NR cert ✓"] },

  { wk:19, phase:"Expert", color:"#F59E0B", focus:"Digital Twin + O-RAN Testbed + open source",
    daily:[
      {t:"6:00–7:30",task:"Complete Project 11: React + Three.js dashboard, AWS deployment",dash:"Project Portfolio → P11 complete"},
      {t:"7:30–8:30",task:"Start Project 12: Full O-RAN Testbed — RIC + gNB + Core + multi xApp",dash:"Project Portfolio → P12 (O-RAN Testbed)"},
      {t:"8:30–9:30",task:"Project 12: deploy on K8s, Grafana + Prometheus monitoring",dash:"Project Portfolio → P12"},
      {t:"9:30–10:15",task:"Start: Open-source contribution — fork srsRAN, study codebase",dash:"Project Portfolio → P13 (Open Source)"},
      {t:"10:15–11:00",task:"IEEE WCET exam preparation + practice",dash:"Certification prep"},
      {t:"11:00–11:30",task:"Career: connect with srsRAN community + apply to research roles",dash:"Career Center"},
    ],
    certs:["Target: IEEE WCET exam week 20"],
    project:"Complete: P11 ✓ | Progress: P12 (O-RAN Testbed) + P13 (Open Source)",
    linkedin:"Post: 'Building a 5G digital twin with real-time KPI streaming and predictive analytics'",
    tickOff:["Project Portfolio: P11 complete ✓","Project Portfolio: P12 steps 1-6"] },

  { wk:20, phase:"Expert", color:"#F59E0B", focus:"O-RAN Testbed complete + IEEE WCET",
    daily:[
      {t:"6:00–7:30",task:"Complete Project 12: 5-min demo video, full documentation, K8s manifests",dash:"Project Portfolio → P12 complete"},
      {t:"7:30–8:30",task:"Open source: submit first PR to srsRAN (doc fix or test case)",dash:"Project Portfolio → P13"},
      {t:"8:30–9:30",task:"Career Hub website: add all new projects and certifications",dash:"Career Center → Portfolio"},
      {t:"9:30–10:15",task:"IEEE WCET final review + exam",dash:"Certification"},
      {t:"10:15–11:00",task:"Tech project: build CI/CD pipeline tying Terraform+Ansible+K8s+Grafana",dash:"Tech Skills → Integration project"},
      {t:"11:00–11:30",task:"LinkedIn monthly article",dash:"Career Center → LinkedIn"},
    ],
    certs:["PASS: IEEE WCET ⭐ (THE gold standard for wireless engineers)"],
    project:"Complete: P12 (O-RAN Testbed) ✓",
    linkedin:"ARTICLE: 'Month 5 — O-RAN testbed built, IEEE WCET certified, 10 projects complete'",
    tickOff:["Project Portfolio: P12 complete ✓","IEEE WCET certification ✓"] },

  // ── PHASE 5: MASTERY (Weeks 21–24) ──
  { wk:21, phase:"Mastery", color:"#E8553D", focus:"Open source contributions + CBRS + remaining certs",
    daily:[
      {t:"6:00–7:30",task:"Open source: submit 2nd PR to srsRAN (feature or bug fix)",dash:"Project Portfolio → P13"},
      {t:"7:30–8:30",task:"CBRS CPI certification study — private 5G deployment",dash:"Certification prep"},
      {t:"8:30–9:30",task:"Review: revisit any incomplete items across all 5 dashboards",dash:"All dashboards"},
      {t:"9:30–10:15",task:"Industry Intel: research top 10 target companies, tailor resume for each",dash:"Top 100 → Target companies"},
      {t:"10:15–11:00",task:"Career: apply to 10 jobs with tailored resumes",dash:"Career Center → Jobs"},
      {t:"11:00–11:30",task:"LinkedIn: connect with hiring managers at target companies",dash:"Career Center → Network"},
    ],
    certs:["PASS: CBRS CPI Certification 📡","Start: FCC GROL study"],
    project:"Progress: P13 — Open Source (2+ PRs submitted)",
    linkedin:"Post: 'My first merged PR on srsRAN — contributing to open-source 5G'",
    tickOff:["CBRS CPI ✓","Project Portfolio: P13 progress","Top 100: research top targets"] },

  { wk:22, phase:"Mastery", color:"#E8553D", focus:"Remaining certs + portfolio polish + interviews",
    daily:[
      {t:"6:00–7:30",task:"FCC GROL study + remaining certification prep (choose: AWS SAA or CKAD)",dash:"Certification prep"},
      {t:"7:30–8:30",task:"Open source: submit 3rd PR, engage in code reviews",dash:"Project Portfolio → P13"},
      {t:"8:30–9:30",task:"Interview prep: system design practice (distributed 5G system)",dash:"Career Center → Interview"},
      {t:"9:30–10:15",task:"Interview prep: behavioral STAR stories (8 prepared scenarios)",dash:"Career Center → Interview"},
      {t:"10:15–11:00",task:"GitHub cleanup: all repos have READMEs, screenshots, pinned top 6",dash:"Portfolio"},
      {t:"11:00–11:30",task:"Career: apply to 10 more jobs + follow up on applications",dash:"Career Center → Jobs"},
    ],
    certs:["PASS: FCC GROL License 📻"],
    project:"Complete: P13 — Open Source Contributions (3+ merged PRs) ✓",
    linkedin:"Post: 'How to get started contributing to open-source 5G projects (srsRAN guide)'",
    tickOff:["FCC GROL ✓","Project Portfolio: P13 complete ✓","All GitHub repos polished"] },

  { wk:23, phase:"Mastery", color:"#E8553D", focus:"Mock interviews + final applications",
    daily:[
      {t:"6:00–7:30",task:"Mock interview: LeetCode medium (45 min) + system design (30 min)",dash:"Career Center → Interview"},
      {t:"7:30–8:30",task:"Mock interview: behavioral questions + technical deep-dive practice",dash:"Career Center → Interview"},
      {t:"8:30–9:30",task:"Update master CV + create tailored versions for top 5 target companies",dash:"Career Center → Resume"},
      {t:"9:30–10:15",task:"Career hub website: update with ALL certifications and projects",dash:"Portfolio website"},
      {t:"10:15–11:00",task:"Apply to 10 target jobs with tailored resumes + cover letters",dash:"Career Center → Jobs"},
      {t:"11:00–11:30",task:"LinkedIn: connect with 10 more engineers at target companies",dash:"Career Center → Network"},
    ],
    certs:["Optional: AWS SAA or Deep Learning Specialization completion"],
    project:null,
    linkedin:"Post: 'Preparing for wireless engineering interviews — here's my study framework'",
    tickOff:["Career Center: 30+ applications sent","Career Center: 50+ connections made"] },

  { wk:24, phase:"Mastery", color:"#E8553D", focus:"Launch — you are ready",
    daily:[
      {t:"6:00–7:30",task:"Final review: go through ALL dashboard checklists, tick remaining items",dash:"All 5 dashboards"},
      {t:"7:30–8:30",task:"Polish personal website + update LinkedIn Featured section with all projects",dash:"Portfolio + LinkedIn"},
      {t:"8:30–9:30",task:"Send follow-up emails to all companies applied to",dash:"Career Center → Jobs"},
      {t:"9:30–10:15",task:"Reach out to 10 more recruiters with personalized messages",dash:"Career Center → Network"},
      {t:"10:15–11:00",task:"Record 2-min video resume highlighting top 3 projects",dash:"Portfolio"},
      {t:"11:00–11:30",task:"Publish final LinkedIn article + celebrate your transformation",dash:"LinkedIn"},
    ],
    certs:null,
    project:null,
    linkedin:"ARTICLE: '6 months, 10 skills, 13 projects, 8 certifications — my complete transformation'",
    tickOff:["ALL dashboards: 100% complete 🎉","Career Center: 50+ applications","LinkedIn: 6 articles published","All certifications earned"] },
];

const phaseColors = {Foundation:"#3B82F6",Core:"#FF9900",Advanced:"#10B981",Expert:"#F59E0B",Mastery:"#E8553D"};
const catColors = {Tech:"#3B82F6","5G":"#10B981",Certification:"#F59E0B",Career:"#8B5CF6",LinkedIn:"#2563EB",Portfolio:"#EC4899",Review:"#64748B"};
function getCatColor(dash){if(dash.includes("Tech"))return catColors.Tech;if(dash.includes("5G"))return catColors["5G"];if(dash.includes("Cert"))return catColors.Certification;if(dash.includes("Career"))return catColors.Career;if(dash.includes("LinkedIn"))return catColors.LinkedIn;if(dash.includes("Portfolio")||dash.includes("Project"))return catColors.Portfolio;return catColors.Review;}

export default function MasterPlan(){
  const[selWeek,setSelWeek]=useState(0);
  const[progress,setProgress]=useState({});
  const[loading,setLoading]=useState(true);
  const[view,setView]=useState("schedule");

  useEffect(()=>{(async()=>{try{const r=await window.storage.get("master-plan-progress");if(r)setProgress(JSON.parse(r.value));}catch(e){}setLoading(false);})();},[]);
  const toggle=async(key)=>{const np={...progress,[key]:!progress[key]};setProgress(np);try{await window.storage.set("master-plan-progress",JSON.stringify(np));}catch(e){}};

  const w=plan[selWeek];
  const weekDone=w.tickOff.filter((_,i)=>progress[`w${w.wk}-${i}`]).length;
  const weekPct=Math.round((weekDone/w.tickOff.length)*100);
  const totalTicks=plan.reduce((a,p)=>a+p.tickOff.length,0);
  const totalDone=plan.reduce((a,p)=>a+p.tickOff.filter((_,i)=>progress[`w${p.wk}-${i}`]).length,0);
  const overallPct=Math.round((totalDone/totalTicks)*100);
  const certsEarned=plan.filter(p=>p.certs&&p.certs.some(c=>c.includes("PASS"))).reduce((a,p)=>a+p.certs.filter(c=>c.includes("PASS")).length,0);

  const S={card:{background:"linear-gradient(150deg,#0C1020,#111828)",border:"1px solid #19223A",borderRadius:14}};

  if(loading) return (<div style={{fontFamily:"'DM Sans',sans-serif",background:"#06080F",color:"#CBD5E1",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>Loading master plan...</div>);

  return(
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif",background:"#06080F",color:"#CBD5E1",minHeight:"100vh"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#19223A;border-radius:4px}@keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}.up{animation:up .4s ease forwards}.d1{animation-delay:.05s;opacity:0}.d2{animation-delay:.1s;opacity:0}button{cursor:pointer;border:none;outline:none;font-family:inherit}a{text-decoration:none}.ck{width:20px;height:20px;border-radius:5px;border:2px solid #19223A;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;flex-shrink:0;transition:all .2s}.ck.on{background:#10B981;border-color:#10B981}.bar{height:5px;border-radius:3px;background:#0C1020;overflow:hidden}.bf{height:100%;border-radius:3px;transition:width .8s ease}.tag{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:.5px;white-space:nowrap}`}</style>

      <header style={{background:"linear-gradient(180deg,#0A0E1A,#06080F)",borderBottom:"1px solid #111828",padding:"18px 16px 10px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:880,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:11}}>
              <div style={{width:36,height:36,borderRadius:9,background:"linear-gradient(135deg,#E8553D,#3B82F6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,fontFamily:"Syne",color:"#fff"}}>24</div>
              <div><h1 style={{fontSize:15,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9"}}>Master Plan</h1>
              <p style={{fontSize:9,color:"#334155",fontFamily:"Space Mono",letterSpacing:1}}>24 WEEKS · ALL DASHBOARDS · ALL SKILLS · ALL CERTS</p></div>
            </div>
            <div style={{textAlign:"right"}}><div style={{fontSize:18,fontWeight:800,fontFamily:"Syne",color:overallPct>=50?"#10B981":"#3B82F6"}}>{overallPct}%</div><div style={{fontSize:8,color:"#334155"}}>{totalDone}/{totalTicks} done</div></div>
          </div>
          <div style={{display:"flex",gap:4}}>
            {["schedule","certs","progress"].map(v=>(<button key={v} onClick={()=>setView(v)} style={{padding:"6px 12px",borderRadius:7,fontSize:11,fontWeight:600,background:view===v?"#2563EB18":"transparent",color:view===v?"#60A5FA":"#334155",border:view===v?"1px solid #253060":"1px solid transparent",textTransform:"capitalize"}}>{v}</button>))}
          </div>
        </div>
      </header>

      <main style={{maxWidth:880,margin:"0 auto",padding:16}}>

        {/* Stats */}
        <div className="up" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:14}}>
          {[{l:"Week",v:`${selWeek+1}/24`,c:w.color},{l:"Phase",v:w.phase,c:phaseColors[w.phase]},{l:"Certs Earned",v:certsEarned,c:"#F59E0B"},{l:"Overall",v:`${overallPct}%`,c:overallPct>=50?"#10B981":"#3B82F6"}].map((s,i)=>(
            <div key={i} style={{...S.card,padding:"12px 8px",textAlign:"center"}}><div style={{fontSize:18,fontWeight:800,fontFamily:"Syne",color:s.c}}>{s.v}</div><div style={{fontSize:9,color:"#334155",marginTop:2}}>{s.l}</div></div>
          ))}
        </div>

        {/* Week selector */}
        <div className="up d1" style={{display:"flex",gap:3,marginBottom:14,overflowX:"auto",flexWrap:"wrap"}}>
          {plan.map((p,i)=>{const d=p.tickOff.filter((_,j)=>progress[`w${p.wk}-${j}`]).length;const pct=Math.round((d/p.tickOff.length)*100);return(
            <button key={i} onClick={()=>setSelWeek(i)} style={{padding:"5px 8px",borderRadius:6,fontSize:10,fontWeight:600,minWidth:36,background:selWeek===i?p.color+"20":"#0A0E1A",color:selWeek===i?p.color:pct===100?"#10B981":"#334155",border:`1px solid ${selWeek===i?p.color+"40":"#19223A"}`}}>
              {pct===100?"✓":""}{p.wk}
            </button>);})}
        </div>

        {/* ═══ SCHEDULE VIEW ═══ */}
        {view==="schedule"&&(<div className="up d2">
          <div style={{...S.card,padding:18,marginBottom:12,borderLeft:`4px solid ${w.color}`}}>
            <div style={{display:"flex",gap:6,marginBottom:6,flexWrap:"wrap"}}>
              <span className="tag" style={{background:phaseColors[w.phase]+"18",color:phaseColors[w.phase]}}>{w.phase}</span>
              <span className="tag" style={{background:"#19223A",color:"#64748B"}}>Week {w.wk}</span>
            </div>
            <h2 style={{fontSize:18,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9",marginBottom:4}}>{w.focus}</h2>
            {w.project&&<p style={{fontSize:12,color:"#F59E0B",marginBottom:4}}>🔧 {w.project}</p>}
            {w.certs&&w.certs.map((c,i)=><p key={i} style={{fontSize:12,color:c.includes("PASS")?"#10B981":"#64748B",marginBottom:2}}>🏆 {c}</p>)}
            <p style={{fontSize:12,color:"#3B82F6",marginTop:4}}>📝 {w.linkedin}</p>
          </div>

          {/* Daily schedule */}
          <div style={{...S.card,padding:18,marginBottom:12}}>
            <h3 style={{fontSize:13,fontWeight:700,fontFamily:"Syne",color:"#F1F5F9",marginBottom:12}}>Daily schedule (Mon–Sat)</h3>
            {w.daily.map((b,i)=>{const cc=getCatColor(b.dash);return(
              <div key={i} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:i<w.daily.length-1?"1px solid #111828":"none"}}>
                <span style={{fontSize:11,color:"#253060",fontFamily:"Space Mono",minWidth:80,paddingTop:2}}>{b.t}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,color:"#E2E8F0",lineHeight:1.5}}>{b.task}</div>
                  <div style={{fontSize:10,color:cc,marginTop:2}}>{b.dash}</div>
                </div>
              </div>);})}
          </div>

          {/* Tick-off checklist */}
          <div style={{...S.card,padding:18}}>
            <h3 style={{fontSize:13,fontWeight:700,fontFamily:"Syne",color:"#F1F5F9",marginBottom:4}}>Week {w.wk} checklist</h3>
            <p style={{fontSize:11,color:"#475569",marginBottom:12}}>Tick these off in your other dashboards, then check them here</p>
            {w.tickOff.map((item,i)=>{const key=`w${w.wk}-${i}`;const done=progress[key];return(
              <div key={i} style={{display:"flex",gap:8,padding:"7px 0",borderBottom:i<w.tickOff.length-1?"1px solid #111828":"none",opacity:done?.4:1,transition:"opacity .3s"}}>
                <button className={`ck ${done?"on":""}`} onClick={()=>toggle(key)}>{done?"✓":""}</button>
                <span style={{fontSize:12,color:done?"#334155":"#E2E8F0",textDecoration:done?"line-through":"none",lineHeight:1.5}}>{item}</span>
              </div>);})}
            <div className="bar" style={{marginTop:12}}><div className="bf" style={{width:`${weekPct}%`,background:weekPct===100?"#10B981":w.color}}/></div>
            <div style={{fontSize:11,color:"#475569",marginTop:6,textAlign:"center"}}>{weekDone}/{w.tickOff.length} complete · {weekPct}%</div>
          </div>
        </div>)}

        {/* ═══ CERTS VIEW ═══ */}
        {view==="certs"&&(<div className="up d2">
          <h2 style={{fontSize:18,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9",marginBottom:14}}>Certification timeline</h2>
          {plan.filter(p=>p.certs&&p.certs.length>0).map((p,i)=>(<div key={i} style={{...S.card,padding:16,marginBottom:8,borderLeft:`3px solid ${p.color}30`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <span className="tag" style={{background:phaseColors[p.phase]+"18",color:phaseColors[p.phase],marginBottom:4}}>Week {p.wk}</span>
                {p.certs.map((c,ci)=>(<p key={ci} style={{fontSize:13,color:c.includes("PASS")?"#10B981":c.includes("Start")?"#F59E0B":"#94A3B8",marginTop:4,fontWeight:c.includes("PASS")?600:400}}>{c}</p>))}
              </div>
            </div>
          </div>))}
        </div>)}

        {/* ═══ PROGRESS VIEW ═══ */}
        {view==="progress"&&(<div className="up d2">
          <h2 style={{fontSize:18,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9",marginBottom:14}}>All weeks progress</h2>
          {plan.map((p,i)=>{const d=p.tickOff.filter((_,j)=>progress[`w${p.wk}-${j}`]).length;const pct=Math.round((d/p.tickOff.length)*100);return(
            <div key={i} style={{marginBottom:8,cursor:"pointer"}} onClick={()=>{setSelWeek(i);setView("schedule")}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:2}}>
                <span style={{color:"#94A3B8"}}>W{p.wk}: {p.focus}</span>
                <span style={{fontWeight:700,fontFamily:"Syne",color:pct===100?"#10B981":pct>0?p.color:"#253060"}}>{pct}%</span>
              </div>
              <div className="bar"><div className="bf" style={{width:`${pct}%`,background:pct===100?"#10B981":p.color}}/></div>
            </div>);})}
        </div>)}

      </main>
      <footer style={{textAlign:"center",padding:"28px 16px 36px",fontSize:9,fontFamily:"Space Mono",color:"#111828",letterSpacing:1.5}}>MASTER PLAN · 24 WEEKS · ALL DASHBOARDS UNIFIED</footer>
    </div>
  );
}
