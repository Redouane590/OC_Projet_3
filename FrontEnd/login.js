const form = document.querySelector('form'); 
form.addEventListener('submit', async (event) => {
  event.preventDefault(); 
  
  const email = form.email.value; 
  const password = form.password.value;
  const response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (response.ok) {
    // La combinaison nom d'utilisateur / mot de passe est correcte
    localStorage.setItem('token', data.token);
    window.location.href = 'index.html';
  } else {
    const errorContainer = document.getElementById('error-container');
    errorContainer.textContent = 'Erreur dans l’identifiant ou le mot de passe';
  }
});