let modal = null;

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute('href'))
  console.log(target);
  target.style.display = null;
  target.removeAttribute('aria-hidden')
  target.setAttribute('aria-modal', 'true')
  modal = target;
  modal.addEventListener('click', closeModal);
  modal.querySelector('.js-close-modal').addEventListener('click', closeModal)
  modal.querySelector('.js-stop-modal').addEventListener('click', stopPropagation)
} 

const closeModal = function (e) {
  if (modal === null) return
  e.preventDefault();
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true')
  modal.removeAttribute('aria-modal')
  modal.removeEventListener('click', closeModal);
  modal.querySelector('.js-close-modal').removeEventListener('click', closeModal)
  modal.querySelector('.js-stop-modal').removeEventListener('click', stopPropagation)
  modal = null
}

const stopPropagation = function (e) {
  e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
  a.addEventListener('click', openModal)
})

window.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' || e.key === 'Esc') {
    closeModal(e)
  }
})


// let apiDataModal = [];
// fetch("http://localhost:5678/api/works").then((response) => {
//   if (response.ok) {
//     return response.json()
//   }
//   else {
//     console.error('Erreur réponse:' + response.status)
//   }

// }).then((response) => {
//   apiDataModal = response;
//   console.log(apiDataModal)
//   displayGalleryModal(apiDataModal);
  
// });

// function displayGalleryModal(data) {
//   const gallery = document.getElementsByClassName('gallery-modal');
//   gallery.innerHTML = ''; // Réinitialise le contenu de la galerie

//   data.forEach(element => {
//     const figure = document.createElement('figure');
//     let image = document.createElement('img');
//     image.setAttribute('src', element.imageUrl);
//     image.setAttribute('alt', element.title);

//     let edit = document.createElement('span');
//     edit.innerText = 'éditer';
//     figure.appendChild(image);
    
//     figure.appendChild(edit);
//     gallery.appendChild(figure);
    
//   });
//   console.log(data)
// };