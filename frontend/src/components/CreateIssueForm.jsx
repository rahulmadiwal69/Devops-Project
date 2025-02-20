import { useState } from "react";
import axios from "axios";
import "./CreateIssueForm.css"; // ✅ Import Normal CSS

const CreateIssueForm = () => {
    const [issueData, setIssueData] = useState({
        projectKey: "KAM",
        summary: "",
        description: "",
        issueType: "Task",
        repoName: "Devops-Project"
    });

    const handleChange = (e) => {
        setIssueData({ ...issueData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/link/link-issue", issueData);
            alert(`Jira Issue Created: ${response.data.jiraIssueKey}\nGitHub Issue: ${response.data.githubIssueUrl}`);
        } catch (error) {
            alert("Error creating issue");
        }
    };

    return (
        <div className="issue-form-container">
            <h2 className="issue-form-title">Create & Link Issue</h2>
            <form className="issue-form" onSubmit={handleSubmit}>
                <input type="text" name="summary" placeholder="Issue Summary" onChange={handleChange} />
                <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
                <button type="submit">Create Issue</button>
            </form>
        </div>
    );
};

export default CreateIssueForm;
