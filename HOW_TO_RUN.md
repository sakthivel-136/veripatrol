# 🚀 Pentagon Security Verifier — Manual Run Guide (VS Code)

> **Your laptop IP:** `10.10.1.7` · **Frontend:** port `3000` · **Backend:** port `8000`

---

## ✅ Prerequisites (install once)

| Tool | Download |
|---|---|
| **Python 3.12** | https://www.python.org/downloads/ |
| **Node.js 22** | https://nodejs.org/ |
| **VS Code** | https://code.visualstudio.com/ |

---

## 📁 Folder Structure

```
security_r/
├── security-verifier-client/   ← Next.js Frontend
└── security-verifier-server/   ← FastAPI Backend
```

---

## 🔧 BACKEND SETUP (Do once)

Open **Terminal 1** in VS Code (`Ctrl + `` ` ```)

```bash
# 1. Go to backend folder
cd C:\Users\csakt\Desktop\security_r\security-verifier-server

# 2. Create virtual environment
python -m venv venv

# 3. Activate it
venv\Scripts\activate

# 4. Install dependencies
pip install -r requirements.txt
```

---

## 🔧 FRONTEND SETUP (Do once)

Open **Terminal 2** in VS Code (`Ctrl + Shift + `` ` `` ` to open new terminal`)

```bash
# 1. Go to frontend folder
cd C:\Users\csakt\Desktop\security_r\security-verifier-client

# 2. Install packages
npm install
```

---

## ▶️ RUN THE PROJECT (Every time)

### Terminal 1 — Backend

```bash
cd C:\Users\csakt\Desktop\security_r\security-verifier-server
venv\Scripts\activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

   You should see: `Uvicorn running on http://0.0.0.0:8000`

---

### Terminal 2 — Frontend

```bash
cd C:\Users\csakt\Desktop\security_r\security-verifier-client
npm run dev
```

   You should see: `Ready in Xs` and `Network: http://0.0.0.0:3000`

---

## 🌐 Access URLs

| Device | Frontend | Backend |
|---|---|---|
| **This laptop** | http://localhost:3000 | http://localhost:8000 |
| **Phone (same WiFi)** | http://10.10.1.7:3000 | http://10.10.1.7:8000 |
| **API Docs** | — | http://localhost:8000/docs |

> ⚠️ **If phone can't connect:** Run this in PowerShell as Administrator:
> ```
> netsh advfirewall firewall add rule name="Pentagon 3000" dir=in action=allow protocol=TCP localport=3000
> netsh advfirewall firewall add rule name="Pentagon 8000" dir=in action=allow protocol=TCP localport=8000
> ```

---

## 🔄 IP Changed? (Every time you switch WiFi)

1. Check new IP: open PowerShell → run `ipconfig` → find **Wi-Fi IPv4 Address**
2. Update `.env` in frontend:
   ```
   NEXT_PUBLIC_API_URL=http://<NEW_IP>:8000
   ```
3. Restart both servers

---

## ❌ Common Errors & Fixes

| Error | Fix |
|---|---|
| `ModuleNotFoundError` | Run `pip install -r requirements.txt` inside venv |
| `venv\Scripts\activate` fails | Run `Set-ExecutionPolicy RemoteSigned` in PowerShell as Admin |
| Port 8000 already in use | Run `netstat -ano \| findstr :8000` then `taskkill /PID <id> /F` |
| Port 3000 already in use | Run `netstat -ano \| findstr :3000` then `taskkill /PID <id> /F` |
| `401 Unauthorized` on API | Token expired — log out and log back in |
| Frontend shows blank page | Check browser console, make sure backend is running on 8000 |
