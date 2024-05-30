import "./style.css";
import ay from "./images/ay.png";
import f1 from "./images/f1.png";
import f2 from "./images/f2.png";
import f3 from "./images/f3.png";
import peng from "./images/peng.png";
import bunga from "./images/bunga.png";
import chimie from "./images/chimie.png";
import ok from "./images/ok.png";

const clickMenu = document.querySelector('.dropdown.ClickContainer');
const previousImg = document.querySelector('.previousImg');
const currentImg = document.querySelector('.currentImg');
const nextImg = document.querySelector('.nextImg');

clickMenu.addEventListener('click', function(e) {
    dropdownMenu(e.target);
});

function dropdownMenu(element) {
    if (element.children[0].getAttribute('class') === 'menu') {
        element.children[0].setAttribute('class', 'menu visible');
        return
    }
    element.children[0].setAttribute('class', 'menu');
}

const images = {

    img0: {
        image: ay
    },

    img1: {
        image: f1
    },

    img2: {
        image: f2
    },

    img3: {
        image: f3
    },

    img4: {
        image: peng
    },

    img5: {
        image: bunga
    },

    img6:  {
        image: ok
    },

    img7:  {
        image: chimie
    },

};

function displaySlides() {
    let counter = 0;

    let timeoutID;

    function navigationButtons() {
        const buttonsContainer = document.createElement('div');
        const previousBtn = document.createElement('button');
        const nextBtn = document.createElement('button');
        const dotsContainer = document.createElement('div');

        function navDots(img) {
            clearTimeout(timeoutID);
            counter = Object.keys(images).indexOf(img);
            updateSlides();
            timeoutID = setTimeout(autoSlide, 5000);
        }

        for (const img in images) {
            const navDot = document.createElement('div');
            navDot.setAttribute('class', `navDot`);
            dotsContainer.appendChild(navDot);
            navDot.addEventListener('click', function() {
                navDots(img);
            })
        }

        previousBtn.textContent = '<';
        nextBtn.textContent = '>';

        function next() {
            counter += 1;
            clearTimeout(timeoutID);
            updateSlides()
            timeoutID = setTimeout(autoSlide, 5000);
        }

        function autoSlide() {
            timeoutID = setTimeout(autoSlide, 5000);
            next();
        }

        function previous() {
            counter -= 1;
            clearTimeout(timeoutID);
            updateSlides()
            timeoutID = setTimeout(autoSlide, 5000);
        }


        previousBtn.addEventListener('click', previous);
        nextBtn.addEventListener('click', next);

        document.querySelector('.imageContainer').appendChild(buttonsContainer);
        document.querySelector('.imageContainer').appendChild(dotsContainer);
        buttonsContainer.appendChild(previousBtn);
        buttonsContainer.appendChild(nextBtn);

        autoSlide();
    }

    function updateSlides() {
        if (counter < 0) {
            counter = (Object.values(images).length - 1);
        }

        if (counter > (Object.values(images).length - 1)) {
            counter = 0;
        }

        currentImg.src = `${Object.values(images)[counter].image}`;

        previousImg.style.opacity = "30%";
        nextImg.style.opacity = "30%";

        if (Object.values(images)[counter - 1]) {
            previousImg.src = `${Object.values(images)[counter - 1].image}`;
            
            
        } else {
            previousImg.src = `${Object.values(images)[Object.values(images).length - 1].image}`;
        }

        if (Object.values(images)[counter + 1]) {
            nextImg.src = `${Object.values(images)[counter + 1].image}`;
            
        } else {
            nextImg.src = `${Object.values(images)[0].image}`;

        }

        const dots = document.querySelectorAll('.navDot');
        const activeDots = document.querySelectorAll('.navDot.visible');

        if (activeDots.length > 0) {
            for (const item of dots) {
                item.setAttribute('class', 'navDot');
            }
        }

        dots[counter].setAttribute('class', 'navDot visible');
        
    }

    

    navigationButtons();
    updateSlides();
}

displaySlides();
