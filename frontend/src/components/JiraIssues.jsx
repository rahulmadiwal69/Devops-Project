import { useEffect, useState } from "react";
import axios from "axios";

const JiraIssues = () => {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/jira/issues")
            .then(response => {
                console.log("Jira Issues:", response.data);
                setIssues(response.data);
            })
            .catch(error => console.error("Error fetching Jira issues:", error));
    }, []);

    return (
        <div>
            <h2>Jira Issues</h2>
            <ul>
                {issues.length > 0 ? (
                    issues.map(issue => (
                        <li key={issue.id}>
                            <strong>{issue.key}:</strong> {issue.fields.summary}
                        </li>
                    ))
                ) : (
                    <p>No issues found.</p>
                )}
            </ul>
        </div>
    );
};

export default JiraIssues;
