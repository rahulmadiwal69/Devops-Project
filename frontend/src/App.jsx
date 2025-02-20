import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./App.css"; // ✅ Import Normal CSS

const App = () => {
    return (
        <Router>
            <div className="container">
                <h1 className="app-title">Collaboration Dashboard</h1>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
