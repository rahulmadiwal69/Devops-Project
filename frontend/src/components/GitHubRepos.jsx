import { useEffect, useState } from "react";
import axios from "axios";
import "./GitHubRepos.css"; // ✅ Import Normal CSS

const GitHubRepos = () => {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/github/repos")
            .then(response => setRepos(response.data))
            .catch(error => console.error("Error fetching GitHub repos:", error));
    }, []);

    return (
        <div className="github-container">
            <h2 className="github-title">GitHub Repositories</h2>
            <ul className="github-list">
                {repos.map(repo => (
                    <li key={repo.id} className="github-item">
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="github-link">
                            {repo.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GitHubRepos;
