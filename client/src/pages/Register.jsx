import React, { useState } from 'react';

function RegistrationForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@]).{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        if (!validatePassword(password)) {
            alert('Password must contain at least 8 characters, including 1 uppercase letter, numbers, and the "@" symbol.');
            return;
        }
        const user  = {email, password,role};
        // console.log(user);
        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
    
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log('Registration successful', jsonResponse);
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </label>
            <br />
            <label>
                Password:
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[@]).{8,}$" 
                    title="Must contain at least 8 characters, including 1 uppercase letter, numbers, and the '@' symbol." 
                    required 
                />
            </label>
            <br />
            <label>
                Register as:
                <input 
                    type="radio" 
                    value="admin" 
                    checked={role === "admin"} 
                    onChange={(e) => setRole(e.target.value)} 
                /> Admin
                <input 
                    type="radio" 
                    value="team member" 
                    checked={role === "team member"} 
                    onChange={(e) => setRole(e.target.value)} 
                /> Team Member
            </label>
            <br />
            <button type="submit">Register</button>
        </form>
    );
}

export default RegistrationForm;
