function slider () {
    const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
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
};

export default slider;