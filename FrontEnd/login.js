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
    // Stockez le token d'authentification pour une utilisation ultérieure
    console.log("vous etes co")
    localStorage.setItem('token', data.token);
    // Redirige l'utilisateur vers la page d'accueil
    window.location.href = 'index.html';
  } else {
    // La combinaison nom d'utilisateur / mot de passe est incorrecte
    // Affiche un message d'erreur à l'utilisateur
    console.log("recommence")
    const errorContainer = document.getElementById('error-container');
    errorContainer.textContent = 'Erreur dans l’identifiant ou le mot de passe';
  }
});