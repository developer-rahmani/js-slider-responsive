class Slider {
    slideIndex = 1;
    constructor(Options) {
        this.items = Options;
        this.initialSetting(this.items);
        this.Buttons(this.items);
        this.dots(this.items);
        this.autoTime(this.items);
    }

    initialSetting() {
        const { wrapper, dots, arrowBtn, auto, sliderClass } = this.items;

        if (!wrapper) throw Error('Please Select Query Element');
        if (typeof wrapper !== 'object') throw Error('Type Wrapper Must Object');

        if (!sliderClass) throw Error('Please Select Slider Class');

        if (dots && typeof dots != 'boolean') throw Error('Type dots Must Boolean');

        if (arrowBtn && typeof arrowBtn != 'boolean') throw Error('Type Button Must Boolean');

        if (auto && typeof auto != 'number') throw Error('Type Auto Must Number');
        !auto ? (this.auto = 0) : (this.auto = auto);
    }

    Buttons() {
        const { wrapper, arrowBtn } = this.items;
        if (arrowBtn !== false) {
            wrapper.insertAdjacentHTML(
                'beforeEnd',
                `
            <div class="buttonsSlider">
                <i class="fas fa-chevron-left prev"></i>
                <i class="fas fa-chevron-right next"></i>
            </div>
            `
            );

            const next = document.querySelector('.next');
            const prev = document.querySelector('.prev');

            next.addEventListener('click', () => {
                this.showSlider(--this.slideIndex);
                this.clearTime();
            });
            prev.addEventListener('click', () => {
                this.showSlider(++this.slideIndex);
                this.clearTime();
            });
        }
    }

    dots() {
        const { wrapper, dots } = this.items;

        if (dots !== false) {
            this.itemSlider = wrapper.querySelectorAll('.itemSlider');
            this.creatDots = [...this.itemSlider].map((element, index) => `<span class="dot" data-target="${++index}"></span>`);

            const wrapperDots = document.createElement('div');
            wrapperDots.classList.add('dots');
            wrapperDots.innerHTML = this.creatDots.join('');
            wrapper.insertAdjacentElement('afterEnd', wrapperDots);

            document.querySelector('.dot').classList.add('ActiveDot');
            this.allDot = document.querySelectorAll('.dots .dot');

            this.allDot.forEach((element) => {
                element.addEventListener('click', () => {
                    this.slideIndex = element.getAttribute('data-target');
                    this.showSlider(this.slideIndex);
                    this.clearTime();
                });
            });
        }
    }

    showSlider() {
        let { currentSlider } = this.items;
        if (this.slideIndex > this.itemSlider.length) this.slideIndex = 1;
        if (this.slideIndex < 1) this.slideIndex = this.itemSlider.length;

        const classActive = document.querySelectorAll('.Active');
        const classActiveDot = document.querySelectorAll('.ActiveDot');
        for (let item of classActive) item.classList.remove('Active');
        for (let item of classActiveDot) item.classList.remove('ActiveDot');

        this.itemSlider[this.slideIndex - 1].classList.add('Active');
        this.allDot[this.slideIndex - 1].classList.add('ActiveDot');

        currentSlider(this.itemSlider);
    }

    autoTime() {
        if (this.auto !== 0) {
            this.setTime = setInterval(() => {
                this.showSlider(++this.slideIndex);
            }, this.auto);
        }
    }

    clearTime() {
        clearInterval(this.setTime);
        this.autoTime();
    }
}
