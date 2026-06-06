import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ClassifierPage from './pages/ClassifierPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="container navbar-content">
            <Link to="/" className="logo">
              📚 Academic Classifier
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/classifier" className="nav-link">Classifier</Link>
              <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
            </div>
          </div>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/classifier" element={<ClassifierPage />} />
          </Routes>
        </main>
        
        <footer className="footer">
          <div className="container">
            <p>Powered by FastAPI & React • DeBERTa-v3-small Model</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
