(function() {
    'use strict';
    //Toggle menu on button click
    function toggleDesktopMenu(e) {
        var self = e.target;
        var btnSandwitch = self.children;
        var nav = self.parentNode.querySelector('.nav');
        nav.classList.toggle('nav--visible-js');
        btnSandwitch[0].classList.toggle('btn-menu__icon--active-js');
    }
    //Function for hiding   menu when user click outside of it
    function hideMenuIfClickedOutsiedMobile(e) {
        var header = document.getElementById('header');
        var btnSandwitch = header.firstElementChild.children;
        var nav = header.lastElementChild;
        //check if its clicked outside header, if not cancel menu
        if (!header.contains(e.target)) {
            nav.classList.remove('nav--visible-js');
            btnSandwitch[0].classList.remove('btn-menu__icon--active-js');
        }
    }
    //function for reloading to  top when page is refreshed
    function reloadWindow() {
        window.location.href = '#welcome';
    }

    //Paralax scrolling - Introduction
    function parallax() {
        var welcome = document.getElementById('welcome').children;
        var windowWidth = window.innerWidth;
        var wScroll = window.pageYOffset;
        //check if  window Width is smaller than 811 and if true  don't add parallax
        if (windowWidth <= 811) {
            return;
        } else {
            welcome[0].style.transform = ('translateY(' + wScroll / 3 + '%)');

        }

    }
    //function for showing  "Chat" on scroll
    function showChat() {
        var panels = document.getElementsByClassName('panels');
        var sectionSkills = panels[0].parentNode;
        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;
        var wScroll = window.pageYOffset;
        var botPanel;
        var botWindow;

        //show each chatboxes relative on scroll position
        for (var i = 0; i < panels.length; i += 1) {
            //find chatboxes position
            //bottom of the current panel -getBoundingClientRect is object that retursn size
            // and positon of element relative to the  viewport;
            botPanel = panels[i].getBoundingClientRect().top + panels[i].offsetHeight + wScroll;
            //bottom of the window
            botWindow = wScroll + windowHeight;
            //when the bottom of the window is bigger that the bottom of the panel show the panel
            if ((botWindow > botPanel) && (windowWidth > 811)) {
                if (panels[i].classList.contains('panels--left') && !(panels[i].classList.contains('panels--left--animate-js'))) {
                    panels[i].classList.add('panels--left--animate-js');
                    addAnimation(panels[i]);
                    //check if panels contain panels right class and do not have animate class.
                    //Without the last check, every mousescroll adds new animate class
                } else if (panels[i].classList.contains('panels--right') && !(panels[i].classList.contains('panels--right--animate-js'))) {
                    panels[i].className += ' panels--right--animate-js';
                    addAnimation(panels[i]);
                }

            }
            //if window width smaller than 811 add animate class to all elements
            else if (windowWidth <= 811) {
                addAnimation(panels[i]);
            }
        }
        //deatach Scroll when animations completed;
        if (sectionSkills.lastElementChild.classList.contains('panels--right--animate-js')) {
            window.removeEventListener('scroll', showChat, false);
        }
    }

    //Adding animation for showing the  chat boxes
    function addAnimation(e) {
        var timeElement = e.querySelectorAll('.date');
        var currentTime = setDate(addZeroToNum);
        var timeElementAttr;
        e.querySelector('.chat-box__text--question').classList.add('chat-box__text--question--animate-js');
        e.querySelector('.chat-box__text--answer').classList.add('chat-box__text--answer--animate-js');
        //set the current time
        timeElement[0].innerText = currentTime.currDay + ',' + ' ' + currentTime.checkHourAM + ':' + currentTime.addZeroToMin + ':' + currentTime.addZeroToSec;
        // add datetime Attribute;
        timeElementAttr = currentTime.currYear + '-' + currentTime.currMonthAsNum + '-' + currentTime.currDayAsNum;
        timeElement[0].setAttribute('datetime', timeElementAttr);
    }
    //Function for getting the current date
    function addZeroToNum(num) {
        var number;
        //check if num is num
        if (isNaN(num)) {
            number = Number(num);
        } else {
            number = num;
        }
        //if number is  lower than 10 add 0 infront the number;
        if (number < 10) {
            return '0' + number;
        } else {
            return number;
        }
    }

    function setDate(callback) {
        var date = new Date();
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var currYear = date.getFullYear();
        var currMonth = date.getMonth();
        var currDate = date.getDate();
        var currDay = days[date.getDay()];
        var currHour = date.getHours();
        var currMin = date.getMinutes();
        var currSec = date.getSeconds();
        var currMonthAsNum;
        var currDayAsNum;
        var checkHourAM;
        var addZeroToMin;
        var addZeroToSec;
        //check if the callback is function
        if (typeof callback === 'function') {
            currMonthAsNum = addZeroToNum(currMonth);
            currDayAsNum = addZeroToNum(currDate);
            checkHourAM = addZeroToNum(currHour);
            addZeroToMin = addZeroToNum(currMin);
            addZeroToSec = addZeroToNum(currSec);
        } else {
            return new Error('callback is not a function');
        }

        return {
            currDayAsNum: currDayAsNum,
            currYear: currYear,
            currMonthAsNum: currMonthAsNum,
            currDay: currDay,
            checkHourAM: checkHourAM,
            addZeroToMin: addZeroToMin,
            addZeroToSec: addZeroToSec
        };
    }
    //all binds here
    document.addEventListener('DOMContentLoaded', function() {
        window.addEventListener('scroll', parallax, false);
        window.addEventListener('scroll', showChat, false);
        document.querySelector('.btn-menu').addEventListener('click', toggleDesktopMenu, false);
        reloadWindow(); //on refresh, go to top of the page
        document.addEventListener('click', hideMenuIfClickedOutsiedMobile, false);

    });
}());
