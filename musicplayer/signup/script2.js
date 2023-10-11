const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Retrieve form input values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  // Perform signup logic (e.g., validate inputs, send data to server)

  // Clear form inputs after submission
  signupForm.reset();
});