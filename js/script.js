window.addEventListener('DOMContentLoaded', function() {
   
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);
    
    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if(target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++){
                if (target == tab[i]){
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //Timer

//let deadline = '2019-03-10 09:17';

function getTimeRemaning(endtime = '2019-03-20 09:17') {
    let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));

        if (seconds < 10) {seconds = '0'+ seconds;}
        if (minutes < 10) {minutes = '0'+ minutes;}
        if (hours < 10) {hours = '0'+ hours;}

        return {
            'total' : t,
            'seconds' : seconds,
            'minutes' : minutes,
            'hours' : hours
        };
}

function setClock(id, endtime = '2019-03-20 09:17') {
    let timer = document.getElementById(id),
        seconds = timer.querySelector('.seconds'),
        minutes = timer.querySelector('.minutes'),
        hours = timer.querySelector('.hours'),
        timeInterval = setInterval(updateClock, 1000);


    function updateClock() {
        let t = getTimeRemaning(endtime);

        if (t.total <= 0) {
            clearInterval(timeInterval);
            seconds.textContent = '00';
            minutes.textContent = '00';
            hours.textContent = '00';
        } else {
            seconds.textContent = t.seconds;
            minutes.textContent = t.minutes;
            hours.textContent = t.hours;
        }
    }
}

setClock('timer');

//Modal

let more = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close'),
    learnMore = document.querySelectorAll('.description-btn');

more.addEventListener('click', function() {
    overlay.style.display = 'block';
    this.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
});

close.addEventListener('click', function() {
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
});

//узнать в чем проблема с info
for (let i = 0; i < tabContent.length; i++) {
tabContent[i].addEventListener('click', function() {
    let target = event.target;
    console.log(target);
    if (target && target.classList.contains('description-btn')) {
        overlay.style.display = 'block';
        learnMore[i].classList.add('more-splash');
        document.body.style.overflow = 'hidden';   
    }
});
}

//Form

let message = {
    loading: 'Загрузка...',
    succes: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
};

let form = document.querySelector('.main-form'),
    input = form.getElementsByTagName('input'),
    statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    form.addEventListener('submit', function(event){
        event.preventDefault;
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open = ('POST', '../server.php');
        request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
    
        let formData = new FormData(form);
        request.send(formData);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4){
                statusMessage.innerHTML = message.loading;
            } else if(request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.succes;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });


        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }

    });

///Form with promis

// function postData(data) {
//     return new Promise(function(resolve, reject) {
//         let request = new XMLHttpRequest();
//         request.open = ('POST', '../server.php');
//         request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
    
//         request.onreadystatechange = function(){
//             if (request.readyState < 4){
//                 resolve()
//             } else if(request.readyState === 4 && request.status == 200) {
//                 resolve()
//             } else {
//                 reject()
//             }
//         }

//         request.send(data);
    
//     });
// }

// function clearInput() {
//     for (let i = 0; i < input.length; i++) {
//         input[i].value = '';
// }

// postData(formData)
//     .then(()=> statusMessage.innerHTML = message.loading)
//     .then(()=> {
//         thankModal.style.display = 'block';
//         mainModal.style.display = 'none';
//         statusMessage.innerHTML = '';
//     })
//     .catch(()=> statusMessage.innerHTML = message.failure)
//     .then(clearInput);

//Slider
 let slideIndex = 1,
    slides = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dotsWrap = document.querySelector('.slider-dots'),
    dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length+1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });
});