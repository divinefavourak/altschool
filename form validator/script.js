document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmpassword');
    const ageInput = document.getElementById('age');

    function validateForm(event) {
        event.preventDefault(); // Prevent form submission
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const age = parseInt(ageInput.value.trim());
        let errors = [];

        // Full Name validation
        if (name === '' || name.split(' ').length < 2) {
            errors.push('Full Name must not be empty and contain at least 2 words.');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push('Email not correct');
        }

        // Password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            errors.push('Password must be at least 8 characters, with one uppercase letter, one number, and one special character.');
        }

        // Confirm Password validation
        if (confirmPassword !== password) {
            errors.push('Confirm Password must match the Password field.');
        }

        // Age validation
        if (isNaN(age) || age < 18) {
            errors.push('Age must be 18 or older.');
        }

        // Handle errors or success
        if (errors.length > 0) {
            alert(errors.join('\n'));
        } else {
            alert('Form submitted successfully!');
            // Submit the form
            document.querySelector('form').submit();
        }
    }

    document.querySelector('form').addEventListener('submit', validateForm);
});