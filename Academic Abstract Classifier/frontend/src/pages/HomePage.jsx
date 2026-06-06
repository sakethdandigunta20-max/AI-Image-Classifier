import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    return (
        <div className="home-page fade-in">
            <div className="container">
                <div className="hero">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Academic Abstract Classifier
                        </h1>
                        <p className="hero-subtitle">
                            Powered by state-of-the-art DeBERTa-v3-small model, our AI classifies academic paper abstracts into 11 distinct categories with high accuracy.
                        </p>
                        <div className="hero-actions">
                            <Link to="/classifier" className="btn btn-primary btn-lg">
                                Try Classifier
                            </Link>
                            <Link to="/login" className="btn btn-secondary btn-lg">
                                Get Started
                            </Link>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="floating-card">
                            <div className="card-icon">🤖</div>
                            <h3>AI-Powered</h3>
                            <p>Advanced machine learning model</p>
                        </div>
                        <div className="floating-card delay-1">
                            <div className="card-icon">⚡</div>
                            <h3>Fast & Accurate</h3>
                            <p>Instant classification results</p>
                        </div>
                        <div className="floating-card delay-2">
                            <div className="card-icon">📊</div>
                            <h3>11 Categories</h3>
                            <p>Comprehensive coverage</p>
                        </div>
                    </div>
                </div>

                <section className="features">
                    <h2 className="section-title">Supported Categories</h2>
                    <div className="categories-grid">
                        <div className="category-card">
                            <span className="category-icon">🔢</span>
                            <h4>Commutative Algebra</h4>
                        </div>
                        <div className="category-card">
                            <span className="category-icon">👁️</span>
                            <h4>Computer Vision</h4>
                        </div>
                        <div className="category-card">
                            <span className="category-icon">🧠</span>
                            <h4>Artificial Intelligence</h4>
                        </div>
                        <div className="category-card">
                            <span className="category-icon">⚙️</span>
                            <h4>Systems & Control</h4>
                        </div>
                        <div className="category-card">
                            <span className="category-icon">🔗</span>
                            <h4>Group Theory</h4>
                        </div>
                        <div className="category-card">
                            <span className="category-icon">💻</span>
                            <h4>Computational Engineering</h4>
                        </div>
                        <div className="category-card">
                            <span className="category-icon">📝</span>
                            <h4>Programming Languages</h4>
                        </div>
                        <div className="category-card">
                            <span className="category-icon">📡</span>
                            <h4>Information Theory</h4>
                        </div>
                        <div className="category-card">
                            <span className="category-icon">🌳</span>
                            <h4>Data Structures</h4>
                        </div>
                        <div className="category-card">
                            <span className="category-icon">🧬</span>
                            <h4>Neural Computing</h4>
                        </div>
                        <div className="category-card">
                            <span className="category-icon">📈</span>
                            <h4>Statistics Theory</h4>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default HomePage;
