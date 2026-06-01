module.exports = {
  apps: [
    // 1. PYTHON FASTAPI BACKEND CONFIGURATION
    {
      name: 'security-verifier-backend',
      script: './venv/Scripts/uvicorn.exe',
      args: 'app.main:app --host 0.0.0.0 --port 8000',
      cwd: './security-verifier-server',
      interpreter: 'none', // Tells PM2 to run the uvicorn.exe directly without searching for Node interpreter
      autorestart: true,
      watch: false
    },

    // 2. NEXT.JS FRONTEND CONFIGURATION
    {
      name: 'security-verifier-frontend',
      script: 'npm',
      args: 'run start', // Production start (make sure npm run build has been run first)
      cwd: './security-verifier-client',
      autorestart: true,
      watch: false
    }
  ]
};
