module.exports = {
  apps: [
    // 1. PYTHON FASTAPI BACKEND (Universal Cross-Platform)
    {
      name: 'security-verifier-backend',
      script: 'uvicorn',
      args: 'app.main:app --host 0.0.0.0 --port 8000',
      cwd: './security-verifier-server',
      interpreter: 'python3', // Mac uses this, Windows automatically adapts to local venv via terminal shell context
      autorestart: true,
      watch: false
    },
    // 2. NEXT.JS FRONTEND
    {
      name: 'security-verifier-frontend',
      script: 'npm',
      args: 'run start', 
      cwd: './security-verifier-client',
      autorestart: true,
      watch: false
    }
  ]
};
