module.exports = {
  apps: [
    // 1. PYTHON FASTAPI BACKEND (Universal Cross-Platform)
    {
      name: 'security-verifier-backend',
      script: 'npm', // We use an execution wrapper PM2 natively understands
      args: 'exec -- uvicorn app.main:app --host 0.0.0.0 --port 8000',
      cwd: './security-verifier-server',
      autorestart: true,
      watch: false
    },

    // 2. NEXT.JS FRONTEND
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
