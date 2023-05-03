function calc () {
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
};

export default calc;