import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HelloPage from "./pages/Home.js";
import LoginPage from "./pages/Login.js";
import TermsPage from "./pages/Terms.js";
import DashboardPage from "./pages/DashboardPage.js";
import AdminPanelComp from "./components/AdminPanelComp.js";


function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index path="/" element={<HelloPage/>}/>
          <Route path="/dashboard/*" element={<DashboardPage/>}/>
          <Route path="/adminPanel/*" element={<AdminPanelComp />}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/terms" element={<TermsPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
