import React, { useEffect, useState } from 'react';

const App = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/slack/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ channel: 'general', text: 'Hello from frontend!' }),
        })
        .then(res => res.json())
        .then(data => setMessage(data.status));
    }, []);

    return <h1>{message}</h1>;
};

export default App;
