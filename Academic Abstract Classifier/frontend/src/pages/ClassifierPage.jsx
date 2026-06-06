import { useState } from 'react';
import './ClassifierPage.css';

function ClassifierPage() {
    const [abstractText, setAbstractText] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:8000/predict';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!abstractText.trim()) {
            setError('Please enter an abstract to classify.');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: abstractText }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            if (err.message.includes('Failed to fetch')) {
                setError('Could not connect to the backend. Is the FastAPI server running?');
            } else {
                setError(`An error occurred: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setAbstractText('');
        setResult(null);
        setError(null);
    };

    return (
        <div className="classifier-page fade-in">
            <div className="container">
                <div className="classifier-header">
                    <h1>Academic Abstract Classifier</h1>
                    <p>Paste your academic paper abstract below to classify it into one of 11 categories</p>
                </div>

                <div className="classifier-content">
                    <div className="input-section">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="abstract">Abstract Text</label>
                                <textarea
                                    id="abstract"
                                    className="textarea"
                                    placeholder="Paste the abstract of the paper here..."
                                    value={abstractText}
                                    onChange={(e) => setAbstractText(e.target.value)}
                                    rows={12}
                                />
                            </div>

                            <div className="button-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <div className="spinner-small"></div>
                                            Classifying...
                                        </>
                                    ) : (
                                        'Classify Abstract'
                                    )}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-lg"
                                    onClick={handleClear}
                                    disabled={loading}
                                >
                                    Clear
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="result-section">
                        {loading && (
                            <div className="loading-state card">
                                <div className="spinner"></div>
                                <p>Analyzing your abstract...</p>
                            </div>
                        )}

                        {error && (
                            <div className="error-state card">
                                <div className="error-icon">⚠️</div>
                                <h3>Error</h3>
                                <p>{error}</p>
                            </div>
                        )}

                        {result && !loading && (
                            <div className="result-card card">
                                <div className="result-header">
                                    <h3>Classification Result</h3>
                                    <span className="badge badge-success">Complete</span>
                                </div>

                                <div className="result-details">
                                    <div className="result-item">
                                        <label>Predicted Category</label>
                                        <div className="category-result">
                                            {result.label}
                                        </div>
                                    </div>

                                    <div className="result-item">
                                        <label>Confidence Score</label>
                                        <div className="confidence-container">
                                            <div className="confidence-bar">
                                                <div
                                                    className="confidence-fill"
                                                    style={{ width: `${result.confidence * 100}%` }}
                                                ></div>
                                            </div>
                                            <div className="confidence-text">
                                                {(result.confidence * 100).toFixed(2)}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!result && !loading && !error && (
                            <div className="placeholder-state card">
                                <div className="placeholder-icon">📚</div>
                                <h3>Ready to Classify</h3>
                                <p>Enter an abstract and click "Classify Abstract" to see the results here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClassifierPage;
