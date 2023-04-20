window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsPerent = document.querySelector('.tabheader__items');

          function hideTabContent() {
            tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });

            tabs.forEach((item) => {
                item.classList.remove('tabheader__item_active');
            });
          }

          function showTabContent(i = 0) {
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add('tabheader__item_active');
          }

          hideTabContent();
          showTabContent();

          tabsPerent.addEventListener('click', (event) => {
            const target = event.target;

            if (target && target.classList.contains('tabheader__item')) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
          });

          const deadline = '2023-04-25';

          function getTimeRemaining(endtime) {
            let days, hours, minutes, seconds;
            const t = Date.parse(endtime) - Date.parse(new Date());

            if (t <= 0) {
              days = 0;
              hours = 0;
              minutes = 0;
              seconds = 0;
            } else {
                  days = Math.floor(t / (1000 * 60 * 60 * 24)),
                  hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                  minutes = Math.floor((t / 1000 * 60) % 60),
                  seconds = Math.floor((t / 1000) % 60);
            }  

            return {
              t,
              days,
              hours,
              minutes,
              seconds
            }
          }

          function getZero (num) {
            if (num < 10 && num >= 0) {
              return `0${num}`;
            } else {
              return num;
            }
          }

          function setClock (selector, endtime) {
            const timer = document.querySelector(selector),
                  days = timer.querySelector('#days'),
                  hours = timer.querySelector('#hours'),
                  minutes = timer.querySelector('#minutes'),
                  seconds = timer.querySelector('#seconds'),
                  timeInterval = setInterval(updateClock, 1000);

            updateClock();      

            function updateClock () {
            const t = getTimeRemaining(endtime);

                  days.innerHTML = getZero(t.days);
                  hours.innerHTML = getZero(t.hours);
                  minutes.innerHTML = getZero(t.minutes);
                  seconds.innerHTML = getZero(t.seconds);

                if (t.total <= 0) {
                  clearInterval(timeInterval);
                }
          }      
        }
    setClock('.timer', deadline);
    
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    function openModal () {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimerId);
    }      

        modalTrigger.forEach(btn => {
          btn.addEventListener('click', openModal);
        });
    
    modalCloseBtn.addEventListener('click', closeModal);

  
  function closeModal () {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  };

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close' == false)) {
      closeModal();
    };
  })

  document.addEventListener('keydown', (e) => {
    if(e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  })

  const modalTimerId = setTimeout(openModal, 50000);

  function showModalByScroll () {
    if (window.pageYOffset + document.documentElement.clientHeight >= 
      document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', showModalByScroll)
      }
  }

  window.addEventListener('scroll', showModalByScroll);

  //Используем классы для карточек

  class MenuCard {
    constructor(src, alt, title, descr, price, perentSelector, ...classes) { //структура карточки
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.perent = document.querySelector(perentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {                   //смена прайса на гривны
      this.price = this.price * this.transfer;
    }

    render() {            //отрисовка карточек
      const element = document.createElement('div');
      if (this.classes.length === 0) { //делаем проверку,что в псевдомассиве есть нужный класс
          this.element = 'menu__item';
          element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }
  
      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      this.perent.append(element);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    14,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    21,
    ".menu .container"
  ).render();

  // Forms

  const forms = document.querySelectorAll('form');

  const messege = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо,мы скоро с вами свяжемся',
    failure: 'Что-то пошло не так...'
  }
  forms.forEach(item => postData(item));

  function postData (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessege = document.createElement('img');
      statusMessege.src = messege.loading;
      statusMessege.style.cssText = `
        display: block;
        margin: 0 auto;
      `
      form.insertAdjacentElement('afterend', statusMessege);

      const formData = new FormData(form);

       const obj = {};
       formData.forEach(function(value, key) {
         obj[key] = value;
       });


      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
      }).then(data => data.json())
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
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
              <div class="modal__content">
                  <div class="modal__close" data-close>×</div>
                  <div class="modal__title">${messege}</div>
              </div>
              `;
    document.querySelector('.modal').append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000)
  }
});


