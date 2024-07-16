import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SignUpForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [isEmail, setIsEmail] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleToggle = () => {
        setIsEmail(!isEmail);
        setEmailOrPhone('');
    };

    const handleChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ name, emailOrPhone, selectedDate });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create your account</h2>
            <label>
                <span>Name:</span>
                <input autocapitalize="sentences" autocomplete="name" autocorrect="on" maxlength="50" name="name" spellcheck="true" type="text" dir="auto" value={name} onChange={e => setName(e.target.value)} required />
            </label>
            {isEmail ? (
                <label>
                    <span>Email:</span>
                    <input autocapitalize="sentences" autocomplete="email" autocorrect="on" name="email" spellcheck="true" type="email" dir="auto" value={emailOrPhone} onChange={e => setEmailOrPhone(e.target.value)} required />
                </label>
            ) : (
                <label>
                    <span>Phone:</span>
                    <input dir="auto" autocapitalize="sentences" autocomplete="tel" autocorrect="on" name="phone_number" spellcheck="true" type="tel" value={emailOrPhone} onChange={e => setEmailOrPhone(e.target.value)} required />
                </label>
            )}
            <button type="button" onClick={handleToggle}>
                {isEmail ? 'Use Phone Instead' : 'Use Email Instead'}
            </button>
            <label>
                Date of Birth:
                <DatePicker selected={selectedDate} onChange={handleChange} />
            </label>
            <input type="submit" value="Sign Up" />
        </form>
    );
};

export default SignUpForm;
