import { getResource } from "../services/services";

function cards () {
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
    
    
      axios.get('http://localhost:3000/menu')
          .then(data => {
              data.data.forEach(({img, altimg, title, descr, price}) => {
                 new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
               })
             });
};
export default cards;