new Slider({
    wrapper: document.querySelector('.Sliders'),
    sliderClass: 'itemSlider',
    auto: 3000,
    dots: true,
    arrowBtn: true,
    currentSlider: (item) => {
        console.log(item);
    },
});
