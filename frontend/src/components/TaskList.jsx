import { useEffect, useState } from "react";
import axios from "axios";
import "./TaskList.css"; 

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/jira/issues")  // Adjust API URL
            .then(response => setTasks(response.data))
            .catch(error => console.error("Error fetching tasks:", error));
    }, []);

    return (
        <div className="task-list-container">
            <h2>Task List</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <strong>{task.key}</strong>: {task.summary}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
