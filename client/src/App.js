import React, { useState } from 'react';

function App() {
  const [transcript, setTranscript] = useState('');
  const [prompt, setPrompt] = useState('');
  const [summary, setSummary] = useState('');
  const [emails, setEmails] = useState('');
  const [editing, setEditing] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => setTranscript(evt.target.result);
      reader.readAsText(file);
    }
  };

  const BACKEND_URL = 'https://meeting-summarizer-production.up.railway.app'; // Replace with your Railway backend URL

  const generateSummary = async () => {
    const res = await fetch(`${BACKEND_URL}/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript, prompt })
    });
    const data = await res.json();
    setSummary(data.summary);
    setEditing(true);
  };

  const sendEmail = async () => {
    await fetch(`${BACKEND_URL}/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ summary, emails })
    });
    alert('Summary sent!');
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Meeting Notes Summarizer</h2>
      <input type="file" accept=".txt" onChange={handleFileUpload} />
      <br /><br />
      <textarea
        rows={6}
        placeholder="Or paste transcript here..."
        value={transcript}
        onChange={e => setTranscript(e.target.value)}
        style={{ width: '100%' }}
      />
      <br /><br />
      <input
        type="text"
        placeholder="Enter custom prompt/instruction"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        style={{ width: '100%' }}
      />
      <br /><br />
      <button onClick={generateSummary}>Generate Summary</button>
      <br /><br />
      {editing && (
        <>
          <textarea
            rows={8}
            value={summary}
            onChange={e => setSummary(e.target.value)}
            style={{ width: '100%' }}
          />
          <br /><br />
          <input
            type="text"
            placeholder="Recipient email(s), comma separated"
            value={emails}
            onChange={e => setEmails(e.target.value)}
            style={{ width: '100%' }}
          />
          <br /><br />
          <button onClick={sendEmail}>Share via Email</button>
        </>
      )}
    </div>
  );
}

export default App;
