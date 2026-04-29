# 🚀 Ralph Kumah — Career Hub

A unified career development platform with 4 interactive dashboards, built with React + Vite, deployed on GitHub Pages.

## 📋 Dashboards

| Dashboard | Description |
|-----------|-------------|
| ⚡ **Career Command Center** | Daily tasks with persistence, job listings, LinkedIn strategy, certifications, networking |
| 🏢 **Top 100 Companies** | 100 wireless/telecom companies, skills matrix, certification roadmap, gap analysis |
| 📡 **5G Engineer Pathway** | 36-week learning path based on Nitin Gupta's roadmap with trackable progress |
| 🔧 **Project Portfolio** | 12 hands-on projects with step-by-step guides mapped to real job listings |

## 🛠️ Deploy to GitHub Pages — Step by Step

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `career-hub` (or any name you prefer)
3. Make it **Public**
4. Do NOT initialize with README (we already have one)
5. Click **Create repository**

### Step 2: Update the Base URL

Open `vite.config.js` and change the `base` to match your repo name:

```js
base: '/career-hub/',  // Change 'career-hub' to your repo name
```

### Step 3: Push the Code

Run these commands in your terminal from the project folder:

```bash
git init
git add .
git commit -m "Initial commit — Career Hub"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/career-hub.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **GitHub Actions**
4. The workflow will auto-run on your next push

### Step 5: Access Your Site

After the workflow completes (~2 minutes), your site will be live at:

```
https://YOUR_USERNAME.github.io/career-hub/
```

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
career-hub/
├── .github/workflows/deploy.yml    # Auto-deploy on push
├── src/
│   ├── main.jsx                    # React entry point
│   ├── App.jsx                     # Router + Homepage
│   ├── storage.js                  # localStorage wrapper
│   └── pages/
│       ├── CareerCommandCenter.jsx # Daily tasks + jobs
│       ├── IndustryIntelligence.jsx# Top 100 companies
│       ├── FiveGPathway.jsx        # 5G learning path
│       └── ProjectPortfolio.jsx    # 12 projects
├── index.html
├── vite.config.js
└── package.json
```

## ✨ Features

- **Persistent progress** — All task tracking, streaks, and project steps save to localStorage
- **Mobile responsive** — Bottom navigation bar, works on all screen sizes
- **Offline capable** — All data stored locally, no backend needed
- **Fast** — Built with Vite, loads in under 1 second

## 🔗 Share It

Add this link to your:
- **LinkedIn profile** (Featured section)
- **Resume** (Projects section)
- **Email signature**
- **Job applications** (Portfolio link)

---

Built by Ralph Assan Kumah · PhD ECE · Portland State University · 2026
