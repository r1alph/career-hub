import { useState, useEffect } from "react";

const sections = [
  { id:1, title:"Foundations", emoji:"🏗️", color:"#2563EB", duration:"Weeks 1–4", desc:"LTE first, then 5G NR basics, RF propagation, Linux CLI, Wireshark & PCAP",
    topics:[
      { name:"LTE Fundamentals", items:[
        { text:"LTE architecture: eNB, EPC (MME, SGW, PGW, HSS)", type:"concept" },
        { text:"LTE air interface: OFDMA (DL), SC-FDMA (UL)", type:"concept" },
        { text:"LTE channels: PDSCH, PUSCH, PDCCH, PUCCH, PBCH", type:"concept" },
        { text:"LTE procedures: attach, handover, paging, bearer setup", type:"concept" },
        { text:"EPS bearer vs QCI mapping", type:"concept" },
      ], resources:[
        { name:"3GPP TS 36.300 – LTE Overall Architecture", link:"https://www.3gpp.org/dynareport/36300.htm", type:"Spec", free:true },
        { name:"Coursera: Introduction to LTE (Yonsei University)", link:"https://www.coursera.org/learn/introduction-lte", type:"Course", free:false },
        { name:"ShareTechnote LTE Encyclopedia", link:"https://www.sharetechnote.com/html/Handbook_LTE.html", type:"Reference", free:true },
        { name:"YouTube: LTE from Scratch (Jim Browne)", link:"https://www.youtube.com/playlist?list=PLkL015JxMf3RLf7PlBcqPqA6ARZlGO2E_", type:"Video", free:true },
        { name:"Book: LTE in Bullets (Chris Johnson)", link:"https://www.amazon.com/dp/1508991189", type:"Book", free:false },
      ]},
      { name:"5G NR Basics + 3GPP TS 38.300", items:[
        { text:"5G NR architecture: gNB, AMF, SMF, UPF (SBA)", type:"concept" },
        { text:"5G NR PHY: flexible numerology (μ=0,1,2,3), BWP", type:"concept" },
        { text:"5G NR channels: SSB, CORESET, PDSCH, PUSCH, SRS", type:"concept" },
        { text:"FR1 (sub-6 GHz) vs FR2 (mmWave) bands", type:"concept" },
        { text:"3GPP release structure: Rel-15, 16, 17, 18", type:"concept" },
      ], resources:[
        { name:"3GPP TS 38.300 – 5G NR Overall Description", link:"https://www.3gpp.org/dynareport/38300.htm", type:"Spec", free:true },
        { name:"3GPP TS 38.211 – Physical Channels & Modulation", link:"https://www.3gpp.org/dynareport/38211.htm", type:"Spec", free:true },
        { name:"ShareTechnote 5G NR Encyclopedia", link:"https://www.sharetechnote.com/html/5G/Handbook_5G.html", type:"Reference", free:true },
        { name:"Qualcomm: Making 5G NR a Reality (Whitepaper)", link:"https://www.qualcomm.com/media/documents/files/making-5g-nr-a-reality.pdf", type:"Whitepaper", free:true },
        { name:"Book: 5G NR: The Next Generation (Dahlman, Parkvall)", link:"https://www.amazon.com/dp/0128223464", type:"Book", free:false },
      ]},
      { name:"RF + Propagation Principles", items:[
        { text:"Path loss models: Free-space, Okumura-Hata, 3GPP TR 38.901", type:"concept" },
        { text:"Fading: large-scale (shadow) vs small-scale (multipath)", type:"concept" },
        { text:"Link budget calculation for 5G NR", type:"concept" },
        { text:"Antenna gain, EIRP, beamwidth, radiation pattern", type:"concept" },
        { text:"MIMO basics: spatial multiplexing, diversity, beamforming", type:"concept" },
      ], resources:[
        { name:"3GPP TR 38.901 – Channel Model for 5G", link:"https://www.3gpp.org/dynareport/38901.htm", type:"Spec", free:true },
        { name:"Coursera: Wireless Communications (Yonsei)", link:"https://www.coursera.org/learn/wireless-communications", type:"Course", free:false },
        { name:"MIT OCW 6.450: Principles of Digital Communication", link:"https://ocw.mit.edu/courses/6-450-principles-of-digital-communication-i-fall-2006/", type:"Course", free:true },
        { name:"YouTube: RF Propagation (Rohde & Schwarz)", link:"https://www.youtube.com/watch?v=QWY9JnZDmfk", type:"Video", free:true },
        { name:"MATLAB 5G Toolbox: Link Budget Example", link:"https://www.mathworks.com/help/5g/ug/5g-nr-downlink-carrier-waveform-generation.html", type:"Tool", free:false },
      ]},
      { name:"Linux + CLI Tools", items:[
        { text:"Linux file system, permissions, process management", type:"concept" },
        { text:"Networking: ip, ifconfig, route, iptables, tcpdump", type:"concept" },
        { text:"Shell scripting for network automation (bash)", type:"concept" },
        { text:"Docker basics: containers, images, compose", type:"concept" },
        { text:"SSH, SCP, systemd services", type:"concept" },
      ], resources:[
        { name:"Linux Foundation: Introduction to Linux (edX)", link:"https://www.edx.org/learn/linux/the-linux-foundation-introduction-to-linux", type:"Course", free:true },
        { name:"OverTheWire: Bandit (Linux CLI practice)", link:"https://overthewire.org/wargames/bandit/", type:"Practice", free:true },
        { name:"Docker Getting Started Tutorial", link:"https://docs.docker.com/get-started/", type:"Tutorial", free:true },
        { name:"Linux Networking Commands Cheatsheet", link:"https://www.cyberciti.biz/networking/nmap-command-examples-tutorials/", type:"Reference", free:true },
      ]},
      { name:"Wireshark + PCAP Analysis", items:[
        { text:"Capture & filter SCTP, GTP-U, NGAP, NAS-5GS protocols", type:"concept" },
        { text:"Analyze UE registration, PDU session establishment", type:"concept" },
        { text:"5G protocol stack: NAS, RRC, NGAP, PFCP, GTP-U", type:"concept" },
        { text:"Wireshark display & capture filters for telecom", type:"concept" },
      ], resources:[
        { name:"Wireshark 5G NR Dissectors Documentation", link:"https://www.wireshark.org/docs/dfref/n/nr-rrc.html", type:"Reference", free:true },
        { name:"YouTube: 5G PCAP Analysis with Wireshark", link:"https://www.youtube.com/results?search_query=5g+wireshark+pcap+analysis", type:"Video", free:true },
        { name:"5G Core Network PCAP Samples (GitHub)", link:"https://github.com/free5gc/free5gc/wiki", type:"Practice", free:true },
        { name:"Book: Practical Packet Analysis (Chris Sanders)", link:"https://www.amazon.com/dp/1593278020", type:"Book", free:false },
      ]},
    ],
    certs:[
      { name:"CompTIA Network+ (N10-009)", cost:"$358", hours:30, impact:75 },
      { name:"MATLAB 5G Toolbox Onramp", cost:"Free", hours:6, impact:80 },
    ]
  },
  { id:2, title:"Master the RAN", emoji:"📡", color:"#10B981", duration:"Weeks 5–10", desc:"gNB architecture, O-RAN splits, Massive MIMO, beamforming, 5G NR air interface numerology",
    topics:[
      { name:"gNB Architecture (O-RU / O-DU / O-CU)", items:[
        { text:"gNB functional split options (Option 2, 7.2x)", type:"concept" },
        { text:"O-CU-CP: RRC, PDCP control plane", type:"concept" },
        { text:"O-CU-UP: SDAP, PDCP user plane, GTP-U", type:"concept" },
        { text:"O-DU: RLC, MAC, high-PHY scheduling", type:"concept" },
        { text:"O-RU: low-PHY, RF, fronthaul (eCPRI)", type:"concept" },
        { text:"Fronthaul interface: eCPRI over Ethernet", type:"concept" },
      ], resources:[
        { name:"O-RAN Alliance: WG3 – Near-RT RIC Architecture", link:"https://www.o-ran.org/specifications", type:"Spec", free:true },
        { name:"3GPP TS 38.401 – NG-RAN Architecture", link:"https://www.3gpp.org/dynareport/38401.htm", type:"Spec", free:true },
        { name:"Keysight: Open RAN Explained (Whitepaper)", link:"https://www.keysight.com/us/en/solutions/5g/open-ran.html", type:"Whitepaper", free:true },
        { name:"YouTube: O-RAN Architecture Deep Dive (Decode5G)", link:"https://www.youtube.com/results?search_query=o-ran+architecture+decode5g", type:"Video", free:true },
        { name:"Book: 5G and Open RAN (Mischa Dohler)", link:"https://www.amazon.com/dp/1119883873", type:"Book", free:false },
      ]},
      { name:"5G NR Air Interface Numerology", items:[
        { text:"Subcarrier spacing: 15/30/60/120/240 kHz (μ=0–4)", type:"concept" },
        { text:"Slot structure: 14 OFDM symbols, mini-slots", type:"concept" },
        { text:"BWP (Bandwidth Part) configuration & switching", type:"concept" },
        { text:"PDSCH/PUSCH scheduling: Type A vs Type B", type:"concept" },
        { text:"HARQ process management in NR", type:"concept" },
        { text:"DCI formats & RNTI types", type:"concept" },
      ], resources:[
        { name:"3GPP TS 38.211 – Physical Channels", link:"https://www.3gpp.org/dynareport/38211.htm", type:"Spec", free:true },
        { name:"3GPP TS 38.213 – Physical Layer Procedures", link:"https://www.3gpp.org/dynareport/38213.htm", type:"Spec", free:true },
        { name:"ShareTechnote: 5G NR Numerology", link:"https://www.sharetechnote.com/html/5G/5G_Numerology.html", type:"Reference", free:true },
        { name:"MATLAB: 5G NR Waveform Generation Tutorial", link:"https://www.mathworks.com/help/5g/gs/5g-nr-downlink-carrier-waveform-generation.html", type:"Tool", free:false },
      ]},
      { name:"Massive MIMO + Beamforming", items:[
        { text:"Massive MIMO: 32T32R, 64T64R antenna panels", type:"concept" },
        { text:"Analog vs digital vs hybrid beamforming", type:"concept" },
        { text:"Codebook-based vs non-codebook beamforming", type:"concept" },
        { text:"CSI-RS, SRS for beam management", type:"concept" },
        { text:"SSB beam sweeping: beam selection, refinement, recovery", type:"concept" },
        { text:"MU-MIMO: multi-user spatial multiplexing", type:"concept" },
      ], resources:[
        { name:"3GPP TS 38.214 – Physical Layer Procedures for Data", link:"https://www.3gpp.org/dynareport/38214.htm", type:"Spec", free:true },
        { name:"Massive MIMO Explainer (Ericsson)", link:"https://www.ericsson.com/en/reports-and-papers/white-papers/advanced-antenna-systems-for-5g-networks", type:"Whitepaper", free:true },
        { name:"MATLAB: 5G NR MIMO Beamforming Examples", link:"https://www.mathworks.com/help/5g/mimo-systems.html", type:"Tool", free:false },
        { name:"YouTube: Massive MIMO (Wireless Future)", link:"https://www.youtube.com/results?search_query=massive+mimo+5g+explained", type:"Video", free:true },
      ]},
      { name:"PDSCH / PUSCH / PDCCH", items:[
        { text:"PDSCH: DMRS, TBS calculation, LDPC coding, 256QAM", type:"concept" },
        { text:"PUSCH: transform precoding, power control", type:"concept" },
        { text:"PDCCH: CORESET, search space, aggregation levels", type:"concept" },
        { text:"Carrier Aggregation in NR: inter-band, intra-band", type:"concept" },
      ], resources:[
        { name:"3GPP TS 38.212 – Multiplexing & Channel Coding", link:"https://www.3gpp.org/dynareport/38212.htm", type:"Spec", free:true },
        { name:"ShareTechnote: PDSCH Deep Dive", link:"https://www.sharetechnote.com/html/5G/5G_PDSCH.html", type:"Reference", free:true },
        { name:"Keysight: 5G NR Downlink Signal Analysis", link:"https://www.keysight.com/us/en/solutions/5g/5g-nr-measurement-solutions.html", type:"Tool", free:true },
      ]},
    ],
    certs:[
      { name:"Keysight RF & Microwave Industry-Ready Cert", cost:"Free (university)", hours:40, impact:95 },
      { name:"5G NR Fundamentals (Qualcomm Academy)", cost:"Varies", hours:20, impact:90 },
    ]
  },
  { id:3, title:"Learn the 5G Core (5GC)", emoji:"☁️", color:"#8B5CF6", duration:"Weeks 11–16", desc:"AMF/SMF/UPF, Service-Based Architecture, network slicing, NAS procedures, PDU sessions",
    topics:[
      { name:"AMF / SMF / UPF Network Functions", items:[
        { text:"AMF: NAS termination, registration, authentication (5G-AKA)", type:"concept" },
        { text:"SMF: session management, IP allocation, QoS policy", type:"concept" },
        { text:"UPF: user-plane forwarding, GTP-U tunnel, QoS enforcement", type:"concept" },
        { text:"AUSF + UDM + UDR: subscriber authentication & data", type:"concept" },
        { text:"PCF: policy control, URSP rules", type:"concept" },
        { text:"NRF: service discovery for SBA", type:"concept" },
        { text:"NSSF: network slice selection", type:"concept" },
      ], resources:[
        { name:"3GPP TS 23.501 – 5G System Architecture", link:"https://www.3gpp.org/dynareport/23501.htm", type:"Spec", free:true },
        { name:"3GPP TS 23.502 – 5G System Procedures", link:"https://www.3gpp.org/dynareport/23502.htm", type:"Spec", free:true },
        { name:"Free5GC Wiki & Documentation", link:"https://free5gc.org/guide/", type:"Tutorial", free:true },
        { name:"Open5GS Documentation", link:"https://open5gs.org/open5gs/docs/", type:"Tutorial", free:true },
        { name:"YouTube: 5G Core Architecture (Decode5G / Nitin Gupta)", link:"https://www.youtube.com/results?search_query=5g+core+network+architecture+explained", type:"Video", free:true },
      ]},
      { name:"Service-Based Architecture (SBA)", items:[
        { text:"HTTP/2 + JSON-based NF communication", type:"concept" },
        { text:"Service registration, discovery, authorization", type:"concept" },
        { text:"NF service operations: Nnrf, Namf, Nsmf, Npcf...", type:"concept" },
        { text:"SCP (Service Communication Proxy) role", type:"concept" },
        { text:"OpenAPI specifications for 5GC interfaces", type:"concept" },
      ], resources:[
        { name:"3GPP TS 29.500 – 5GC SBA Framework", link:"https://www.3gpp.org/dynareport/29500.htm", type:"Spec", free:true },
        { name:"ETSI: 5G SBA Architecture Overview", link:"https://www.etsi.org/technologies/5g", type:"Reference", free:true },
        { name:"Book: 5G Core Networks (Stefan Rommer)", link:"https://www.amazon.com/dp/0128220494", type:"Book", free:false },
      ]},
      { name:"N1–N6 Interfaces", items:[
        { text:"N1: UE ↔ AMF (NAS signaling)", type:"concept" },
        { text:"N2: gNB ↔ AMF (NGAP signaling)", type:"concept" },
        { text:"N3: gNB ↔ UPF (GTP-U user plane)", type:"concept" },
        { text:"N4: SMF ↔ UPF (PFCP control)", type:"concept" },
        { text:"N6: UPF ↔ Data Network (PDU session to internet)", type:"concept" },
        { text:"N9: UPF ↔ UPF (inter-UPF forwarding)", type:"concept" },
      ], resources:[
        { name:"3GPP TS 38.413 – NGAP (N2) Protocol", link:"https://www.3gpp.org/dynareport/38413.htm", type:"Spec", free:true },
        { name:"3GPP TS 29.244 – PFCP (N4) Protocol", link:"https://www.3gpp.org/dynareport/29244.htm", type:"Spec", free:true },
        { name:"Wireshark: NGAP & NAS-5GS Dissector", link:"https://www.wireshark.org/docs/dfref/n/ngap.html", type:"Tool", free:true },
      ]},
      { name:"Network Slicing (NSI)", items:[
        { text:"S-NSSAI: SST (Slice Service Type) + SD (Slice Differentiator)", type:"concept" },
        { text:"Network slice lifecycle: creation, activation, deactivation", type:"concept" },
        { text:"Dedicated vs shared NFs per slice", type:"concept" },
        { text:"URSP rules for UE slice routing", type:"concept" },
      ], resources:[
        { name:"3GPP TS 23.503 – Policy & Charging Framework", link:"https://www.3gpp.org/dynareport/23503.htm", type:"Spec", free:true },
        { name:"GSMA: Network Slicing Use Cases", link:"https://www.gsma.com/futurenetworks/resources/network-slicing-use-case-requirements/", type:"Reference", free:true },
        { name:"Open5GS: Network Slicing Tutorial", link:"https://open5gs.org/open5gs/docs/guide/02-building-open5gs-from-sources/", type:"Tutorial", free:true },
      ]},
      { name:"UE Registration & PDU Session", items:[
        { text:"Registration flow: RRC setup → NAS registration → authentication → security mode", type:"concept" },
        { text:"PDU session establishment: SMF selection, UPF allocation, QoS flow", type:"concept" },
        { text:"Service request procedure for idle-mode UE", type:"concept" },
        { text:"Handover: Xn-based, N2-based inter-gNB", type:"concept" },
      ], resources:[
        { name:"3GPP TS 24.501 – NAS Protocol for 5GS", link:"https://www.3gpp.org/dynareport/24501.htm", type:"Spec", free:true },
        { name:"YouTube: 5G Call Flow Step-by-Step", link:"https://www.youtube.com/results?search_query=5g+registration+call+flow+step+by+step", type:"Video", free:true },
        { name:"UERANSIM: UE Registration Simulator", link:"https://github.com/aligungr/UERANSIM", type:"Tool", free:true },
      ]},
    ],
    certs:[
      { name:"AWS Cloud Practitioner (CLF-C02)", cost:"$100", hours:20, impact:85 },
      { name:"Docker Certified Associate (DCA)", cost:"$195", hours:25, impact:80 },
    ]
  },
  { id:4, title:"Master O-RAN + AI/ML", emoji:"🤖", color:"#F59E0B", duration:"Weeks 17–24", desc:"O-RAN architecture, Near-RT RIC + xApps, Non-RT RIC + rApps, NWDAF, AI for beamforming & SON",
    topics:[
      { name:"O-RAN Architecture", items:[
        { text:"O-RAN Alliance specification groups (WG1–WG11)", type:"concept" },
        { text:"O-RAN logical architecture: SMO, Near-RT RIC, O-CU, O-DU, O-RU", type:"concept" },
        { text:"Open fronthaul interface (7.2x split)", type:"concept" },
        { text:"O-RAN vs traditional RAN: multi-vendor interop", type:"concept" },
      ], resources:[
        { name:"O-RAN Alliance Specifications (All WGs)", link:"https://www.o-ran.org/specifications", type:"Spec", free:true },
        { name:"O-RAN SC (Software Community) Wiki", link:"https://wiki.o-ran-sc.org/", type:"Reference", free:true },
        { name:"NIST O-RAN Testbed Automation (GitHub)", link:"https://github.com/usnistgov/O-RAN-Testbed-Automation", type:"Tool", free:true },
        { name:"YouTube: O-RAN Explained (TelecomHall)", link:"https://www.youtube.com/results?search_query=o-ran+architecture+explained+2024", type:"Video", free:true },
      ]},
      { name:"Near-RT RIC + xApps", items:[
        { text:"Near-RT RIC: 10ms–1s control loop", type:"concept" },
        { text:"E2 interface: E2AP + E2SM (KPM, RC, NI)", type:"concept" },
        { text:"xApp development: Python/Go/Rust, RMR messaging", type:"concept" },
        { text:"xApp examples: traffic steering, QoE prediction, anomaly detection", type:"concept" },
        { text:"A1 interface: policy from Non-RT RIC to Near-RT RIC", type:"concept" },
      ], resources:[
        { name:"O-RAN SC Near-RT RIC (GitHub)", link:"https://github.com/o-ran-sc/ric-plt-ric", type:"Tool", free:true },
        { name:"FlexRIC v2.0 (Eurecom/OAI)", link:"https://gitlab.eurecom.fr/mosaic5g/flexric", type:"Tool", free:true },
        { name:"xApp Development Guide (O-RAN SC)", link:"https://wiki.o-ran-sc.org/display/RICP/xApp+Development", type:"Tutorial", free:true },
        { name:"Paper: O-RAN Near-RT RIC Survey (IEEE)", link:"https://ieeexplore.ieee.org/document/10123456", type:"Paper", free:false },
      ]},
      { name:"Non-RT RIC + rApps", items:[
        { text:"Non-RT RIC: >1s control loop, AI/ML model training", type:"concept" },
        { text:"A1 policy management framework", type:"concept" },
        { text:"O1 interface: management & orchestration", type:"concept" },
        { text:"rApp framework: ML model lifecycle management", type:"concept" },
        { text:"R1 interface: rApp ↔ Non-RT RIC platform", type:"concept" },
      ], resources:[
        { name:"O-RAN SC Non-RT RIC (GitHub)", link:"https://github.com/o-ran-sc/nonrtric", type:"Tool", free:true },
        { name:"O-RAN WG2: Non-RT RIC Architecture", link:"https://www.o-ran.org/specifications", type:"Spec", free:true },
      ]},
      { name:"NWDAF Analytics", items:[
        { text:"NWDAF: Network Data Analytics Function (3GPP Rel-16+)", type:"concept" },
        { text:"Analytics types: load, QoS, mobility prediction, anomaly", type:"concept" },
        { text:"NWDAF deployment: standalone vs integrated", type:"concept" },
        { text:"ML model training & inference in NWDAF", type:"concept" },
      ], resources:[
        { name:"3GPP TS 23.288 – NWDAF Architecture", link:"https://www.3gpp.org/dynareport/23288.htm", type:"Spec", free:true },
        { name:"ETSI: AI/ML in 5G Networks", link:"https://www.etsi.org/technologies/experiential-networked-intelligence", type:"Reference", free:true },
      ]},
      { name:"AI for Beamforming + SON", items:[
        { text:"ML-based beam prediction & beam management", type:"concept" },
        { text:"RL for dynamic spectrum sharing", type:"concept" },
        { text:"Self-Organizing Networks: self-config, self-optimize, self-heal", type:"concept" },
        { text:"Federated learning for distributed RAN optimization", type:"concept" },
        { text:"Digital twin for network planning & optimization", type:"concept" },
      ], resources:[
        { name:"TensorFlow: Signal Processing & Wireless Tutorials", link:"https://www.tensorflow.org/tutorials", type:"Tool", free:true },
        { name:"DeepMIMO: AI/ML Dataset for MIMO (ASU)", link:"https://www.deepmimo.net/", type:"Tool", free:true },
        { name:"Paper: Deep Learning for Beam Management (IEEE)", link:"https://ieeexplore.ieee.org", type:"Paper", free:false },
        { name:"Coursera: Deep Learning Specialization (Andrew Ng)", link:"https://www.coursera.org/specializations/deep-learning", type:"Course", free:false },
      ]},
    ],
    certs:[
      { name:"TensorFlow Developer Certificate", cost:"$100", hours:30, impact:90 },
      { name:"IEEE WCET Certification", cost:"$450", hours:60, impact:99 },
      { name:"Certified Kubernetes Admin (CKA)", cost:"$395", hours:30, impact:82 },
    ]
  },
  { id:5, title:"Build Real 5G Systems", emoji:"🔧", color:"#E8553D", duration:"Weeks 25–36", desc:"Deploy free5GC, Open5GS, srsRAN, OAI. Build xApps. Drive test. Private 5G. 6G research.",
    topics:[
      { name:"free5GC + Open5GS Lab", items:[
        { text:"Deploy Open5GS 5GC on Ubuntu/Docker", type:"hands-on" },
        { text:"Deploy free5GC with Docker Compose", type:"hands-on" },
        { text:"Configure subscribers via WebUI", type:"hands-on" },
        { text:"Connect UERANSIM for E2E testing", type:"hands-on" },
        { text:"Network slicing configuration in Open5GS", type:"hands-on" },
        { text:"PCAP capture of registration & PDU flows", type:"hands-on" },
      ], resources:[
        { name:"Open5GS: Quick Start Guide", link:"https://open5gs.org/open5gs/docs/guide/01-quickstart/", type:"Tutorial", free:true },
        { name:"free5GC: Installation Guide", link:"https://free5gc.org/guide/", type:"Tutorial", free:true },
        { name:"UERANSIM: 5G UE/RAN Simulator", link:"https://github.com/aligungr/UERANSIM", type:"Tool", free:true },
        { name:"GitHub: Open5GS + srsRAN E2E Setup", link:"https://github.com/ngkore/Open5GS-srsRAN", type:"Tutorial", free:true },
        { name:"NIST 5G Deploy Helper", link:"https://github.com/usnistgov/5gdeploy", type:"Tool", free:true },
      ]},
      { name:"srsRAN + OpenAirInterface", items:[
        { text:"Build srsRAN gNB from source (ZMQ mode)", type:"hands-on" },
        { text:"Connect srsRAN to Open5GS via N2/N3", type:"hands-on" },
        { text:"Build OAI gNB + OAI CN5G full stack", type:"hands-on" },
        { text:"OTA testing with USRP B210 SDR", type:"hands-on" },
        { text:"KPI monitoring: throughput, latency, BLER", type:"hands-on" },
      ], resources:[
        { name:"srsRAN Project Documentation", link:"https://docs.srsran.com/projects/project/en/latest/", type:"Tutorial", free:true },
        { name:"OpenAirInterface 5G Wiki", link:"https://gitlab.eurecom.fr/oai/openairinterface5g/-/wikis/home", type:"Tutorial", free:true },
        { name:"Gradiant: 5G Helm Charts (K8s deployment)", link:"https://gradiant.github.io/5g-charts/", type:"Tool", free:true },
        { name:"Powder Wireless: 5G Outdoor Testbed (Utah)", link:"https://powderwireless.net/5g", type:"Testbed", free:true },
      ]},
      { name:"FlexRIC xApp Development", items:[
        { text:"Install FlexRIC with OAI gNB integration", type:"hands-on" },
        { text:"Build KPM monitor xApp (Python)", type:"hands-on" },
        { text:"Build RIC control xApp for scheduling", type:"hands-on" },
        { text:"Deploy O-RAN SC Near-RT RIC on Docker/K8s", type:"hands-on" },
        { text:"NIST O-RAN Testbed Automation scripts", type:"hands-on" },
      ], resources:[
        { name:"FlexRIC GitHub (Eurecom)", link:"https://gitlab.eurecom.fr/mosaic5g/flexric", type:"Tool", free:true },
        { name:"NIST O-RAN Testbed Automation", link:"https://github.com/usnistgov/O-RAN-Testbed-Automation", type:"Tool", free:true },
        { name:"O-RAN SC: Hello World xApp Tutorial", link:"https://wiki.o-ran-sc.org/pages/viewpage.action?pageId=20878423", type:"Tutorial", free:true },
      ]},
      { name:"Drive Test + KPI Analysis", items:[
        { text:"RF drive test methodology: coverage, quality, throughput", type:"hands-on" },
        { text:"KPIs: RSRP, RSRQ, SINR, throughput, latency, BLER", type:"hands-on" },
        { text:"Tools: TEMS, Nemo, XCAL (industry) or srsRAN logs", type:"hands-on" },
        { text:"Post-processing with Python: Pandas, Matplotlib", type:"hands-on" },
        { text:"Generate optimization recommendations from KPIs", type:"hands-on" },
      ], resources:[
        { name:"Rohde & Schwarz: 5G NR Drive Test Guide", link:"https://www.rohde-schwarz.com/us/solutions/test-and-measurement/mobile-network-testing/overview_233676.html", type:"Reference", free:true },
        { name:"Python + Pandas: Telecom KPI Dashboard Tutorial", link:"https://www.youtube.com/results?search_query=python+telecom+kpi+dashboard", type:"Video", free:true },
        { name:"MATLAB: 5G NR Link-Level Simulation", link:"https://www.mathworks.com/help/5g/ug/nr-pdsch-throughput.html", type:"Tool", free:false },
      ]},
      { name:"Private 5G + 6G Research", items:[
        { text:"CBRS (3.5 GHz) private 5G deployment", type:"hands-on" },
        { text:"Private 5G use cases: factory, campus, hospital", type:"hands-on" },
        { text:"6G research directions: THz, ISAC, RIS, NTN, AI-native", type:"concept" },
        { text:"Contribute to open-source 5G/6G projects", type:"hands-on" },
      ], resources:[
        { name:"CBRS Alliance: Getting Started", link:"https://www.cbrsalliance.org", type:"Reference", free:true },
        { name:"6G Flagship (University of Oulu)", link:"https://www.6gflagship.com/", type:"Research", free:true },
        { name:"IEEE: 6G Vision Papers", link:"https://ieeexplore.ieee.org/document/9040431", type:"Paper", free:false },
        { name:"ITU-R: IMT-2030 Framework", link:"https://www.itu.int/en/ITU-R/study-groups/rsg5/rwp5d/imt-2030/Pages/default.aspx", type:"Spec", free:true },
      ]},
    ],
    certs:[
      { name:"CBRS CPI Certification", cost:"$500", hours:16, impact:85 },
      { name:"IEEE WCET (if not done in S4)", cost:"$450", hours:60, impact:99 },
      { name:"FCC GROL License", cost:"$50", hours:40, impact:88 },
    ]
  },
  // ═══ 4-MONTH TELECOM CAREER PLAN (CGNG Telecom · Chhavi Gupta · Starting May 4, 2026) ═══
  { id:6, title:"5G Mastery + Logs", emoji:"📶", color:"#E63946", duration:"Month 1 (May)", desc:"Core Skill — 5G fundamentals, SBA, NSA/SA, protocol stack (NAS/RRC/SDAP/PDCP/RLC/MAC/PHY), channels, call flows, log analysis, testing & certification",
    topics:[
      { name:"5G Fundamentals & Architecture", items:[
        { text:"5G KPIs: eMBB (8K, AR/VR), URLLC (<1ms, remote surgery), mMTC (IoT, smart cities)", type:"concept" },
        { text:"Evolution: 2G→3G→4G→5G — OFDM evolution, MIMO, network slicing improvements", type:"concept" },
        { text:"3GPP standardization: Release 15 (initial NR), Rel-16 (Phase 2), Rel-17, Rel-18", type:"concept" },
        { text:"Reference-Based Architecture: N1, N2, N3, N4, N6 interfaces", type:"concept" },
        { text:"Service-Based Architecture (SBA): cloud-native, microservices-based 5GC", type:"concept" },
        { text:"5G Network Elements: AMF, SMF, UPF, AUSF, UDM, NRF, PCF, CHF — roles and functions", type:"concept" },
      ], resources:[
        { name:"3GPP TS 23.501 – 5G System Architecture", link:"https://www.3gpp.org/dynareport/23501.htm", type:"Spec", free:true },
        { name:"3GPP TS 29.500 – 5GC SBA Framework", link:"https://www.3gpp.org/dynareport/29500.htm", type:"Spec", free:true },
        { name:"ShareTechnote: 5G NR Handbook", link:"https://www.sharetechnote.com/html/5G/Handbook_5G.html", type:"Reference", free:true },
        { name:"YouTube: 5G Architecture (Decode5G)", link:"https://www.youtube.com/results?search_query=5g+architecture+decode5g", type:"Video", free:true },
        { name:"Book: 5G NR: The Next Generation (Dahlman)", link:"https://www.amazon.com/dp/0128223464", type:"Book", free:false },
      ]},
      { name:"NSA & SA Deployment Modes", items:[
        { text:"NSA Mode: 5G NR anchored by 4G LTE core (EPC), Options 3, 3a, 3x", type:"concept" },
        { text:"SA Mode: full E2E 5G with 5GC — enables URLLC, mMTC, network slicing", type:"concept" },
        { text:"NSA advantages: faster deployment, leverages existing LTE infrastructure", type:"concept" },
        { text:"SA advantages: lower latency, cloud-native, true 5G capabilities", type:"concept" },
        { text:"Migration path: NSA → SA, EN-DC vs NR-DC dual connectivity", type:"concept" },
        { text:"VoNR (Voice over NR) vs EPS Fallback for voice services", type:"concept" },
      ], resources:[
        { name:"3GPP TS 37.340 – Multi-RAT Dual Connectivity", link:"https://www.3gpp.org/dynareport/37340.htm", type:"Spec", free:true },
        { name:"ShareTechnote: EN-DC and NR-DC", link:"https://www.sharetechnote.com/html/5G/5G_EN_DC.html", type:"Reference", free:true },
        { name:"YouTube: NSA vs SA Explained", link:"https://www.youtube.com/results?search_query=5g+nsa+vs+sa+explained", type:"Video", free:true },
      ]},
      { name:"5G Protocol Stack Deep Dive", items:[
        { text:"NAS Layer: Registration, Authentication, Security, Session Mgmt, Cause Codes (5GMM/5GSM)", type:"concept" },
        { text:"RRC Layer: IDLE/INACTIVE/CONNECTED states, Setup, Reconfiguration, Measurement Configs", type:"concept" },
        { text:"SDAP Layer: QoS Flow Mapping, 5QI handling, Reflective QoS", type:"concept" },
        { text:"PDCP Layer: Header Compression (ROHC), Integrity, Ciphering, Reordering, Duplication", type:"concept" },
        { text:"RLC Layer: TM/UM/AM modes, segmentation, reassembly, ARQ", type:"concept" },
        { text:"MAC Layer: Scheduling, BSR (Buffer Status Report), HARQ, Random Access (RACH)", type:"concept" },
        { text:"Control Plane vs User Plane protocol stack differences", type:"concept" },
        { text:"Log analysis: identify key NAS/RRC messages in Wireshark/QXDM logs", type:"hands-on" },
      ], resources:[
        { name:"3GPP TS 24.501 – NAS Protocol for 5GS", link:"https://www.3gpp.org/dynareport/24501.htm", type:"Spec", free:true },
        { name:"3GPP TS 38.331 – RRC Protocol", link:"https://www.3gpp.org/dynareport/38331.htm", type:"Spec", free:true },
        { name:"Wireshark: 5G NAS/RRC Dissectors", link:"https://www.wireshark.org/docs/dfref/n/nr-rrc.html", type:"Tool", free:true },
        { name:"ShareTechnote: 5G Protocol Stack", link:"https://www.sharetechnote.com/html/5G/5G_ProtocolStack.html", type:"Reference", free:true },
      ]},
      { name:"5G Physical Layer & Channels", items:[
        { text:"Frame structure: subcarrier spacing 15kHz × 2^μ, slot/mini-slot scheduling", type:"concept" },
        { text:"CORESET: Control Resource Set, PDCCH monitoring, search space configuration", type:"concept" },
        { text:"BWP: Bandwidth Parts for efficient spectrum utilization", type:"concept" },
        { text:"DL Physical Channels: PDSCH, PDCCH, PBCH, PSS/SSS", type:"concept" },
        { text:"UL Physical Channels: PUSCH, PUCCH, PRACH, SRS", type:"concept" },
        { text:"DL/UL channel mapping: logical → transport → physical", type:"concept" },
        { text:"mmWave: FR2 bands, propagation challenges, beamforming necessity", type:"concept" },
        { text:"Massive MIMO: 32T32R/64T64R, analog/digital/hybrid beamforming", type:"concept" },
      ], resources:[
        { name:"3GPP TS 38.211 – Physical Channels & Modulation", link:"https://www.3gpp.org/dynareport/38211.htm", type:"Spec", free:true },
        { name:"3GPP TS 38.213 – Physical Layer Procedures (Control)", link:"https://www.3gpp.org/dynareport/38213.htm", type:"Spec", free:true },
        { name:"MATLAB: 5G NR Waveform Generation", link:"https://www.mathworks.com/help/5g/gs/5g-nr-downlink-carrier-waveform-generation.html", type:"Tool", free:false },
        { name:"Qualcomm: Making 5G mmWave a Reality", link:"https://www.qualcomm.com/media/documents/files/making-5g-nr-a-reality.pdf", type:"Whitepaper", free:true },
      ]},
      { name:"Network Slicing: eMBB / URLLC / mMTC", items:[
        { text:"S-NSSAI: SST (Slice Service Type) + SD (Slice Differentiator)", type:"concept" },
        { text:"eMBB (SST=1): high throughput — 8K video, AR/VR, cloud gaming", type:"concept" },
        { text:"URLLC (SST=2): <1ms latency — remote surgery, factory automation, V2X", type:"concept" },
        { text:"mMTC (SST=3): massive IoT — smart agriculture, utilities, sensor networks", type:"concept" },
        { text:"Slice isolation: dedicated vs shared NFs, resource partitioning", type:"concept" },
        { text:"Slice lifecycle: creation, activation, monitoring, modification, deactivation", type:"concept" },
      ], resources:[
        { name:"3GPP TS 23.503 – Policy & Charging for Slicing", link:"https://www.3gpp.org/dynareport/23503.htm", type:"Spec", free:true },
        { name:"GSMA: Network Slicing Use Cases", link:"https://www.gsma.com/futurenetworks/resources/network-slicing-use-case-requirements/", type:"Reference", free:true },
        { name:"Open5GS: Slicing Configuration", link:"https://open5gs.org/open5gs/docs/", type:"Tutorial", free:true },
      ]},
      { name:"5G Call Flows + Log Analysis", items:[
        { text:"NSA Call Flows: Initial Attach, EN-DC setup, PDU Session, EN-DC Handover", type:"concept" },
        { text:"SA Call Flows: Initial Registration, PDU Session Establishment, N2 Handover", type:"concept" },
        { text:"5G Modem Log Analysis: identify messages, decipher states, protocol interactions", type:"hands-on" },
        { text:"Wireshark PCAP analysis: NGAP, NAS-5GS, GTP-U, PFCP protocol capture", type:"hands-on" },
        { text:"NAS cause codes: 5GMM (registration reject) and 5GSM (session reject) analysis", type:"hands-on" },
      ], resources:[
        { name:"YouTube: 5G SA Call Flow Step-by-Step", link:"https://www.youtube.com/results?search_query=5g+sa+call+flow+step+by+step", type:"Video", free:true },
        { name:"UERANSIM: Registration & PDU Session Simulator", link:"https://github.com/aligungr/UERANSIM", type:"Tool", free:true },
        { name:"Wireshark: NGAP Dissector", link:"https://www.wireshark.org/docs/dfref/n/ngap.html", type:"Tool", free:true },
      ]},
      { name:"5G Testing & Device Certification", items:[
        { text:"Protocol Conformance Testing: validate 3GPP compliance", type:"concept" },
        { text:"RF Testing: Tx power, sensitivity, spurious emissions", type:"concept" },
        { text:"Field Testing: mobility/marginal testing, drive test methodology", type:"concept" },
        { text:"GCF / PTCRB device certification process and role", type:"concept" },
        { text:"UE logging tools: capturing and analysing modem logs", type:"concept" },
        { text:"5G simulators: UE simulators and network simulators overview", type:"concept" },
      ], resources:[
        { name:"GCF: Global Certification Forum", link:"https://www.globalcertificationforum.org/", type:"Reference", free:true },
        { name:"Rohde & Schwarz: 5G NR Testing", link:"https://www.rohde-schwarz.com/us/solutions/test-and-measurement/mobile-network-testing/overview_233676.html", type:"Reference", free:true },
        { name:"Keysight: 5G Device Test Solutions", link:"https://www.keysight.com/us/en/solutions/5g.html", type:"Reference", free:true },
      ]},
    ],
    certs:[
      { name:"5G NR Fundamentals (Qualcomm Academy)", cost:"Varies", hours:20, impact:92 },
      { name:"MATLAB 5G Toolbox Onramp", cost:"Free", hours:6, impact:80 },
      { name:"CompTIA Network+ (N10-009)", cost:"$358", hours:30, impact:75 },
    ]
  },
  { id:7, title:"O-RAN (Open RAN)", emoji:"🔓", color:"#7B2FBE", duration:"Month 2 (June)", desc:"Highest demand 2026 — O-RAN Alliance, 7.2x split, CU/DU/RU, Near-RT RIC + xApps, Non-RT RIC + rApps, E2/A1/O1/F1 interfaces, Open Fronthaul",
    topics:[
      { name:"Introduction to O-RAN", items:[
        { text:"What is Open RAN? Disaggregated, virtualized, intelligent RAN", type:"concept" },
        { text:"Why O-RAN in 5G: vendor diversity, cost reduction, innovation acceleration", type:"concept" },
        { text:"Traditional RAN vs Open RAN: single-vendor lock-in vs multi-vendor interop", type:"concept" },
        { text:"O-RAN Alliance: role, mission, WG1–WG11 specification groups", type:"concept" },
        { text:"O-RAN in 6G: evolution path and future opportunities", type:"concept" },
      ], resources:[
        { name:"O-RAN Alliance: All Specifications", link:"https://www.o-ran.org/specifications", type:"Spec", free:true },
        { name:"O-RAN SC Software Community Wiki", link:"https://wiki.o-ran-sc.org/", type:"Reference", free:true },
        { name:"Keysight: Open RAN Explained", link:"https://www.keysight.com/us/en/solutions/5g/open-ran.html", type:"Whitepaper", free:true },
        { name:"Book: 5G and Open RAN (Dohler)", link:"https://www.amazon.com/dp/1119883873", type:"Book", free:false },
      ]},
      { name:"O-RAN Architecture & Functional Split", items:[
        { text:"O-RAN functional split concept: why disaggregate the RAN?", type:"concept" },
        { text:"7.2x split: high-PHY in O-DU, low-PHY + RF in O-RU", type:"concept" },
        { text:"O-CU-CP: RRC + PDCP control plane functions", type:"concept" },
        { text:"O-CU-UP: SDAP + PDCP user plane + GTP-U tunneling", type:"concept" },
        { text:"O-DU: RLC + MAC + high-PHY scheduling and processing", type:"concept" },
        { text:"O-RU: low-PHY + RF transceiver + antenna interface", type:"concept" },
        { text:"O-Cloud: cloud infrastructure hosting O-RAN network functions", type:"concept" },
      ], resources:[
        { name:"3GPP TS 38.401 – NG-RAN Architecture", link:"https://www.3gpp.org/dynareport/38401.htm", type:"Spec", free:true },
        { name:"O-RAN WG1: Architecture Description", link:"https://www.o-ran.org/specifications", type:"Spec", free:true },
        { name:"YouTube: O-RAN 7.2x Split Explained", link:"https://www.youtube.com/results?search_query=o-ran+7.2x+functional+split+explained", type:"Video", free:true },
      ]},
      { name:"O-RAN Logical Architecture: RIC + SMO", items:[
        { text:"Near-RT RIC: 10ms–1s control loop for real-time RAN optimization", type:"concept" },
        { text:"Non-RT RIC: >1s control loop for AI/ML training, policy management", type:"concept" },
        { text:"SMO (Service Management & Orchestration): lifecycle management", type:"concept" },
        { text:"xApps: micro-applications running on Near-RT RIC (Python/Go)", type:"concept" },
        { text:"rApps: applications on Non-RT RIC for training and long-term optimization", type:"concept" },
        { text:"xApp examples: traffic steering, QoE optimization, load balancing, anomaly detection", type:"concept" },
        { text:"rApp examples: ML model training, policy creation, A/B testing", type:"concept" },
        { text:"E2 Service Models: E2SM-KPM (monitoring), E2SM-RC (control)", type:"concept" },
      ], resources:[
        { name:"O-RAN SC: xApp Development Guide", link:"https://wiki.o-ran-sc.org/display/RICP/xApp+Development", type:"Tutorial", free:true },
        { name:"FlexRIC v2.0 (Eurecom/OAI)", link:"https://gitlab.eurecom.fr/mosaic5g/flexric", type:"Tool", free:true },
        { name:"NIST O-RAN Testbed Automation", link:"https://github.com/usnistgov/O-RAN-Testbed-Automation", type:"Tool", free:true },
        { name:"O-RAN SC Non-RT RIC (GitHub)", link:"https://github.com/o-ran-sc/nonrtric", type:"Tool", free:true },
      ]},
      { name:"O-RAN Interfaces & Protocols", items:[
        { text:"F1 interface: O-CU ↔ O-DU (split architecture signaling)", type:"concept" },
        { text:"E2 interface: Near-RT RIC ↔ O-CU/O-DU (real-time data + control)", type:"concept" },
        { text:"A1 interface: Non-RT RIC → Near-RT RIC (policy + ML model delivery)", type:"concept" },
        { text:"O1 interface: SMO ↔ O-RAN NFs (OAM: NETCONF/YANG, VES events)", type:"concept" },
        { text:"O2 interface: SMO ↔ O-Cloud (infrastructure management)", type:"concept" },
        { text:"Open Fronthaul: Control Plane, User Plane, Sync Plane, Management Plane", type:"concept" },
        { text:"eCPRI transport: Ethernet-based fronthaul, latency & sync requirements", type:"concept" },
      ], resources:[
        { name:"O-RAN WG3: E2 Interface Specification", link:"https://www.o-ran.org/specifications", type:"Spec", free:true },
        { name:"O-RAN WG4: Open Fronthaul Specification", link:"https://www.o-ran.org/specifications", type:"Spec", free:true },
        { name:"YouTube: O-RAN Interfaces Deep Dive", link:"https://www.youtube.com/results?search_query=o-ran+e2+a1+o1+interfaces", type:"Video", free:true },
      ]},
    ],
    certs:[
      { name:"O-RAN Certified Associate (OCA)", cost:"Varies", hours:25, impact:88 },
      { name:"Nokia NRS I (Network Routing Specialist)", cost:"$200", hours:25, impact:75 },
    ]
  },
  { id:8, title:"AI/ML in Telecom", emoji:"🧠", color:"#FF6B35", duration:"Month 3 (July)", desc:"6G-ready — AI/ML fundamentals for telecom, NWDAF, O-RAN AI framework, RAN use cases (traffic/mobility/slicing/anomaly), PHY/MAC intelligence, RL, federated learning, GenAI",
    topics:[
      { name:"AI/ML Fundamentals for Telecom", items:[
        { text:"Why AI/ML is essential for 5G and O-RAN: evolution from rule-based to AI-driven", type:"concept" },
        { text:"Supervised vs Unsupervised vs Reinforcement Learning overview", type:"concept" },
        { text:"Key algorithms: Regression, Classification, Clustering, Decision Trees", type:"concept" },
        { text:"Deep Learning: Neural Networks, CNNs, LSTMs for time-series", type:"concept" },
        { text:"Training vs Inference: model lifecycle, evaluation metrics (accuracy, F1, RMSE)", type:"concept" },
        { text:"Telecom data types: KPIs, KQIs, counters, events, time-series, topology data", type:"concept" },
        { text:"Industry standards: 3GPP NWDAF, O-RAN Alliance AI/ML framework", type:"concept" },
      ], resources:[
        { name:"Coursera: Deep Learning Specialization (Andrew Ng)", link:"https://www.coursera.org/specializations/deep-learning", type:"Course", free:false },
        { name:"TensorFlow Official Tutorials", link:"https://www.tensorflow.org/tutorials", type:"Tutorial", free:true },
        { name:"scikit-learn Documentation", link:"https://scikit-learn.org/stable/tutorial/", type:"Tutorial", free:true },
        { name:"YouTube: AI/ML for Telecom Beginners", link:"https://www.youtube.com/results?search_query=ai+ml+telecom+5g+beginners", type:"Video", free:true },
      ]},
      { name:"3GPP NWDAF & O-RAN AI Framework", items:[
        { text:"NWDAF architecture: analytics producer and consumer model", type:"concept" },
        { text:"NWDAF service-based interfaces: Nnwdaf, Nnrf for service discovery", type:"concept" },
        { text:"Standardized analytics: slice load, UE mobility, service experience, anomaly detection", type:"concept" },
        { text:"O-RAN AI/ML framework: Non-RT RIC trains models, Near-RT RIC runs inference", type:"concept" },
        { text:"rApps (training, policy) vs xApps (real-time inference, control)", type:"concept" },
        { text:"AI/ML workflow: Data collection → Feature engineering → Training → Deployment → Inference", type:"concept" },
        { text:"A1 policy interface for ML model delivery to Near-RT RIC", type:"concept" },
      ], resources:[
        { name:"3GPP TS 23.288 – NWDAF Architecture", link:"https://www.3gpp.org/dynareport/23288.htm", type:"Spec", free:true },
        { name:"ETSI ENI: AI/ML in 5G Networks", link:"https://www.etsi.org/technologies/experiential-networked-intelligence", type:"Reference", free:true },
        { name:"O-RAN SC: ML Framework for xApps", link:"https://wiki.o-ran-sc.org/", type:"Reference", free:true },
      ]},
      { name:"AI/ML Use Cases in RAN", items:[
        { text:"Traffic prediction: LSTM time-series forecasting, spatial-temporal patterns", type:"concept" },
        { text:"Mobility & handover optimization: trajectory prediction, cell selection, beam handover", type:"concept" },
        { text:"Network slicing with AI: automated slice creation, SLA monitoring, dynamic resource allocation", type:"concept" },
        { text:"Coverage & capacity optimization: hole detection, hotspot ID, ANR, load balancing", type:"concept" },
        { text:"Anomaly detection & self-healing: cell outage detection, root cause analysis, predictive maintenance", type:"concept" },
        { text:"Energy efficiency: AI-driven cell sleeping, traffic-aware power control, symbol shutdown", type:"concept" },
        { text:"SON: Self-Optimizing (MRO, MLB), Self-Healing (fault recovery), Self-Configuring (ANR)", type:"concept" },
      ], resources:[
        { name:"DeepMIMO: AI/ML Dataset for MIMO", link:"https://www.deepmimo.net/", type:"Tool", free:true },
        { name:"Nokia: SON Whitepaper", link:"https://www.nokia.com/networks/technologies/self-organizing-networks/", type:"Whitepaper", free:true },
        { name:"YouTube: AI/ML Use Cases in 5G RAN", link:"https://www.youtube.com/results?search_query=ai+ml+use+cases+5g+ran", type:"Video", free:true },
      ]},
      { name:"PHY & MAC Layer Intelligence", items:[
        { text:"Channel estimation using deep learning (CNN, transformer architectures)", type:"concept" },
        { text:"CSI feedback compression with autoencoders", type:"concept" },
        { text:"Beam management and prediction using ML", type:"concept" },
        { text:"MIMO precoding optimization with neural networks", type:"concept" },
        { text:"MCS selection and link adaptation using ML", type:"concept" },
        { text:"Intelligent MAC scheduling using Reinforcement Learning", type:"concept" },
        { text:"Dynamic spectrum sharing and resource block allocation with RL", type:"concept" },
        { text:"HARQ optimization and power control with ML", type:"concept" },
      ], resources:[
        { name:"3GPP TR 38.843 – AI/ML for NR Air Interface", link:"https://www.3gpp.org/dynareport/38843.htm", type:"Spec", free:true },
        { name:"Qualcomm: AI for 5G RAN Research", link:"https://www.qualcomm.com/research/artificial-intelligence", type:"Whitepaper", free:true },
        { name:"MATLAB: 5G NR Link-Level Simulation", link:"https://www.mathworks.com/help/5g/ug/nr-pdsch-throughput.html", type:"Tool", free:false },
      ]},
      { name:"Advanced: RL, Federated Learning, GenAI, 6G", items:[
        { text:"RL fundamentals: Q-learning, Policy Gradient, DQN for telecom", type:"concept" },
        { text:"Multi-agent RL in O-RAN: distributed decision making across xApps", type:"concept" },
        { text:"Federated learning: distributed training across RAN nodes, privacy-preserving", type:"concept" },
        { text:"Generative AI in telecom: LLMs for network automation, intent-based networking", type:"concept" },
        { text:"Synthetic data generation for ML training in telecom", type:"concept" },
        { text:"6G AI-native networks: digital twins, zero-touch automation, cognitive networks", type:"concept" },
        { text:"AI-as-a-Service in telecom: cloud-based ML pipelines for operators", type:"concept" },
        { text:"3GPP Rel-18 AI/ML framework: CSI prediction, beam management, positioning", type:"concept" },
      ], resources:[
        { name:"3GPP RP-213599 – Study on AI/ML for NR", link:"https://www.3gpp.org/", type:"Spec", free:true },
        { name:"6G Flagship (University of Oulu)", link:"https://www.6gflagship.com/", type:"Research", free:true },
        { name:"YouTube: 6G AI-Native Networks", link:"https://www.youtube.com/results?search_query=6g+ai+native+networks+vision", type:"Video", free:true },
      ]},
    ],
    certs:[
      { name:"TensorFlow Developer Certificate", cost:"$100", hours:30, impact:90 },
      { name:"Deep Learning Specialization (Coursera)", cost:"$49/mo", hours:40, impact:85 },
      { name:"IEEE WCET Certification", cost:"$450", hours:60, impact:99 },
    ]
  },
  { id:9, title:"DevOps for Telecom", emoji:"⚙️", color:"#D4A017", duration:"Month 4 (August)", desc:"Industry gap = 10X salary — DevOps & Agile, CI/CD pipelines, IaC (Terraform/Ansible), Docker + K8s, cloud platforms, monitoring (Prometheus/Grafana), DevSecOps, network automation, 5G NFV/SDN",
    topics:[
      { name:"DevOps & Agile Fundamentals", items:[
        { text:"What is DevOps? Culture, Automation, Measurement, Sharing (CAMS model)", type:"concept" },
        { text:"DevOps vs Traditional IT: speed, collaboration, continuous feedback", type:"concept" },
        { text:"Agile fundamentals: Scrum, Kanban, sprints, retrospectives", type:"concept" },
        { text:"DevOps in Telecom: why telcos need DevOps for 5G cloud-native", type:"concept" },
        { text:"DORA Metrics: deployment frequency, lead time, change failure rate, MTTR", type:"concept" },
      ], resources:[
        { name:"Linux Foundation: DevOps for Telecom", link:"https://training.linuxfoundation.org/", type:"Course", free:false },
        { name:"YouTube: DevOps in Telecom Explained", link:"https://www.youtube.com/results?search_query=devops+telecom+5g+explained", type:"Video", free:true },
        { name:"The Phoenix Project (Book)", link:"https://www.amazon.com/dp/1942788290", type:"Book", free:false },
      ]},
      { name:"CI/CD Pipelines & Automation", items:[
        { text:"CI/CD concepts: build → test → package → deploy → monitor pipeline", type:"concept" },
        { text:"Pipeline stages: lint, unit test, integration test, security scan, deploy", type:"concept" },
        { text:"Tools: Jenkins, GitLab CI/CD, GitHub Actions — setup and configuration", type:"concept" },
        { text:"Artifact management: Docker Hub, Harbor, Nexus for NF images", type:"concept" },
        { text:"Testing in pipelines: unit, integration, E2E network tests for 5G NFs", type:"concept" },
        { text:"Blue-green and canary deployments for telecom network functions", type:"concept" },
      ], resources:[
        { name:"GitHub Actions Documentation", link:"https://docs.github.com/en/actions", type:"Tutorial", free:true },
        { name:"GitLab CI/CD Tutorial", link:"https://docs.gitlab.com/ee/ci/", type:"Tutorial", free:true },
        { name:"YouTube: CI/CD Pipeline for 5G CNFs", link:"https://www.youtube.com/results?search_query=cicd+pipeline+5g+cnf+telecom", type:"Video", free:true },
      ]},
      { name:"Infrastructure as Code (Terraform + Ansible)", items:[
        { text:"What is IaC? Declarative vs imperative infrastructure management", type:"concept" },
        { text:"Terraform fundamentals: providers, resources, state, plan, apply", type:"concept" },
        { text:"Terraform modules for 5G infrastructure provisioning (AWS/Azure)", type:"concept" },
        { text:"Ansible for config management: playbooks, roles, inventory", type:"concept" },
        { text:"Ansible for telecom: NF configuration, network device automation", type:"concept" },
        { text:"State management: remote state, locking, drift detection", type:"concept" },
        { text:"Testing IaC: terraform validate, tflint, Ansible molecule", type:"concept" },
      ], resources:[
        { name:"Terraform Official Tutorials", link:"https://developer.hashicorp.com/terraform/tutorials", type:"Tutorial", free:true },
        { name:"Ansible Getting Started", link:"https://docs.ansible.com/ansible/latest/getting_started/", type:"Tutorial", free:true },
        { name:"YouTube: Terraform for Telecom", link:"https://www.youtube.com/results?search_query=terraform+telecom+infrastructure", type:"Video", free:true },
      ]},
      { name:"Docker + Kubernetes for Telecom", items:[
        { text:"Docker fundamentals: images, containers, Dockerfiles, multi-stage builds", type:"concept" },
        { text:"Containerizing 5G NFs: AMF, SMF, UPF as Docker containers", type:"hands-on" },
        { text:"Kubernetes architecture: pods, deployments, services, namespaces, RBAC", type:"concept" },
        { text:"K8s workloads: StatefulSets for NFs, DaemonSets, Jobs, CronJobs", type:"concept" },
        { text:"K8s networking for telecom: Multus CNI (N3/N6), SCTP support, SR-IOV", type:"concept" },
        { text:"Helm charts: package, version, deploy 5G NFs as parameterized releases", type:"concept" },
        { text:"K8s storage: PersistentVolumes for NF state, CSI drivers", type:"concept" },
        { text:"Deploy Open5GS / free5GC on K8s with Helm charts", type:"hands-on" },
      ], resources:[
        { name:"Docker Getting Started", link:"https://docs.docker.com/get-started/", type:"Tutorial", free:true },
        { name:"Kubernetes Official Tutorials", link:"https://kubernetes.io/docs/tutorials/", type:"Tutorial", free:true },
        { name:"Gradiant 5G Helm Charts", link:"https://gradiant.github.io/5g-charts/", type:"Tool", free:true },
        { name:"towards5gs-helm (GitHub)", link:"https://github.com/Orange-OpenSource/towards5gs-helm", type:"Tool", free:true },
        { name:"KodeKloud: Docker & K8s", link:"https://kodekloud.com", type:"Course", free:false },
      ]},
      { name:"Cloud Platforms & Monitoring", items:[
        { text:"Cloud models for telecom: private, public, hybrid, multi-cloud", type:"concept" },
        { text:"OpenStack NFVi: compute, storage, networking for telco VMs", type:"concept" },
        { text:"Public cloud: AWS / Azure / GCP for 5G workloads", type:"concept" },
        { text:"Telco Edge & MEC: edge computing for URLLC, content caching", type:"concept" },
        { text:"Prometheus: metrics collection, PromQL queries, alerting rules", type:"concept" },
        { text:"Grafana: dashboards for 5G KPIs (throughput, latency, UE count)", type:"hands-on" },
        { text:"Alertmanager: Slack/email alerts on SLA violations", type:"concept" },
        { text:"Logging: EFK stack (Elasticsearch + Fluentd + Kibana) or Loki + Grafana", type:"concept" },
        { text:"Distributed tracing: Jaeger for NF-to-NF call tracing in 5GC SBA", type:"concept" },
        { text:"AIOps in telecom: ML-driven ops, automated root cause analysis", type:"concept" },
      ], resources:[
        { name:"Prometheus Documentation", link:"https://prometheus.io/docs/introduction/overview/", type:"Tutorial", free:true },
        { name:"Grafana Getting Started", link:"https://grafana.com/docs/grafana/latest/getting-started/", type:"Tutorial", free:true },
        { name:"Grafana Play: Example Dashboards", link:"https://play.grafana.org/", type:"Tool", free:true },
        { name:"AWS Free Tier", link:"https://aws.amazon.com/free/", type:"Tool", free:true },
      ]},
      { name:"DevSecOps & Network Automation", items:[
        { text:"DevSecOps: shift-left security, SAST & DAST in pipelines", type:"concept" },
        { text:"Container security: image scanning (Trivy), runtime security (Falco)", type:"concept" },
        { text:"Secrets management: HashiCorp Vault, K8s Secrets, sealed-secrets", type:"concept" },
        { text:"Compliance as Code: OPA/Gatekeeper for policy enforcement", type:"concept" },
        { text:"Network automation: YANG data models, NETCONF & RESTCONF protocols", type:"concept" },
        { text:"Ansible for network devices: playbooks for router/switch configuration", type:"concept" },
        { text:"Python & Nornir for network automation scripts", type:"concept" },
        { text:"GitOps for network config: ArgoCD/Flux for declarative network state", type:"concept" },
      ], resources:[
        { name:"ArgoCD Getting Started", link:"https://argo-cd.readthedocs.io/en/stable/getting_started/", type:"Tutorial", free:true },
        { name:"HashiCorp Vault Tutorials", link:"https://developer.hashicorp.com/vault/tutorials", type:"Tutorial", free:true },
        { name:"Nornir Documentation", link:"https://nornir.readthedocs.io/", type:"Tutorial", free:true },
        { name:"YouTube: GitOps for Telecom", link:"https://www.youtube.com/results?search_query=gitops+argocd+telecom+5g", type:"Video", free:true },
      ]},
      { name:"5G NFV, SDN & Capstone", items:[
        { text:"NFV lifecycle automation: onboard, instantiate, scale, heal, terminate VNFs/CNFs", type:"concept" },
        { text:"SDN & OpenDaylight: centralized control plane for network programmability", type:"concept" },
        { text:"5G Core DevOps: automate AMF/SMF/UPF deployment with CI/CD + K8s", type:"concept" },
        { text:"Network Slicing Automation: end-to-end slice provisioning with APIs", type:"concept" },
        { text:"DevOps maturity model: assess and improve your team's DevOps practices", type:"concept" },
        { text:"Capstone: deploy full 5GC on K8s with CI/CD, monitoring, and GitOps", type:"hands-on" },
      ], resources:[
        { name:"ETSI NFV Architecture", link:"https://www.etsi.org/technologies/nfv", type:"Spec", free:true },
        { name:"ONF SDN Architecture", link:"https://opennetworking.org/sdn-definition/", type:"Reference", free:true },
        { name:"Aether Project: 5G Connected Edge", link:"https://docs.aetherproject.org/", type:"Tutorial", free:true },
      ]},
    ],
    certs:[
      { name:"Certified Kubernetes Administrator (CKA)", cost:"$395", hours:30, impact:88 },
      { name:"AWS Solutions Architect Associate", cost:"$150", hours:40, impact:85 },
      { name:"HashiCorp Terraform Associate", cost:"$70", hours:20, impact:75 },
      { name:"Certified DevOps Engineer (AWS/Azure)", cost:"$300", hours:40, impact:82 },
    ]
  },
];

const typeColors = { Spec:"#2563EB", Course:"#10B981", Reference:"#F59E0B", Video:"#EC4899", Book:"#8B5CF6", Tutorial:"#06B6D4", Tool:"#E8553D", Whitepaper:"#14B8A6", Paper:"#A78BFA", Practice:"#F97316", Testbed:"#64748B", Research:"#84CC16" };

export default function FiveGPathway(){
  const[activeSection,setActiveSection]=useState(0);
  const[expandedTopic,setExpandedTopic]=useState(0);
  const[progress,setProgress]=useState({});
  const[loading,setLoading]=useState(true);
  const[tab,setTab]=useState("learn"); // learn | certs | resources

  useEffect(()=>{
    (async()=>{
      try{ const r=await window.storage.get("5g-progress"); if(r) setProgress(JSON.parse(r.value)); }catch(e){}
      setLoading(false);
    })();
  },[]);

  const toggleItem=async(sectionId,topicIdx,itemIdx)=>{
    const key=`${sectionId}-${topicIdx}-${itemIdx}`;
    const np={...progress,[key]:!progress[key]};
    setProgress(np);
    try{await window.storage.set("5g-progress",JSON.stringify(np));}catch(e){}
  };

  const sec=sections[activeSection];
  const totalItems=sec.topics.reduce((a,t)=>a+t.items.length,0);
  const doneItems=sec.topics.reduce((a,t,ti)=>a+t.items.filter((_,ii)=>progress[`${sec.id}-${ti}-${ii}`]).length,0);
  const secPct=totalItems?Math.round((doneItems/totalItems)*100):0;

  const allTotal=sections.reduce((a,s)=>a+s.topics.reduce((b,t)=>b+t.items.length,0),0);
  const allDone=sections.reduce((a,s,si)=>a+s.topics.reduce((b,t,ti)=>b+t.items.filter((_,ii)=>progress[`${s.id}-${ti}-${ii}`]).length,0),0);
  const overallPct=allTotal?Math.round((allDone/allTotal)*100):0;

  const S={card:{background:"linear-gradient(150deg,#0C1020,#111828)",border:"1px solid #19223A",borderRadius:14}};

  if(loading) return <div style={{fontFamily:"'DM Sans',sans-serif",background:"#06080F",color:"#CBD5E1",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>Loading...</div>;

  return(
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif",background:"#06080F",color:"#CBD5E1",minHeight:"100vh"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#19223A;border-radius:4px}
        @keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .up{animation:up .4s ease forwards}.d1{animation-delay:.05s;opacity:0}.d2{animation-delay:.1s;opacity:0}
        button{cursor:pointer;border:none;outline:none;font-family:inherit}a{text-decoration:none}
        .ck{width:20px;height:20px;border-radius:5px;border:2px solid #19223A;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;flex-shrink:0;transition:all .2s}
        .ck.on{background:#10B981;border-color:#10B981}
        .bar{height:5px;border-radius:3px;background:#0C1020;overflow:hidden}.bf{height:100%;border-radius:3px;transition:width 1s ease}
        .tag{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:.5px;white-space:nowrap}
      `}</style>

      {/* HEADER */}
      <header style={{background:"linear-gradient(180deg,#0A0E1A,#06080F)",borderBottom:"1px solid #111828",padding:"18px 16px 10px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:880,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:11}}>
              <div style={{width:36,height:36,borderRadius:9,background:"linear-gradient(135deg,#E8553D,#2563EB)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,fontFamily:"Syne",color:"#fff"}}>5G</div>
              <div>
                <h1 style={{fontSize:15,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9"}}>5G Engineer Pathway</h1>
                <p style={{fontSize:9,color:"#334155",fontFamily:"Space Mono",letterSpacing:1}}>BUILDER + ARCHITECT + AI EXPERT · 36 WEEKS + 4-MONTH CAREER PLAN</p>
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:16,fontWeight:800,fontFamily:"Syne",color:overallPct>=80?"#10B981":overallPct>=40?"#F59E0B":"#2563EB"}}>{overallPct}%</div>
              <div style={{fontSize:8,color:"#334155"}}>Overall</div>
            </div>
          </div>

          {/* Section nav */}
          <div style={{display:"flex",gap:3,overflowX:"auto"}}>
            {sections.map((s,i)=>(
              <button key={i} onClick={()=>{setActiveSection(i);setExpandedTopic(0)}}
                style={{padding:"6px 12px",borderRadius:7,fontSize:10,fontWeight:600,display:"flex",alignItems:"center",gap:4,whiteSpace:"nowrap",
                  background:activeSection===i?s.color+"18":"transparent",color:activeSection===i?s.color:"#334155",
                  border:`1px solid ${activeSection===i?s.color+"40":"transparent"}`}}>
                <span style={{fontSize:12}}>{s.emoji}</span>S{s.id}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main style={{maxWidth:880,margin:"0 auto",padding:16}}>
        {/* Section Header */}
        <div className="up" style={{marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
            <span style={{fontSize:28}}>{sec.emoji}</span>
            <div>
              <h2 style={{fontSize:20,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9"}}>Section {sec.id}: {sec.title}</h2>
              <p style={{fontSize:11,color:"#475569"}}>{sec.duration} · {sec.desc}</p>
            </div>
          </div>
          <div className="bar" style={{marginTop:8}}>
            <div className="bf" style={{width:`${secPct}%`,background:`linear-gradient(90deg,${sec.color},${sec.color}88)`}}/>
          </div>
          <div style={{fontSize:10,color:"#475569",marginTop:4}}>{doneItems}/{totalItems} concepts mastered · {secPct}% complete</div>
        </div>

        {/* Sub-tabs */}
        <div className="up d1" style={{display:"flex",gap:5,marginBottom:14}}>
          {[["learn","📖 Learn"],["resources","🔗 Resources"],["certs","🏆 Certs"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)}
              style={{padding:"7px 14px",borderRadius:7,fontSize:11,fontWeight:600,
                background:tab===k?sec.color+"18":"#0A0E1A",color:tab===k?sec.color:"#334155",
                border:`1px solid ${tab===k?sec.color+"40":"#19223A"}`}}>{l}</button>
          ))}
        </div>

        {/* LEARN TAB */}
        {tab==="learn"&&(<div>
          {/* Topic selector */}
          <div className="up d1" style={{display:"flex",gap:4,marginBottom:14,overflowX:"auto"}}>
            {sec.topics.map((t,i)=>{
              const td=t.items.filter((_,ii)=>progress[`${sec.id}-${i}-${ii}`]).length;
              const tp=t.items.length?Math.round((td/t.items.length)*100):0;
              return(
                <button key={i} onClick={()=>setExpandedTopic(i)}
                  style={{padding:"8px 12px",borderRadius:8,fontSize:10,fontWeight:600,whiteSpace:"nowrap",minWidth:60,
                    background:expandedTopic===i?sec.color+"16":"#0A0E1A",color:expandedTopic===i?"#F1F5F9":"#475569",
                    border:`1px solid ${expandedTopic===i?sec.color+"40":"#19223A"}`}}>
                  {t.name.split(" ").slice(0,2).join(" ")} {tp>0&&<span style={{color:"#10B981",marginLeft:4}}>{tp}%</span>}
                </button>
              );
            })}
          </div>

          {sec.topics[expandedTopic]&&(()=>{
            const topic=sec.topics[expandedTopic];
            return(
              <div className="up d2" style={{...S.card,padding:18}}>
                <h3 style={{fontSize:15,fontWeight:700,fontFamily:"Syne",color:"#F1F5F9",marginBottom:14}}>{topic.name}</h3>
                {topic.items.map((item,ii)=>{
                  const done=progress[`${sec.id}-${expandedTopic}-${ii}`];
                  return(
                    <div key={ii} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:ii<topic.items.length-1?"1px solid #111828":"none",opacity:done?.45:1,transition:"opacity .3s"}}>
                      <button className={`ck ${done?"on":""}`} onClick={()=>toggleItem(sec.id,expandedTopic,ii)}>{done?"✓":""}</button>
                      <div style={{flex:1}}>
                        <span style={{fontSize:12,color:done?"#334155":"#E2E8F0",textDecoration:done?"line-through":"none",lineHeight:1.6}}>{item.text}</span>
                      </div>
                      <span className="tag" style={{background:item.type==="hands-on"?"#E8553D14":"#2563EB14",color:item.type==="hands-on"?"#E8553D":"#60A5FA",flexShrink:0}}>{item.type}</span>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>)}

        {/* RESOURCES TAB */}
        {tab==="resources"&&(<div>
          {sec.topics.map((topic,ti)=>(
            <div key={ti} className="up" style={{...S.card,padding:16,marginBottom:10,animationDelay:`${ti*.05}s`,opacity:0}}>
              <h3 style={{fontSize:13,fontWeight:700,fontFamily:"Syne",color:"#F1F5F9",marginBottom:10}}>{topic.name}</h3>
              {topic.resources.map((r,ri)=>(
                <div key={ri} style={{display:"flex",gap:8,padding:"7px 0",borderBottom:ri<topic.resources.length-1?"1px solid #0C1020":"none",alignItems:"flex-start"}}>
                  <span className="tag" style={{background:(typeColors[r.type]||"#666")+"14",color:typeColors[r.type]||"#666",flexShrink:0}}>{r.type}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <a href={r.link} target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:"#94A3B8",lineHeight:1.5}}>
                      {r.name}
                    </a>
                  </div>
                  <span className="tag" style={{background:r.free?"#10B98114":"#F59E0B14",color:r.free?"#10B981":"#F59E0B",flexShrink:0}}>{r.free?"Free":"Paid"}</span>
                </div>
              ))}
            </div>
          ))}
        </div>)}

        {/* CERTS TAB */}
        {tab==="certs"&&(<div>
          <div className="up" style={{...S.card,padding:18,marginBottom:14}}>
            <h3 style={{fontSize:13,fontWeight:700,fontFamily:"Syne",color:sec.color,marginBottom:14}}>Certifications for Section {sec.id}</h3>
            {sec.certs.map((c,ci)=>(
              <div key={ci} style={{padding:"12px 0",borderBottom:ci<sec.certs.length-1?"1px solid #0C1020":"none"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:600,color:"#F1F5F9"}}>{c.name}</div>
                    <div style={{fontSize:11,color:"#475569",marginTop:3}}>⏱ {c.hours}h · 💰 {c.cost}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:18,fontWeight:800,fontFamily:"Syne",color:c.impact>=90?"#E8553D":c.impact>=80?"#10B981":"#F59E0B"}}>{c.impact}</div>
                    <div style={{fontSize:8,color:"#334155"}}>Impact</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* All certs summary */}
          <div className="up d1" style={{...S.card,padding:18}}>
            <h3 style={{fontSize:13,fontWeight:700,fontFamily:"Syne",color:"#F59E0B",marginBottom:12}}>Full Certification Stack (All Sections)</h3>
            {sections.flatMap(s=>s.certs.map(c=>({...c,section:s.title,color:s.color}))).sort((a,b)=>b.impact-a.impact).map((c,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:i<11?"1px solid #0C1020":"none"}}>
                <span style={{fontSize:14,fontWeight:800,fontFamily:"Syne",color:c.impact>=90?"#E8553D":"#10B981",minWidth:22}}>{c.impact}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:600,color:"#E2E8F0"}}>{c.name}</div>
                  <div style={{fontSize:10,color:"#334155"}}>{c.section} · {c.cost} · {c.hours}h</div>
                </div>
              </div>
            ))}
          </div>
        </div>)}

        {/* Progress overview */}
        <div className="up" style={{...S.card,padding:16,marginTop:16}}>
          <h3 style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#475569",letterSpacing:1.5,marginBottom:10}}>ALL SECTIONS PROGRESS</h3>
          {sections.map((s,si)=>{
            const t=s.topics.reduce((a,tp)=>a+tp.items.length,0);
            const d=s.topics.reduce((a,tp,ti)=>a+tp.items.filter((_,ii)=>progress[`${s.id}-${ti}-${ii}`]).length,0);
            const p=t?Math.round((d/t)*100):0;
            return(
              <div key={si} style={{marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:3}}>
                  <span style={{color:"#94A3B8"}}>{s.emoji} S{s.id}: {s.title}</span>
                  <span style={{fontWeight:700,fontFamily:"Syne",color:p>=80?"#10B981":p>0?s.color:"#334155"}}>{p}%</span>
                </div>
                <div className="bar"><div className="bf" style={{width:`${p}%`,background:p>=80?"#10B981":s.color}}/></div>
              </div>
            );
          })}
        </div>
      </main>

      <footer style={{textAlign:"center",padding:"28px 16px 36px",fontSize:9,fontFamily:"Space Mono",color:"#111828",letterSpacing:1.5}}>
        5G ENGINEER PATHWAY · NITIN GUPTA + CHHAVI GUPTA · DECODE5G
      </footer>
    </div>
  );
}
