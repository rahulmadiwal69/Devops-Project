// Move all imports to the top of the file.
import TaskList from "../components/TaskList";
import Notifications from "../components/Notifications";
import GitHubRepos from "../components/GitHubRepos";
import CreateIssueForm from "../components/CreateIssueForm";
import SlackMessages from "../components/SlackMessages";
import JiraIssues from "../components/JiraIssues";

const Dashboard = () => {
    return (
        <div className="container">
            <h1 className="dashboard-title">Collaboration Dashboard</h1>
            <CreateIssueForm />
            <SlackMessages />
            <JiraIssues />
            <GitHubRepos />
            <TaskList />   {/* Ensure TaskList is used */}
            <Notifications />   {/* Ensure Notifications is used */}
        </div>
    );
};

export default Dashboard;
