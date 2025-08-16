# Meeting Notes Summarizer - My Class Project

## Deployed Links
- Frontend: https://frontend-production-e205.up.railway.app/
- Backend: https://backend-production-c73f.up.railway.app/


## Tech Stack
- Frontend: React (basic UI)
- Backend: Node.js/Express
- AI: Groq API (via groq-sdk)
- Email: Nodemailer (Gmail App Password)

## Approach & Process
1. User uploads a transcript (.txt) or pastes text
2. User enters a custom prompt/instruction
3. On "Generate Summary", backend sends transcript + prompt to Groq API, receives summary
4. Frontend displays editable summary
5. User enters recipient email(s) and shares summary via email

## How to Use
1. Upload a .txt transcript or paste text
2. Enter your custom prompt (e.g., "Summarize in bullet points")
3. Click "Generate Summary" to get AI-powered summary
4. Edit the summary if needed
5. Enter recipient email(s) and click "Share via Email"

## Setup & Deployment
1. Add your Groq API key to `server/.env` as `GROQ_API_KEY=...`
2. Add your Gmail and App Password in `server/index.js`
3. Run `npm install` in both `client` and `server` folders
4. Start backend: `node index.js` in `server`
5. Start frontend: `npm start` in `client`

## Notes
- Make sure your network allows outbound SMTP for email
- Use Gmail App Password for reliable email delivery

---
