new Swiper('#reviews', {
    direction: 'horizontal',
    loop: true,
    speed: 1000,
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 30,

    freeMode: {
        enabled: true,
        sticky: true,
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        425: {
            slidesPerView: 3,
        },
    },
});
