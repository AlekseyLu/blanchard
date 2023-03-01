const swiperHero = new Swiper('.hero', {
    loop: true,
    speed: 1000,
    autoplay: {
        delay: 3000,
    },
});

const swiperGellary = new Swiper('.gellary-slider', {
    loop: true,
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 50,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
    },
    breakpoints: {
        1200: {
            slidesPerView: 3,
            spaceBetween: 50
        },
        576: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 35
        },
        300: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
        },
    },
});

// Кастомный селект в блоке "Галерея"
const choices = new Choices('.gellary__filter', {
    searchEnabled: false,
    itemSelectText: '',
});

const swiperEvent = new Swiper('.event-swiper', {
    slidesPerView: 3,
    spaceBetween: 50,
    slidesPerGroup: 3,

    navigation: {
        nextEl: '.event-button-next',
        prevEl: '.event-button-prev',
    },
    breakpoints: {
        1048: {
            slidesPerView: 3,
            spaceBetween: 50,
            pagination: {
                el: '.event-pagination',
                type: 'bullets',
                clickable: true,
            },
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 32,
            pagination: {
                el: '.event-pagination',
                type: 'bullets',
                clickable: true,
            },
        },
        579: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 35,
            pagination: {
                el: '.event-pagination',
                type: 'bullets',
                clickable: true,
            },
        },
        300: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
            pagination: {
                el: '.event-pagination',
                type: 'bullets',
                clickable: true,
            },
        }

    },
});

const swiperProject = new Swiper('.project-swiper', {
    loop: true,
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 50,
    navigation: {
        nextEl: '.project-button-next',
        prevEl: '.project-button-prev',
    },
    breakpoints: {
        1200: {
            slidesPerView: 3,
            spaceBetween: 50
        },
        400: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 34,
        },
        200: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 20,
        }
    },
});

new Accordion('.accordion-container');

// Карта
ymaps.ready(init);
function init() {
    var myMap = new ymaps.Map("map", {
        center: [55.759856, 37.596112],
        zoom: 14
    });

    const myPlacemark = new ymaps.Placemark([55.759856, 37.596112], {
        hintContent: 'Малая Бронная улица, 13',
        balloonContent: 'Малая Бронная улица, 13, Москва, 123104'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'imgs/marker-map.png',
        iconImageSize: [20, 20]
    });

    myMap.geoObjects.add(myPlacemark);
}

// Дроп меню
const itemBtn = document.querySelectorAll('.nav-bottom__link');
const dropMenu = document.querySelectorAll('.nav-bottom__link-dropdown');

itemBtn.forEach(el => {
    el.addEventListener('click', (e) => {
        let currentBtn = e.currentTarget;
        let dropdown = currentBtn.closest('.nav-bottom__item').querySelector('.nav-bottom__link-dropdown');
        let iconRotate = el.querySelector('.nav-bottom__link-arrow');

        iconRotate.classList.toggle('nav-bottom__link-arrow--active');

        itemBtn.forEach(el => {
            if (el !== currentBtn) {
                el.classList.remove('open-drop');
                el.querySelector('.nav-bottom__link-arrow').classList.remove('nav-bottom__link-arrow--active');
            }
        });

        dropMenu.forEach(el => {
            if (el !== dropdown) {
                el.classList.remove('open-drop');
            }
        });

        dropdown.classList.toggle('open-drop');
    });

    document.addEventListener('click', (e) => {

        if (!e.target.closest('.nav-bottom__list')) {
            itemBtn.forEach(el => {
                el.classList.remove('open-drop');
                el.querySelector('.nav-bottom__link-arrow').classList.remove('nav-bottom__link-arrow--active');
            });

            dropMenu.forEach(el => {
                el.classList.remove('open-drop');
            });
        }
    });
});

// Инициализация СимплБар
dropMenu.forEach(el => {
    new SimpleBar(el, {
        autoHide: false,
        scrollbarMinSize: 30,
        scrollbarMaxSize: 50,
    });
});


// Художники по векам
const catalogSlides = document.querySelectorAll('.catalog__slide');
const catalogBox = document.querySelectorAll('.catalog__slide-box');

catalogSlides.forEach(el => {
    el.addEventListener('click', (e) => {
        const itemAttr = el.getAttribute('data-box');
        catalogBox.forEach(el => {
            el.classList.add('content-hidden');
            if (itemAttr === el.getAttribute('data-box')) {
                el.classList.remove('content-hidden');
            };
        });
    });
});


// Валидация формы
const form = document.querySelector('.contacts__form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
});
const formName = document.querySelector('.form__name');
const formPhone = document.querySelector('.form__phone');
const formBtn = document.querySelector('.form__btn');
const nameMessage = document.querySelector('.form__name-message');
const phoneMessage = document.querySelector('.form__phone-message');

formName.addEventListener('keyup', () => {
    if (/^[А-ЯЁ]+$/i.test(formName.value) || formName.value === '') {
        nameMessage.classList.remove('message-errore');
    } else {
        nameMessage.classList.add('message-errore');
    }
});

formPhone.addEventListener('keyup', () => {
    if (formPhone.value.length === 12 || formPhone.value === '') {
        phoneMessage.classList.remove('message-errore');
    } else {
        phoneMessage.classList.add('message-errore');
    }
});

// Бургер меню
const burger = document.querySelector('.burger');
const navigation = document.querySelector('.nav-top');
const loginIn = document.querySelector('.header__in');
const searchOpen = document.querySelector('.header__btn-search');

burger.addEventListener('click', () => {
    burger.classList.toggle('open-menu');
    navigation.classList.toggle('open-nav');
    loginIn.classList.toggle('open-nav');
    if (burger.classList.contains('open-menu')) {
        document.querySelector('body').style.overflow = 'hidden';
    } else {
        document.querySelector('body').style.overflow = 'auto';
    }
});

searchOpen.addEventListener('click', () => {
    document.querySelector('.header__search-wrap').classList.add('search-open');
});

document.querySelector('.search-close').addEventListener('click', () => {
    document.querySelector('.header__search-wrap').classList.remove('search-open');
});

// Плавный скролл до якоря
const linkTo = document.querySelectorAll('a[href*="#"]');

linkTo.forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        const linkId = el.getAttribute('href');
        document.querySelector('' + linkId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Модальное окно
const gellaryContainer = document.querySelector('.gellary-slider');
gellaryContainer.querySelectorAll('.swiper-slide').forEach(el => {
    el.addEventListener('click', () => {

        const attrNumber = Number(el.getAttribute('data-swiper-slide-index')) + 1;

        document.querySelector('body').classList.add('overflow-hidden');

        const modal = document.querySelector('.modal');
        const modalBox = modal.querySelector('.modal__box');
        modal.classList.add('modal-open');
        modal.querySelector('.modal__img').setAttribute('src', `imgs/gellary-${attrNumber}.jpg`);

        modal.querySelector('.modal__close-btn').addEventListener('click', () => {
            document.querySelector('body').classList.remove('overflow-hidden');
            modal.classList.remove('modal-open');
        });
        modal.addEventListener('click', (event) => {
            if (event.target === modalBox.querySelector('.modal__container') || event.target === modalBox.querySelector('.modal__img')) {
                return;
            } else {
                document.querySelector('body').classList.remove('overflow-hidden');
                modal.classList.remove('modal-open');
            }
        });
    });
});
