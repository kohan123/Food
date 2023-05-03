import tabs from './modules/tabs.js'; 
import modal, { openModal } from './modules/modal.js'; 
import timer from './modules/timer.js'; 
import slider from './modules/slider.js'; 
import forms from './modules/forms.js'; 
import cards from './modules/cards.js'; 
import calc from './modules/calc.js'; 

window.addEventListener('DOMContentLoaded', () => {

 const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 60000);
  
 tabs();
 modal('[data-modal]','.modal', modalTimerId);
 timer('.timer', '2023-05-11');
 slider();
 forms('form');
 cards();
 calc();       
});