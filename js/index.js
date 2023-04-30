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
    if (e.target === modal) {
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

const getResource = async(url) => {
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Could not fetch: ${url}, ststus: ${res.status}`)
  }

  return await res.json();
}
  axios.get('http://localhost:3000/menu')
      .then(data => {
          data.data.forEach(({img, altimg, title, descr, price}) => {
             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
           })
         });
  // Forms

  const forms = document.querySelectorAll('form');

  const messege = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо,мы скоро с вами свяжемся',
    failure: 'Что-то пошло не так...'
  }
  forms.forEach(item => bindPostData(item));

  const postData = async(url, data) => {
    const res = await fetch(url, { method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: data});
        return await res.json();
  };

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
    openModal();

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
    closeModal();
   }

  }




//Slider

  const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider')
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current')
  

  let slideIndex = 1;

  showSlides(slideIndex);

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
  } else {
    total.textContent = slides.length;
  }
  

  function showSlides (n) {
    if (n > slides.length) {
      slideIndex = 1;
    } 
    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach(item => item.style.display = 'none');
    slides[slideIndex - 1].style.display = 'block';

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  };

  
  function plusSlides (n) {
    showSlides(slideIndex += n);
  }

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
        dots = [];
  indicators.classList.add('carousel-indicators');

  slider.append(indicators);

  for ( let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');

    if(i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  function changeOpacity () {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  }

  prev.addEventListener('click', () => {
    plusSlides(-1);
    changeOpacity();
  })

  next.addEventListener('click', () => {
    plusSlides(+1);
    changeOpacity();
  })
  indicators.addEventListener('click', (e) => {
    slideIndex = e.target.getAttribute('data-slide-to');
    showSlides(slideIndex);
    changeOpacity();
  });


  //Calc
  const result = document.querySelector('.calculating__result span');
  let sex, height, weight, age, ratio;

  //делаем проверку,что в локальном хранилище указаны базовые значения
  if(localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if(localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }


  // удаляем у всех элементов класс активности 
  // и вешаем на те у которых атрибуты совпадают с данными локального хранилища
  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);
      if(elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  //Делаем проверку,что все нужные классы true
  //Проводим вычисление общей суммы калорий по формуле
  function calcTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
          result.textContent = 0; 
          return;
      }
      if (sex === 'female') {
          result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
      } else {
          result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
  }
  //Инициализируем функцию 
  calcTotal();


  //Вешаем слушатели на все кнопки 
  //Если у  элемента события  есть нужный атрибут,то значение записываем в переменную
  //Сохраняем в локальное хранилище
  //Перевешиваем класс активности на элемент события
  //Проводим повторым пересчет значений  
  function getStaticInformation(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {
          elem.addEventListener('click', (e) => {
              if (e.target.getAttribute('data-ratio')) {
                  ratio = +e.target.getAttribute('data-ratio');
                  localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
              } else {
                  sex = e.target.getAttribute('id');
                  localStorage.setItem('sex', e.target.getAttribute('id'));
              }
  
              elements.forEach(elem => {
                  elem.classList.remove(activeClass);
              });
  
              e.target.classList.add(activeClass);
  
              calcTotal();
          });
      });
  }

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');



  //Получаем поля ввода значений
  //Навешиваем прослушивание ввода значений
  //Делаем проверку,что в поле находятся цифры
  //Делаем проверку по id в какое поле ввод и записываем значения в переменную
  //Повторно пересчитываем значения 
  function getDynamicInformation(selector) {
      const input = document.querySelector(selector);


      input.addEventListener('input', () => {

        if(input.value.match(/\D/g)) {
          input.style.border = '1px solid red';
        } else {
          input.style.border = 'none';
        }

          switch(input.getAttribute('id')) {
              case "height":
                  height = +input.value;
                  break;
              case "weight":
                  weight = +input.value;
                  break;
              case "age":
                  age = +input.value;
                  break;
          }

          calcTotal();
      });
  }

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
});