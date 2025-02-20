import { useEffect, useState } from "react";
import axios from "axios";
import "./SlackMessages.css"; 

const SlackMessages = () => {
    const [messages, setMessages] = useState([]); // ✅ Ensure initial state is an empty array

    useEffect(() => {
        axios.get("http://localhost:5000/api/slack/messages")
            .then(response => {
                if (Array.isArray(response.data.messages)) {  // ✅ Check if response is an array
                    setMessages(response.data.messages);
                    console.log(response.data.messages)
                } else {
                    console.error("Unexpected response format:", response.data);
                    setMessages([]);  // ✅ Fallback to empty array
                }
            })
            .catch(error => {
                console.error("Error fetching Slack messages:", error);
                setMessages([]);  // ✅ Fallback to empty array on error
            });
    }, []);

    return (
        <div className="slack-container">
            <h2 className="slack-title">Slack Messages</h2>
            {messages.length === 0 ? (
                <p>No messages found.</p>  // ✅ Handle empty messages case
            ) : (
                <ul className="slack-list">
                    {messages.map((msg, index) => (
                        <li key={index} className="slack-item">
                            <strong>{msg.user || "Unknown"}:</strong> {msg.text}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SlackMessages;
