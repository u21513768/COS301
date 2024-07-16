import React, { useState } from 'react';

const VerificationCodeForm = ({ formData, onSubmit, setStep }) => {
    const [verificationCode, setVerificationCode] = useState('');
    const [showOptions, setShowOptions] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(verificationCode);
    };

    const handleOptionsClick = () => {
        setShowOptions(!showOptions);
    };

    const handleResendMessage = () => {
        // Implement logic to resend message
        console.log("Resending message...");
    };

    const handleUseEmailInstead = () => {
        // Implement logic to use email instead
        console.log("Using email instead...");
        setStep(1);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>We sent you a code</h2>
                <p>Enter it below to verify {formData.emailOrPhone}.</p>
                <label>
                    Verification Code:
                    <input type="text" value={verificationCode} onChange={e => setVerificationCode(e.target.value)} required />
                </label>
                <input type="submit" value="Verify" />
            </form>
            <div>
                <button onClick={handleOptionsClick}>Didn't receive {formData.emailOrPhone.includes('@') ? 'email' : 'message'}?</button>
                {showOptions && (
                    <div>
                        <p>Didn't receive {formData.emailOrPhone.includes('@') ? 'email' : 'message'}?</p>
                        <button onClick={handleResendMessage}>{formData.emailOrPhone.includes('@') ? 'Resend Email' : 'Resend Message'}</button>
                        <button onClick={handleUseEmailInstead}>{formData.emailOrPhone.includes('@') ? 'Use Phone Instead' : 'Use Email Instead'}</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerificationCodeForm;
