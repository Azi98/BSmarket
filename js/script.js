window.addEventListener("DOMContentLoaded", function() {

    //slider feedbacks

    const wrapper = document.querySelector('.feedback_wrapper'),
        wrapOfWrapper = document.querySelector('.moving_section_feedback'),
        feedbackElements = wrapper.querySelectorAll('.one_feedback'),
        lArrow = document.querySelector('img.slider_arrow.left'),
        rArrow = document.querySelector('img.slider_arrow.right'),
        width = window.getComputedStyle(wrapOfWrapper).width, //получаем ширину окошка, в котором будут светится слайды
        dots = document.querySelectorAll('.carousel span');


    let offset = 0;

    //делает неактивными все точки, перед тем как назначим активную

    function hideAllDots(container) {
        container.forEach(item => {
            item.classList.remove('active');
        })
    }

    //подсвечивает точку активного слайда 

    function activateDot (off, dotArr) {
        hideAllDots(dotArr);
        if (off == 0) {
            dotArr[0].classList.add('active');
        } else if (off == +parseInt(width.replace(/\D/g, ''))) {
            dotArr[1].classList.add('active');
        } else if (off == +parseInt(width.replace(/\D/g, '')) * 2) {
            dotArr[2].classList.add('active');
        } else if (off == +parseInt(width.replace(/\D/g, '')) * 3) {
            dotArr[3].classList.add('active');
        }
    }

    wrapper.style.width = 100 * feedbackElements.length + '%';
    feedbackElements.forEach(slide => {
        slide.style.width = width;
    })

    rArrow.addEventListener('click', () => {
        if (offset == +parseInt(width.replace(/\D/g, '')) * (feedbackElements.length - 1)) { // в переменной width лежало значение по типу 500px нужно было поменять его, чтобы мы могли его использовать в данном контексте
            offset = 0;
        } else {
            offset += +parseInt(width.replace(/\D/g, '')); //когда будем нажимать на стрелку, будет прибавляться ширина еще одного слайда, тем самым передвигая на след слайд
        }

        wrapper.style.transform = `translateX(-${offset}px)`;

        activateDot (offset, dots);

    });

    lArrow.addEventListener('click', () => {
        if (offset == 0) { 
            offset = +parseInt(width.replace(/\D/g, '')) * (feedbackElements.length - 1);
        } else {
            offset -= +parseInt(width.replace(/\D/g, '')); 
        }

        wrapper.style.transform = `translateX(-${offset}px)`;

        activateDot (offset, dots);
    });

    // Нажатие на точки меняет слайды

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            if (e.target.id == '0th') {
                offset = 0;
            } else if (e.target.id == "1th") {
                offset = +parseInt(width.replace(/\D/g, ''));
            } else if (e.target.id == "2th") {
                offset = +parseInt(width.replace(/\D/g, '')) * 2;
            } else if (e.target.id == "3th") {
                offset = +parseInt(width.replace(/\D/g, '')) * 3;
            }
            wrapper.style.transform = `translateX(-${offset}px)`;
            activateDot (offset, dots);
        })
    })

    //end of slider section

    //burger-menu settings 

    const burgerButton = document.querySelector('.header__burger-btn'),
        menuWrapper = document.querySelector('.navigation.navbar.navbar-expand-md.navbar-dark'),
        menuItems = menuWrapper.querySelectorAll('.nav-item');

    function toggleOpenClass (selector) {
        if (selector.classList.contains('open')) {
            selector.classList.remove('open');
        } else {
            selector.classList.add('open');
        }
    }

    burgerButton.addEventListener('click', () => {
        toggleOpenClass(burgerButton);
        toggleOpenClass(menuWrapper);       
    })

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            toggleOpenClass(burgerButton);
            toggleOpenClass(menuWrapper);  
        })
    })
});

