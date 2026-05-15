document.addEventListener('DOMContentLoaded', () => {
    // Add dynamic CSS for error messages
    if (!document.getElementById('dynamic-validation-css')) {
        const style = document.createElement('style');
        style.id = 'dynamic-validation-css';
        style.textContent = `
            .dynamic-error {
                color: #dc3545;
                font-size: 14px;
                margin-top: 5px;
                display: block;
                text-align: left;
                width: 100%;
                animation: fadeIn 0.3s ease-in-out;
            }
            .input-error {
                border-color: #dc3545 !important;
                background-color: #fff8f8;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-5px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        // Disable default HTML5 tooltips
        form.setAttribute('novalidate', 'true');

        form.addEventListener('submit', (e) => {
            let isValid = true;
            
            // Clear previous errors
            form.querySelectorAll('.dynamic-error').forEach(el => el.remove());
            form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

            // Select all inputs and selects
            const inputs = form.querySelectorAll('input, select');
            
            inputs.forEach(input => {
                let errorMessage = '';
                const val = input.value.trim();

                // 1. Required Check
                if (input.required && !val) {
                    // Try to find a label
                    let labelName = 'This field';
                    const id = input.id;
                    if (id) {
                        const label = form.querySelector(`label[for="${id}"]`);
                        if (label) labelName = label.innerText.replace(':', '');
                    }
                    if (labelName === 'This field' && input.placeholder) {
                        labelName = input.placeholder;
                    }
                    errorMessage = `${labelName} is required.`;
                } 
                // 2. Number constraints
                else if (input.type === 'number' && val) {
                    const numVal = parseFloat(val);
                    if (input.min && numVal < parseFloat(input.min)) {
                        errorMessage = `Value must be at least ${input.min}.`;
                    } else if (input.max && numVal > parseFloat(input.max)) {
                        errorMessage = `Value must be at most ${input.max}.`;
                    }
                } 
                // 3. Pattern match
                else if (input.pattern && val) {
                    const regex = new RegExp(`^${input.pattern}$`);
                    if (!regex.test(val)) {
                        errorMessage = input.title || `Please match the requested format.`;
                        // Fallback message for PIN
                        if (!input.title && input.pattern.includes('[0-9]{4}')) {
                            errorMessage = 'PIN must be exactly 4 digits.';
                        }
                    }
                } 
                // Custom validation: Username
                else if ((input.id.toLowerCase() === 'username' || input.name.toLowerCase() === 'username') && val) {
                    if (val.length < 5 || !/^[a-zA-Z0-9]+$/.test(val)) {
                        errorMessage = 'Username must be at least 5 alphanumeric characters.';
                    }
                }
                // Custom validation: Password
                else if ((input.id.toLowerCase() === 'password' || input.type === 'password') && !input.id.toLowerCase().includes('pin') && val) {
                    const hasUpper = /[A-Z]/.test(val);
                    const hasLower = /[a-z]/.test(val);
                    const hasNumber = /[0-9]/.test(val);
                    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(val);
                    if (val.length < 8 || !hasUpper || !hasLower || !hasNumber || !hasSpecial) {
                        errorMessage = 'Password must be at least 8 characters long, containing uppercase, lowercase, numbers, and special characters.';
                    }
                }
                // Custom validation: Account Number
                else if ((input.id.toLowerCase().includes('accountnumber') || input.name.toLowerCase().includes('accountnumber')) && val) {
                    if (!/^\d{12}$/.test(val)) {
                        errorMessage = 'Account number must be exactly 12 digits.';
                    }
                }
                // 5. Custom validation: IFSC Code
                else if ((input.id.toLowerCase().includes('ifsccode') || input.name.toLowerCase().includes('ifsccode')) && val) {
                    // Standard IFSC format: 4 letters, 1 zero, 6 alphanumeric
                    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(val.toUpperCase())) {
                        errorMessage = 'Invalid IFSC code (e.g., ABCD0123456).';
                    }
                }

                if (errorMessage) {
                    isValid = false;
                    input.classList.add('input-error');
                    
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'dynamic-error';
                    errorDiv.innerText = errorMessage;
                    
                    // Insert error message after the input
                    input.parentNode.insertBefore(errorDiv, input.nextSibling);
                }
            });

            if (!isValid) {
                e.preventDefault(); // Stop submission
            }
        });
        
        // Remove error styling on input change
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('input-error');
                const nextEl = input.nextElementSibling;
                if (nextEl && nextEl.classList.contains('dynamic-error')) {
                    nextEl.remove();
                }
            });
        });
    });
});
