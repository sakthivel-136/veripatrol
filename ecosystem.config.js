module.exports = {
  apps: [
    // 1. PYTHON FASTAPI BACKEND
    {
      name: 'security-verifier-backend',
      script: 'uvicorn',
      args: 'app.main:app --host 0.0.0.0 --port 8000',
      cwd: './security-verifier-server',
      interpreter: 'none', 
      autorestart: true,
      watch: false
    },
    // 2. NEXT.JS FRONTEND (Direct Windows Path Configuration)
    {
      name: 'security-verifier-frontend',
      script: 'node',
      args: './node_modules/next/dist/bin/next start', // Change 'start' to 'dev' if you haven't run npm run build
      cwd: './security-verifier-client',
      autorestart: true,
      watch: false
    }
  ]
};