import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TaskList from "./pages/TaskList";  
import TaskDetail from "./pages/TaskDetail"; 
import NewTask from "./components/NewTask"; 
import Nav from "./components/Nav"; 
import { CheckSession } from "./api"; 
const App = () => {
  const [user, setUser] = useState({ data: null, role: null });

  const handleLogOut = () => {
    setUser({ data: null, role: null });
  };

  useEffect(() => {
    const checkToken = async () => {
      const userData = await CheckSession();
      setUser({ data: userData, role: userData.role });
    };
    checkToken();
  }, []);

  return (
    <div className="app-container">
      <div className="main-content">
        <Nav user={user.data} handleLogOut={handleLogOut} />
        <main>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/tasks" element={<TaskList />} />  
            <Route path="/tasks/new" element={<NewTask user={user.data} />} />  
            <Route path="/tasks/edit/:id" element={<NewTask user={user.data} />} />  
            <Route path="/tasks/:id" element={<TaskDetail user={user.data} />} /> 
          </Routes>
        </main>
        <div className="footer">LearnTech University &copy;2024</div>
      </div>
    </div>
  );
};

export default App;
