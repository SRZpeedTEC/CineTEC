# CineTEC

Cinema management and ticket sales system prototype built with React (frontend) and ASP.NET Core Web API (backend).

## Repository Structure

```
CineTec/
├── docs/          – Project and technical documentation
├── src/
│   ├── backend/   – ASP.NET Core Web API (.NET 8)
│   └── frontend/  – React + Vite web application
├── data/          – File-based storage (XML / JSON / TXT)
├── reports/       – Generated report outputs (PDF / XML)
├── deploy/        – IIS deployment artifacts and scripts
├── tests/         – Backend and frontend test projects
└── .github/       – GitHub issue templates
```

## Getting Started

**Backend**
```bash
cd src/backend
dotnet build
dotnet run --project CineTec.Api
```

**Frontend**
```bash
cd src/frontend/cinetec-web
npm install
npm run dev
```

