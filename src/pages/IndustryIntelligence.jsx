import { useState, useEffect } from "react";

// ─── COMPANY DATA: TOP 50 US WIRELESS/TELECOM ──────────────────────────
const companies = [
  // TIER A: Chipset & Semiconductor
  { name:"Qualcomm", cat:"Chipset", hq:"San Diego, CA", size:"51,000+", focus:"5G modems, RFFE, Wi-Fi/BT SoCs, AI", topSkills:["C/C++","MATLAB","DSP","5G NR","RFFE","Verilog","Python","Signal Processing"], certs:["Qualcomm Academy 5G","IEEE WCET"], salary:"$120K–$200K", internPay:"$7,500–$9,500/mo", hiring:"Very Active", url:"https://careers.qualcomm.com" },
  { name:"Broadcom", cat:"Chipset", hq:"San Jose, CA", size:"20,000+", focus:"Wi-Fi 7, BT, switching ASICs, broadband", topSkills:["RFIC Design","CMOS","Cadence","Verilog","C","MATLAB","ADS"], certs:["Cadence Cert","ADS Cert"], salary:"$130K–$210K", internPay:"$8,000–$10,000/mo", hiring:"Active", url:"https://www.broadcom.com/company/careers" },
  { name:"Intel", cat:"Chipset", hq:"Santa Clara, CA", size:"110,000+", focus:"5G platform, modem, Wi-Fi 7, edge AI", topSkills:["C/C++","Python","5G","FPGA","SystemVerilog","Linux","MATLAB"], certs:["Intel oneAPI","AWS CCP"], salary:"$110K–$190K", internPay:"$35–$55/hr", hiring:"Active", url:"https://jobs.intel.com" },
  { name:"Texas Instruments", cat:"Chipset", hq:"Dallas, TX", size:"34,000+", focus:"Analog/mixed-signal, RF front-end, mmWave radar", topSkills:["Analog Design","SPICE","MATLAB","C","PCB","EM Sim","ADS"], certs:["TI Training Certs","ADS Cert"], salary:"$100K–$175K", internPay:"$30–$45/hr", hiring:"Active", url:"https://careers.ti.com" },
  { name:"Skyworks Solutions", cat:"Chipset", hq:"Irvine, CA", size:"10,000+", focus:"RF front-end modules, filters, amplifiers", topSkills:["RF Design","ADS","HFSS","GaAs/GaN","MATLAB","LNA/PA","Filter Design"], certs:["Keysight ADS","HFSS Cert"], salary:"$100K–$165K", internPay:"$30–$45/hr", hiring:"Active", url:"https://careers.skyworksinc.com" },
  { name:"Qorvo", cat:"Chipset", hq:"Greensboro, NC", size:"9,000+", focus:"GaN/GaAs PAs, filters, 5G RFFE", topSkills:["RF/Microwave","GaN","ADS","HFSS","MATLAB","PA Design","Python"], certs:["Keysight ADS","ANSYS HFSS"], salary:"$95K–$160K", internPay:"$30–$45/hr", hiring:"Active", url:"https://www.qorvo.com/careers" },
  { name:"Marvell Technology", cat:"Chipset", hq:"Wilmington, DE", size:"7,500+", focus:"5G infrastructure SoCs, DPU, cloud-optimized silicon", topSkills:["Verilog","FPGA","DSP","C/C++","Python","5G","Signal Processing"], certs:["Xilinx/AMD FPGA"], salary:"$120K–$200K", internPay:"$40–$55/hr", hiring:"Active", url:"https://www.marvell.com/careers" },
  { name:"Analog Devices", cat:"Chipset", hq:"Wilmington, MA", size:"26,000+", focus:"RF transceivers, data converters, 5G radio", topSkills:["Analog/Mixed-Signal","RF Design","MATLAB","Python","ADS","DSP"], certs:["ADI University Program"], salary:"$100K–$180K", internPay:"$35–$50/hr", hiring:"Active", url:"https://www.analog.com/en/about-adi/careers.html" },

  // TIER B: Network Infrastructure & Equipment
  { name:"Nokia (Bell Labs)", cat:"Infrastructure", hq:"Murray Hill, NJ", size:"86,000+", focus:"5G RAN, O-RAN, optical, IP/MPLS, research", topSkills:["5G NR","O-RAN","Python","C/C++","Linux","MATLAB","ML","Network Protocols"], certs:["Nokia NRS I/II","Nokia SRC"], salary:"$100K–$170K", internPay:"$30–$45/hr", hiring:"Very Active", url:"https://www.nokia.com/careers/" },
  { name:"Ericsson", cat:"Infrastructure", hq:"Plano, TX (US)", size:"95,000+", focus:"5G RAN, cloud RAN, network slicing, IoT", topSkills:["5G NR","RAN","Java","Python","Cloud","Kubernetes","Linux","MATLAB"], certs:["Ericsson Cert Program","AWS"], salary:"$95K–$165K", internPay:"$28–$42/hr", hiring:"Very Active", url:"https://www.ericsson.com/en/careers" },
  { name:"Samsung Networks", cat:"Infrastructure", hq:"Plano, TX", size:"270,000+", focus:"5G RAN, vRAN, Open RAN, network solutions", topSkills:["5G","C/C++","Python","RAN","O-RAN","Linux","DSP","ML"], certs:["Samsung Dev Certs"], salary:"$100K–$175K", internPay:"$4,200–$6,300/mo", hiring:"Active", url:"https://www.samsung.com/us/about-us/careers/" },
  { name:"Cisco Systems", cat:"Infrastructure", hq:"San Jose, CA", size:"84,000+", focus:"Enterprise wireless, Wi-Fi 7, Meraki, SD-WAN, IoT", topSkills:["Networking","Python","Wi-Fi","SD-WAN","Cloud","Linux","Automation"], certs:["CCNA","CCNP","CCIE Wireless","DevNet"], salary:"$110K–$185K", internPay:"$35–$55/hr", hiring:"Very Active", url:"https://jobs.cisco.com" },
  { name:"Juniper Networks", cat:"Infrastructure", hq:"Sunnyvale, CA", size:"10,000+", focus:"AI-driven networking, SD-WAN, Mist Wi-Fi", topSkills:["Networking","Python","AI/ML","Cloud","Automation","Linux"], certs:["JNCIA","JNCIS","JNCIE"], salary:"$110K–$180K", internPay:"$35–$50/hr", hiring:"Active", url:"https://www.juniper.net/us/en/company/careers.html" },
  { name:"Arista Networks", cat:"Infrastructure", hq:"Santa Clara, CA", size:"4,000+", focus:"Cloud networking, campus Wi-Fi, AI networking", topSkills:["Python","Networking","Linux","Cloud","EOS","Automation","Go"], certs:["Arista ACE"], salary:"$130K–$220K", internPay:"$45–$60/hr", hiring:"Active", url:"https://www.arista.com/en/careers" },
  { name:"Ciena", cat:"Infrastructure", hq:"Hanover, MD", size:"7,500+", focus:"Optical networking, coherent optics, 5G transport", topSkills:["Optical Comms","DSP","Python","DWDM","C/C++","FPGA"], certs:["Ciena Expert Cert"], salary:"$95K–$160K", internPay:"$30–$45/hr", hiring:"Active", url:"https://www.ciena.com/about/careers" },
  { name:"CommScope", cat:"Infrastructure", hq:"Hickory, NC", size:"30,000+", focus:"DAS, small cells, fiber, RUCKUS Wi-Fi", topSkills:["RF Planning","DAS","Small Cell","Wi-Fi","Python","Network Design"], certs:["CommScope Univ.","BICSI"], salary:"$85K–$145K", internPay:"$25–$40/hr", hiring:"Active", url:"https://www.commscope.com/careers/" },
  { name:"Corning Incorporated", cat:"Infrastructure", hq:"Corning, NY", size:"36,000+", focus:"Optical fiber, 5G fiber solutions", topSkills:["Optical Fiber","Materials Science","Python","RF","Project Mgmt"], certs:["BICSI","FTTx Cert"], salary:"$85K–$150K", internPay:"$25–$40/hr", hiring:"Active", url:"https://www.corning.com/worldwide/en/careers.html" },

  // TIER C: Carriers & Operators
  { name:"Verizon", cat:"Carrier", hq:"New York, NY", size:"105,000+", focus:"5G Ultra Wideband, MEC, Fixed Wireless, IoT", topSkills:["5G","Network Eng","Python","Cloud","RF Planning","Data Analytics","ML"], certs:["AWS/Azure","Cisco CCNA","CompTIA Net+"], salary:"$90K–$160K", internPay:"$25–$40/hr", hiring:"Very Active", url:"https://www.verizon.com/about/careers" },
  { name:"T-Mobile US", cat:"Carrier", hq:"Bellevue, WA", size:"71,000+", focus:"5G nationwide, SA 5G, Starlink D2D, FWA", topSkills:["5G","Python","ML/AI","Cloud","Data Science","RF Engineering","SQL"], certs:["AWS","TensorFlow","Tableau"], salary:"$85K–$155K", internPay:"$20–$40/hr", hiring:"Very Active", url:"https://www.t-mobile.com/careers" },
  { name:"AT&T", cat:"Carrier", hq:"Dallas, TX", size:"150,000+", focus:"5G+, FirstNet, fiber, AT&T Labs research", topSkills:["5G","Network Eng","Python","Java","Cloud","Data Analytics","ML","SQL"], certs:["AWS","Azure","CCNA","PMP"], salary:"$90K–$160K", internPay:"$25–$42/hr", hiring:"Very Active", url:"https://www.att.jobs" },
  { name:"DISH Network", cat:"Carrier", hq:"Englewood, CO", size:"16,000+", focus:"Cloud-native 5G O-RAN greenfield network", topSkills:["O-RAN","Cloud Native","Kubernetes","Python","5G","AWS","Linux"], certs:["AWS","CKA","O-RAN Alliance"], salary:"$90K–$155K", internPay:"$25–$38/hr", hiring:"Active", url:"https://www.dish.com/company/careers" },
  { name:"Charter (Spectrum)", cat:"Carrier", hq:"Stamford, CT", size:"93,000+", focus:"Spectrum Mobile, CBRS, Wi-Fi, cable broadband", topSkills:["Wireless Networks","RF","Python","Data Analytics","DOCSIS"], certs:["SCTE","CompTIA","AWS"], salary:"$80K–$140K", internPay:"$25–$35/hr", hiring:"Active", url:"https://jobs.spectrum.com" },
  { name:"US Cellular", cat:"Carrier", hq:"Chicago, IL", size:"4,500+", focus:"Regional 5G, rural broadband, IoT", topSkills:["5G","RF Planning","Network Eng","Python","Data Analytics"], certs:["CCNA","AWS"], salary:"$75K–$130K", internPay:"$22–$32/hr", hiring:"Moderate", url:"https://www.uscellular.com/careers" },

  // TIER D: Defense & Aerospace
  { name:"Lockheed Martin", cat:"Defense", hq:"Bethesda, MD", size:"116,000+", focus:"Radar, EW, SATCOM, tactical comms, THz", topSkills:["RF Design","MATLAB","Signal Processing","C/C++","HFSS","ADS","Radar","EM Sim"], certs:["Security Clearance","PMP","HFSS Cert"], salary:"$95K–$170K", internPay:"$30–$42/hr", hiring:"Very Active", url:"https://www.lockheedmartinjobs.com" },
  { name:"Raytheon (RTX)", cat:"Defense", hq:"Arlington, VA", size:"180,000+", focus:"Radar, EW, missile guidance, SIGINT", topSkills:["RF/Microwave","MATLAB","Signal Processing","C/C++","DSP","Python","Radar"], certs:["Security Clearance","IEEE WCET"], salary:"$95K–$175K", internPay:"$30–$45/hr", hiring:"Very Active", url:"https://careers.rtx.com" },
  { name:"Northrop Grumman", cat:"Defense", hq:"Falls Church, VA", size:"95,000+", focus:"Space comms, EW, autonomous systems, 5G mil", topSkills:["RF Design","MATLAB","Python","C/C++","FPGA","HFSS","Signal Proc"], certs:["Security Clearance","PMP"], salary:"$95K–$170K", internPay:"$28–$42/hr", hiring:"Very Active", url:"https://www.northropgrumman.com/careers/" },
  { name:"L3Harris Technologies", cat:"Defense", hq:"Melbourne, FL", size:"47,000+", focus:"Tactical radio, SATCOM, spectrum mgmt, SIGINT", topSkills:["RF Design","SDR","MATLAB","C/C++","DSP","FPGA","Signal Proc"], certs:["Security Clearance","SDR Cert"], salary:"$90K–$160K", internPay:"$28–$40/hr", hiring:"Active", url:"https://careers.l3harris.com" },
  { name:"BAE Systems", cat:"Defense", hq:"Nashua, NH (US)", size:"90,000+", focus:"EW, COMINT, adaptive comms, SIGINT", topSkills:["RF/Microwave","EM Theory","MATLAB","C/C++","DSP","Python","ADS"], certs:["Security Clearance","HFSS/ADS"], salary:"$90K–$165K", internPay:"$30–$40/hr", hiring:"Active", url:"https://jobs.baesystems.com" },
  { name:"General Dynamics", cat:"Defense", hq:"Reston, VA", size:"106,000+", focus:"Tactical comms, SATCOM, C4ISR, 5G mil", topSkills:["RF Design","MATLAB","Python","C","SDR","FPGA","Networking"], certs:["Security Clearance","CCNA"], salary:"$90K–$160K", internPay:"$28–$40/hr", hiring:"Active", url:"https://www.gd.com/careers" },
  { name:"Aerospace Corp", cat:"Defense", hq:"El Segundo, CA", size:"4,500+", focus:"Space systems, SATCOM, signal processing R&D", topSkills:["Signal Processing","Python","MATLAB","GNU Radio","C/C++","DSP","RF"], certs:["Security Clearance"], salary:"$100K–$170K", internPay:"$5,600–$8,300/mo", hiring:"Active", url:"https://aerospace.org/careers" },
  { name:"MITRE Corporation", cat:"Defense", hq:"McLean, VA", size:"9,000+", focus:"5G security, spectrum, wireless R&D for DoD", topSkills:["5G","Python","ML","Signal Proc","Cybersecurity","MATLAB","RF"], certs:["Security Clearance","CISSP"], salary:"$100K–$175K", internPay:"$30–$48/hr", hiring:"Active", url:"https://www.mitre.org/careers" },

  // TIER E: Test & Measurement
  { name:"Keysight Technologies", cat:"Test & Measurement", hq:"Santa Rosa, CA", size:"15,000+", focus:"5G test, RF instruments, EDA (ADS), PathWave", topSkills:["RF Testing","ADS","Python","5G NR","Signal Analysis","EM Sim","MATLAB"], certs:["Keysight RF & Microwave Cert","Keysight IoT Cert","Keysight HSD Cert"], salary:"$95K–$165K", internPay:"$30–$48/hr", hiring:"Active", url:"https://jobs.keysight.com" },
  { name:"Rohde & Schwarz", cat:"Test & Measurement", hq:"Columbia, MD (US)", size:"14,000+", focus:"5G/6G test, spectrum monitoring, broadcast", topSkills:["RF Testing","5G","Signal Analysis","Python","MATLAB","EM Compliance"], certs:["R&S 5G Training","IEEE WCET"], salary:"$90K–$155K", internPay:"$28–$42/hr", hiring:"Active", url:"https://www.rohde-schwarz.com/us/career/" },
  { name:"National Instruments (NI)", cat:"Test & Measurement", hq:"Austin, TX", size:"7,500+", focus:"SDR platforms, LabVIEW, 5G prototyping, MIMO", topSkills:["LabVIEW","Python","SDR","MIMO","5G","FPGA","Signal Proc","C"], certs:["NI LabVIEW CLAD/CLD","NI USRP Cert"], salary:"$85K–$150K", internPay:"$25–$42/hr", hiring:"Active", url:"https://www.ni.com/en/about-ni/careers.html" },
  { name:"Ansys", cat:"Test & Measurement", hq:"Canonsburg, PA", size:"6,000+", focus:"HFSS, EM simulation, antenna design, 5G modeling", topSkills:["EM Simulation","HFSS","Python","Antenna Design","FEA","RF Design"], certs:["ANSYS HFSS Cert","ANSYS ACE"], salary:"$100K–$170K", internPay:"$30–$48/hr", hiring:"Active", url:"https://www.ansys.com/about-ansys/careers" },

  // TIER F: Cloud, Software & Virtualized Networks
  { name:"Google (Networking)", cat:"Cloud/Software", hq:"Mountain View, CA", size:"180,000+", focus:"Fi wireless, cloud networking, Tensor, research", topSkills:["Python","ML/DL","C++","Networking","TensorFlow","Research","Linux"], certs:["Google TF Cert","GCP Cert"], salary:"$140K–$250K", internPay:"$9,400–$12,500/mo", hiring:"Very Active", url:"https://careers.google.com" },
  { name:"Amazon (AWS/Kuiper)", cat:"Cloud/Software", hq:"Seattle, WA", size:"1.5M+", focus:"Project Kuiper LEO, AWS 5G edge, IoT Core", topSkills:["Python","AWS","C/C++","ML","Cloud","RF (Kuiper)","Signal Proc"], certs:["AWS CCP","AWS SAA","AWS ML Specialty"], salary:"$130K–$230K", internPay:"$8,000–$12,000/mo", hiring:"Very Active", url:"https://www.amazon.jobs" },
  { name:"Microsoft (Azure)", cat:"Cloud/Software", hq:"Redmond, WA", size:"220,000+", focus:"Azure 5G edge, Azure Operator Nexus, private 5G", topSkills:["Python","Azure","C#","Cloud","Kubernetes","5G","ML","Linux"], certs:["Azure AI-900","AZ-104","AZ-305"], salary:"$130K–$230K", internPay:"$8,000–$11,000/mo", hiring:"Very Active", url:"https://careers.microsoft.com" },
  { name:"Meta (Connectivity)", cat:"Cloud/Software", hq:"Menlo Park, CA", size:"67,000+", focus:"Terragraph 60GHz, subsea cables, connectivity R&D", topSkills:["Python","C++","ML","RF/mmWave","Signal Proc","Research","Linux"], certs:["TensorFlow","PyTorch"], salary:"$140K–$260K", internPay:"$9,000–$12,000/mo", hiring:"Active", url:"https://www.metacareers.com" },
  { name:"Apple (Wireless)", cat:"Cloud/Software", hq:"Cupertino, CA", size:"164,000+", focus:"iPhone modem, Wi-Fi/BT, UWB, satellite SOS", topSkills:["RF Design","C/C++","MATLAB","Antenna Design","HFSS","5G","Signal Proc"], certs:["Keysight ADS","HFSS Cert"], salary:"$140K–$250K", internPay:"$8,500–$11,000/mo", hiring:"Active", url:"https://jobs.apple.com" },
  { name:"VMware (Broadcom)", cat:"Cloud/Software", hq:"Palo Alto, CA", size:"38,000+", focus:"Telco cloud, NFV, vRAN, 5G core virtualization", topSkills:["Cloud","Kubernetes","Python","NFV","5G Core","Linux","Networking"], certs:["VCP-NV","CKA","AWS"], salary:"$110K–$185K", internPay:"$35–$50/hr", hiring:"Moderate", url:"https://www.vmware.com/careers.html" },

  // TIER G: Specialized Wireless
  { name:"Motorola Solutions", cat:"Specialized", hq:"Chicago, IL", size:"21,000+", focus:"LMR, FirstNet, mission-critical comms, P25", topSkills:["RF Design","DSP","C/C++","Python","LTE","Signal Processing","SDR"], certs:["Motorola Certs","P25 CAP"], salary:"$90K–$155K", internPay:"$28–$42/hr", hiring:"Active", url:"https://www.motorolasolutions.com/en_us/about/careers.html" },
  { name:"Ubiquiti", cat:"Specialized", hq:"New York, NY", size:"1,500+", focus:"Enterprise Wi-Fi (UniFi), PtP/PtMP wireless", topSkills:["RF Design","Networking","Linux","Python","Antenna","Wi-Fi","Embedded"], certs:["UBWA","UEWA"], salary:"$100K–$170K", internPay:"$35–$50/hr", hiring:"Moderate", url:"https://careers.ui.com" },
  { name:"Cambium Networks", cat:"Specialized", hq:"Rolling Meadows, IL", size:"900+", focus:"Fixed wireless, Wi-Fi, PtMP, CBRS", topSkills:["RF Planning","Wi-Fi","CBRS","Python","Networking","Antenna"], certs:["CWNA","CompTIA Net+"], salary:"$85K–$145K", internPay:"$25–$38/hr", hiring:"Moderate", url:"https://www.cambiumnetworks.com/company/careers/" },
  { name:"Federated Wireless", cat:"Specialized", hq:"Arlington, VA", size:"200+", focus:"CBRS SAS, shared spectrum, private 5G", topSkills:["Spectrum Mgmt","CBRS","Python","Cloud","5G","RF Planning","ML"], certs:["CBRS CPI","AWS"], salary:"$95K–$160K", internPay:"$30–$42/hr", hiring:"Moderate", url:"https://www.federatedwireless.com/careers/" },
  { name:"Parallel Wireless", cat:"Specialized", hq:"Nashua, NH", size:"500+", focus:"Open RAN, virtualized RAN, 2G/3G/4G/5G", topSkills:["O-RAN","5G","Cloud","Linux","Python","C/C++","Kubernetes"], certs:["O-RAN Alliance","CKA"], salary:"$90K–$155K", internPay:"$28–$40/hr", hiring:"Moderate", url:"https://www.parallelwireless.com/careers/" },
  { name:"Celona", cat:"Specialized", hq:"Cupertino, CA", size:"200+", focus:"Private 5G/LTE enterprise networks, CBRS", topSkills:["5G","CBRS","Python","Networking","Cloud","RF Planning"], certs:["CBRS CPI","AWS"], salary:"$100K–$165K", internPay:"$30–$45/hr", hiring:"Moderate", url:"https://www.celona.io/careers" },
  { name:"Cradlepoint (Ericsson)", cat:"Specialized", hq:"Boise, ID", size:"1,000+", focus:"5G WAN, enterprise cellular routers, NetCloud", topSkills:["5G","Networking","Python","Cloud","SD-WAN","Linux","Automation"], certs:["CCNA","AWS","Cradlepoint NCX"], salary:"$85K–$145K", internPay:"$25–$38/hr", hiring:"Active", url:"https://cradlepoint.com/company/careers/" },

  // TIER H: More Chipset & RF Components
  { name:"MACOM Technology", cat:"Chipset", hq:"Lowell, MA", size:"3,500+", focus:"GaN PAs, mmWave, photonics, defense RF", topSkills:["RF/Microwave","GaN","ADS","HFSS","MATLAB","PA Design","C"], certs:["Keysight ADS","HFSS Cert"], salary:"$100K–$170K", internPay:"$30–$45/hr", hiring:"Active", url:"https://www.macom.com/careers" },
  { name:"NXP Semiconductors", cat:"Chipset", hq:"San Jose, CA", size:"34,000+", focus:"Automotive radar, UWB, NFC, RF power", topSkills:["RF Design","Radar","MATLAB","C/C++","ADS","Python","Embedded"], certs:["NXP University","ADS Cert"], salary:"$100K–$175K", internPay:"$30–$48/hr", hiring:"Active", url:"https://www.nxp.com/company/about-nxp/careers" },
  { name:"Renesas Electronics", cat:"Chipset", hq:"Milpitas, CA (US)", size:"21,000+", focus:"Wi-Fi/BT combos, IoT wireless, automotive", topSkills:["Embedded","C/C++","Wi-Fi","BT","RF Design","MATLAB"], certs:["Renesas Cert"], salary:"$95K–$160K", internPay:"$28–$42/hr", hiring:"Active", url:"https://www.renesas.com/en/about/careers" },
  { name:"Wolfspeed (Cree)", cat:"Chipset", hq:"Durham, NC", size:"4,000+", focus:"SiC & GaN power devices, RF GaN for 5G", topSkills:["GaN/SiC","RF Design","MATLAB","ADS","Semiconductor Process","Python"], certs:["Keysight ADS"], salary:"$95K–$160K", internPay:"$28–$42/hr", hiring:"Active", url:"https://www.wolfspeed.com/company/careers/" },
  { name:"Murata Manufacturing", cat:"Chipset", hq:"Charlotte, NC (US)", size:"75,000+", focus:"RF filters (SAW/BAW), MLCC, Wi-Fi modules", topSkills:["RF Filters","EM Sim","MATLAB","ADS","Ceramics","Signal Proc"], certs:["ADS Cert"], salary:"$90K–$155K", internPay:"$28–$40/hr", hiring:"Moderate", url:"https://www.murata.com/en-us/about/careers" },
  { name:"Amphenol", cat:"Chipset", hq:"Wallingford, CT", size:"95,000+", focus:"RF connectors, antennas, cable assemblies, 5G", topSkills:["RF Design","Antenna","Mechanical","HFSS","Signal Integrity","Testing"], certs:["IPC Certs","HFSS Cert"], salary:"$85K–$145K", internPay:"$25–$38/hr", hiring:"Active", url:"https://www.amphenol.com/careers" },
  { name:"Infineon Technologies", cat:"Chipset", hq:"San Jose, CA (US)", size:"56,000+", focus:"Radar sensors, RF power, Wi-Fi/BT, security", topSkills:["RF Design","Radar","MATLAB","C/C++","Embedded","Python","ADS"], certs:["Infineon Developer"], salary:"$100K–$170K", internPay:"$30–$45/hr", hiring:"Active", url:"https://www.infineon.com/cms/en/careers/" },
  { name:"Silicon Labs", cat:"Chipset", hq:"Austin, TX", size:"1,800+", focus:"IoT wireless (Zigbee, Thread, BLE, Wi-Fi), Matter", topSkills:["Embedded","C","BLE","Wi-Fi","IoT Protocols","Python","RF"], certs:["Silicon Labs Dev Cert"], salary:"$95K–$160K", internPay:"$28–$42/hr", hiring:"Active", url:"https://www.silabs.com/about-us/careers" },
  { name:"MaxLinear", cat:"Chipset", hq:"Carlsbad, CA", size:"1,500+", focus:"Broadband, satellite, 5G infrastructure SoCs", topSkills:["RF Design","DSP","C/C++","MATLAB","FPGA","Signal Processing"], certs:["ADS Cert"], salary:"$100K–$165K", internPay:"$30–$42/hr", hiring:"Moderate", url:"https://www.maxlinear.com/company/careers" },

  // TIER I: More Infrastructure & Networking
  { name:"Calix", cat:"Infrastructure", hq:"San Jose, CA", size:"2,000+", focus:"Fiber broadband platforms, cloud, Wi-Fi", topSkills:["Networking","Cloud","Python","Wi-Fi","Data Analytics","Linux"], certs:["CCNA","AWS"], salary:"$90K–$155K", internPay:"$28–$40/hr", hiring:"Active", url:"https://www.calix.com/about-calix/careers.html" },
  { name:"Ribbon Communications", cat:"Infrastructure", hq:"Plano, TX", size:"3,500+", focus:"VoIP, SBC, 5G core, network security", topSkills:["VoIP/SIP","5G Core","Python","Cloud","Networking","C/C++"], certs:["CCNA","AWS"], salary:"$90K–$155K", internPay:"$25–$38/hr", hiring:"Active", url:"https://ribboncommunications.com/company/careers" },
  { name:"ADTRAN", cat:"Infrastructure", hq:"Huntsville, AL", size:"4,000+", focus:"Fiber access, SD-WAN, open networking", topSkills:["Networking","Python","Linux","Cloud","GPON","SDN","Automation"], certs:["CCNA","Linux+"], salary:"$85K–$145K", internPay:"$25–$35/hr", hiring:"Active", url:"https://www.adtran.com/careers" },
  { name:"Infinera", cat:"Infrastructure", hq:"San Jose, CA", size:"3,000+", focus:"Optical transport, coherent optics, DCI", topSkills:["Optical Comms","DSP","Python","FPGA","C/C++","Signal Proc"], certs:["Infinera Cert"], salary:"$95K–$165K", internPay:"$30–$42/hr", hiring:"Active", url:"https://www.infinera.com/company/careers/" },
  { name:"Juniper/HPE (Aruba)", cat:"Infrastructure", hq:"Santa Clara, CA", size:"62,000+", focus:"Campus Wi-Fi 7, SD-WAN, AIOps, edge", topSkills:["Wi-Fi","Networking","Python","Cloud","AI/ML","Automation"], certs:["Aruba ACMA/ACMP","CWNA"], salary:"$100K–$175K", internPay:"$30–$48/hr", hiring:"Very Active", url:"https://www.hpe.com/us/en/about/jobs.html" },
  { name:"Extreme Networks", cat:"Infrastructure", hq:"Morrisville, NC", size:"3,500+", focus:"Cloud-managed Wi-Fi, campus switching, ML-driven", topSkills:["Wi-Fi","Networking","Python","Cloud","ML","Automation"], certs:["Extreme Certified","CWNA"], salary:"$85K–$150K", internPay:"$25–$38/hr", hiring:"Active", url:"https://www.extremenetworks.com/about/careers" },
  { name:"Palo Alto Networks", cat:"Infrastructure", hq:"Santa Clara, CA", size:"15,000+", focus:"5G security, IoT security, SD-WAN, SASE", topSkills:["Cybersecurity","Python","Cloud","Networking","5G Security","ML"], certs:["PCNSA","PCNSE","CISSP"], salary:"$120K–$210K", internPay:"$40–$55/hr", hiring:"Very Active", url:"https://www.paloaltonetworks.com/about-us/careers" },
  { name:"Fortinet", cat:"Infrastructure", hq:"Sunnyvale, CA", size:"14,000+", focus:"Network security, SD-WAN, OT/IoT security", topSkills:["Cybersecurity","Python","Networking","Cloud","Automation","Linux"], certs:["NSE 4/7/8","CCNA"], salary:"$100K–$180K", internPay:"$30–$48/hr", hiring:"Active", url:"https://www.fortinet.com/corporate/careers" },

  // TIER J: Satellite & Space Communications
  { name:"SpaceX (Starlink)", cat:"Satellite", hq:"Hawthorne, CA", size:"13,000+", focus:"Starlink LEO constellation, direct-to-cell, ground terminals", topSkills:["RF Design","Signal Processing","C/C++","Python","MATLAB","Antenna","Phased Array"], certs:["Security Clearance","HFSS Cert"], salary:"$120K–$200K", internPay:"$35–$55/hr", hiring:"Very Active", url:"https://www.spacex.com/careers" },
  { name:"Amazon (Project Kuiper)", cat:"Satellite", hq:"Redmond, WA", size:"1,500+ (Kuiper)", focus:"LEO broadband constellation, ground antennas, Ka-band", topSkills:["RF Design","Antenna","MATLAB","Python","C/C++","Signal Proc","HFSS"], certs:["AWS","HFSS Cert"], salary:"$130K–$220K", internPay:"$8,000–$12,000/mo", hiring:"Very Active", url:"https://www.amazon.jobs/en/teams/projectkuiper" },
  { name:"Viasat", cat:"Satellite", hq:"Carlsbad, CA", size:"7,000+", focus:"Ka-band SATCOM, military SATCOM, in-flight Wi-Fi", topSkills:["RF Design","SATCOM","MATLAB","C/C++","Signal Proc","DSP","Python"], certs:["Security Clearance","IEEE WCET"], salary:"$100K–$175K", internPay:"$30–$48/hr", hiring:"Active", url:"https://careers.viasat.com" },
  { name:"Hughes Network Systems", cat:"Satellite", hq:"Germantown, MD", size:"3,000+", focus:"JUPITER satellites, LEO/GEO hybrid, enterprise VSAT", topSkills:["SATCOM","RF Design","Networking","Python","C/C++","Signal Proc"], certs:["CCNA","Security Clearance"], salary:"$90K–$160K", internPay:"$28–$42/hr", hiring:"Active", url:"https://www.hughes.com/who-we-are/careers" },
  { name:"Iridium Communications", cat:"Satellite", hq:"McLean, VA", size:"600+", focus:"LEO constellation, IoT, L-band, Certus broadband", topSkills:["SATCOM","RF","Signal Processing","Python","C/C++","Networking"], certs:["Security Clearance"], salary:"$95K–$160K", internPay:"$28–$42/hr", hiring:"Moderate", url:"https://www.iridium.com/careers/" },
  { name:"SES", cat:"Satellite", hq:"Princeton, NJ (US)", size:"2,000+", focus:"MEO/GEO fleet, O3b mPOWER, 5G backhaul", topSkills:["SATCOM","RF Planning","Networking","Python","Signal Proc","Cloud"], certs:["AWS","CCNA"], salary:"$90K–$155K", internPay:"$28–$40/hr", hiring:"Active", url:"https://www.ses.com/careers" },
  { name:"AST SpaceMobile", cat:"Satellite", hq:"Midland, TX", size:"400+", focus:"Direct-to-smartphone satellite, BlueWalker", topSkills:["RF Design","Antenna","MATLAB","C/C++","Phased Array","Signal Proc"], certs:["HFSS Cert"], salary:"$100K–$170K", internPay:"$30–$45/hr", hiring:"Active", url:"https://ast-science.com/careers/" },
  { name:"Aerojet Rocketdyne (L3Harris)", cat:"Satellite", hq:"El Segundo, CA", size:"5,000+", focus:"Space electronics, satellite propulsion, RF payloads", topSkills:["RF Design","MATLAB","C/C++","Signal Proc","FPGA","EM Sim"], certs:["Security Clearance"], salary:"$95K–$165K", internPay:"$28–$42/hr", hiring:"Active", url:"https://www.l3harris.com/careers" },

  // TIER K: Consulting, Services & Integration
  { name:"Accenture (Network)", cat:"Consulting", hq:"New York, NY", size:"740,000+", focus:"5G strategy, network transformation, digital twin", topSkills:["5G","Cloud","Python","Data Analytics","ML","Consulting","Agile"], certs:["AWS","Azure","PMP","TOGAF"], salary:"$90K–$170K", internPay:"$30–$45/hr", hiring:"Very Active", url:"https://www.accenture.com/us-en/careers" },
  { name:"Deloitte (Telecom)", cat:"Consulting", hq:"New York, NY", size:"460,000+", focus:"Telecom M&A, 5G monetization, network strategy", topSkills:["5G Strategy","Data Analytics","Python","Cloud","ML","Consulting"], certs:["AWS","Azure","PMP"], salary:"$85K–$165K", internPay:"$28–$42/hr", hiring:"Very Active", url:"https://apply.deloitte.com" },
  { name:"Nokia Networks (Services)", cat:"Consulting", hq:"Dallas, TX", size:"(part of Nokia)", focus:"Network deployment, managed services, optimization", topSkills:["5G","RF Planning","Network Opt","Python","Data Analytics","Nokia Tools"], certs:["Nokia NRS","PMP"], salary:"$85K–$150K", internPay:"$28–$40/hr", hiring:"Active", url:"https://www.nokia.com/careers/" },
  { name:"Capgemini Engineering", cat:"Consulting", hq:"New York, NY (US)", size:"360,000+", focus:"Telecom engineering services, 5G deployment, AI", topSkills:["5G","Python","Cloud","ML","RF Planning","Data Analytics","Agile"], certs:["AWS","Azure","TOGAF"], salary:"$85K–$155K", internPay:"$25–$40/hr", hiring:"Active", url:"https://www.capgemini.com/us-en/careers/" },
  { name:"Mavenir", cat:"Consulting", hq:"Richardson, TX", size:"3,000+", focus:"Cloud-native O-RAN, Open vRAN, 5G core", topSkills:["O-RAN","5G","Cloud","Kubernetes","C/C++","Python","Linux"], certs:["CKA","AWS","O-RAN"], salary:"$95K–$160K", internPay:"$28–$42/hr", hiring:"Active", url:"https://mavenir.com/careers/" },

  // TIER L: Additional Carriers & MVNOs
  { name:"Lumen Technologies", cat:"Carrier", hq:"Monroe, LA", size:"27,000+", focus:"Enterprise fiber, edge compute, SD-WAN", topSkills:["Networking","Cloud","Python","SD-WAN","Linux","Automation","Data Analytics"], certs:["CCNA","AWS","Azure"], salary:"$80K–$145K", internPay:"$25–$35/hr", hiring:"Active", url:"https://jobs.lumen.com" },
  { name:"Frontier Communications", cat:"Carrier", hq:"Dallas, TX", size:"14,000+", focus:"Fiber broadband, enterprise networking", topSkills:["Networking","Python","GPON","Cloud","Data Analytics","Linux"], certs:["CCNA","CompTIA Net+"], salary:"$75K–$135K", internPay:"$22–$32/hr", hiring:"Active", url:"https://frontier.com/corporate/careers" },
  { name:"TeleCom Semiconductor (GCT)", cat:"Carrier", hq:"San Jose, CA", size:"300+", focus:"5G/4G modem chipsets, direct-to-satellite", topSkills:["5G","C/C++","FPGA","DSP","MATLAB","Signal Processing"], certs:["5G NR Cert"], salary:"$100K–$170K", internPay:"$30–$45/hr", hiring:"Moderate", url:"https://www.gctsemi.com/careers" },
  { name:"Windstream", cat:"Carrier", hq:"Little Rock, AR", size:"10,000+", focus:"Enterprise SD-WAN, UCaaS, fiber broadband", topSkills:["Networking","SD-WAN","Cloud","Python","Linux","Automation"], certs:["CCNA","AWS"], salary:"$75K–$130K", internPay:"$22–$30/hr", hiring:"Moderate", url:"https://www.windstream.com/careers" },

  // TIER M: More Defense & Govt
  { name:"Leidos", cat:"Defense", hq:"Reston, VA", size:"47,000+", focus:"C4ISR, signals intelligence, cyber, 5G mil", topSkills:["Signal Processing","Python","C/C++","ML","Cybersecurity","RF","MATLAB"], certs:["Security Clearance","CISSP","CompTIA Sec+"], salary:"$90K–$160K", internPay:"$25–$42/hr", hiring:"Very Active", url:"https://careers.leidos.com" },
  { name:"SAIC", cat:"Defense", hq:"Reston, VA", size:"24,000+", focus:"DoD communications, 5G tactical, EW, space", topSkills:["RF Design","Signal Proc","Python","C/C++","MATLAB","Cybersecurity"], certs:["Security Clearance","PMP","CompTIA"], salary:"$85K–$155K", internPay:"$25–$40/hr", hiring:"Active", url:"https://jobs.saic.com" },
  { name:"Booz Allen Hamilton", cat:"Defense", hq:"McLean, VA", size:"33,000+", focus:"5G security, spectrum ops, EW, cyber defense", topSkills:["5G","Cybersecurity","Python","ML","Signal Proc","Cloud","RF"], certs:["Security Clearance","CISSP","AWS"], salary:"$90K–$165K", internPay:"$28–$45/hr", hiring:"Very Active", url:"https://www.boozallen.com/careers.html" },
  { name:"Raytheon BBN", cat:"Defense", hq:"Cambridge, MA", size:"(part of RTX)", focus:"Wireless networking research, cognitive radio, spectrum", topSkills:["Signal Processing","Python","C/C++","ML","SDR","MATLAB","Research"], certs:["Security Clearance"], salary:"$100K–$175K", internPay:"$30–$48/hr", hiring:"Active", url:"https://careers.rtx.com" },
  { name:"SRC Inc", cat:"Defense", hq:"Syracuse, NY", size:"1,500+", focus:"Radar, EW, counter-UAS, advanced sensor systems", topSkills:["Radar","RF Design","MATLAB","C/C++","DSP","FPGA","Signal Proc"], certs:["Security Clearance"], salary:"$85K–$155K", internPay:"$25–$40/hr", hiring:"Active", url:"https://www.srcinc.com/careers/" },
  { name:"Mercury Systems", cat:"Defense", hq:"Andover, MA", size:"2,300+", focus:"RF/microwave subsystems, EW processing, 5G mil", topSkills:["RF Design","FPGA","C/C++","DSP","MATLAB","Signal Proc","ADS"], certs:["Security Clearance"], salary:"$90K–$160K", internPay:"$28–$42/hr", hiring:"Active", url:"https://www.mrcy.com/careers" },

  // TIER N: More Test, Research & Standards
  { name:"Spirent Communications", cat:"Test & Measurement", hq:"San Jose, CA (US)", size:"1,700+", focus:"5G/Wi-Fi testing, network emulation, GNSS sim", topSkills:["5G Testing","Python","Networking","Automation","Signal Proc","Linux"], certs:["Spirent Cert","ISTQB"], salary:"$90K–$160K", internPay:"$28–$42/hr", hiring:"Active", url:"https://www.spirent.com/about/careers" },
  { name:"Viavi Solutions", cat:"Test & Measurement", hq:"Chandler, AZ", size:"3,500+", focus:"5G RAN testing, fiber testing, assurance, O-RAN", topSkills:["5G Testing","RF","Python","Networking","Fiber Optics","Automation"], certs:["Viavi Cert","FOA CFOT"], salary:"$85K–$150K", internPay:"$25–$40/hr", hiring:"Active", url:"https://www.viavisolutions.com/en-us/corporate/careers" },
  { name:"Tektronix (Fortive)", cat:"Test & Measurement", hq:"Beaverton, OR", size:"4,500+", focus:"Oscilloscopes, signal analyzers, 5G/6G test", topSkills:["Signal Analysis","RF Testing","Python","DSP","Automation","MATLAB"], certs:["Tektronix Cert"], salary:"$85K–$155K", internPay:"$25–$40/hr", hiring:"Active", url:"https://www.tek.com/en/about-tektronix/careers" },
  { name:"NIST (Telecom)", cat:"Test & Measurement", hq:"Boulder, CO", size:"3,400+", focus:"Wireless standards, spectrum sharing, 5G/6G research", topSkills:["Research","Python","MATLAB","RF","Signal Proc","Standards","ML"], certs:["N/A (Federal)"], salary:"$80K–$145K", internPay:"$22–$35/hr", hiring:"Moderate", url:"https://www.nist.gov/careers" },

  // TIER O: Antenna & Component Specialists
  { name:"Antenna Research Associates (PCTEL)", cat:"Specialized", hq:"Bloomingdale, IL", size:"500+", focus:"Antennas for 5G, LTE, IoT, scanning receivers", topSkills:["Antenna Design","HFSS","RF Testing","MATLAB","EM Sim","Python"], certs:["HFSS Cert","Keysight ADS"], salary:"$85K–$145K", internPay:"$25–$38/hr", hiring:"Moderate", url:"https://www.pctel.com/careers/" },
  { name:"Taoglas", cat:"Specialized", hq:"San Diego, CA (US)", size:"600+", focus:"IoT/5G antennas, GNSS, edge IoT solutions", topSkills:["Antenna Design","HFSS","RF","IoT","MATLAB","EM Sim","Python"], certs:["HFSS Cert"], salary:"$85K–$145K", internPay:"$25–$38/hr", hiring:"Moderate", url:"https://www.taoglas.com/about/careers/" },
  { name:"Galtronics (Amphenol)", cat:"Specialized", hq:"Tempe, AZ", size:"500+", focus:"Base station antennas, small cell, DAS, MIMO", topSkills:["Antenna Design","HFSS","RF","MIMO","EM Sim","MATLAB"], certs:["HFSS Cert"], salary:"$85K–$150K", internPay:"$25–$38/hr", hiring:"Moderate", url:"https://www.amphenol.com/careers" },
  { name:"Airgain", cat:"Specialized", hq:"San Diego, CA", size:"200+", focus:"Embedded antenna solutions, 5G/Wi-Fi, automotive", topSkills:["Antenna Design","RF","HFSS","Wi-Fi","5G","MATLAB","EM Sim"], certs:["HFSS Cert"], salary:"$90K–$155K", internPay:"$28–$40/hr", hiring:"Moderate", url:"https://www.airgain.com/about/careers/" },
  { name:"FIRST RF Corporation", cat:"Specialized", hq:"Boulder, CO", size:"100+", focus:"Antennas, radomes, phased arrays for defense", topSkills:["Antenna Design","HFSS","Radar","RF","Phased Array","MATLAB"], certs:["Security Clearance","HFSS Cert"], salary:"$85K–$150K", internPay:"$25–$38/hr", hiring:"Moderate", url:"https://www.firstrf.com/careers/" },
];

// ─── SKILL CATEGORIES FOR TOP 1% ───────────────────────────────────────
const skillMatrix = [
  { category:"RF & Microwave Design", icon:"📡", color:"#E8553D", importance:98,
    skills:["RF circuit design (LNA, PA, mixer, filter)","S-parameter analysis","Impedance matching & Smith Chart","RFIC layout","Microstrip/stripline design","EM simulation (HFSS, CST, ADS Momentum)","Noise figure & linearity analysis","Power amplifier linearization (DPD)"],
    ralph:{has:["LNA design (8-12 GHz)","S-parameter analysis","HFSS","ADS","EM fundamentals"],needs:["PA design & DPD","RFIC layout","CST Microwave Studio","Advanced matching networks"]}},
  { category:"5G NR & Cellular Standards", icon:"📶", color:"#2563EB", importance:96,
    skills:["3GPP Release 15/16/17/18 specifications","5G NR PHY: OFDM, LDPC, Polar codes, MIMO","5G NR MAC/RLC/PDCP/RRC protocols","Network slicing & QoS","mmWave beam management & beamforming","5G SA vs NSA architecture","O-RAN architecture (CU/DU/RU split)","NR sidelink (V2X, D2D)"],
    ralph:{has:["5G sniffer experience","D2D resource allocation","TDD signal analysis","3GPP sidelink specs"],needs:["Deep 3GPP spec reading","O-RAN architecture","NR PHY implementation","Beam management algorithms"]}},
  { category:"Signal Processing & DSP", icon:"〰️", color:"#10B981", importance:94,
    skills:["Digital filter design (FIR, IIR)","FFT/DFT & spectral analysis","OFDM modulation/demodulation","MIMO channel estimation","Adaptive filtering & equalization","Synchronization & timing recovery","Channel coding (LDPC, Turbo, Polar)","Compressed sensing & sparse recovery"],
    ralph:{has:["CSI analysis","Channel estimation","Signal analysis","OFDM fundamentals"],needs:["Advanced MIMO algorithms","Channel coding implementation","Compressed sensing","Real-time DSP on FPGA"]}},
  { category:"Machine Learning for Wireless", icon:"🤖", color:"#8B5CF6", importance:90,
    skills:["Autoencoder-based systems","CNN/RNN for signal classification","Reinforcement learning for resource allocation","Federated learning for edge networks","GAN for channel modeling","Transfer learning for domain adaptation","TinyML for edge inference","Neural network-based channel estimation"],
    ralph:{has:["Autoencoder PLA","ML for authentication","TensorFlow/Keras","Scikit-learn","Data poisoning analysis"],needs:["RL for resource allocation","Federated learning","GAN for channels","TinyML deployment"]}},
  { category:"Software & Programming", icon:"💻", color:"#F59E0B", importance:92,
    skills:["Python (NumPy, SciPy, TF, PyTorch)","C/C++ (embedded, real-time systems)","MATLAB/Simulink (industry standard)","Verilog/VHDL (FPGA design)","Linux system administration","Git version control","Docker & Kubernetes","Cloud platforms (AWS/Azure/GCP)"],
    ralph:{has:["Python","MATLAB","C","Linux scripting","Git basics"],needs:["C++ (advanced)","Verilog/VHDL","Docker/Kubernetes","Cloud platforms (AWS/Azure)"]}},
  { category:"Test & Measurement", icon:"🔧", color:"#06B6D4", importance:88,
    skills:["Vector Network Analyzer (VNA)","Spectrum Analyzer operation","Signal Generator & AWG","Oscilloscope (high-bandwidth)","Power meter & sensor calibration","OTA testing & anechoic chamber","EMC/EMI compliance testing","Automated test (Python + SCPI/VISA)"],
    ralph:{has:["VNA measurements","THz experimental setup","USRP SDR operation","Lab testbed design"],needs:["Spectrum analyzer proficiency","OTA & chamber testing","EMC/EMI testing","Automated test scripting (VISA)"]}},
  { category:"Simulation & EDA Tools", icon:"🖥️", color:"#EC4899", importance:93,
    skills:["Keysight ADS (circuit + EM)","Ansys HFSS (3D EM)","CST Microwave Studio","Cadence Virtuoso (RFIC)","Keysight SystemVue (system-level)","MathWorks MATLAB/Simulink","Keysight PathWave","NI LabVIEW"],
    ralph:{has:["ADS (simulation)","HFSS (basic)","MATLAB","GNU Radio"],needs:["ADS advanced (EM cosim)","Cadence Virtuoso","CST Studio","SystemVue","LabVIEW"]}},
  { category:"Research & Communication", icon:"📝", color:"#64748B", importance:80,
    skills:["IEEE paper writing","Conference presentations","Technical report writing","Patent drafting","Research proposal writing","Peer review process","LaTeX/Overleaf","Data visualization & storytelling"],
    ralph:{has:["Published papers","Conference presentations","LaTeX/Overleaf","Technical writing","Mentoring"],needs:["Patent drafting","Research proposals (NSF/DARPA)","Industry technical reports"]}},
];

// ─── CERTIFICATION ROADMAP FOR TOP 1% ──────────────────────────────────
const certRoadmap = [
  { phase:"FOUNDATION (Months 1–2)", color:"#2563EB", certs:[
    { name:"Keysight RF & Microwave Industry-Ready Cert", issuer:"Keysight Technologies", type:"Industry", hours:40, cost:"Free (via university)", why:"Validates ADS & RF instrument proficiency. Directly recognized by Qualcomm, Skyworks, Qorvo, Apple. Your LNA experience gives you a head start.", impact:98, link:"https://www.keysight.com/us/en/industries/education/university-student-certification-program.html" },
    { name:"AWS Cloud Practitioner (CLF-C02)", issuer:"Amazon Web Services", type:"Cloud", hours:20, cost:"$100", why:"Every telecom company uses cloud. Required baseline for carrier & infrastructure roles.", impact:85, link:"https://aws.amazon.com/certification/certified-cloud-practitioner/" },
    { name:"MATLAB Onramp + 5G Toolbox Training", issuer:"MathWorks", type:"Industry", hours:12, cost:"Free", why:"Official MATLAB badges. 5G Toolbox is used by Qualcomm, Nokia, Ericsson for NR simulation.", impact:82, link:"https://matlabacademy.mathworks.com/" },
  ]},
  { phase:"CORE WIRELESS (Months 3–4)", color:"#10B981", certs:[
    { name:"IEEE WCET Certification", issuer:"IEEE Communications Society", type:"Gold Standard", hours:60, cost:"$450 (IEEE member)", why:"THE gold standard for wireless engineers. Vendor-neutral. 78% of hiring managers prioritize WCET-certified candidates. Covers RF, propagation, antennas, access technologies, security.", impact:99, link:"https://www.comsoc.org/education-training/certification" },
    { name:"CompTIA Network+ (N10-009)", issuer:"CompTIA", type:"Networking", hours:30, cost:"$358", why:"Foundational networking cert. Required/preferred by carriers (Verizon, AT&T, T-Mobile) and defense contractors.", impact:78, link:"https://www.comptia.org/certifications/network" },
    { name:"Nokia NRS I (Network Routing Specialist)", issuer:"Nokia", type:"Vendor", hours:25, cost:"$200", why:"Nokia-specific cert valued at Nokia Bell Labs, carrier roles. Covers IP/MPLS routing used in 5G transport.", impact:75, link:"https://www.nokia.com/networks/training/" },
  ]},
  { phase:"DEEP TECHNICAL (Months 5–7)", color:"#8B5CF6", certs:[
    { name:"TensorFlow Developer Certificate", issuer:"Google", type:"ML", hours:30, cost:"$100", why:"Validates your autoencoder/ML research for industry. Google, Meta, Apple, Qualcomm all use TF.", impact:90, link:"https://www.tensorflow.org/certificate" },
    { name:"ANSYS HFSS Certification", issuer:"Ansys", type:"EDA", hours:30, cost:"Free (Ansys Learning)", why:"Industry standard for antenna & EM simulation. Required by defense (Lockheed, Raytheon, BAE) and chip companies (Qualcomm, Skyworks).", impact:92, link:"https://www.ansys.com/academic/learning-resources" },
    { name:"Deep Learning Specialization", issuer:"Coursera (Andrew Ng)", type:"ML", hours:40, cost:"$49/mo", why:"Most recognized ML credential. Covers architectures used in wireless ML research.", impact:85, link:"https://www.coursera.org/specializations/deep-learning" },
    { name:"Certified Wireless Network Admin (CWNA)", issuer:"CWNP", type:"Wireless", hours:30, cost:"$275", why:"Covers Wi-Fi RF theory, site surveys, WLAN security. Valued by Cisco, CommScope, Ubiquiti, enterprise roles.", impact:80, link:"https://www.cwnp.com/certifications/cwna" },
  ]},
  { phase:"ADVANCED & DIFFERENTIATOR (Months 8–10)", color:"#E8553D", certs:[
    { name:"AWS Solutions Architect Associate", issuer:"AWS", type:"Cloud", hours:40, cost:"$150", why:"Advanced cloud architecture. Needed for 5G edge, MEC, cloud-native RAN roles at carriers & DISH.", impact:88, link:"https://aws.amazon.com/certification/certified-solutions-architect-associate/" },
    { name:"CBRS CPI Certification", issuer:"CBRS Alliance / CommScope", type:"Spectrum", hours:16, cost:"$500", why:"Required for CBRS private 5G deployment. Unique differentiator — few PhD candidates have this.", impact:85, link:"https://www.cbrsalliance.org" },
    { name:"Certified Kubernetes Admin (CKA)", issuer:"CNCF", type:"DevOps", hours:30, cost:"$395", why:"Cloud-native 5G (O-RAN, vRAN) runs on K8s. DISH, Ericsson, Nokia all deploying on Kubernetes.", impact:82, link:"https://www.cncf.io/certification/cka/" },
    { name:"NI LabVIEW CLAD", issuer:"National Instruments", type:"Test", hours:20, cost:"Free exam", why:"Standard for test automation. Used across defense, T&M, and research labs.", impact:72, link:"https://www.ni.com/en/support/documentation/supplemental/06/labview-certification-prep-resources.html" },
  ]},
  { phase:"ELITE TIER (Months 11–12)", color:"#F59E0B", certs:[
    { name:"Keysight High-Speed Digital Cert", issuer:"Keysight", type:"Industry", hours:30, cost:"Free (university)", why:"Signal integrity, EM modeling, power integrity. Differentiates for RFIC & high-speed design roles.", impact:80, link:"https://www.keysight.com/us/en/industries/education/university-student-certification-program.html" },
    { name:"FCC GROL License", issuer:"FCC", type:"Regulatory", hours:40, cost:"$50", why:"Required for FCC-licensed equipment work. Mandatory at carriers and many defense contractors. Huge differentiator.", impact:88, link:"https://www.fcc.gov/wireless/bureau-divisions/mobility-division/commercial-radio-operator-license-program" },
    { name:"Azure AI Fundamentals (AI-900)", issuer:"Microsoft", type:"Cloud", hours:15, cost:"$165", why:"Multi-cloud AI skills. Azure Operator Nexus is Microsoft's 5G platform — growing fast.", impact:70, link:"https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/" },
    { name:"PMP (Project Management Professional)", issuer:"PMI", type:"Leadership", hours:35, cost:"$555", why:"Leadership + technical = unstoppable. Shows you can lead projects, not just execute. Very rare for PhD interns.", impact:75, link:"https://www.pmi.org/certifications/project-management-pmp" },
  ]},
];

const catColors = { "Chipset":"#E8553D","Infrastructure":"#2563EB","Carrier":"#10B981","Defense":"#F59E0B","Test & Measurement":"#06B6D4","Cloud/Software":"#8B5CF6","Specialized":"#EC4899","Satellite":"#FF6B35","Consulting":"#14B8A6" };
const TABS = [{l:"Companies",i:"🏢"},{l:"Skills Matrix",i:"🎯"},{l:"Certifications",i:"🏆"},{l:"Your Gap",i:"📊"}];

export default function IndustryIntelligence(){
  const[tab,setTab]=useState(0);
  const[catFilter,setCatFilter]=useState("all");
  const[search,setSearch]=useState("");
  const[expandedCo,setExpandedCo]=useState(null);
  const[expandedSkill,setExpandedSkill]=useState(0);
  const[selectedPhase,setSelectedPhase]=useState(0);

  const cats=[...new Set(companies.map(c=>c.cat))];
  const fCo=companies.filter(c=>catFilter==="all"||c.cat===catFilter).filter(c=>!search||[c.name,c.focus,...c.topSkills].some(s=>s.toLowerCase().includes(search.toLowerCase())));

  // Count how many of the top skills Ralph has
  const allTopSkills={};
  companies.forEach(c=>c.topSkills.forEach(s=>{allTopSkills[s]=(allTopSkills[s]||0)+1}));
  const sortedSkills=Object.entries(allTopSkills).sort((a,b)=>b[1]-a[1]);

  const ralphCurrentSkills=new Set(["Python","MATLAB","C","SQL","Linux","Signal Processing","DSP","5G","RF Design","HFSS","ADS","ML","TensorFlow","GNU Radio","SDR","LaTeX","Pandas","NumPy","Research"]);
  const totalDemanded=sortedSkills.length;
  const ralphHas=sortedSkills.filter(([s])=>{
    const sl=s.toLowerCase();
    return [...ralphCurrentSkills].some(r=>sl.includes(r.toLowerCase())||r.toLowerCase().includes(sl));
  }).length;
  const overallMatch=Math.round((ralphHas/totalDemanded)*100);

  const S={card:{background:"linear-gradient(150deg,#0C1020,#111828)",border:"1px solid #19223A",borderRadius:14}};

  return(
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif",background:"#06080F",color:"#CBD5E1",minHeight:"100vh"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#19223A;border-radius:4px}
        @keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .up{animation:up .4s ease forwards}
        .d1{animation-delay:.05s;opacity:0}.d2{animation-delay:.1s;opacity:0}.d3{animation-delay:.15s;opacity:0}
        button{cursor:pointer;border:none;outline:none;font-family:inherit}a{text-decoration:none}
        .bar{height:5px;border-radius:3px;background:#0C1020;overflow:hidden}
        .bf{height:100%;border-radius:3px;transition:width 1s cubic-bezier(.22,1,.36,1)}
        .tag{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:.5px;white-space:nowrap}
      `}</style>

      {/* HEADER */}
      <header style={{background:"linear-gradient(180deg,#0A0E1A,#06080F)",borderBottom:"1px solid #111828",padding:"18px 16px 10px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:12}}>
            <div style={{width:36,height:36,borderRadius:9,background:"linear-gradient(135deg,#E8553D,#F59E0B)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,fontFamily:"Syne",color:"#fff"}}>100</div>
            <div>
              <h1 style={{fontSize:15,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9",letterSpacing:-.3}}>Top 100 Wireless & Telecom — USA</h1>
              <p style={{fontSize:9,color:"#334155",fontFamily:"Space Mono",letterSpacing:1}}>INDUSTRY INTELLIGENCE · SKILLS · CERTIFICATIONS · TOP 1% ROADMAP</p>
            </div>
          </div>
          <nav style={{display:"flex",gap:3,overflowX:"auto"}}>
            {TABS.map((t,i)=>(
              <button key={i} onClick={()=>setTab(i)}
                style={{padding:"6px 12px",borderRadius:7,fontSize:11,fontWeight:600,display:"flex",alignItems:"center",gap:4,whiteSpace:"nowrap",
                  background:tab===i?"linear-gradient(135deg,#1E2850,#251840)":"transparent",
                  color:tab===i?"#D6E0F0":"#334155",border:tab===i?"1px solid #2A3560":"1px solid transparent"}}>
                <span style={{fontSize:12}}>{t.i}</span>{t.l}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main style={{maxWidth:900,margin:"0 auto",padding:16}}>

        {/* ═══ COMPANIES ═══ */}
        {tab===0&&(<div>
          <h2 className="up" style={{fontSize:20,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9",marginBottom:4}}>Top 100 Companies</h2>
          <p className="up" style={{fontSize:11,color:"#334155",marginBottom:14}}>Across 9 sectors · {companies.length} companies · Tap any card for details</p>

          <div className="up d1" style={{display:"flex",gap:5,marginBottom:12,overflowX:"auto",flexWrap:"wrap"}}>
            <button onClick={()=>setCatFilter("all")} style={{padding:"6px 12px",borderRadius:7,fontSize:10,fontWeight:700,background:catFilter==="all"?"#2563EB20":"#0A0E1A",color:catFilter==="all"?"#60A5FA":"#334155",border:`1px solid ${catFilter==="all"?"#2563EB40":"#19223A"}`}}>All ({companies.length})</button>
            {cats.map(c=>(
              <button key={c} onClick={()=>setCatFilter(c)} style={{padding:"6px 12px",borderRadius:7,fontSize:10,fontWeight:700,background:catFilter===c?(catColors[c]||"#666")+"20":"#0A0E1A",color:catFilter===c?catColors[c]||"#666":"#334155",border:`1px solid ${catFilter===c?(catColors[c]||"#666")+"40":"#19223A"}`}}>
                {c} ({companies.filter(co=>co.cat===c).length})
              </button>
            ))}
          </div>

          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search companies, skills, focus areas..."
            style={{width:"100%",padding:"9px 14px",borderRadius:8,border:"1px solid #19223A",background:"#0A0E1A",color:"#D6E0F0",fontSize:12,outline:"none",marginBottom:14,fontFamily:"inherit"}}/>

          {fCo.map((c,i)=>{
            const exp=expandedCo===i;
            const cc=catColors[c.cat]||"#666";
            return(
              <div key={i} className="up" style={{...S.card,padding:14,marginBottom:7,cursor:"pointer",borderLeft:`3px solid ${cc}30`,animationDelay:`${Math.min(i*.02,.3)}s`,opacity:0}}
                onClick={()=>setExpandedCo(exp?null:i)}>
                <div style={{display:"flex",justifyContent:"space-between",gap:8}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",gap:5,alignItems:"center",marginBottom:4,flexWrap:"wrap"}}>
                      <span className="tag" style={{background:cc+"14",color:cc}}>{c.cat}</span>
                      <span className="tag" style={{background:c.hiring==="Very Active"?"#10B98114":"#F59E0B14",color:c.hiring==="Very Active"?"#10B981":"#F59E0B"}}>{c.hiring}</span>
                    </div>
                    <div style={{fontSize:14,fontWeight:700,color:"#F1F5F9",marginBottom:2}}>{c.name}</div>
                    <div style={{fontSize:11,color:"#475569"}}>{c.hq} · {c.size} employees</div>
                    <div style={{fontSize:11,color:"#64748B",marginTop:3}}>{c.focus}</div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0,fontSize:10,color:"#334155",minWidth:70}}>
                    <div style={{fontSize:11,color:"#94A3B8",fontWeight:600}}>{c.salary}</div>
                    <div style={{marginTop:2,fontSize:10}}>Intern: {c.internPay}</div>
                  </div>
                </div>
                {exp&&(
                  <div style={{marginTop:12,padding:14,background:"#06080F",borderRadius:10,borderTop:"1px solid #19223A"}}>
                    <div style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#475569",letterSpacing:1.2,marginBottom:8}}>TOP SKILLS REQUIRED</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:12}}>
                      {c.topSkills.map((s,si)=>{
                        const hasIt=[...ralphCurrentSkills].some(r=>s.toLowerCase().includes(r.toLowerCase())||r.toLowerCase().includes(s.toLowerCase()));
                        return <span key={si} className="tag" style={{background:hasIt?"#10B98118":"#E8553D12",color:hasIt?"#10B981":"#E8553D",border:`1px solid ${hasIt?"#10B98130":"#E8553D25"}`}}>{s} {hasIt?"✓":"✗"}</span>;
                      })}
                    </div>
                    <div style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#475569",letterSpacing:1.2,marginBottom:6}}>VALUED CERTIFICATIONS</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
                      {c.certs.map((cert,ci)=><span key={ci} className="tag" style={{background:"#8B5CF614",color:"#A78BFA"}}>{cert}</span>)}
                    </div>
                    <a href={c.url} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",padding:"6px 18px",borderRadius:7,background:`${cc}CC`,color:"#fff",fontSize:11,fontWeight:700}}>View Careers →</a>
                  </div>
                )}
              </div>
            );
          })}
        </div>)}

        {/* ═══ SKILLS MATRIX ═══ */}
        {tab===1&&(<div>
          <h2 className="up" style={{fontSize:20,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9",marginBottom:4}}>Skills Matrix — Top 1% Profile</h2>
          <p className="up" style={{fontSize:11,color:"#334155",marginBottom:14}}>8 skill domains ranked by industry importance · Your coverage vs. requirements</p>

          <div className="up d1" style={{display:"flex",gap:4,marginBottom:16,overflowX:"auto"}}>
            {skillMatrix.map((s,i)=>(
              <button key={i} onClick={()=>setExpandedSkill(i)}
                style={{padding:"8px 12px",borderRadius:8,fontSize:10,fontWeight:600,whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:4,
                  background:expandedSkill===i?s.color+"18":"#0A0E1A",color:expandedSkill===i?s.color:"#334155",
                  border:`1px solid ${expandedSkill===i?s.color+"40":"#19223A"}`}}>
                <span>{s.icon}</span>{s.category.split(" ")[0]}
              </button>
            ))}
          </div>

          {skillMatrix[expandedSkill]&&(()=>{
            const s=skillMatrix[expandedSkill];
            const hasPct=Math.round((s.ralph.has.length/(s.ralph.has.length+s.ralph.needs.length))*100);
            return(
              <div className="up d2">
                <div style={{...S.card,padding:20,marginBottom:12}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                    <div>
                      <h3 style={{fontSize:16,fontWeight:700,fontFamily:"Syne",color:"#F1F5F9"}}>{s.icon} {s.category}</h3>
                      <p style={{fontSize:11,color:"#475569",marginTop:2}}>Industry importance: <span style={{color:s.color,fontWeight:700}}>{s.importance}/100</span></p>
                    </div>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontSize:22,fontWeight:800,fontFamily:"Syne",color:hasPct>=70?"#10B981":hasPct>=40?"#F59E0B":"#E8553D"}}>{hasPct}%</div>
                      <div style={{fontSize:9,color:"#334155"}}>Your coverage</div>
                    </div>
                  </div>

                  <div style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#475569",letterSpacing:1.2,marginBottom:8}}>ALL SKILLS IN THIS DOMAIN</div>
                  {s.skills.map((sk,si)=>(
                    <div key={si} style={{fontSize:12,padding:"5px 0",borderBottom:si<s.skills.length-1?"1px solid #0C1020":"none",color:"#94A3B8",display:"flex",alignItems:"center",gap:6}}>
                      <span style={{fontSize:8,color:s.ralph.has.some(h=>sk.toLowerCase().includes(h.toLowerCase().split(" ")[0]))?"#10B981":"#334155"}}>●</span>
                      {sk}
                    </div>
                  ))}
                </div>

                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <div style={{...S.card,padding:16}}>
                    <h4 style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#10B981",letterSpacing:1.2,marginBottom:8}}>✓ YOU HAVE</h4>
                    {s.ralph.has.map((h,hi)=>(
                      <div key={hi} style={{fontSize:11,padding:"4px 0",color:"#94A3B8",borderBottom:hi<s.ralph.has.length-1?"1px solid #0C1020":"none"}}>
                        <span style={{color:"#10B981",marginRight:6}}>✓</span>{h}
                      </div>
                    ))}
                  </div>
                  <div style={{...S.card,padding:16}}>
                    <h4 style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#E8553D",letterSpacing:1.2,marginBottom:8}}>✗ YOU NEED</h4>
                    {s.ralph.needs.map((n,ni)=>(
                      <div key={ni} style={{fontSize:11,padding:"4px 0",color:"#94A3B8",borderBottom:ni<s.ralph.needs.length-1?"1px solid #0C1020":"none"}}>
                        <span style={{color:"#E8553D",marginRight:6}}>→</span>{n}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>)}

        {/* ═══ CERTIFICATIONS ═══ */}
        {tab===2&&(<div>
          <h2 className="up" style={{fontSize:20,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9",marginBottom:4}}>Top 1% Certification Roadmap</h2>
          <p className="up" style={{fontSize:11,color:"#334155",marginBottom:14}}>12-month plan · {certRoadmap.reduce((a,p)=>a+p.certs.length,0)} certifications · Ranked by industry impact</p>

          <div className="up d1" style={{display:"flex",gap:4,marginBottom:16,overflowX:"auto"}}>
            {certRoadmap.map((p,i)=>(
              <button key={i} onClick={()=>setSelectedPhase(i)}
                style={{padding:"8px 14px",borderRadius:8,fontSize:10,fontWeight:600,whiteSpace:"nowrap",
                  background:selectedPhase===i?p.color+"18":"#0A0E1A",color:selectedPhase===i?p.color:"#334155",
                  border:`1px solid ${selectedPhase===i?p.color+"40":"#19223A"}`}}>
                Phase {i+1}
              </button>
            ))}
          </div>

          {certRoadmap[selectedPhase]&&(()=>{
            const p=certRoadmap[selectedPhase];
            return(
              <div className="up d2">
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                  <div style={{width:4,height:24,borderRadius:2,background:p.color}}/>
                  <h3 style={{fontSize:15,fontWeight:700,fontFamily:"Syne",color:"#F1F5F9"}}>{p.phase}</h3>
                </div>
                {p.certs.map((c,ci)=>(
                  <div key={ci} style={{...S.card,padding:16,marginBottom:8}}>
                    <div style={{display:"flex",justifyContent:"space-between",gap:8,flexWrap:"wrap",marginBottom:8}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:700,color:"#F1F5F9",marginBottom:3}}>{c.name}</div>
                        <div style={{fontSize:11,color:"#475569"}}>{c.issuer}</div>
                        <div style={{display:"flex",gap:8,marginTop:5,fontSize:10,color:"#334155"}}>
                          <span>⏱ {c.hours}h</span><span>💰 {c.cost}</span>
                        </div>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5}}>
                        <span className="tag" style={{background:c.impact>=90?"#E8553D18":c.impact>=80?"#10B98118":"#F59E0B18",color:c.impact>=90?"#E8553D":c.impact>=80?"#10B981":"#F59E0B"}}>
                          Impact: {c.impact}/100
                        </span>
                        <span className="tag" style={{background:"#8B5CF614",color:"#A78BFA"}}>{c.type}</span>
                      </div>
                    </div>
                    <div style={{padding:10,background:"#06080F",borderRadius:8,fontSize:11,color:"#94A3B8",lineHeight:1.6,borderLeft:`3px solid ${p.color}`}}>
                      <span style={{fontWeight:600,color:"#CBD5E1"}}>Why this matters: </span>{c.why}
                    </div>
                    <a href={c.link} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",marginTop:8,padding:"5px 14px",borderRadius:6,background:p.color+"18",color:p.color,fontSize:10,fontWeight:700,border:`1px solid ${p.color}30`}}>Get Started →</a>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>)}

        {/* ═══ YOUR GAP ═══ */}
        {tab===3&&(<div>
          <h2 className="up" style={{fontSize:20,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9",marginBottom:14}}>Your Gap Analysis vs. Top 1%</h2>

          <div className="up d1" style={{...S.card,padding:20,marginBottom:14,textAlign:"center"}}>
            <div style={{fontSize:11,color:"#475569",fontWeight:600,marginBottom:6}}>OVERALL SKILL COVERAGE</div>
            <div style={{fontSize:48,fontWeight:800,fontFamily:"Syne",color:overallMatch>=60?"#10B981":overallMatch>=40?"#F59E0B":"#E8553D"}}>{overallMatch}%</div>
            <div className="bar" style={{maxWidth:300,margin:"12px auto 0"}}>
              <div className="bf" style={{width:`${overallMatch}%`,background:overallMatch>=60?"linear-gradient(90deg,#10B981,#059669)":"linear-gradient(90deg,#F59E0B,#D97706)"}}/>
            </div>
            <p style={{fontSize:11,color:"#64748B",marginTop:8}}>of all skills demanded across {companies.length} companies</p>
          </div>

          {/* Most demanded skills */}
          <div className="up d2" style={{...S.card,padding:18,marginBottom:14}}>
            <h3 style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#2563EB",letterSpacing:1.2,marginBottom:12}}>TOP 20 MOST DEMANDED SKILLS</h3>
            {sortedSkills.slice(0,20).map(([skill,count],i)=>{
              const hasIt=[...ralphCurrentSkills].some(r=>skill.toLowerCase().includes(r.toLowerCase())||r.toLowerCase().includes(skill.toLowerCase()));
              const pct=Math.round((count/companies.length)*100);
              return(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:i<19?"1px solid #0C1020":"none"}}>
                  <div style={{minWidth:18,fontSize:11,fontWeight:700,fontFamily:"Syne",color:"#334155",textAlign:"right"}}>{i+1}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{fontSize:12,color:hasIt?"#10B981":"#94A3B8",fontWeight:hasIt?600:400}}>{skill}</span>
                      {hasIt&&<span style={{fontSize:9,color:"#10B981"}}>✓ you have</span>}
                      {!hasIt&&<span style={{fontSize:9,color:"#E8553D"}}>✗ gap</span>}
                    </div>
                    <div className="bar" style={{marginTop:3}}>
                      <div className="bf" style={{width:`${pct}%`,background:hasIt?"#10B981":"#E8553D44"}}/>
                    </div>
                  </div>
                  <span style={{fontSize:10,fontFamily:"Space Mono",color:"#475569",minWidth:45,textAlign:"right"}}>{count}/{companies.length}</span>
                </div>
              );
            })}
          </div>

          {/* Critical gaps */}
          <div className="up d3" style={{...S.card,padding:18}}>
            <h3 style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#E8553D",letterSpacing:1.2,marginBottom:12}}>CRITICAL GAPS TO CLOSE FOR TOP 1%</h3>
            {[
              {gap:"C/C++ (advanced, embedded, real-time)",demanded:78,action:"Take embedded systems course + contribute to open-source C++ project",timeline:"Start Month 1"},
              {gap:"Verilog/VHDL & FPGA Design",demanded:32,action:"Complete Intel FPGA course on Coursera + implement DSP block on FPGA",timeline:"Months 3–4"},
              {gap:"Cloud Platform (AWS/Azure/GCP)",demanded:65,action:"AWS CCP → AWS SAA certification path. Use AWS for ML model deployment.",timeline:"Months 1–8"},
              {gap:"Kubernetes & Docker",demanded:38,action:"CKA certification. Deploy 5G core functions in containers.",timeline:"Months 5–8"},
              {gap:"O-RAN Architecture",demanded:22,action:"Study O-RAN Alliance specs. Build demo with near-RT RIC on Docker.",timeline:"Months 6–9"},
              {gap:"Cadence Virtuoso (RFIC)",demanded:18,action:"Cadence university access via PSU. Design basic RFIC cell.",timeline:"Months 5–10"},
              {gap:"PA Design & DPD",demanded:35,action:"ADS PA design tutorial + Doherty PA project for portfolio",timeline:"Months 4–7"},
              {gap:"Automated Testing (VISA/SCPI)",demanded:40,action:"PyVISA library + write automated VNA test scripts for your lab",timeline:"Start Month 2"},
            ].map((g,i)=>(
              <div key={i} style={{padding:"10px 0",borderBottom:i<7?"1px solid #0C1020":"none"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:4}}>
                  <span style={{fontSize:13,fontWeight:600,color:"#F1F5F9"}}>{g.gap}</span>
                  <span className="tag" style={{background:"#E8553D14",color:"#E8553D",flexShrink:0}}>Demanded by {g.demanded} cos</span>
                </div>
                <p style={{fontSize:11,color:"#64748B",lineHeight:1.5}}>
                  <span style={{color:"#2563EB",fontWeight:600}}>Action: </span>{g.action}
                </p>
                <p style={{fontSize:10,color:"#334155",marginTop:2}}>Timeline: {g.timeline}</p>
              </div>
            ))}
          </div>
        </div>)}

      </main>
      <footer style={{textAlign:"center",padding:"28px 16px 36px",fontSize:9,fontFamily:"Space Mono",color:"#111828",letterSpacing:1.5}}>
        TOP 100 WIRELESS & TELECOM INTELLIGENCE · APRIL 2026
      </footer>
    </div>
  );
}
