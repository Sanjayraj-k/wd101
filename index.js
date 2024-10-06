window.onload = function () {
    const form = document.getElementById('registrationForm');
    const table = document.getElementById('userTableBody');

    // Load saved data from localStorage if present
    if (localStorage.getItem('formData')) {
        const savedData = JSON.parse(localStorage.getItem('formData'));
        savedData.forEach(user => {
            addUserToTable(user);
        });
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const termsAccepted = document.getElementById('terms').checked;

        // Form validation for age
        const age = calculateAge(new Date(dob));
        if (age < 18 || age > 55) {
            alert("Age must be between 18 and 55.");
            return;
        }

        const userData = {
            name,
            email,
            password,
            dob,
            termsAccepted
        };

        // Save to localStorage
        const savedData = JSON.parse(localStorage.getItem('formData')) || [];
        savedData.push(userData);
        localStorage.setItem('formData', JSON.stringify(savedData));

        // Add to the table
        addUserToTable(userData);
        form.reset();
    });

    function addUserToTable(user) {
        const row = table.insertRow();
        row.insertCell(0).innerText = user.name;
        row.insertCell(1).innerText = user.email;
        row.insertCell(2).innerText = user.password;
        row.insertCell(3).innerText = user.dob;
        row.insertCell(4).innerText = user.termsAccepted ? 'true' : 'false';
    }

    // Date validation: only allow users between 18 and 55 years old
    const dobInput = document.getElementById('dob');
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    dobInput.min = minDate.toISOString().split('T')[0];
    dobInput.max = maxDate.toISOString().split('T')[0];

    // Function to calculate age
    function calculateAge(dob) {
        const diffMs = Date.now() - dob.getTime();
        const ageDate = new Date(diffMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
};
