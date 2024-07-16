import React, { useState } from 'react';

const PasswordForm = ({ onSubmit }) => {
    const [password, setPassword] = useState('');
    const [showOverlay, setShowOverlay] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(password);
    };

    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
    };

    return (
        <div>
            <h2>You'll need a password</h2>
            <p>Make sure it's 8 characters or more</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Password:
                    <input type="password" min={8} value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <input type="submit" value="Submit" />
                <p>
                    By signing up, you agree to the <a href='https://twitter.com/en/tos'>Terms of Service</a> and <a href='https://twitter.com/en/privacy'>Privacy Policy</a>,
                    including <a href='https://twitter.com/en/privacy'>Cookie Use</a>. Twitter may use your contact information, including your email address
                    and phone number for purposes outlined in our Privacy Policy, like keeping your account secure and
                    personalizing our services, including ads. <a href='https://twitter.com/en/privacy'>Learn more</a>.
                    Others will be able to find you by email or phone number, when provided, unless you choose otherwise <a href="#" onClick={toggleOverlay}>here</a>.
                </p>
            </form>

            {showOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        <label>
                            <input type="checkbox" />
                            Let others find me by email address <br />
                            <small>People who have your email will be able to connect
                                with you on Twitter using it. You can change this at any time.
                            </small>
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" />
                            Let others find me by phone number <br />
                            <small>People who have your phone number will be able to connect
                                with you on Twitter using it. You can change this at any time.
                            </small>
                        </label>
                        <br />
                        <button onClick={toggleOverlay}>Done</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PasswordForm;
