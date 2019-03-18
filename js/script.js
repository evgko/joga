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

});