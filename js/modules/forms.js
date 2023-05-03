import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";


function forms (formSelector) {
    const forms = document.querySelectorAll(formSelector);

  const messege = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо,мы скоро с вами свяжемся',
    failure: 'Что-то пошло не так...'
  }
  forms.forEach(item => bindPostData(item));

  

  function bindPostData (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessege = document.createElement('img');
      statusMessege.src = messege.loading;
      statusMessege.style.cssText = `
        display: block;
        margin: 0 auto;
      `
      form.insertAdjacentElement('afterend', statusMessege); // помещаем картинку загрузки после формы

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));//преобразуем форму в матрицу,а потом в объект

      postData('http://localhost:3000/requests', json)
      .then(data => {
          console.log(data);
          showThanksModal(messege.success);
          form.reset();
          statusMessege.remove();
      }).catch(() => {
        showThanksModal(messege.failure);
      }).finally(() => {
        form.reset();
      })
    })
  }
  function showThanksModal (messege) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal('.modal');

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
              <div class="modal__content">
                  <div class="modal__close" id="close" data-close>×</div>
                  <div class="modal__title">${messege}</div>
              </div>
              `;
    document.querySelector('.modal').append(thanksModal);

   const close = document.querySelector('#close');
   let isClosed = null;
   
   close.addEventListener('click', () => {
    removeThanksModal();
    clearTimeout(isClosed);
   });

   isClosed = setTimeout(removeThanksModal,3000);
  
   function removeThanksModal () {
    thanksModal.remove();
    prevModalDialog.classList.add('show');
    prevModalDialog.classList.remove('hide');
    closeModal('.modal');
   }

  }
};

export default forms;