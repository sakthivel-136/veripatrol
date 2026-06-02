module.exports = {
  apps: [
    // 1. PYTHON FASTAPI BACKEND CONFIGURATION
    {
      name: 'security-verifier-backend',
      script: './venv/Scripts/uvicorn.exe',
      args: 'app.main:app --host 0.0.0.0 --port 8000',
      cwd: './security-verifier-server',
      interpreter: 'none', 
      autorestart: true,
      watch: false
    },
    // 2. NEXT.JS FRONTEND CONFIGURATION
    {
      name: 'security-verifier-frontend',
      script: 'npm',
      args: 'run start -- -H 0.0.0.0 -p 3000', 
      cwd: './security-verifier-client',
      autorestart: true,
      watch: false
    }
  ]
};
