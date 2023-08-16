let apiData = [];
let originalData = [];

function fetchData() { fetch("http://localhost:5678/api/works").then((response) => {
  if (response.ok) {
    return response.json()
  }
  else {
    console.error('Erreur réponse:' + response.status)
  }

  }).then((response) => {
    apiData = response;
    originalData = response; 
    console.log(apiData)
    displayGallery();
    
  });
}

fetchData()

function displayGallery() {
  const gallery = document.getElementById('gallery');
  const galleryModal = document.getElementById('modal-content');
  gallery.innerHTML = '';
  galleryModal.innerHTML = '';

  apiData.forEach(element => {
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
    figureModal.appendChild(imageModal)
    figureModal.appendChild(edit)
    figureModal.setAttribute('data-id', element.id);
    let deleteIcon = document.createElement('a');
    deleteIcon.classList.add('delete-icon');
    deleteIcon.innerHTML = '<i class="fas fa-trash-alt"></i>';


    // Ajoute l'icône de poubelle à la figure
    figureModal.appendChild(deleteIcon);
    galleryModal.appendChild(figureModal);
    gallery.appendChild(figure);
    deleteIcon.addEventListener("click", (e) => {
      e.preventDefault();
      const id = deleteIcon.parentElement.getAttribute('data-id');
      deleteWork(id);
    });
  });
};



async function deleteWork(id) {
  let token = localStorage.getItem("token");
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
    apiData = apiData.filter((element) => element.id !== id);
    fetchData()
  } else {
    alert("Échec de la suppression");
  }
}

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
      console.log('Réponse du serveur :', data);
      apiData.push(data);
      displayGallery()
      closeModal()
      fetchData()
      
    })
    .catch(error => {
      console.error('Une erreur s\'est produite :', error);
    });
}
const titreInput = document.getElementById('titre');
const categorieSelect = document.getElementById('categorie');
const submitButton = document.getElementById('submit-button');

// fonction pour activer/desactiver le bouton
function checkConditions() {
  if (titreInput.value !== '' && categorieSelect.value !== '') {
    submitButton.disabled = false;
    submitButton.classList.add('active');
  } else {
    submitButton.disabled = true;
    submitButton.classList.remove('active');
  }
}

titreInput.addEventListener('input', checkConditions);
categorieSelect.addEventListener('change', checkConditions);

document.getElementById('formulaire-ajout').addEventListener('submit', function(event) {
  event.preventDefault();

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
  this.reset()
  resetForm()
  closeModal(event)
  checkConditions()
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
      const fileLabel = document.getElementById('file-label');
      const logoImage = document.getElementById('logo-image')
      const infoSpan = document.getElementById('info-size')
      fileLabel.style.display = 'none';
      logoImage.style.display = 'none';
      infoSpan.style.display = 'none';
    };

    reader.readAsDataURL(file);
  } else {
    resetForm()
  }
});

function resetForm() {
  const imagePreview = document.getElementById('image-preview');
  const fileLabel = document.getElementById('file-label');
  const logoImage = document.getElementById('logo-image')
  const infoSpan = document.getElementById('info-size')
  imagePreview.src = '#';
  imagePreview.style.display = 'none';
  infoSpan.style.display = 'block';
  fileLabel.style.display = 'block';
  logoImage.style.display = 'block';
}

function filterSelection(category, button) {
  const buttons = document.getElementsByClassName('btn-filter');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active');
  }
  
  // Ajoute la classe active au bouton sélectionné
  button.classList.add('active');

  if (category === "all") {
    apiData = originalData;
    displayGallery()
  } else {
    apiData = originalData.filter((element) => element.category.name === category);
    displayGallery();
  }

}




if (localStorage.getItem('token')) {

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
  
  var titleContainer = document.querySelector('.title-container');
  var modeEditionLink = document.createElement('a');
  modeEditionLink.href = '#modal1';
  modeEditionLink.className = 'js-modal';
  modeEditionLink.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Mode édition';
  titleContainer.appendChild(modeEditionLink);
}
// quand je logout on retire le token 
function logout() {
  localStorage.removeItem('token');
}

if (!localStorage.getItem('token')) {
  var loginLinkout = document.getElementById('loginlinkout')
  loginLinkout.style.display = 'none';
}