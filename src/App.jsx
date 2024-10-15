import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProjectShowcase from './pages/ProjectShowcase.jsx';
import Contributors from './pages/Contributors';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SubmitContributor from './pages/SubmitContributor';
import SubmitContributorInfo from './pages/SubmitContributorInfo';
import { AuthProvider } from './firebase/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project-showcase" element={<ProjectShowcase />} />
          <Route path="/contributors" element={<Contributors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protect these routes */}
          <Route
            path="/submit-contributor"
            element={
              <ProtectedRoute>
                <SubmitContributor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/submit-contributor-info"
            element={
              <ProtectedRoute>
                <SubmitContributorInfo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
