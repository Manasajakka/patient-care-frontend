import { useState } from 'react';

function AskAI() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setAnswer('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/ai/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question })
            });

            const text = await response.text();

            if (response.ok) {
                setAnswer(text);
            } else {
                setAnswer(`Error: ${text}`);
            }
        } catch (error) {
            setAnswer('Something went wrong. Is the backend server running?');
        }

        setLoading(false);
    }

    return (
        <div style={{
            minHeight: '90vh',
            backgroundColor: '#F4F9FF',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '50px',
            fontFamily: 'Arial'
        }}>
            <div style={{
                backgroundColor: '#FFFFFF',
                padding: '40px',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(111, 168, 220, 0.2)',
                width: '500px',
                height: 'fit-content'
            }}>
                <h1 style={{ color: '#2C3E50', textAlign: 'center', marginBottom: '10px' }}>
                    Ask the AI Assistant
                </h1>
                <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '13px', marginBottom: '20px' }}>
                    Ask general questions about medications or conditions.
                </p>
                <form onSubmit={handleSubmit}>
          <textarea
              placeholder="e.g. What is Amoxicillin used for?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
          />
                    <button type="submit" style={buttonStyle} disabled={loading}>
                        {loading ? 'Thinking...' : 'Ask'}
                    </button>
                </form>

                {answer && (
                    <div style={answerBoxStyle}>
                        <p style={{ margin: 0, color: '#2C3E50', lineHeight: '1.5' }}>{answer}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #DCEEFA',
    borderRadius: '8px',
    backgroundColor: '#F9FCFF',
    fontSize: '14px',
    boxSizing: 'border-box',
    fontFamily: 'Arial'
};

const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#6FA8DC',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer'
};

const answerBoxStyle = {
    marginTop: '20px',
    backgroundColor: '#F9FCFF',
    border: '1px solid #DCEEFA',
    borderRadius: '8px',
    padding: '15px'
};

export default AskAI;