import { useState, useEffect } from "react";

const courses = [
  { id:"5g", name:"5G Mastery + Log Analysis", icon:"📶", color:"#E8553D", modules:[
    { title:"5G Fundamentals & Architecture", topics:[
      "Defining 5G: unifying connectivity fabric beyond speed",
      "KPIs: eMBB (8K, AR/VR), URLLC (<1ms), mMTC (IoT)",
      "Evolution: 2G→3G→4G→5G — OFDM, MIMO, slicing improvements",
      "3GPP standardization: Rel-15, 16, 17, 18 + ITU IMT-2020",
      "Reference-Based Architecture: N1, N2, N3, N4, N6 interfaces",
      "Service-Based Architecture (SBA): cloud-native microservices 5GC",
    ], project:{ title:"Production 5G SA Network with Full KPI Monitoring", desc:"Deploy a carrier-grade 5G SA network with real-time KPI dashboards — exactly what NOC engineers monitor 24/7.", steps:[
      "Deploy Open5GS 5GC (AMF, SMF, UPF, NRF, AUSF, UDM, PCF) on Docker Compose with separate networks for N2/N3/N6",
      "Deploy srsRAN gNB with ZMQ + UERANSIM with 10 simulated UEs across 3 different slices",
      "Build Python KPI collector: poll NFs every 5s for registration count, PDU sessions, throughput, errors",
      "Store KPIs in InfluxDB time-series database with proper tagging (per-NF, per-slice, per-UE)",
      "Build Grafana dashboard mirroring a real carrier NOC: network health, per-slice throughput, error rates, UE distribution",
      "Add alerting: Grafana alerts on registration failure rate >5%, UPF throughput drop >30%, NF restart",
      "Simulate failure scenarios: kill UPF → observe KPI impact → document recovery time",
      "Generate 24-hour synthetic traffic pattern (morning peak, lunch dip, evening peak) to make dashboards realistic",
      "Write incident response runbook: 'When alert X fires, check Y, execute Z'",
      "Record 3-min demo video walking through the NOC dashboard during a simulated outage",
    ]}},
    { title:"5G Network Elements & Job Landscape", topics:[
      "gNB: CU (CU-CP, CU-UP) and DU functional split",
      "AMF: registration, connection management, mobility handling",
      "SMF: PDU session establishment, modification, release, IP mgmt",
      "UPF: user data forwarding, traffic steering, QoS enforcement",
      "AUSF + UDM + NRF + PCF + CHF: authentication, data, discovery, policy, charging",
      "Job profiles: RAN Engineer, Core Network Engineer, Slicing Architect, RF Engineer",
      "Key players: Qualcomm, Ericsson, Nokia, Samsung, Keysight, AT&T, Verizon, T-Mobile",
    ], project:{ title:"5G Core Network Load Tester & Capacity Planner", desc:"Build the tool carriers use to stress-test their 5G Core before launch — simulating thousands of UEs hitting the network simultaneously.", steps:[
      "Build Python load generator using UERANSIM CLI: spawn 100→500→1000 UEs in controlled ramp-up",
      "Measure per-NF performance under load: AMF registration latency, SMF session setup time, UPF throughput",
      "Identify bottleneck: which NF fails first? At what UE count? (This is real capacity planning)",
      "Profile CPU/memory consumption of each NF container under increasing load",
      "Build capacity model: 'For X UEs, you need Y CPU cores and Z GB RAM per NF' (this is what carriers pay consultants for)",
      "Test slice isolation under load: flood eMBB slice → verify URLLC slice latency stays <10ms",
      "Generate professional capacity planning report (PDF) with graphs, recommendations, scaling formulas",
      "Compare horizontal scaling (more UPF pods) vs vertical scaling (bigger pods) — measure which works better",
    ]}},
    { title:"NSA & SA Deployment Modes", topics:[
      "NSA Mode: 5G NR anchored by 4G EPC, Options 3/3a/3x",
      "SA Mode: full E2E 5G with 5GC — URLLC, mMTC, slicing enabled",
      "Migration path: NSA → SA, EN-DC vs NR-DC dual connectivity",
    ], project:{ title:"Automated 5G Conformance Test Suite", desc:"Build an automated test framework that validates 5G registration, PDU session, handover, and error handling — like what Keysight and Rohde & Schwarz sell for $100K+.", steps:[
      "Design test cases covering: successful registration, registration reject (all cause codes), PDU session setup/teardown, deregistration",
      "Build pytest framework: each test = configure UE → trigger procedure → capture PCAP → validate messages → pass/fail",
      "Parse PCAP programmatically (pyshark/scapy): extract NAS message types, verify correct sequence",
      "Test edge cases: duplicate registration, session with invalid slice, UE requesting unsupported capability",
      "Add timing assertions: registration must complete in <200ms, PDU session in <150ms",
      "Generate JUnit XML test reports compatible with Jenkins/GitHub Actions CI",
      "Run full test suite in CI/CD: on every code change to 5GC config, auto-run conformance tests",
      "Build test coverage matrix: which 3GPP procedures are tested vs not (like real conformance labs track)",
    ]}},
    { title:"5G Protocol Stack Deep Dive", topics:[
      "NAS: Registration, Authentication, Security, Session Management, Cause Codes (5GMM/5GSM)",
      "RRC: IDLE/INACTIVE/CONNECTED, Setup, Reconfiguration, Measurement, Security",
      "SDAP: QoS Flow Mapping, 5QI, Reflective QoS",
      "PDCP: ROHC, Integrity, Ciphering, Reordering, Duplication",
      "RLC: TM/UM/AM modes, segmentation, ARQ",
      "MAC: Scheduling, BSR, HARQ, RACH, MAC PDU mapping",
    ], project:{ title:"5G Call Failure Root Cause Analyzer", desc:"Build the tool that L3 support engineers use daily — ingest a failed call log, automatically identify WHERE it failed, WHY, and recommend the fix.", steps:[
      "Build Python log parser that reads Wireshark JSON exports or UERANSIM logs",
      "Implement state machine tracking: UE registration state (DEREGISTERED→REGISTERED), RRC state, PDU session state",
      "Detect failure patterns: registration reject → extract cause code → map to human-readable reason + fix",
      "Detect: RRC setup failure → check if it's radio issue (RSRP too low) or network issue (AMF overloaded)",
      "Detect: PDU session failure → check slice availability, SMF config, UPF connectivity",
      "Build decision tree: symptom → possible causes → diagnostic steps → recommended fix",
      "Generate structured incident report: timeline, failure point, root cause, recommended action (PDF)",
      "Test with 10 different failure scenarios, verify correct diagnosis each time",
      "Add ML layer: train classifier on historical failures to predict root cause from log patterns",
    ]}},
    { title:"5G Physical Layer & Channels", topics:[
      "Frame structure: SCS 15kHz×2^μ, slot/mini-slot, numerology μ=0-3",
      "CORESET, BWP, SSB structure",
      "DL: PDSCH, PDCCH, PBCH, PSS/SSS, DMRS, CSI-RS",
      "UL: PUSCH, PUCCH, PRACH, SRS, DMRS",
      "Channel mapping: logical → transport → physical",
    ], project:{ title:"5G RF Coverage Gap Detector from Drive Test Data", desc:"Build the tool RF engineers use to find coverage holes — ingest drive test measurements, map them geographically, identify weak spots, and recommend new site locations.", steps:[
      "Generate realistic drive test data: lat/lon path + RSRP/RSRQ/SINR measurements every 100ms (Python + osmnx for road paths)",
      "Plot measurements on real map (Folium): color-coded by signal quality (green/yellow/red)",
      "Implement coverage classification: good (RSRP>-85), fair (-85 to -100), poor (-100 to -110), no coverage (<-110 dBm)",
      "Detect coverage gaps: clusters of poor/no-coverage points > 50m radius",
      "Calculate gap statistics: total area of poor coverage, percentage of route affected",
      "Recommend new cell sites: for each gap, suggest optimal tower location using centroid + terrain analysis",
      "Build before/after prediction: estimate coverage improvement if recommended site is built",
      "Generate RF engineering report (PDF): maps, gap analysis, site recommendations, estimated improvement",
      "Deploy as a web app: upload drive test CSV → get interactive coverage map + report",
    ]}},
    { title:"5G Testing & Device Certification", topics:[
      "Protocol Conformance, RF Testing, Field Testing, Stationary Testing",
      "GCF / PTCRB certification process",
      "UE logging/flashing tools, 5G simulators",
    ], project:{ title:"Automated 5G Device Regression Test Pipeline", desc:"Build what QA teams at Samsung, Apple, and Qualcomm run every night — an automated pipeline that tests a 5G device against dozens of scenarios and generates a pass/fail report by morning.", steps:[
      "Define 30 test scenarios covering: registration (5 cases), PDU session (5), handover (3), slice selection (4), error handling (5), performance (4), multi-UE (4)",
      "Build test orchestrator (Python): reads test plan YAML → configures network → runs UE → validates → reports",
      "Each test: setup → execute → capture PCAP → parse → assert expected messages → teardown",
      "Parallel execution: run 5 tests simultaneously using Docker containers for each UE instance",
      "Build regression database (SQLite): store every test run with pass/fail, duration, logs",
      "Trend analysis: track which tests started failing after which config change (like real CI bisect)",
      "Nightly pipeline: GitHub Actions cron job runs full suite at 2AM, Slack notification with results by 6AM",
      "Generate test report (HTML): pass/fail matrix, trend graphs, failure details with PCAP links",
    ]}},
    { title:"5G Call Flows + Log Analysis", topics:[
      "NSA flows: Attach, PDU Session, EN-DC Handover",
      "SA flows: Registration, PDU Session, N2 Handover",
      "Modem log analysis: identify messages, decipher states",
    ], project:{ title:"Real-Time 5G Network Health Monitor with Anomaly Detection", desc:"Build the dashboard that carrier NOC teams watch 24/7 — live network KPIs with ML-based anomaly detection that catches problems before customers notice.", steps:[
      "Deploy full 5G network (Open5GS + srsRAN + 10 UEs) with continuous traffic generation",
      "Build real-time KPI pipeline: NF logs → Python parser → Kafka → InfluxDB (streaming, not batch)",
      "Track 15 KPIs: registration success rate, avg registration latency, PDU setup rate, throughput per slice, HARQ retransmission rate, RRC setup success rate, paging success rate, handover success rate, etc.",
      "Train anomaly detection model on 48 hours of 'normal' KPI data (Isolation Forest + autoencoder ensemble)",
      "Deploy model as real-time scorer: every 15 seconds, score all KPIs, flag anomalies with confidence",
      "Build Grafana dashboard: live KPIs + anomaly overlay + alert timeline",
      "Simulate 5 real-world failure scenarios: cell overload, backhaul failure, config error, DDoS, hardware degradation",
      "Measure: mean time to detect (MTTD) for each scenario — target <60 seconds",
      "Compare: ML detection vs threshold-based detection — show ML catches issues 3-5 minutes earlier",
      "Build Slack bot: sends alert with context (which KPIs anomalous, likely cause, suggested action)",
    ]}},
    { title:"Interview Preparation", topics:[
      "Frequently asked 5G NR interview questions for various roles",
      "Strategies for answering technical questions effectively",
    ], project:{ title:"5G Technical Interview Simulator", desc:"Build an AI-powered mock interview tool that asks you 5G questions, evaluates your answers, and gives feedback — then use it yourself and share it.", steps:[
      "Compile 150 interview questions across: protocol stack (40), call flows (30), RAN (25), core (25), troubleshooting (30)",
      "Categorize by role: RAN Engineer, Core Engineer, Test Engineer, DevOps, Research",
      "Build React app: select role → get random question → type answer → get AI evaluation",
      "Integrate Claude/OpenAI API: evaluate answer for accuracy, completeness, and technical depth",
      "Add PCAP-based questions: show a log snippet → 'What went wrong here?' → evaluate diagnosis",
      "Track progress: questions answered, accuracy rate, weak topics identified",
      "Deploy on GitHub Pages — share link on LinkedIn, help other engineers prep",
    ]}},
  ]},
  { id:"oran", name:"O-RAN (Open RAN)", icon:"🔓", color:"#7C3AED", modules:[
    { title:"Introduction to O-RAN", topics:[
      "What is Open RAN? Disaggregated, virtualized, intelligent RAN",
      "Why O-RAN: vendor diversity, cost reduction, innovation acceleration",
      "Traditional RAN vs Open RAN differences",
      "O-RAN Alliance: role, mission, WG1–WG11",
    ], project:{ title:"O-RAN Multi-Vendor Interoperability Test Lab", desc:"Build what Nokia, Ericsson, and carriers test in their interop labs — prove that components from different vendors can work together on O-RAN interfaces.", steps:[
      "Deploy O-RAN SC Near-RT RIC (vendor A) + OAI gNB with E2 agent (vendor B) + Open5GS core (vendor C)",
      "Verify E2 Setup: RIC and gNB successfully negotiate capabilities across vendor boundary",
      "Verify KPM data flow: gNB sends real-time KPIs to RIC despite being from different codebases",
      "Verify A1 policy: inject policy from Non-RT RIC → Near-RT RIC applies it → gNB behavior changes",
      "Document all interface messages with PCAP evidence of successful cross-vendor communication",
      "Create interop test report (like real O-RAN plugfest reports): test case, expected, actual, pass/fail, evidence",
      "Identify and document any interop issues found — this IS what O-RAN integration engineers do",
    ]}},
    { title:"O-RAN Architecture & 7.2x Split", topics:[
      "Functional split concept, 7.2x split details",
      "O-CU-CP, O-CU-UP, O-DU, O-RU responsibilities",
    ], project:{ title:"O-RAN Fronthaul Bandwidth Calculator & Planner", desc:"Build the planning tool that network architects use to dimension fronthaul links — calculate exact bandwidth needs based on radio configuration.", steps:[
      "Implement fronthaul bandwidth formula: BW = N_ant × N_RB × SCS × bits_per_sample × 2 (I/Q) × overhead",
      "Build calculator: input antenna config (2T2R, 4T4R, 32T32R, 64T64R), bandwidth (20/40/100 MHz), SCS, compression ratio",
      "Calculate for multiple scenarios: rural (2T2R, 20MHz) vs urban (32T32R, 100MHz) vs stadium (64T64R, 100MHz)",
      "Output: required fronthaul bandwidth in Gbps, recommended transport (10GbE, 25GbE, eCPRI)",
      "Add latency budget analysis: max one-way delay from O-RU to O-DU for each numerology",
      "Build web interface: select parameters → see bandwidth + latency requirements + recommended hardware",
      "Compare: 7.2x split vs Option 2 split in terms of fronthaul requirements",
      "Generate network planning PDF report with all calculations and recommendations",
    ]}},
    { title:"Near-RT RIC + xApps + Non-RT RIC + rApps", topics:[
      "Near-RT RIC: 10ms–1s control, xApps, E2SM-KPM/RC",
      "Non-RT RIC: >1s control, rApps, A1 policies",
      "SMO: Service Management and Orchestration",
    ], project:{ title:"Intelligent Traffic Steering xApp with Live Feedback Loop", desc:"Build the #1 most-requested O-RAN xApp — it monitors cell load in real-time and automatically steers UEs from congested cells to less loaded neighbors. This is what Nokia and Ericsson are building right now.", steps:[
      "Deploy O-RAN SC RIC + OAI gNB (or FlexRIC) with E2 KPM subscription active",
      "Build xApp (Python): subscribe to per-cell KPIs via E2SM-KPM (PRB utilization, UE count, throughput)",
      "Implement steering logic: if cell_load > 80% AND neighbor_cell_load < 50% → trigger handover for edge UEs",
      "Send control action via E2SM-RC: instruct gNB to handover specific UEs to target cell",
      "Build closed-loop verification: after steering, check if target cell KPIs improve within 30 seconds",
      "Build Grafana dashboard: per-cell load heatmap, steering events timeline, before/after KPI comparison",
      "Simulate: create congestion by flooding one cell with 50 UEs → watch xApp automatically rebalance",
      "Measure improvement: avg cell load variance before steering vs after (target: 40% reduction in variance)",
      "Add conflict resolution: if two xApps send contradicting actions, implement priority-based arbitration",
      "Package as production xApp with onboarding descriptor, health check, and configuration API",
    ]}},
    { title:"O-RAN Interfaces & Protocols", topics:[
      "E2 (RIC↔RAN), A1 (Non-RT→Near-RT RIC), O1 (SMO↔NFs), F1, Open Fronthaul",
      "eCPRI transport, NETCONF/YANG on O1",
    ], project:{ title:"O-RAN Interface Compliance Validator", desc:"Build an automated tool that validates whether an O-RAN component's E2/A1/O1 messages conform to O-RAN Alliance specifications — like what test labs use for certification.", steps:[
      "Parse O-RAN Alliance E2AP ASN.1 specification, build message validator",
      "Capture E2 Setup Request from gNB → validate: correct IEs present, correct format, valid RAN function IDs",
      "Validate E2SM-KPM Indication: correct measurement data format, valid KPI definitions per O-RAN spec",
      "Validate A1 Policy messages: correct JSON schema, valid policy type IDs",
      "Build CLI tool: point at a PCAP file → automatically validate all O-RAN messages → report compliance",
      "Generate compliance report: per-message pass/fail, specific spec violations flagged with clause references",
      "Test against 3 different E2 agent implementations, document compliance differences",
    ]}},
    { title:"Future of O-RAN", topics:[
      "AI/ML in O-RAN evolution",
      "O-RAN in 6G, career opportunities",
    ], project:{ title:"O-RAN Energy Savings xApp", desc:"Build an xApp that reduces base station energy consumption by 20-30% using AI-driven cell sleeping — one of the hottest topics in telecom sustainability.", steps:[
      "Build xApp subscribing to per-cell traffic load KPIs (PRB utilization, UE count) over 24-hour periods",
      "Train traffic prediction model (LSTM): forecast next-hour cell load from historical patterns",
      "Implement cell sleeping logic: if predicted_load < 15% for next 2 hours → recommend cell sleep → offload UEs to neighbors",
      "Implement wake-up trigger: if neighbor load > 70% → wake up sleeping cell",
      "Calculate energy savings: estimate kWh saved per cell-sleep-hour based on typical base station power consumption",
      "Build dashboard: energy savings in real-time, CO2 reduction estimate, sleeping cells map",
      "Simulate 1 week of operation: demonstrate 25% energy reduction with <2% coverage degradation",
      "Generate sustainability report: total energy saved, CO2 equivalent, coverage impact analysis",
    ]}},
  ]},
  { id:"aiml", name:"AI/ML in Telecom", icon:"🧠", color:"#FF6B35", modules:[
    { title:"Module 1: AI/ML Fundamentals for Telecom", topics:[
      "Why AI/ML for 5G and O-RAN: rule-based → AI-driven evolution",
      "Supervised/Unsupervised/Reinforcement Learning overview",
      "Key algorithms, Deep Learning, Training vs Inference",
      "Telecom data types: KPIs, KQIs, counters, events, time-series",
    ], project:{ title:"Telecom Network Capacity Forecaster", desc:"Build what every carrier planning team needs — a tool that predicts when each cell site will run out of capacity, so they can plan upgrades 6 months in advance.", steps:[
      "Generate 1 year of realistic per-cell KPI data: hourly throughput, UE count, PRB utilization with growth trends + seasonality",
      "Feature engineering: time-of-day, day-of-week, holiday flags, weather proxy, event proximity, growth rate",
      "Train models: ARIMA → Prophet → LSTM → Temporal Fusion Transformer, compare all",
      "Predict: for each cell, when will PRB utilization exceed 80%? (capacity exhaustion date)",
      "Classify urgency: cells needing upgrade in <3 months (red), <6 months (yellow), >6 months (green)",
      "Build dashboard: map showing all cells color-coded by urgency + predicted exhaustion timeline",
      "Generate capacity planning report: list of cells needing upgrade, ranked by urgency, estimated cost",
      "Backtest: use first 9 months to predict last 3 months, measure accuracy (target MAPE <15%)",
    ]}},
    { title:"Module 2: NWDAF & O-RAN RIC AI Framework", topics:[
      "NWDAF architecture, service interfaces, standardized analytics",
      "O-RAN AI framework: Non-RT RIC trains, Near-RT RIC infers",
      "rApps vs xApps, E2SM-KPM/RC, AI/ML workflow pipeline",
    ], project:{ title:"Production NWDAF Anomaly Detection Service", desc:"Build a 3GPP-compliant NWDAF analytics service that detects network anomalies in real-time — the exact NF that carriers are deploying right now.", steps:[
      "Build FastAPI service implementing NWDAF Nnwdaf_AnalyticsSubscription interface (simplified but realistic)",
      "Support 3 analytics types: Abnormal Behaviour detection, Network Performance analytics, UE Mobility analytics",
      "Ingest KPI streams via Kafka (simulating real NF event exposure feeds)",
      "Train Isolation Forest ensemble for abnormal behavior: detect unusual registration spikes, throughput drops, signaling storms",
      "Train LSTM for performance prediction: forecast next-hour KPIs, flag deviations >2 standard deviations",
      "Implement subscriber/notify pattern: consumers subscribe to analytics → NWDAF pushes notifications when anomaly detected",
      "Containerize with Docker, deploy on K8s alongside Open5GS (shows it works as part of real 5GC)",
      "Load test: process 10,000 KPI events/second without dropping below 99.9% detection accuracy",
      "Generate analytics accuracy report: precision, recall, F1, false alarm rate per analytics type",
    ]}},
    { title:"Module 3: AI/ML Use Cases in RAN", topics:[
      "Traffic prediction, mobility/handover optimization",
      "Network slicing with AI, coverage/capacity optimization",
      "Anomaly detection, self-healing, energy efficiency",
    ], project:{ title:"Self-Healing RAN with Automated Root Cause Analysis", desc:"Build what SON (Self-Organizing Networks) engineers deliver — a system that detects cell outages, diagnoses the root cause using ML, and triggers automated recovery.", steps:[
      "Simulate 5 types of RAN failures: cell outage (hardware), interference (external), overload (traffic surge), backhaul failure, config error",
      "Each failure has a distinct KPI signature: e.g., outage = all KPIs drop to zero; interference = SINR drops but RSRP stays; overload = high RACH failure rate",
      "Train multi-class classifier (Random Forest + Neural Net): input = KPI pattern, output = failure type",
      "Build RCA engine: for each failure type, define diagnostic steps and recommended fix",
      "Implement self-healing actions: if outage → alert + check neighbor cell capacity → recommend traffic rerouting",
      "If overload → trigger load balancing (handover to neighbors) → verify load decrease",
      "If config error → compare current config to golden config → identify diff → recommend rollback",
      "Measure: classification accuracy >95%, mean time to diagnosis <30 seconds, false alarm rate <2%",
      "Build incident timeline: detection → diagnosis → action → verification → resolution, with all timestamps",
      "Generate monthly RAN health report: total incidents, MTTD, MTTR, recurring issues, trend analysis",
    ]}},
    { title:"Module 4: PHY & MAC Layer Intelligence", topics:[
      "DL channel estimation, CSI compression, beam management",
      "MIMO precoding, MCS selection, link adaptation with ML",
      "Intelligent scheduling, RB allocation with RL, HARQ optimization",
    ], project:{ title:"ML-Powered Link Adaptation Engine", desc:"Build what Qualcomm and MediaTek implement in their modem chips — an ML model that selects the optimal MCS (Modulation and Coding Scheme) for each UE based on channel conditions, beating traditional CQI-based selection.", steps:[
      "Generate training data: simulate 100K transmission events with varying SNR, speed, multipath, interference → actual BLER for each MCS",
      "Implement classical OLLA (Outer Loop Link Adaptation) as baseline: CQI → MCS table lookup → BLER target 10%",
      "Train ML model: input = [SNR, Doppler, delay spread, RSRP, interference, UE speed] → output = optimal MCS index",
      "Use: classification approach (predict best MCS class) AND regression approach (predict achievable throughput per MCS, pick max)",
      "Compare: ML MCS selection vs OLLA — measure throughput gain and BLER compliance",
      "Target: 8-15% throughput improvement over OLLA while maintaining BLER <10%",
      "Implement online learning: model adapts to changing conditions without full retraining",
      "Build visualization: CQI vs ML-selected MCS vs actual optimal MCS scatter plot",
      "Profile inference latency: must be <1ms for real-time MAC scheduling (quantize model if needed)",
    ]}},
    { title:"Module 5: Advanced — RL, FL, GenAI, 6G", topics:[
      "RL for resource allocation, multi-agent RL in O-RAN",
      "Federated learning across RAN nodes",
      "GenAI for network automation, intent-based networking",
      "6G AI-native networks, digital twins, zero-touch automation",
    ], project:{ title:"Multi-Agent RL for Inter-Cell Interference Coordination", desc:"Build what 6G research labs are working on — multiple AI agents (one per cell) that learn to coordinate spectrum usage to minimize interference without a central controller.", steps:[
      "Model 7-cell hexagonal network with frequency reuse, each cell = independent RL agent",
      "State: own cell KPIs (load, SINR, throughput) + neighbor cell KPIs (shared via X2/Xn)",
      "Action: power adjustment (-3, 0, +3 dB) per sub-band + resource block allocation pattern",
      "Reward: cell throughput − α × interference_caused_to_neighbors (cooperative reward)",
      "Implement Independent DQN: each agent trains its own policy (baseline)",
      "Implement CTDE (Centralized Training, Decentralized Execution): QMIX or MAPPO algorithm",
      "Compare: no coordination (reuse 1) vs static ICIC vs single-agent RL vs multi-agent RL",
      "Measure: 5th-percentile UE throughput (cell-edge users), system throughput, fairness index (Jain's)",
      "Target: 25% improvement in cell-edge throughput over static ICIC",
      "Plot convergence: reward over episodes, agent policy evolution, interference heatmap before/after",
      "Write technical report suitable for IEEE conference submission",
    ]}},
  ]},
  { id:"devops", name:"DevOps for Telecom", icon:"⚙️", color:"#10B981", modules:[
    { title:"Module 1: DevOps & Agile Fundamentals", topics:[
      "DevOps vs Traditional IT, CAMS Model",
      "Agile: Scrum, Kanban, sprints, retrospectives",
      "DevOps in Telecom, DORA Metrics",
    ], project:{ title:"SRE Dashboard with SLO Tracking for 5G Services", desc:"Build what Google SREs use — a dashboard that tracks Service Level Objectives for 5G network services and automatically calculates error budgets.", steps:[
      "Define SLOs for 3 services: Registration (99.9% success, <200ms latency), PDU Session (99.95% success), Data Plane (99.99% uptime, >100Mbps throughput)",
      "Build SLI collectors: Python scripts measuring each SLI from Open5GS metrics",
      "Calculate error budgets: remaining budget = total_budget − consumed_budget over rolling 30 days",
      "Build Grafana dashboard: SLO compliance gauges, error budget burn-down charts, SLI trends",
      "Implement burn-rate alerting: if burning budget 10x faster than sustainable → page on-call",
      "Track DORA metrics: deployment frequency, lead time, MTTR, change failure rate for your NF deployments",
      "Generate weekly SLO report (PDF): compliance status, burn rate, incidents, recommendations",
      "Implement error budget policy: if budget exhausted → freeze deployments until reliability improves",
    ]}},
    { title:"Module 2: CI/CD Pipelines & Automation", topics:[
      "CI/CD stages, Jenkins, GitLab CI, GitHub Actions",
      "Artifact management, testing in pipelines",
    ], project:{ title:"Production CI/CD Pipeline with Canary Deployment for 5G NFs", desc:"Build what carriers use for zero-downtime upgrades — a pipeline that deploys new NF versions to 5% of traffic first, validates KPIs, then rolls out to 100% (or auto-rolls back).", steps:[
      "Build GitHub Actions pipeline: lint → unit test → integration test → build Docker → push to registry",
      "Deploy to staging K8s cluster → run full conformance test suite → only proceed if all pass",
      "Implement canary deployment: deploy new version alongside old, route 5% of traffic to canary",
      "Build canary validator (Python): compare canary KPIs vs baseline for 10 minutes — registration success rate, latency, errors",
      "If canary healthy (error rate <0.1%, latency within 2σ of baseline): auto-promote to 25% → 50% → 100%",
      "If canary unhealthy: auto-rollback to previous version within 60 seconds, send incident alert",
      "Build deployment dashboard: version distribution pie chart, canary health status, promotion timeline",
      "Measure: zero-downtime deployments, <60s rollback time, <1% error budget consumed per deployment",
      "Document: runbook for manual intervention, escalation procedures, post-deployment validation checklist",
    ]}},
    { title:"Module 3: Infrastructure as Code", topics:[
      "Terraform, Ansible, IaC in Telecom",
      "State management, testing IaC",
    ], project:{ title:"One-Command 5G Network Provisioner", desc:"Build what cloud teams dream of — type one command and get a full 5G network running on AWS in 15 minutes, with monitoring, security, and documentation auto-generated.", steps:[
      "Terraform: provision VPC (3 subnets: mgmt/signaling/data) + EKS cluster + RDS + S3 + IAM roles + security groups",
      "Terraform modules: reusable 'telecom-vpc', 'telecom-eks', 'telecom-monitoring' modules",
      "Ansible: configure K8s cluster (install Multus, Prometheus, Grafana, cert-manager)",
      "Ansible: deploy Open5GS via Helm chart with parameterized config (PLMN, slices, subscriber data)",
      "Ansible: deploy UERANSIM + run smoke test (register UE, establish PDU, ping internet)",
      "Single Makefile: 'make deploy-5g PLMN=001/01 SLICES=3' → provisions everything end-to-end",
      "'make test' → runs conformance suite, 'make monitor' → opens Grafana, 'make destroy' → tears down everything",
      "Estimated AWS cost calculator: output cost per hour/day/month based on instance types selected",
      "CI/CD integration: 'make deploy-5g' runs in GitHub Actions for automated test environments",
    ]}},
    { title:"Module 4: Docker & Kubernetes for Telecom", topics:[
      "Docker, K8s architecture, workloads, networking, storage, Helm",
    ], project:{ title:"Kubernetes Operator for 5G Network Slices", desc:"Build a K8s Operator that manages 5G network slices as custom resources — 'kubectl apply -f embb-slice.yaml' creates an entire slice with dedicated UPF, QoS, and monitoring. This is cutting-edge.", steps:[
      "Define Custom Resource Definition (CRD): NetworkSlice with spec: sst, sd, max_ues, qos_profile, dedicated_upf",
      "Build K8s Operator (Python with kopf framework): watches for NetworkSlice resources",
      "On create: deploy dedicated UPF pod, configure Open5GS slice parameters, set up QoS policies, create Grafana dashboard",
      "On update: modify slice parameters (e.g., change max_ues), update UPF config, scale if needed",
      "On delete: gracefully drain UEs from slice, remove UPF, clean up configs and monitoring",
      "Implement status reporting: Operator updates NetworkSlice status with: active_ues, throughput, health",
      "Test: 'kubectl apply -f urllc-slice.yaml' → watch Operator create entire slice infrastructure in <30s",
      "Add admission webhook: reject slices that would exceed cluster capacity or conflict with existing slices",
      "This is a REAL product that companies like Amdocs and Ericsson sell for millions — you're building a demo version",
    ]}},
    { title:"Module 5: Cloud Platforms for Telecom", topics:[
      "OpenStack NFVi, public cloud, multi-cloud, MEC, security",
    ], project:{ title:"Hybrid Cloud 5G Deployment: Core on Cloud + RAN on Edge", desc:"Build what Verizon and AT&T actually deploy — 5G Core in centralized cloud, UPF at the edge for low latency, all managed as one system.", steps:[
      "Deploy 5GC control plane (AMF, SMF, NRF) on AWS EKS (centralized cloud)",
      "Deploy UPF on a separate 'edge' cluster (local minikube simulating edge site)",
      "Configure N4 (PFCP) interface between cloud SMF and edge UPF across networks",
      "Deploy UERANSIM at edge → connects to edge UPF for data, cloud AMF for signaling",
      "Measure latency: UE → edge UPF → internet (<10ms) vs UE → cloud UPF → internet (50-80ms)",
      "Build unified monitoring: single Grafana showing both cloud and edge NF health",
      "Implement UPF failover: if edge UPF goes down → traffic fails over to cloud UPF (higher latency but no outage)",
      "Document: architecture diagram, latency comparison, failover test results, cost analysis (edge vs cloud)",
    ]}},
    { title:"Module 6: Monitoring & Observability", topics:[
      "Prometheus, Grafana, log management, distributed tracing, AIOps",
    ], project:{ title:"Full Observability Stack for 5G Network Operations", desc:"Build the monitoring platform that carrier NOC teams rely on — metrics + logs + traces unified in one view, with intelligent alerting and automated incident response.", steps:[
      "Deploy Prometheus: scrape all NF metrics (custom exporters for Open5GS), 15-second resolution",
      "Deploy Loki: aggregate logs from all NF containers, structured parsing for NAS/NGAP messages",
      "Deploy Jaeger: distributed tracing for NF-to-NF calls (trace a registration from AMF→AUSF→UDM→back)",
      "Build Grafana dashboard tying all three together: click on a metric anomaly → see correlated logs → jump to trace",
      "Configure 20 alert rules covering: NF health, KPI thresholds, SLO violations, capacity warnings",
      "Build PagerDuty/Slack integration: critical alerts page on-call, warnings go to Slack channel",
      "Implement automated remediation: if UPF memory >90% → auto-restart UPF pod → verify recovery → close alert",
      "Build operational runbook (Markdown): for each alert, document: severity, likely cause, diagnostic steps, fix",
      "Conduct chaos engineering: randomly kill NF pods → verify alerting fires within 30s → auto-healing works",
    ]}},
    { title:"Module 7: DevSecOps & Security", topics:[
      "SAST/DAST, container security, secrets management, compliance-as-code",
    ], project:{ title:"Secure-by-Default 5G NF Deployment Pipeline", desc:"Build a pipeline where security is not optional — every NF image is scanned, every secret is encrypted, every deployment is policy-compliant. This is what enterprises demand.", steps:[
      "Add Trivy to CI/CD: scan every Docker image, FAIL build on HIGH/CRITICAL CVEs — zero tolerance",
      "Add CodeQL/Bandit SAST: scan Python code for SQL injection, command injection, hardcoded secrets",
      "Deploy HashiCorp Vault on K8s: store all NF secrets (subscriber keys, TLS certs, API tokens)",
      "Modify NF deployments: inject secrets from Vault via sidecar (not K8s Secrets which are base64, not encrypted)",
      "Deploy OPA Gatekeeper: enforce policies — no root containers, resource limits required, only approved registries",
      "Deploy Falco: runtime anomaly detection — alert if NF container makes unexpected syscalls or network connections",
      "Build security dashboard: image scan results, policy violations, runtime alerts, secret rotation status",
      "Run penetration test: try to access NF APIs without auth, escape container, read secrets — document findings and fixes",
    ]}},
    { title:"Module 8: Network Automation", topics:[
      "YANG models, NETCONF/RESTCONF, Ansible for networks, Python/Nornir, GitOps",
    ], project:{ title:"Network-as-Code: GitOps for 5G Network Configuration", desc:"Build what network automation engineers deliver — all network config lives in Git, any change goes through PR review, merging auto-applies config to live network with rollback on failure.", steps:[
      "Store all 5G network configs in Git: Open5GS YAML configs, subscriber data, slice definitions, Helm values",
      "Deploy ArgoCD watching the config repo: any merge to main auto-syncs to live K8s cluster",
      "Build PR validation: GitHub Actions runs config validation + dry-run on staging before merge allowed",
      "Implement config drift detection: every 5 minutes, compare live config vs Git → alert if drift detected",
      "Build Ansible playbooks for non-K8s config: router interfaces, firewall rules, DNS entries",
      "Implement rollback: if ArgoCD sync fails or KPIs degrade within 5 minutes → auto-revert to previous commit",
      "Build change log dashboard: who changed what, when, with link to PR, and resulting KPI impact",
      "Demonstrate: engineer submits PR to add new slice → reviewer approves → auto-deployed → monitored → verified",
    ]}},
    { title:"Module 9: 5G SDN & NFV DevOps", topics:[
      "NFV lifecycle, SDN/OpenDaylight, O-RAN DevOps, slicing automation",
    ], project:{ title:"Zero-Touch 5G Service Provisioning Platform", desc:"Build what ONAP and OSM deliver at scale — a platform where a business user clicks 'Create 5G Private Network' and the system automatically provisions everything end-to-end with zero manual intervention.", steps:[
      "Build web portal (React): business user fills form — company name, coverage area, SLA requirements, number of devices",
      "Backend (FastAPI) translates business intent to technical config: select slice type, calculate resources, generate Helm values",
      "Trigger Terraform: provision cloud resources (VPC, compute, storage) for the private network",
      "Trigger Ansible: configure network (routing, firewall, DNS) for the new deployment",
      "Trigger Helm: deploy 5GC slice + gNB simulator on provisioned infrastructure",
      "Auto-configure monitoring: Prometheus targets, Grafana dashboard, SLO definitions, alerting",
      "Run automated acceptance test: register test UE, verify PDU session, measure throughput against SLA",
      "Send provisioning complete notification with: portal login, Grafana link, SLA report, billing estimate",
      "Implement deprovisioning: click 'Delete' → graceful drain → resource cleanup → final billing report",
      "Measure: time from request to operational private 5G network — target <15 minutes fully automated",
    ]}},
    { title:"Module 10: DevOps Culture & Capstone", topics:[
      "DevOps maturity, team topologies, scaling DevOps, measuring success",
    ], project:{ title:"CAPSTONE: Carrier-Grade 5G Platform with Full DevOps", desc:"Combine EVERYTHING into one system that mirrors a real carrier's infrastructure. This single project demonstrates you can build and operate a production 5G network.", steps:[
      "Git repo with: Terraform (infra), Ansible (config), Helm (5GC), application code, monitoring configs, security policies — all version-controlled",
      "CI/CD: push to main → GitHub Actions lint+test → Terraform provision → Ansible config → Helm deploy → conformance test → canary validate",
      "Multi-environment: dev (minikube), staging (kind cluster), prod (EKS) — same pipeline, different targets",
      "Full observability: Prometheus + Loki + Jaeger + Grafana with 5G-specific dashboards and 20+ alert rules",
      "Security: Trivy + Vault + OPA + Falco — every layer secured, auditable, compliant",
      "Network automation: ArgoCD GitOps for K8s, drift detection, automatic rollback",
      "Self-healing: NF crash → auto-restart → alert → verify recovery → close incident — all automated",
      "Load tested: handle 1000 simultaneous UEs with <200ms registration latency",
      "Chaos tested: randomly kill NFs, disconnect networks — system recovers automatically every time",
      "Full documentation: architecture diagrams, runbooks, deployment guide, cost analysis, SLO report",
      "5-minute demo video: walk through the entire system — deploy, monitor, break, heal, scale",
      "This IS your portfolio centerpiece. This IS what gets you hired.",
    ]}},
  ]},
];

// ─── COMPONENT (same UI, just cleaner project display) ──────────────────
export default function CGNGAcademy(){
  const[selCourse,setSelCourse]=useState(0);
  const[selModule,setSelModule]=useState(0);
  const[view,setView]=useState("learn");
  const[progress,setProgress]=useState({});
  const[loading,setLoading]=useState(true);

  useEffect(()=>{(async()=>{try{const r=await window.storage.get("cgng-progress");if(r)setProgress(JSON.parse(r.value));}catch(e){}setLoading(false);})();},[]);
  const toggle=async(key)=>{const np={...progress,[key]:!progress[key]};setProgress(np);try{await window.storage.set("cgng-progress",JSON.stringify(np));}catch(e){}};

  const c=courses[selCourse];
  const m=c.modules[selModule];
  const getModPct=(cid,mi,mod)=>{const t=mod.topics.length+mod.project.steps.length;const d=mod.topics.filter((_,ti)=>progress[`${cid}-${mi}-t-${ti}`]).length+mod.project.steps.filter((_,si)=>progress[`${cid}-${mi}-p-${si}`]).length;return t?Math.round((d/t)*100):0;};
  const getCoursePct=(course)=>{let t=0,d=0;course.modules.forEach((mod,mi)=>{t+=mod.topics.length+mod.project.steps.length;d+=mod.topics.filter((_,ti)=>progress[`${course.id}-${mi}-t-${ti}`]).length+mod.project.steps.filter((_,si)=>progress[`${course.id}-${mi}-p-${si}`]).length;});return t?Math.round((d/t)*100):0;};

  const S={card:{background:"linear-gradient(150deg,#0C1020,#111828)",border:"1px solid #19223A",borderRadius:14}};

  if(loading) return (<div style={{fontFamily:"'DM Sans',sans-serif",background:"#06080F",color:"#CBD5E1",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>Loading...</div>);

  return(
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif",background:"#06080F",color:"#CBD5E1",minHeight:"100vh"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#19223A;border-radius:4px}@keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}.up{animation:up .4s ease forwards}.d1{animation-delay:.05s;opacity:0}.d2{animation-delay:.1s;opacity:0}button{cursor:pointer;border:none;outline:none;font-family:inherit}.ck{width:20px;height:20px;border-radius:5px;border:2px solid #19223A;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;flex-shrink:0;transition:all .2s}.ck.on{background:#10B981;border-color:#10B981}.bar{height:5px;border-radius:3px;background:#0C1020;overflow:hidden}.bf{height:100%;border-radius:3px;transition:width .8s ease}.tag{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:.5px;white-space:nowrap}`}</style>

      <header style={{background:"linear-gradient(180deg,#0A0E1A,#06080F)",borderBottom:"1px solid #111828",padding:"18px 16px 10px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:880,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:12}}>
            <div style={{width:36,height:36,borderRadius:9,background:"linear-gradient(135deg,#E8553D,#7C3AED)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,fontFamily:"Syne",color:"#fff"}}>5G</div>
            <div><h1 style={{fontSize:15,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9"}}>CGNG Telecom Academy</h1>
            <p style={{fontSize:9,color:"#334155",fontFamily:"Space Mono",letterSpacing:1}}>4 COURSES · 28 INDUSTRY PROJECTS · DECODE 4G · 5G · AI</p></div>
          </div>
          <div style={{display:"flex",gap:3,overflowX:"auto"}}>
            {courses.map((co,i)=>{const pct=getCoursePct(co);return(
              <button key={i} onClick={()=>{setSelCourse(i);setSelModule(0)}} style={{padding:"6px 10px",borderRadius:7,fontSize:10,fontWeight:600,display:"flex",alignItems:"center",gap:4,whiteSpace:"nowrap",background:selCourse===i?co.color+"18":"transparent",color:selCourse===i?co.color:"#334155",border:`1px solid ${selCourse===i?co.color+"40":"transparent"}`}}>
                <span>{co.icon}</span>{co.name.split(" ")[0]}{pct>0&&<span style={{color:"#10B981"}}> {pct}%</span>}
              </button>);})}
          </div>
        </div>
      </header>

      <main style={{maxWidth:880,margin:"0 auto",padding:16}}>
        <div className="up" style={{marginBottom:14}}>
          <h2 style={{fontSize:20,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9"}}>{c.icon} {c.name}</h2>
          <div className="bar" style={{marginTop:8}}><div className="bf" style={{width:`${getCoursePct(c)}%`,background:c.color}}/></div>
          <p style={{fontSize:10,color:"#475569",marginTop:4}}>{getCoursePct(c)}% · {c.modules.length} modules · {c.modules.length} industry projects</p>
        </div>

        <div className="up d1" style={{display:"flex",gap:3,marginBottom:14,overflowX:"auto",flexWrap:"wrap"}}>
          {c.modules.map((mod,i)=>{const pct=getModPct(c.id,i,mod);return(
            <button key={i} onClick={()=>setSelModule(i)} style={{padding:"5px 10px",borderRadius:6,fontSize:10,fontWeight:600,whiteSpace:"nowrap",background:selModule===i?c.color+"16":"#0A0E1A",color:selModule===i?"#F1F5F9":"#475569",border:`1px solid ${selModule===i?c.color+"40":"#19223A"}`}}>
              {pct===100?"✓ ":""}{mod.title.length>28?mod.title.slice(0,28)+"...":mod.title}
            </button>);})}
        </div>

        <div className="up d1" style={{display:"flex",gap:4,marginBottom:14}}>
          {[["learn","📖 Topics"],["project","🔧 Project"]].map(([k,l])=>(
            <button key={k} onClick={()=>setView(k)} style={{padding:"6px 14px",borderRadius:7,fontSize:11,fontWeight:600,background:view===k?c.color+"18":"#0A0E1A",color:view===k?c.color:"#334155",border:`1px solid ${view===k?c.color+"40":"#19223A"}`}}>{l}</button>
          ))}
        </div>

        {view==="learn"&&(<div className="up d2" style={{...S.card,padding:18}}>
          <h3 style={{fontSize:15,fontWeight:700,fontFamily:"Syne",color:"#F1F5F9",marginBottom:14}}>{m.title}</h3>
          {m.topics.map((topic,ti)=>{const key=`${c.id}-${selModule}-t-${ti}`;const done=progress[key];return(
            <div key={ti} style={{display:"flex",gap:8,padding:"7px 0",borderBottom:ti<m.topics.length-1?"1px solid #111828":"none",opacity:done?.4:1,transition:"opacity .3s"}}>
              <button className={`ck ${done?"on":""}`} onClick={()=>toggle(key)}>{done?"✓":""}</button>
              <span style={{fontSize:12,color:done?"#334155":"#E2E8F0",textDecoration:done?"line-through":"none",lineHeight:1.5}}>{topic}</span>
            </div>);})}
        </div>)}

        {view==="project"&&(<div className="up d2">
          <div style={{...S.card,padding:20,borderLeft:`4px solid ${c.color}`,marginBottom:12}}>
            <h3 style={{fontSize:16,fontWeight:700,fontFamily:"Syne",color:"#F1F5F9",marginBottom:6}}>🔧 {m.project.title}</h3>
            <p style={{fontSize:12,color:"#94A3B8",lineHeight:1.7,marginBottom:4}}>{m.project.desc}</p>
            <span className="tag" style={{background:c.color+"14",color:c.color,marginTop:4}}>For: {m.title}</span>
          </div>
          <div style={{...S.card,padding:18}}>
            <h4 style={{fontSize:13,fontWeight:700,fontFamily:"Syne",color:"#F1F5F9",marginBottom:12}}>Steps ({m.project.steps.filter((_,si)=>progress[`${c.id}-${selModule}-p-${si}`]).length}/{m.project.steps.length})</h4>
            {m.project.steps.map((step,si)=>{const key=`${c.id}-${selModule}-p-${si}`;const done=progress[key];return(
              <div key={si} style={{display:"flex",gap:8,padding:"7px 0",borderBottom:si<m.project.steps.length-1?"1px solid #111828":"none",opacity:done?.4:1,transition:"opacity .3s"}}>
                <button className={`ck ${done?"on":""}`} onClick={()=>toggle(key)}>{done?"✓":""}</button>
                <div style={{flex:1}}><span style={{fontSize:12,color:done?"#334155":"#E2E8F0",textDecoration:done?"line-through":"none",lineHeight:1.6}}>{step}</span></div>
                <span style={{fontSize:9,color:"#19223A",fontFamily:"Space Mono",flexShrink:0}}>#{si+1}</span>
              </div>);})}
            <div className="bar" style={{marginTop:12}}><div className="bf" style={{width:`${Math.round(m.project.steps.filter((_,si)=>progress[`${c.id}-${selModule}-p-${si}`]).length/m.project.steps.length*100)}%`,background:c.color}}/></div>
          </div>
        </div>)}

        <div className="up" style={{...S.card,padding:16,marginTop:16}}>
          <h3 style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#475569",letterSpacing:1.5,marginBottom:10}}>ALL MODULES — {c.name.toUpperCase()}</h3>
          {c.modules.map((mod,mi)=>{const pct=getModPct(c.id,mi,mod);return(
            <div key={mi} style={{marginBottom:6,cursor:"pointer"}} onClick={()=>{setSelModule(mi);setView("learn");window.scrollTo(0,0)}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:2}}>
                <span style={{color:"#94A3B8"}}>{mod.title.length>45?mod.title.slice(0,45)+"...":mod.title}</span>
                <span style={{fontWeight:700,fontFamily:"Syne",color:pct===100?"#10B981":pct>0?c.color:"#253060"}}>{pct}%</span>
              </div>
              <div className="bar"><div className="bf" style={{width:`${pct}%`,background:pct===100?"#10B981":c.color}}/></div>
            </div>);})}
        </div>

        <div className="up" style={{...S.card,padding:16,marginTop:12}}>
          <h3 style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#475569",letterSpacing:1.5,marginBottom:10}}>ALL 4 COURSES</h3>
          {courses.map((co,i)=>{const pct=getCoursePct(co);return(
            <div key={i} style={{marginBottom:6,cursor:"pointer"}} onClick={()=>{setSelCourse(i);setSelModule(0);window.scrollTo(0,0)}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:2}}>
                <span style={{color:"#94A3B8"}}>{co.icon} {co.name}</span>
                <span style={{fontWeight:700,fontFamily:"Syne",color:pct===100?"#10B981":pct>0?co.color:"#253060"}}>{pct}%</span>
              </div>
              <div className="bar"><div className="bf" style={{width:`${pct}%`,background:pct===100?"#10B981":co.color}}/></div>
            </div>);})}
        </div>
      </main>
      <footer style={{textAlign:"center",padding:"28px 16px 36px",fontSize:9,fontFamily:"Space Mono",color:"#111828",letterSpacing:1.5}}>CGNG TELECOM ACADEMY · INDUSTRY PROJECTS · DECODE 4G · 5G · AI</footer>
    </div>
  );
}
