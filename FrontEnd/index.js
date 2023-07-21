let apiData = [];
fetch("http://localhost:5678/api/works").then((response) => {
  if (response.ok) {
    return response.json()
  }
  else {
    console.error('Erreur réponse:' + response.status)
  }

}).then((response) => {
  apiData = response;
  console.log(apiData)
  displayGallery(apiData);
  
});

function displayGallery(data) {
  const gallery = document.getElementById('gallery');
  const galleryModal = document.getElementById('modal-content');
  // const modalContent = document.getElementById('modal-content');
  gallery.innerHTML = ''; // Réinitialise le contenu de la galerie
  galleryModal.innerHTML = '';

  data.forEach(element => {
    const figure = document.createElement('figure');
    const figureModal = document.createElement('figure');
    let image = document.createElement('img');
    image.setAttribute('src', element.imageUrl);
    image.setAttribute('alt', element.title);

    let caption = document.createElement('figcaption');
    caption.innerText = element.title;

    let edit = document.createElement('figcaption');
    edit.innerText = 'éditer'

    

    figure.appendChild(image);
    figure.appendChild(caption);

    const imageModal = image.cloneNode(true);
    // figureModal.appendChild(image)
    figureModal.appendChild(imageModal)
    figureModal.appendChild(edit)
    // figureModal.dataset.id = element.id
    figureModal.setAttribute('data-id', element.id);
    let deleteIcon = document.createElement('a');
    deleteIcon.classList.add('delete-icon');
    deleteIcon.innerHTML = '<i class="fas fa-trash-alt"></i>';


    // Ajoute l'icône de poubelle à la figure
    figureModal.appendChild(deleteIcon);
    // modalContent.appendChild(figureModal);
    galleryModal.appendChild(figureModal);
    gallery.appendChild(figure);
    
    deleteIcon.addEventListener("click", async (e) => {
      e.preventDefault();
      
      // e.stopPropagation();
      console.log(deleteIcon.parentElement)
      const id = deleteIcon.parentElement.getAttribute('data-id');
      // recupere l'ID de la figure sur lequuel se trouve le deleteicon pour ensuite supprimer l'élément correspondant
      console.log('ID:', id);
      const idFigure = figureModal.id;
      let token = localStorage.getItem("token");
      console.log(idFigure);
      let response = await fetch(
        `http://localhost:5678/api/works/${id}`,
        {
          method: "DELETE",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        console.log(response.status)
        
        // if HTTP-status is 200-299
        alert("Photo supprimé avec succes");
        // obtenir le corps de réponse (la méthode expliquée ci-dessous)
      } else {
        alert("Echec de suppression");
      }
    });
  });
  console.log(data)
};

function postData(data) {
  let token = localStorage.getItem("token");
  fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data
    })
    .then(response => response.json())
    .then(data => {
      // Traitez la réponse du serveur ici si nécessaire
      console.log('Réponse du serveur :', data);
    })
    .catch(error => {
      console.error('Une erreur s\'est produite :', error);
    });
}

document.getElementById('formulaire-ajout').addEventListener('submit', function(event) {
  event.preventDefault(); // Empêche le rechargement de la page

  // Récupérer les valeurs des champs du formulaire
  const titre = document.getElementById('titre').value;
  const categorie = document.getElementById('categorie').value;
  const fileInput = document.getElementById('file');
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append('category', categorie);
  formData.append('title', titre);
  formData.append('image', file);
  
  postData(formData);
});

document.getElementById('file').addEventListener('change', function(event) {
  const fileInput = event.target;
  const file = fileInput.files[0]; 
  if (file) {
    // Créer un objet FileReader pour lire le fichier
    const reader = new FileReader();

    // Gérer l'évent "load" lorsque la lecture du fichier est terminée
    reader.onload = function() {
      // Afficher l'image sélectionnée
      const imagePreview = document.getElementById('image-preview');
      imagePreview.src = reader.result;
      imagePreview.style.display = 'block';

      // Masquer l'input "file" et le logo
      // const logoImage = document.getElementsByClassName('fa-sharp')
      const fileLabel = document.getElementById('file-label');
      const logoImage = document.getElementById('logo-image')
      const infoSpan = document.getElementById('info-size')
      fileLabel.style.display = 'none';
      logoImage.style.display = 'none';
      infoSpan.style.display = 'none';
    };

    // Lire le contenu du fichier comme une URL de données
    reader.readAsDataURL(file);
  } else {
    // Si aucun fichier n'est sélectionné, masquer l'image d'aperçu et afficher l'input de type "file"
    const imagePreview = document.getElementById('image-preview');
    imagePreview.src = '#';
    imagePreview.style.display = 'none';

    const fileLabel = document.getElementById('file-label');
    const logoImage = document.getElementById('logo-image')
    const infoSpan = document.getElementById('info-size')
    infoSpan.style.display = 'block';
    fileLabel.style.display = 'block';
    logoImage.style.display = 'block';

  }
});

function filterSelection(category, button) {
  const buttons = document.getElementsByClassName('btn-filter');
  // retire la classe active a tout les boutons
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active');
  }
  
  // Ajoute la classe active au bouton sélectionné
  button.classList.add('active');

  if (category === "all") {
    displayGallery(apiData)
  } else {
    const filteredData = apiData.filter(element => element.category.name === category);
    displayGallery(filteredData);
  }

}




if (localStorage.getItem('token')) {
  // Créer la banner qui sera tout au dessus de l'index
  console.log(localStorage.getItem('token'))
  var bannerDiv = document.createElement('div');
  bannerDiv.id = 'banner';

  // Créer le premier bouton
  var btnOne = document.createElement('button');
  btnOne.className = 'btn-banner-one';
  btnOne.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><a href="#modal1" class="js-modal"> Mode édition</a>';
  
  // Créer le deuxième bouton
  var btnTwo = document.createElement('button');
  btnTwo.className = 'btn-banner';
  btnTwo.textContent = 'Publier les changements';

  // Ajouter les boutons à la div
  bannerDiv.appendChild(btnOne);
  bannerDiv.appendChild(btnTwo);

  // on met la banner au dessus
  document.body.insertAdjacentElement("beforebegin", bannerDiv);

  var loginLink = document.getElementById('loginlink')
  loginLink.style.display = 'none';
  console.log(loginLink)
  
}
// quand je logout on retire le token 
function logout() {
  localStorage.removeItem('token');
}

if (!localStorage.getItem('token')) {
  var loginLinkout = document.getElementById('loginlinkout')
  loginLinkout.style.display = 'none';
}