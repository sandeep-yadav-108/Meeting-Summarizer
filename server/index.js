import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Groq } from 'groq-sdk';
dotenv.config();

const app = express();
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json({ limit: '2mb' }));

// Handle OPTIONS preflight
app.options('*', cors());

// POST /summarize
app.post('/summarize', async (req, res) => {
  const { transcript, prompt } = req.body;
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const chatCompletion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: 'You are a helpful meeting notes summarizer.' },
        { role: 'user', content: `${prompt}\n\n${transcript}` }
      ]
    });
    const summary = chatCompletion.choices[0].message.content;
    res.json({ summary });
  } catch (err) {
    console.error('Groq SDK error:', err);
    res.status(500).json({ error: 'AI summarization failed.', details: err.message });
  }
});

// POST /send
app.post('/send', async (req, res) => {
  const { summary, emails } = req.body;
  const recipients = emails.split(',').map(e => e.trim());
  // Configure your SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  try {
    await transporter.sendMail({
      from: 'ftsandy01@gmail.com',
      to: recipients,
      subject: 'Meeting Summary',
      text: summary
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Email sending error:', err);
    res.status(500).json({ error: 'Email sending failed.', details: err.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
