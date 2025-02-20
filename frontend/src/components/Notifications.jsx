import { useEffect, useState } from "react";
import axios from "axios";
import "./Notifications.css"; 

const Notifications = () => {
    const [notifications, setNotifications] = useState([]); // ✅ Ensure initial state is an empty array

    useEffect(() => {
        axios.get("http://localhost:5000/api/slack/messages")
            .then(response => {
                if (Array.isArray(response.data.messages)) { // ✅ Ensure response is an array
                    setNotifications(response.data.messages);
                } else {
                    console.error("Unexpected response format:", response.data);
                    setNotifications([]); // ✅ Fallback to empty array
                }
            })
            .catch(error => {
                console.error("Error fetching notifications:", error);
                setNotifications([]); // ✅ Fallback to empty array on error
            });
    }, []);

    return (
        <div className="notifications-container">
            <h2>Notifications</h2>
            {notifications.length === 0 ? (
                <p>No notifications found.</p> // ✅ Handle empty notifications case
            ) : (
                <ul>
                    {notifications.map((notification, index) => (
                        <li key={index}>{notification.text || "No text available"}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notifications;
