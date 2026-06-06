import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // For demo purposes, just navigate to classifier
        navigate('/classifier');
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="login-page fade-in">
            <div className="container">
                <div className="login-container">
                    <div className="login-card card">
                        <div className="login-header">
                            <h2>Welcome Back</h2>
                            <p>Sign in to access the Academic Abstract Classifier</p>
                        </div>

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="input"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="input"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-footer">
                                <label className="checkbox-label">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>
                                <a href="#" className="forgot-link">Forgot password?</a>
                            </div>

                            <button type="submit" className="btn btn-primary btn-full">
                                Sign In
                            </button>
                        </form>

                        <div className="login-divider">
                            <span>or continue with</span>
                        </div>

                        <div className="social-login">
                            <button className="btn btn-secondary btn-social">
                                <span>🔵</span> Google
                            </button>
                            <button className="btn btn-secondary btn-social">
                                <span>⚫</span> GitHub
                            </button>
                        </div>

                        <div className="signup-prompt">
                            Don't have an account? <a href="#">Sign up</a>
                        </div>
                    </div>

                    <div className="login-visual">
                        <div className="visual-content">
                            <h3>Start Classifying Today</h3>
                            <ul className="benefits-list">
                                <li>
                                    <span className="check-icon">✓</span>
                                    <span>Instant classification results</span>
                                </li>
                                <li>
                                    <span className="check-icon">✓</span>
                                    <span>11 academic categories</span>
                                </li>
                                <li>
                                    <span className="check-icon">✓</span>
                                    <span>High accuracy AI model</span>
                                </li>
                                <li>
                                    <span className="check-icon">✓</span>
                                    <span>Easy to use interface</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
