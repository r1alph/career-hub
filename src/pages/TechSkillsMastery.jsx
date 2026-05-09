import { useState, useEffect } from "react";

// ─── SKILLS DATA ────────────────────────────────────────────────────────
const skills = [
  { id:"python", name:"Python", icon:"🐍", color:"#3B82F6", duration:"Weeks 1–4", level:"Foundation",
    why:"Used in 78 of the top 100 wireless/telecom companies. Foundation for ML, automation, data analysis, and DevOps.",
    topics:[
      { name:"Core Python", items:["Variables, data types, operators, control flow","Functions, decorators, generators, context managers","OOP: classes, inheritance, polymorphism, magic methods","Error handling: try/except, custom exceptions","File I/O: text, CSV, JSON, binary files","List/dict/set comprehensions, lambda, map/filter/reduce","Modules, packages, virtual environments (venv, pip)","Type hints, dataclasses, Enums"] },
      { name:"Data & Scientific Python", items:["NumPy: arrays, broadcasting, linear algebra, FFT","Pandas: DataFrames, groupby, merge, time-series","Matplotlib + Seaborn: plots, subplots, styling","SciPy: signal processing, optimization, stats","Jupyter Notebooks: interactive analysis workflow"] },
      { name:"Web & API Development", items:["FastAPI: REST APIs, Pydantic models, async, Swagger docs","Flask: routing, templates, middleware, blueprints","Requests library: consuming REST APIs","SQLAlchemy: ORM, database models, migrations","Authentication: JWT tokens, OAuth2 basics"] },
      { name:"Testing & Best Practices", items:["pytest: unit tests, fixtures, parametrize, mocking","Code coverage: pytest-cov, aim for >80%","Linting: flake8, black, isort, mypy","Packaging: setup.py, pyproject.toml, PyPI publishing","Logging: logging module, structured logging"] },
    ],
    resources:[
      { name:"Python Official Tutorial", link:"https://docs.python.org/3/tutorial/", free:true },
      { name:"Automate the Boring Stuff (Book, Free Online)", link:"https://automatetheboringstuff.com/", free:true },
      { name:"Real Python Tutorials", link:"https://realpython.com/", free:true },
      { name:"LeetCode Python Track", link:"https://leetcode.com/problemset/", free:true },
      { name:"FastAPI Official Tutorial", link:"https://fastapi.tiangolo.com/tutorial/", free:true },
    ],
    certs:[
      { name:"PCEP (Python Entry-Level)", cost:"$59", hours:15, impact:65 },
      { name:"PCAP (Python Associate)", cost:"$295", hours:30, impact:78 },
      { name:"IBM Python for Data Science (Coursera)", cost:"$49/mo", hours:20, impact:72 },
    ]
  },
  { id:"sql", name:"SQL", icon:"🗄️", color:"#F59E0B", duration:"Weeks 2–4", level:"Foundation",
    why:"Every data-driven role requires SQL. Carriers, cloud companies, and analytics teams live in databases.",
    topics:[
      { name:"SQL Fundamentals", items:["SELECT, FROM, WHERE, ORDER BY, LIMIT","JOINs: INNER, LEFT, RIGHT, FULL, CROSS, self-joins","Aggregations: GROUP BY, HAVING, COUNT, SUM, AVG, MIN, MAX","Subqueries: correlated, EXISTS, IN, scalar subqueries","UNION, INTERSECT, EXCEPT set operations","INSERT, UPDATE, DELETE, UPSERT/MERGE"] },
      { name:"Intermediate SQL", items:["Window functions: ROW_NUMBER, RANK, DENSE_RANK, NTILE","LAG, LEAD, FIRST_VALUE, LAST_VALUE over partitions","CTEs (Common Table Expressions) and recursive CTEs","CASE WHEN conditional logic","String functions: CONCAT, SUBSTRING, TRIM, REGEXP","Date/time functions: EXTRACT, DATE_TRUNC, intervals","COALESCE, NULLIF, NULL handling patterns"] },
      { name:"Advanced SQL & Database Design", items:["Indexing: B-tree, hash, composite, covering indexes","Query optimization: EXPLAIN ANALYZE, execution plans","Database normalization: 1NF, 2NF, 3NF, denormalization trade-offs","Transactions: ACID properties, isolation levels, deadlocks","Views, materialized views, stored procedures, triggers","PostgreSQL-specific: JSONB, arrays, full-text search","Schema design for time-series data (telecom KPIs)"] },
    ],
    resources:[
      { name:"SQLZoo Interactive Tutorials", link:"https://sqlzoo.net/", free:true },
      { name:"Mode SQL Tutorial", link:"https://mode.com/sql-tutorial/", free:true },
      { name:"LeetCode SQL 50", link:"https://leetcode.com/studyplan/top-sql-50/", free:true },
      { name:"PostgreSQL Official Tutorial", link:"https://www.postgresql.org/docs/current/tutorial.html", free:true },
      { name:"Use The Index, Luke (Performance)", link:"https://use-the-index-luke.com/", free:true },
    ],
    certs:[
      { name:"Oracle SQL Certified Associate", cost:"$245", hours:25, impact:75 },
      { name:"Google Data Analytics Certificate", cost:"$49/mo", hours:20, impact:70 },
      { name:"HackerRank SQL Badge", cost:"Free", hours:8, impact:60 },
    ]
  },
  { id:"aws", name:"AWS Cloud", icon:"☁️", color:"#FF9900", duration:"Weeks 3–8", level:"Core",
    why:"AWS powers 5G edge (Wavelength), IoT, and ML platforms. Every carrier and infra company uses cloud.",
    topics:[
      { name:"AWS Foundations", items:["AWS Global Infrastructure: Regions, AZs, Edge Locations","IAM: users, groups, roles, policies, MFA, best practices","EC2: instance types, AMIs, security groups, key pairs, EBS","S3: buckets, objects, versioning, lifecycle, static hosting","VPC: subnets, route tables, NAT gateway, NACLs, security groups","CloudWatch: metrics, alarms, logs, dashboards"] },
      { name:"Compute & Networking", items:["Lambda: serverless functions, triggers, layers, cold starts","ECS/EKS: container orchestration (Docker/K8s on AWS)","ALB/NLB: load balancing, target groups, health checks","Route 53: DNS, hosted zones, routing policies","API Gateway: REST/HTTP APIs, throttling, authentication","CloudFront: CDN, edge caching, SSL/TLS"] },
      { name:"Data & Analytics", items:["RDS: managed databases (PostgreSQL, MySQL), Multi-AZ, read replicas","DynamoDB: NoSQL, partition keys, GSI, streams, DAX","Redshift: data warehousing, columnar storage","Kinesis: real-time data streaming, Firehose, Analytics","Athena: serverless SQL queries on S3 data","SageMaker: ML model training, deployment, endpoints"] },
      { name:"DevOps on AWS", items:["CloudFormation: IaC templates, stacks, change sets, drift detection","CodePipeline + CodeBuild: CI/CD automation","ECR: container image registry","Systems Manager: parameter store, session manager, patch manager","Secrets Manager: credential rotation, cross-account access","AWS CLI + SDK (boto3): programmatic access to all services"] },
      { name:"5G & Telecom on AWS", items:["AWS Wavelength: ultra-low latency at 5G edge","AWS Private 5G: managed private networks","AWS IoT Core: device connectivity, MQTT, rules engine","AWS Outposts: on-premises AWS infrastructure","AWS Ground Station: satellite data downlink"] },
    ],
    resources:[
      { name:"AWS Skill Builder (Free Courses)", link:"https://skillbuilder.aws/", free:true },
      { name:"AWS Well-Architected Labs", link:"https://www.wellarchitectedlabs.com/", free:true },
      { name:"Stephane Maarek AWS Courses (Udemy)", link:"https://www.udemy.com/user/stephane-maarek/", free:false },
      { name:"AWS Free Tier", link:"https://aws.amazon.com/free/", free:true },
      { name:"AWS Architecture Center", link:"https://aws.amazon.com/architecture/", free:true },
    ],
    certs:[
      { name:"AWS Cloud Practitioner (CLF-C02)", cost:"$100", hours:20, impact:85 },
      { name:"AWS Solutions Architect Associate (SAA-C03)", cost:"$150", hours:40, impact:92 },
      { name:"AWS Developer Associate (DVA-C02)", cost:"$150", hours:35, impact:85 },
      { name:"AWS ML Specialty (MLS-C01)", cost:"$300", hours:40, impact:88 },
    ]
  },
  { id:"docker", name:"Docker", icon:"🐳", color:"#2496ED", duration:"Weeks 5–7", level:"Core",
    why:"Every 5G NF is containerized. Docker is non-negotiable for cloud-native telecom.",
    topics:[
      { name:"Docker Fundamentals", items:["Containers vs VMs: architecture, performance, isolation","Docker architecture: daemon, client, registry, images, containers","Dockerfile: FROM, RUN, COPY, CMD, ENTRYPOINT, ARG, ENV","Multi-stage builds: reduce image size for production","Docker CLI: build, run, exec, logs, stop, rm, inspect","Image management: tag, push, pull, Docker Hub, private registries"] },
      { name:"Docker Compose & Networking", items:["docker-compose.yml: services, volumes, networks, environment","Multi-container apps: web + db + cache + worker","Docker networking: bridge, host, overlay, macvlan","Docker volumes: named, bind mounts, tmpfs","Health checks and restart policies","Environment variables and .env files"] },
      { name:"Docker for Telecom", items:["Containerize Open5GS core NFs (AMF, SMF, UPF)","Containerize srsRAN gNB with ZMQ backend","Build multi-container 5G lab with Docker Compose","Container security: image scanning (Trivy), rootless containers","Docker logging: json-file, syslog, fluentd drivers","Resource limits: CPU/memory constraints for NFs"] },
    ],
    resources:[
      { name:"Docker Official Getting Started", link:"https://docs.docker.com/get-started/", free:true },
      { name:"Docker Labs (Play with Docker)", link:"https://labs.play-with-docker.com/", free:true },
      { name:"Docker Curriculum (Free Guide)", link:"https://docker-curriculum.com/", free:true },
      { name:"KodeKloud Docker Course", link:"https://kodekloud.com", free:false },
    ],
    certs:[
      { name:"Docker Certified Associate (DCA)", cost:"$195", hours:25, impact:80 },
    ]
  },
  { id:"kubernetes", name:"Kubernetes", icon:"☸️", color:"#326CE5", duration:"Weeks 7–11", level:"Core",
    why:"5G cloud-native deployments (O-RAN, 5GC) run on K8s. DISH's entire 5G network is K8s-based.",
    topics:[
      { name:"K8s Architecture", items:["Control plane: API server, etcd, scheduler, controller manager","Worker nodes: kubelet, kube-proxy, container runtime","Pods: single/multi-container, init containers, sidecars","Namespaces: isolation, resource quotas, limit ranges","kubectl: get, describe, apply, delete, logs, exec, port-forward"] },
      { name:"Workloads & Storage", items:["Deployments: replicas, rolling updates, rollback strategies","StatefulSets: ordered deployment, stable network identity (for NFs)","DaemonSets: run on every node (monitoring agents)","Jobs & CronJobs: batch processing, scheduled tasks","PersistentVolumes & PersistentVolumeClaims: storage classes","ConfigMaps & Secrets: external configuration management"] },
      { name:"Networking & Services", items:["Services: ClusterIP, NodePort, LoadBalancer, ExternalName","Ingress: NGINX, path-based routing, TLS termination","Network Policies: pod-to-pod traffic control","Multus CNI: multiple network interfaces (critical for 5G N3/N6)","Service Mesh: Istio basics, sidecar proxies, traffic management","DNS: CoreDNS, service discovery within cluster"] },
      { name:"K8s for Telecom", items:["Deploy Open5GS on K8s with Helm charts","Deploy O-RAN RIC on K8s (Docker/minikube)","SCTP support for 5G signaling (N2/N4 interfaces)","SR-IOV: hardware-accelerated user-plane (UPF)","Horizontal Pod Autoscaler for NF scaling","Helm: chart structure, values.yaml, templating, releases"] },
    ],
    resources:[
      { name:"Kubernetes Official Tutorials", link:"https://kubernetes.io/docs/tutorials/", free:true },
      { name:"KodeKloud CKA Course", link:"https://kodekloud.com", free:false },
      { name:"Kubernetes The Hard Way (Kelsey Hightower)", link:"https://github.com/kelseyhightower/kubernetes-the-hard-way", free:true },
      { name:"Play with Kubernetes", link:"https://labs.play-with-k8s.com/", free:true },
      { name:"Gradiant 5G Helm Charts", link:"https://gradiant.github.io/5g-charts/", free:true },
    ],
    certs:[
      { name:"Certified Kubernetes Administrator (CKA)", cost:"$395", hours:30, impact:92 },
      { name:"Certified Kubernetes App Developer (CKAD)", cost:"$395", hours:25, impact:85 },
      { name:"Certified Kubernetes Security (CKS)", cost:"$395", hours:30, impact:80 },
    ]
  },
  { id:"terraform", name:"Terraform", icon:"🏗️", color:"#7B42BC", duration:"Weeks 9–11", level:"Advanced",
    why:"Infrastructure-as-Code standard. Provision AWS/Azure infra for 5G deployments declaratively.",
    topics:[
      { name:"Terraform Core", items:["HCL syntax: blocks, attributes, expressions, types","Providers: AWS, Azure, GCP, Kubernetes, Helm","Resources: create, update, destroy lifecycle","Variables: input, output, locals, validation","State: local, remote (S3 + DynamoDB), locking, import","Data sources: query existing infrastructure","Terraform CLI: init, plan, apply, destroy, fmt, validate"] },
      { name:"Terraform Advanced", items:["Modules: create reusable, composable infrastructure blocks","Workspaces: manage multiple environments (dev/staging/prod)","Provisioners: local-exec, remote-exec (use sparingly)","Dynamic blocks and for_each/count meta-arguments","Terraform functions: string, numeric, collection, encoding","Backend configuration: S3, Terraform Cloud, Consul","Sensitive data: mark variables sensitive, avoid state exposure"] },
      { name:"Terraform for Telecom", items:["Provision AWS VPC + subnets for 5G network topology","Deploy EKS cluster for cloud-native 5G NFs","Create EC2 instances for srsRAN/OAI testbeds","S3 buckets for measurement data storage","IAM roles for NF service accounts","CloudWatch alarms for network KPI monitoring","GitOps: Terraform in CI/CD pipelines (GitHub Actions)"] },
    ],
    resources:[
      { name:"Terraform Official Tutorials", link:"https://developer.hashicorp.com/terraform/tutorials", free:true },
      { name:"Terraform Up & Running (Book)", link:"https://www.terraformupandrunning.com/", free:false },
      { name:"HashiCorp Learn", link:"https://developer.hashicorp.com/terraform/tutorials", free:true },
      { name:"KodeKloud Terraform Course", link:"https://kodekloud.com", free:false },
    ],
    certs:[
      { name:"HashiCorp Terraform Associate (003)", cost:"$70", hours:20, impact:82 },
    ]
  },
  { id:"ansible", name:"Ansible", icon:"⚙️", color:"#EE0000", duration:"Weeks 10–12", level:"Advanced",
    why:"Config management for network devices and servers. Used by every carrier and infra vendor.",
    topics:[
      { name:"Ansible Fundamentals", items:["Architecture: control node, managed nodes, agentless (SSH)","Inventory: static, dynamic, groups, host variables","Ad-hoc commands: ping, shell, copy, file, service","Playbooks: YAML syntax, plays, tasks, handlers","Modules: command, file, template, apt/yum, service, user","Variables: host_vars, group_vars, facts, registered vars","Conditionals (when), loops (loop/with_items), tags"] },
      { name:"Ansible Advanced", items:["Roles: directory structure, defaults, tasks, templates, handlers","Ansible Galaxy: community roles, collections","Templates: Jinja2, loops, conditionals, filters","Ansible Vault: encrypt secrets, vault passwords","Error handling: block/rescue/always, failed_when, changed_when","Ansible Tower/AWX: web UI, job templates, RBAC, scheduling","Testing: Ansible Molecule, ansible-lint"] },
      { name:"Ansible for Network/Telecom", items:["Network modules: ios_config, nxos_config, junos_config","NETCONF/RESTCONF with Ansible for SDN devices","Configure routers/switches programmatically","Deploy and configure 5G NFs on remote servers","Ansible + Docker: deploy containers across hosts","Ansible + K8s: manage K8s resources with k8s module","Idempotent network configuration management"] },
    ],
    resources:[
      { name:"Ansible Official Getting Started", link:"https://docs.ansible.com/ansible/latest/getting_started/", free:true },
      { name:"Red Hat Ansible Automation", link:"https://www.ansible.com/resources/get-started", free:true },
      { name:"Ansible for Network Automation (Book)", link:"https://www.oreilly.com/library/view/network-programmability-and/9781491931240/", free:false },
      { name:"KodeKloud Ansible Course", link:"https://kodekloud.com", free:false },
    ],
    certs:[
      { name:"Red Hat Certified System Admin (RHCSA)", cost:"$400", hours:40, impact:80 },
      { name:"Red Hat Ansible Automation (EX407)", cost:"$400", hours:30, impact:78 },
    ]
  },
  { id:"jenkins", name:"Jenkins & CI/CD", icon:"🔄", color:"#D33833", duration:"Weeks 11–13", level:"Advanced",
    why:"Industry-standard CI/CD. Automate build→test→deploy for telecom NFs and applications.",
    topics:[
      { name:"Jenkins Core", items:["Jenkins architecture: master, agents, executors","Installation: Docker, native, plugins management","Freestyle jobs: build steps, post-build actions, triggers","Jenkinsfile: declarative vs scripted pipeline syntax","Pipeline stages: Build, Test, Deploy, Post","Pipeline steps: sh, bat, echo, input, timeout, retry","Credentials management: username/password, SSH keys, tokens"] },
      { name:"Jenkins Advanced", items:["Multibranch pipelines: automatic branch discovery","Shared libraries: reusable pipeline code","Parameterized builds: choice, string, boolean parameters","Jenkins agents: Docker agents, Kubernetes agents","Webhooks: GitHub/GitLab triggers on push/PR","Artifacts: archive, stash/unstash between stages","Notifications: Slack, email, webhook on build status"] },
      { name:"CI/CD Beyond Jenkins", items:["GitHub Actions: workflows, jobs, steps, marketplace actions","GitLab CI/CD: .gitlab-ci.yml, stages, runners","ArgoCD: GitOps continuous deployment on K8s","Tekton: cloud-native CI/CD on Kubernetes","CI/CD for 5G NFs: build Docker image → push → deploy to K8s → smoke test","Pipeline security: SAST (SonarQube), DAST, image scanning"] },
    ],
    resources:[
      { name:"Jenkins Official Tutorials", link:"https://www.jenkins.io/doc/tutorials/", free:true },
      { name:"GitHub Actions Documentation", link:"https://docs.github.com/en/actions", free:true },
      { name:"ArgoCD Getting Started", link:"https://argo-cd.readthedocs.io/en/stable/getting_started/", free:true },
      { name:"KodeKloud Jenkins Course", link:"https://kodekloud.com", free:false },
    ],
    certs:[
      { name:"Certified Jenkins Engineer (CJE)", cost:"$150", hours:25, impact:72 },
      { name:"GitHub Actions Certification", cost:"$99", hours:15, impact:70 },
    ]
  },
  { id:"security", name:"Network Security", icon:"🔒", color:"#10B981", duration:"Weeks 12–16", level:"Advanced",
    why:"5G security is critical — physical layer attacks, core network threats, O-RAN vulnerabilities. Your PLA research is directly relevant.",
    topics:[
      { name:"Network Security Fundamentals", items:["CIA triad: confidentiality, integrity, availability","OSI model security at each layer","Encryption: symmetric (AES), asymmetric (RSA, ECC), hashing (SHA-256)","TLS/SSL: handshake, certificates, PKI, certificate authorities","Firewalls: stateful, stateless, WAF, NGFW","VPN: IPSec, WireGuard, tunnel vs transport mode","IDS/IPS: Snort, Suricata, signature vs anomaly-based detection"] },
      { name:"5G & Telecom Security", items:["5G-AKA: authentication and key agreement protocol","SUPI/SUCI: subscriber privacy (encrypted IMSI)","NAS security: integrity protection, ciphering algorithms","RAN security: RRC encryption, PDCP integrity","5G Core security: SBA TLS, OAuth2 for NF authorization","Network slicing security: inter-slice isolation, side-channel attacks","O-RAN security: xApp trust, E2 interface protection, open fronthaul risks"] },
      { name:"Security Operations", items:["Vulnerability scanning: Nessus, OpenVAS, Nmap","Penetration testing basics: reconnaissance, exploitation, reporting","SIEM: Splunk, ELK Stack for log analysis and threat detection","Incident response: preparation, identification, containment, recovery","Zero Trust Architecture: never trust, always verify","Container security: image scanning (Trivy), runtime (Falco), admission control","Secrets management: HashiCorp Vault, K8s Secrets, sealed-secrets"] },
      { name:"Physical Layer Security (Your Research)", items:["CSI-based authentication: your autoencoder PLA approach","Jamming detection and mitigation techniques","Spoofing attacks on 5G NR: IMSI catching, fake base stations","Physical layer key generation from channel reciprocity","Covert communication and information-theoretic security","AI/ML for wireless security: anomaly detection, intrusion detection"] },
    ],
    resources:[
      { name:"CompTIA Security+ Study Guide", link:"https://www.comptia.org/certifications/security", free:false },
      { name:"OWASP Top 10", link:"https://owasp.org/www-project-top-ten/", free:true },
      { name:"Cybrary Free Courses", link:"https://www.cybrary.it/", free:true },
      { name:"TryHackMe: Hands-on Cyber Security", link:"https://tryhackme.com/", free:true },
      { name:"3GPP TS 33.501 – 5G Security Architecture", link:"https://www.3gpp.org/dynareport/33501.htm", free:true },
    ],
    certs:[
      { name:"CompTIA Security+ (SY0-701)", cost:"$392", hours:30, impact:85 },
      { name:"CISSP (for advanced)", cost:"$749", hours:60, impact:95 },
      { name:"AWS Security Specialty", cost:"$300", hours:35, impact:82 },
      { name:"Certified Ethical Hacker (CEH)", cost:"$1,199", hours:40, impact:78 },
    ]
  },
  { id:"devops", name:"DevOps Culture", icon:"♾️", color:"#EC4899", duration:"Weeks 14–16", level:"Mastery",
    why:"DevOps ties everything together. The culture, practices, and mindset that make all other skills 10x more valuable.",
    topics:[
      { name:"DevOps Principles & Culture", items:["DevOps lifecycle: plan → code → build → test → release → deploy → operate → monitor","CALMS: Culture, Automation, Lean, Measurement, Sharing","Three Ways: flow, feedback, continuous learning","Site Reliability Engineering (SRE): error budgets, SLIs/SLOs/SLAs","DORA metrics: deployment frequency, lead time, MTTR, change failure rate","Blameless postmortems and learning from failure","DevOps team topologies: platform teams, stream-aligned teams"] },
      { name:"DevOps Toolchain Integration", items:["Version control: Git flow, trunk-based development, conventional commits","CI/CD: Jenkins + GitHub Actions + ArgoCD full pipeline","IaC: Terraform + Ansible working together","Containers: Docker → K8s → Helm → GitOps","Monitoring: Prometheus + Grafana + Alertmanager + PagerDuty","Logging: EFK/ELK stack or Loki + Grafana","Tracing: Jaeger/Zipkin for distributed systems","ChatOps: Slack + GitHub bots for automated workflows"] },
      { name:"DevOps for Telecom", items:["Cloud-native network functions (CNFs) vs VNFs","NFV lifecycle: onboard, instantiate, scale, heal, terminate","Telecom-specific CI/CD: build NF → test → deploy to K8s → canary","Network-as-Code: YANG models + NETCONF + GitOps","Observability for 5G: per-slice monitoring, E2E latency tracking","Chaos engineering: test network resilience (Chaos Monkey for telecom)","Zero-touch provisioning: fully automated NF deployment"] },
    ],
    resources:[
      { name:"The Phoenix Project (Book)", link:"https://www.amazon.com/dp/1942788290", free:false },
      { name:"Google SRE Book (Free Online)", link:"https://sre.google/sre-book/table-of-contents/", free:true },
      { name:"DevOps Handbook", link:"https://www.amazon.com/dp/1942788002", free:false },
      { name:"Linux Foundation DevOps Course", link:"https://training.linuxfoundation.org/", free:false },
    ],
    certs:[
      { name:"AWS DevOps Engineer Professional", cost:"$300", hours:40, impact:90 },
      { name:"Azure DevOps Solutions Expert (AZ-400)", cost:"$165", hours:35, impact:85 },
      { name:"Linux Foundation LFCS", cost:"$395", hours:30, impact:78 },
    ]
  },
];

// ─── PROJECTS ───────────────────────────────────────────────────────────
const projects = [
  { title:"Full-Stack 5G Lab API", skills:["Python","Docker","SQL","AWS"], difficulty:"Intermediate", duration:"2 weeks", color:"#3B82F6",
    desc:"Build a FastAPI backend that manages 5G subscriber data in PostgreSQL, containerized with Docker, deployed on AWS EC2.",
    steps:["Design PostgreSQL schema for subscribers (IMSI, Ki, OPc, slice info)","Build FastAPI CRUD endpoints with SQLAlchemy ORM","Add JWT authentication and rate limiting","Write pytest test suite (>80% coverage)","Containerize with Docker + docker-compose (API + PostgreSQL)","Deploy to AWS EC2 with security groups and IAM roles","Add CloudWatch monitoring for API metrics","Document with Swagger/OpenAPI + README"] },
  { title:"Infrastructure-as-Code 5G Testbed", skills:["Terraform","AWS","Ansible","Docker"], difficulty:"Advanced", duration:"2 weeks", color:"#7B42BC",
    desc:"Provision a complete 5G testbed on AWS using Terraform, configure it with Ansible, run containerized NFs.",
    steps:["Write Terraform to create VPC, subnets, security groups, EC2 instances","Create IAM roles and S3 buckets for NF data","Use Terraform modules for reusable components","Write Ansible playbooks to install Docker on EC2 nodes","Ansible roles to deploy Open5GS containers on provisioned infra","Ansible playbook for srsRAN gNB deployment","Add Terraform outputs + Ansible dynamic inventory","CI/CD: GitHub Actions to terraform plan/apply on push"] },
  { title:"K8s 5G Core with Helm + GitOps", skills:["Kubernetes","Docker","Jenkins","DevOps"], difficulty:"Advanced", duration:"3 weeks", color:"#326CE5",
    desc:"Deploy a full 5G Core on Kubernetes using Helm charts with ArgoCD GitOps and Jenkins CI/CD pipeline.",
    steps:["Set up minikube/kind cluster with Multus CNI","Create Helm chart for Open5GS (AMF, SMF, UPF as separate deployments)","Add ConfigMaps for PLMN, slice, and IP configuration","Deploy UERANSIM as StatefulSet for UE simulation","Build Jenkins pipeline: lint → test → build images → push to registry","Set up ArgoCD watching Git repo for auto-deploy on merge","Add HPA for automatic NF scaling under load","Prometheus + Grafana dashboards for NF metrics"] },
  { title:"Network Security Monitoring Dashboard", skills:["Python","SQL","Security","Docker"], difficulty:"Intermediate", duration:"2 weeks", color:"#10B981",
    desc:"Build an AI-powered network security monitor that ingests logs, detects anomalies, and displays alerts on a dashboard.",
    steps:["Set up Suricata IDS capturing network traffic","Parse alerts into PostgreSQL with Python ingestion script","Build anomaly detection model (Isolation Forest) on traffic patterns","Create FastAPI endpoints for alert queries and stats","Build React dashboard showing real-time alerts and threat map","Containerize entire stack with Docker Compose","Add automated email/Slack alerts on critical detections","Write security report generator (PDF) for weekly summaries"] },
  { title:"Automated Cloud Infrastructure Pipeline", skills:["AWS","Terraform","Jenkins","Ansible","DevOps"], difficulty:"Expert", duration:"3 weeks", color:"#FF9900",
    desc:"End-to-end DevOps pipeline: push code → Jenkins builds → Terraform provisions → Ansible configures → K8s deploys → Grafana monitors.",
    steps:["Jenkins multibranch pipeline with Jenkinsfile","Terraform stage: provision EKS cluster on AWS","Ansible stage: configure cluster networking and storage","Docker stage: build and push NF images to ECR","K8s stage: Helm upgrade to deploy latest images","ArgoCD: sync K8s state with Git repo","Prometheus + Grafana: auto-provision monitoring dashboards","Slack notifications on pipeline success/failure","Full documentation: architecture diagram + runbook"] },
  { title:"Telecom Data Analytics Platform", skills:["Python","SQL","AWS","Docker","DevOps"], difficulty:"Advanced", duration:"2 weeks", color:"#F59E0B",
    desc:"Build an end-to-end data pipeline: ingest telecom KPIs → store in database → analyze with Python → visualize in Grafana.",
    steps:["Generate synthetic 5G KPI data (RSRP, SINR, throughput, latency)","Build Python ETL pipeline: CSV → clean → transform → PostgreSQL","Create SQL views for key analytics (hourly averages, anomalies, trends)","Build Grafana dashboards connected to PostgreSQL","Add ML anomaly detection on KPI time-series (Python + scikit-learn)","Containerize: ETL + PostgreSQL + Grafana with Docker Compose","Deploy on AWS EC2 with S3 for raw data storage","Schedule ETL with cron/Airflow for continuous ingestion"] },
];

// ─── LINKEDIN POSTING SCHEDULE ──────────────────────────────────────────
const linkedinPosts = [
  { week:"Week 1", type:"Learning Journey", prompt:"Share you're starting a structured tech skills roadmap. Mention Python + SQL as your foundation. Ask: 'What skill changed your career the most?'", hashtags:"#CareerDevelopment #Python #SQL #TechSkills" },
  { week:"Week 2", type:"Technical Tutorial", prompt:"Write a mini-tutorial: '5 Python One-Liners Every Engineer Should Know' with code examples.", hashtags:"#Python #Programming #Engineering #TechTips" },
  { week:"Week 3", type:"Project Showcase", prompt:"Share your first API project: screenshot of Swagger docs, explain what it does. 'Built my first REST API this week...'", hashtags:"#FastAPI #Python #BuildInPublic #SoftwareEngineering" },
  { week:"Week 4", type:"AWS Journey", prompt:"Post about starting AWS: 'Week 1 of cloud journey — deployed my first EC2 instance. Here's what I learned about VPCs...'", hashtags:"#AWS #Cloud #CloudComputing #Learning" },
  { week:"Week 5", type:"Docker Deep Dive", prompt:"Share a Docker tip: 'Multi-stage builds reduced my image from 1.2GB to 180MB. Here's how...' with Dockerfile snippet.", hashtags:"#Docker #Containers #DevOps #CloudNative" },
  { week:"Week 6", type:"Certification Win", prompt:"Post about passing AWS CCP or completing a course. Share 3 key takeaways. Celebrate publicly!", hashtags:"#AWS #Certification #CloudCertified #Achievement" },
  { week:"Week 7", type:"K8s Learning", prompt:"'Deployed my first app on Kubernetes this week. Pods, services, deployments — here's my mental model...' with diagram.", hashtags:"#Kubernetes #K8s #CloudNative #DevOps" },
  { week:"Week 8", type:"Project Showcase", prompt:"Share your K8s 5G Core project: architecture diagram + what you learned. Tag relevant companies.", hashtags:"#5G #Kubernetes #OpenSource #Telecom" },
  { week:"Week 9", type:"IaC Insight", prompt:"'Infrastructure-as-Code changed how I think about deployment. Terraform vs Ansible — here's when to use each...'", hashtags:"#Terraform #Ansible #IaC #DevOps" },
  { week:"Week 10", type:"Security Post", prompt:"'3 things I learned about 5G security this week that surprised me...' Reference your PLA research.", hashtags:"#Cybersecurity #5GSecurity #NetworkSecurity #Research" },
  { week:"Week 11", type:"CI/CD Pipeline", prompt:"Share your Jenkins/GitHub Actions pipeline: screenshot + explanation. 'Automated my entire deployment workflow...'", hashtags:"#CICD #Jenkins #GitHubActions #Automation" },
  { week:"Week 12", type:"Monthly Recap Article", prompt:"Publish LinkedIn article: '3 Months of Tech Skill Building — What I Learned, Built, and Certified'. Include all project links.", hashtags:"#CareerGrowth #TechJourney #BuildInPublic #Portfolio" },
];

// ─── COMPONENT ──────────────────────────────────────────────────────────
const TABS=[{l:"Skills",i:"📚"},{l:"Projects",i:"🔧"},{l:"LinkedIn",i:"📝"},{l:"Certs",i:"🏆"}];

export default function TechSkillsMastery(){
  const[tab,setTab]=useState(0);
  const[selSkill,setSelSkill]=useState(0);
  const[selProject,setSelProject]=useState(null);
  const[progress,setProgress]=useState({});
  const[loading,setLoading]=useState(true);

  useEffect(()=>{(async()=>{try{const r=await window.storage.get("tech-skills-progress");if(r)setProgress(JSON.parse(r.value));}catch(e){}setLoading(false);})();},[]);

  const toggleItem=async(key)=>{const np={...progress,[key]:!progress[key]};setProgress(np);try{await window.storage.set("tech-skills-progress",JSON.stringify(np));}catch(e){}};

  const getSkillPct=(skill)=>{const total=skill.topics.reduce((a,t)=>a+t.items.length,0);const done=skill.topics.reduce((a,t,ti)=>a+t.items.filter((_,ii)=>progress[`${skill.id}-${ti}-${ii}`]).length,0);return total?Math.round((done/total)*100):0;};
  const getProjPct=(idx)=>{const p=projects[idx];const done=p.steps.filter((_,i)=>progress[`proj-${idx}-${i}`]).length;return Math.round((done/p.steps.length)*100);};

  const S={card:{background:"linear-gradient(150deg,#0C1020,#111828)",border:"1px solid #19223A",borderRadius:14}};

  if(loading) return (<div style={{fontFamily:"'DM Sans',sans-serif",background:"#06080F",color:"#CBD5E1",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>Loading...</div>);

  return(
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif",background:"#06080F",color:"#CBD5E1",minHeight:"100vh"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#19223A;border-radius:4px}@keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}.up{animation:up .4s ease forwards}.d1{animation-delay:.05s;opacity:0}.d2{animation-delay:.1s;opacity:0}button{cursor:pointer;border:none;outline:none;font-family:inherit}a{text-decoration:none}.ck{width:20px;height:20px;border-radius:5px;border:2px solid #19223A;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;flex-shrink:0;transition:all .2s}.ck.on{background:#10B981;border-color:#10B981}.bar{height:5px;border-radius:3px;background:#0C1020;overflow:hidden}.bf{height:100%;border-radius:3px;transition:width .8s ease}.tag{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:.5px;white-space:nowrap}`}</style>

      <header style={{background:"linear-gradient(180deg,#0A0E1A,#06080F)",borderBottom:"1px solid #111828",padding:"18px 16px 10px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:880,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:12}}>
            <div style={{width:36,height:36,borderRadius:9,background:"linear-gradient(135deg,#3B82F6,#EC4899)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,fontFamily:"Syne",color:"#fff"}}>∞</div>
            <div><h1 style={{fontSize:15,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9"}}>Tech Skills Mastery</h1>
            <p style={{fontSize:9,color:"#334155",fontFamily:"Space Mono",letterSpacing:1}}>10 SKILLS · 6 PROJECTS · CERTIFICATIONS · LINKEDIN PLAN</p></div>
          </div>
          <nav style={{display:"flex",gap:3}}>{TABS.map((t,i)=>(<button key={i} onClick={()=>setTab(i)} style={{padding:"6px 12px",borderRadius:7,fontSize:11,fontWeight:600,display:"flex",alignItems:"center",gap:4,background:tab===i?"linear-gradient(135deg,#162044,#1E1650)":"transparent",color:tab===i?"#D6E0F0":"#334155",border:tab===i?"1px solid #253060":"1px solid transparent"}}><span style={{fontSize:12}}>{t.i}</span>{t.l}</button>))}</nav>
        </div>
      </header>

      <main style={{maxWidth:880,margin:"0 auto",padding:16}}>

        {/* ═══ SKILLS TAB ═══ */}
        {tab===0&&(<div>
          <div className="up" style={{display:"flex",gap:4,marginBottom:14,overflowX:"auto",flexWrap:"wrap"}}>
            {skills.map((s,i)=>{const pct=getSkillPct(s);return(
              <button key={i} onClick={()=>setSelSkill(i)} style={{padding:"6px 10px",borderRadius:7,fontSize:10,fontWeight:600,display:"flex",alignItems:"center",gap:4,whiteSpace:"nowrap",background:selSkill===i?s.color+"18":"#0A0E1A",color:selSkill===i?s.color:"#334155",border:`1px solid ${selSkill===i?s.color+"40":"#19223A"}`}}>
                <span>{s.icon}</span>{s.name}{pct>0&&<span style={{color:"#10B981"}}>{pct}%</span>}
              </button>
            );})}
          </div>

          {(()=>{const s=skills[selSkill];const pct=getSkillPct(s);return(<div className="up d1">
            <div style={{...S.card,padding:20,marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div><h2 style={{fontSize:20,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9"}}>{s.icon} {s.name}</h2>
                <p style={{fontSize:11,color:"#475569",marginTop:2}}>{s.duration} · {s.level}</p></div>
                <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:800,fontFamily:"Syne",color:pct>=80?"#10B981":pct>0?s.color:"#253060"}}>{pct}%</div></div>
              </div>
              <p style={{fontSize:12,color:"#94A3B8",lineHeight:1.6}}>{s.why}</p>
              <div className="bar" style={{marginTop:10}}><div className="bf" style={{width:`${pct}%`,background:s.color}}/></div>
            </div>

            {s.topics.map((topic,ti)=>(<div key={ti} style={{...S.card,padding:16,marginBottom:8}}>
              <h3 style={{fontSize:13,fontWeight:700,fontFamily:"Syne",color:"#F1F5F9",marginBottom:10}}>{topic.name}</h3>
              {topic.items.map((item,ii)=>{const key=`${s.id}-${ti}-${ii}`;const done=progress[key];return(
                <div key={ii} style={{display:"flex",gap:8,padding:"6px 0",borderBottom:ii<topic.items.length-1?"1px solid #111828":"none",opacity:done?.4:1,transition:"opacity .3s"}}>
                  <button className={`ck ${done?"on":""}`} onClick={()=>toggleItem(key)}>{done?"✓":""}</button>
                  <span style={{fontSize:12,color:done?"#334155":"#CBD5E1",textDecoration:done?"line-through":"none",lineHeight:1.5}}>{item}</span>
                </div>
              );})}
            </div>))}

            <div style={{...S.card,padding:16,marginTop:8}}>
              <h3 style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#475569",letterSpacing:1.5,marginBottom:8}}>RESOURCES</h3>
              {s.resources.map((r,i)=>(<div key={i} style={{display:"flex",gap:6,padding:"5px 0",borderBottom:i<s.resources.length-1?"1px solid #0C1020":"none"}}>
                <span className="tag" style={{background:r.free?"#10B98114":"#F59E0B14",color:r.free?"#10B981":"#F59E0B"}}>{r.free?"Free":"Paid"}</span>
                <a href={r.link} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:"#60A5FA",lineHeight:1.5}}>{r.name}</a>
              </div>))}
            </div>
          </div>);})()}
        </div>)}

        {/* ═══ PROJECTS TAB ═══ */}
        {tab===1&&(<div>
          <h2 className="up" style={{fontSize:20,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9",marginBottom:14}}>Industry Projects</h2>
          {selProject!==null?(()=>{const p=projects[selProject];const pct=getProjPct(selProject);return(<div className="up">
            <button onClick={()=>setSelProject(null)} style={{fontSize:12,color:"#475569",background:"none",padding:0,marginBottom:12}}>← Back</button>
            <div style={{...S.card,padding:20,marginBottom:12,borderLeft:`4px solid ${p.color}`}}>
              <h3 style={{fontSize:18,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9",marginBottom:4}}>{p.title}</h3>
              <p style={{fontSize:12,color:"#94A3B8",lineHeight:1.6,marginBottom:8}}>{p.desc}</p>
              <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{p.skills.map((s,i)=><span key={i} className="tag" style={{background:"#2563EB14",color:"#60A5FA"}}>{s}</span>)}</div>
            </div>
            <div style={{...S.card,padding:16}}>
              <h4 style={{fontSize:13,fontWeight:700,fontFamily:"Syne",color:"#F1F5F9",marginBottom:10}}>Steps ({p.steps.filter((_,i)=>progress[`proj-${selProject}-${i}`]).length}/{p.steps.length})</h4>
              {p.steps.map((step,i)=>{const key=`proj-${selProject}-${i}`;const done=progress[key];return(
                <div key={i} style={{display:"flex",gap:8,padding:"7px 0",borderBottom:i<p.steps.length-1?"1px solid #111828":"none",opacity:done?.4:1}}>
                  <button className={`ck ${done?"on":""}`} onClick={()=>toggleItem(key)}>{done?"✓":""}</button>
                  <span style={{fontSize:12,color:done?"#334155":"#E2E8F0",textDecoration:done?"line-through":"none",lineHeight:1.5}}>{step}</span>
                </div>);})}
              <div className="bar" style={{marginTop:10}}><div className="bf" style={{width:`${pct}%`,background:pct===100?"#10B981":p.color}}/></div>
            </div>
          </div>);})():(
            projects.map((p,i)=>{const pct=getProjPct(i);return(
              <button key={i} onClick={()=>setSelProject(i)} className="up" style={{...S.card,padding:16,marginBottom:8,width:"100%",textAlign:"left",borderLeft:`3px solid ${p.color}30`,display:"block",animationDelay:`${i*.04}s`,opacity:0}}>
                <div style={{display:"flex",justifyContent:"space-between",gap:8}}>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",gap:4,marginBottom:4,flexWrap:"wrap"}}><span className="tag" style={{background:"#19223A",color:"#64748B"}}>{p.difficulty}</span><span className="tag" style={{background:"#19223A",color:"#64748B"}}>{p.duration}</span></div>
                    <div style={{fontSize:14,fontWeight:600,color:"#F1F5F9",marginBottom:2}}>{p.title}</div>
                    <div style={{fontSize:11,color:"#64748B"}}>{p.desc}</div>
                    <div style={{display:"flex",gap:3,marginTop:6}}>{p.skills.map((s,si)=><span key={si} className="tag" style={{background:"#0C1020",color:"#64748B"}}>{s}</span>)}</div>
                  </div>
                  <div style={{fontSize:18,fontWeight:800,fontFamily:"Syne",color:pct===100?"#10B981":pct>0?p.color:"#253060"}}>{pct}%</div>
                </div>
              </button>);}))
          }
        </div>)}

        {/* ═══ LINKEDIN TAB ═══ */}
        {tab===2&&(<div>
          <h2 className="up" style={{fontSize:20,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9",marginBottom:14}}>12-Week LinkedIn Posting Plan</h2>
          {linkedinPosts.map((p,i)=>(<div key={i} className="up" style={{...S.card,padding:16,marginBottom:8,animationDelay:`${i*.03}s`,opacity:0}}>
            <div style={{display:"flex",gap:6,marginBottom:6}}><span className="tag" style={{background:"#2563EB14",color:"#60A5FA"}}>{p.week}</span><span className="tag" style={{background:"#8B5CF614",color:"#A78BFA"}}>{p.type}</span></div>
            <p style={{fontSize:12,color:"#CBD5E1",lineHeight:1.6,marginBottom:6}}>{p.prompt}</p>
            <p style={{fontSize:10,color:"#2563EB"}}>{p.hashtags}</p>
          </div>))}
        </div>)}

        {/* ═══ CERTS TAB ═══ */}
        {tab===3&&(<div>
          <h2 className="up" style={{fontSize:20,fontWeight:800,fontFamily:"Syne",color:"#F1F5F9",marginBottom:14}}>All Certifications by Skill</h2>
          {skills.map((s,si)=>(<div key={si} className="up" style={{...S.card,padding:16,marginBottom:8,borderLeft:`3px solid ${s.color}30`,animationDelay:`${si*.03}s`,opacity:0}}>
            <h3 style={{fontSize:13,fontWeight:700,fontFamily:"Syne",color:s.color,marginBottom:8}}>{s.icon} {s.name}</h3>
            {s.certs.map((c,ci)=>(<div key={ci} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:ci<s.certs.length-1?"1px solid #0C1020":"none",alignItems:"center"}}>
              <div><div style={{fontSize:12,fontWeight:600,color:"#E2E8F0"}}>{c.name}</div><div style={{fontSize:10,color:"#334155"}}>⏱ {c.hours}h · 💰 {c.cost}</div></div>
              <div style={{fontSize:14,fontWeight:800,fontFamily:"Syne",color:c.impact>=90?"#E8553D":c.impact>=80?"#10B981":"#F59E0B"}}>{c.impact}</div>
            </div>))}
          </div>))}
          <div className="up d1" style={{...S.card,padding:16,marginTop:8}}>
            <h3 style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#F59E0B",letterSpacing:1.5,marginBottom:10}}>TOP 10 CERTS BY IMPACT</h3>
            {skills.flatMap(s=>s.certs.map(c=>({...c,skill:s.name,color:s.color}))).sort((a,b)=>b.impact-a.impact).slice(0,10).map((c,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"5px 0",borderBottom:i<9?"1px solid #0C1020":"none"}}>
              <span style={{fontSize:14,fontWeight:800,fontFamily:"Syne",color:c.impact>=90?"#E8553D":"#10B981",minWidth:22}}>{c.impact}</span>
              <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:"#E2E8F0"}}>{c.name}</div><div style={{fontSize:10,color:"#334155"}}>{c.skill} · {c.cost}</div></div>
            </div>))}
          </div>
        </div>)}

        {/* Overall Progress */}
        <div className="up" style={{...S.card,padding:16,marginTop:16}}>
          <h3 style={{fontSize:10,fontWeight:700,fontFamily:"Space Mono",color:"#475569",letterSpacing:1.5,marginBottom:10}}>ALL SKILLS PROGRESS</h3>
          {skills.map((s,i)=>{const pct=getSkillPct(s);return(<div key={i} style={{marginBottom:6}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:2}}><span style={{color:"#94A3B8"}}>{s.icon} {s.name}</span><span style={{fontWeight:700,fontFamily:"Syne",color:pct>=80?"#10B981":pct>0?s.color:"#253060"}}>{pct}%</span></div>
            <div className="bar"><div className="bf" style={{width:`${pct}%`,background:pct>=80?"#10B981":s.color}}/></div>
          </div>);})}
        </div>
      </main>

      <footer style={{textAlign:"center",padding:"28px 16px 36px",fontSize:9,fontFamily:"Space Mono",color:"#111828",letterSpacing:1.5}}>TECH SKILLS MASTERY · RALPH KUMAH · 2026</footer>
    </div>
  );
}
