const slider = new Swiper('.slider', {
    wrapperClass: 'slides',
    slideClass: 'slide',

    direction: 'horizontal',
    loop: true,
    speed: 1000,
    autoplay: true,

    navigation: {
        nextEl: '.next',
        prevEl: '.prev',
    },
});
