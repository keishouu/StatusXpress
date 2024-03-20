document.addEventListener('DOMContentLoaded', function() {
    // For the title
    const title = document.querySelector('#title');
    // For reg form
    const regForm = document.querySelector('.regForm');

    // For reg form fields
    const usernameReg = document.getElementById('usernameReg');
    const passwordReg = document.getElementById('passwordReg');

    // For login form
    const logForm = document.querySelector('.logForm');

    // For login form fields
    const loginUsername = document.getElementById('loginUsername');
    const loginPassword = document.getElementById('loginPassword');

    // For username and passwords
    const usernameAndPasswords = {};

    // For getting the date and time today
    const time = new Date().toLocaleString();

    // For checking if a username already exists
    function checkIfUserExists(username, usernameAndPasswords) {
        return usernameAndPasswords.hasOwnProperty(username);
    }

    // For validating username and passwords stored 
    function validateUserNameAndPassword(username, password, usernameAndPasswords) {
        return usernameAndPasswords.hasOwnProperty(username) && usernameAndPasswords[username] === password;
    }

    // Function to validate the password
    function validatePassword(password) {
        // Check if the password is less than 8 characters
        if (password.length < 8) {
            return "Password must be at least 8 characters long.";
        }
        
        // Check if the password only consists of integers
        if (/^\d+$/.test(password)) {
            return "Password must contain non-numeric characters.";
        }
        
        // Check if the password is not a combination of uppercase and lowercase characters
        if (!(/[a-z]/.test(password) && /[A-Z]/.test(password))) {
            return "Password must contain both uppercase and lowercase characters.";
        }
        
        return true; // Password is valid
    }

    regForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate if one of the fields are empty
        if(usernameReg.value.length == 0 || passwordReg.value.length == 0) {
            alert("Fill out all the forms first");
        } else {
            const validationResult = validatePassword(passwordReg.value);
            if (validationResult !== true) {
                alert("Password is not valid: " + validationResult);
            } else {
                if (checkIfUserExists(usernameReg.value, usernameAndPasswords)) {
                    alert('Username is already taken');
                }
                else {
                    // Store the username and passwords inside the JavaScript Object 
                    usernameAndPasswords[usernameReg.value] = passwordReg.value;
                    console.log(usernameAndPasswords);

                    // Display the login form and get rid of the registration form on the page
                    logForm.style.display = "block";
                    regForm.style.display = "none";
                }
            }
        }
    });

    logForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const loginUsernameValue = loginUsername.value.trim();
        const loginPasswordValue = loginPassword.value.trim();

        // Check if username and password are provided
        if (!loginUsernameValue || !loginPasswordValue) {
            alert("Please provide both username and password.");
            return;
        }

        // Check if the username exists and the password matches
        if (validateUserNameAndPassword(loginUsernameValue, loginPasswordValue, usernameAndPasswords)) {
            // Hide the login form and title after user has been validated
            logForm.style.display = "none";
            title.style.display = "none";

            // Greet user who just logged in
            const welcomePanel = document.querySelector('.welcomePanel');
            welcomePanel.style.display = "block";
            welcomePanel.querySelector('#greeting').innerHTML = 'Welcome back to StatusXpress, <span style="text-transform: capitalize;">' + loginUsernameValue.charAt(0).toUpperCase() + loginUsernameValue.slice(1) + "</span>!<br><span style=\"color: black; font-size: 20px;\">It's currently " + time + "</span>";

        } else {
            // Login invalid
            alert("Invalid username or password. Please try again.");
        }
    });
});
