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
  wrapperModal.style.display = null
  formAdd.style.display = 'none'
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

const wrapperModal = document.querySelector('.first-modal');
const formAdd = document.getElementById('formulaire-ajout')

const btnAdd = document.getElementById('form-add')
btnAdd.addEventListener('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
  wrapperModal.style.display = 'none'
  formAdd.style.display = null
})

const buttonReturn = document.querySelector('.fa-arrow-left')
buttonReturn.addEventListener('click', function (e) {
  wrapperModal.style.display = null
  formAdd.style.display = 'none'
})
