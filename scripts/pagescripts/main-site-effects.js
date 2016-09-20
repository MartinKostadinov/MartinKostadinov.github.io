(function($) {
    'use strict';
    //vars
    var
        $header = $('header'),
        $root = $('html, body'),
        $window = $(window),
        scrollSpeed = 600,
        $navigationItems = $header.find('nav');

    // Adding greetings message and then removing it
    function hello() {
        var $welcome = $root.find('#welcome'),
            $hi = $welcome.children('.hi'),
            $welcomeChildren = $welcome.children('.introduction');
        if ($window.width() >= 810) {
            //show Hi message, then hide it
            $hi.fadeIn(2500).fadeOut(400);
            setTimeout(function() {
                $welcome.fadeIn(400).removeClass('hideWelcome').addClass('showWelcome');
                $welcomeChildren.fadeIn(400).removeClass('hide-intro');
            }, 2800);
        } //No animations for smaller devices
        else if ($window.width() < 810) {
            $welcome.removeClass('hideWelcome').addClass('showWelcome');
            $welcomeChildren.removeClass('hide-intro');
        }
    }
    //Toggle menu on button click
    function toggleDesktopMenu() {
        console.log('fired');
        var $this = $(this),
            $toggleNav = $this.find('div'),
            menuParent = $this.parent('header').find('nav');

        menuParent.toggleClass('showMenu');
        $toggleNav.toggleClass('navigation-active-state');

    }
    //Function for hiding   menu when user click outside of it
    function hideMenuIfClickedOutsiedMobile(e) {
        var $toggleNav = $header.find('div');
        if (!$header.is(e.target) && $header.has(e.target).length === 0) {
            $navigationItems.removeClass('showMenu');
            $toggleNav.removeClass('navigation-active-state');
        }
    }
    //scrollable ancors on click
    function scrollAncors(event) {
        event.preventDefault();
        var $this = $(this);
        $root.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, scrollSpeed);
        if (history.pushState) { //change hash in the url bar to the selected section
            history.pushState(null, null, $this.attr('href'));
        } else {
            location.hash = $this.attr('href');
        }
    }
    //function for reloading to  top when page is refreshed
    function reloadWindow() {
        window.location.href = '#welcome';
        location.reload;
    }

    //Paralax Introduction function
    function parallax() {
        var $welcome = $('#welcome').children('div'),
            wScrool = $(this).scrollTop();
        if ($window.width() <= 810) {
            return;
        }
        $welcome.css({
            'transform': 'translateY(' + wScrool / 3.5 + '%)'
        });
    }
    //all binds here
    function binds() {
        $window.scroll(parallax);
        $('#header a, #welcome a').on('click', scrollAncors); //scrollable ancors
        $(document).on('click', '#header a', scrollAncors);
        $('#desktop-nav-container').on('click', toggleDesktopMenu);
        reloadWindow(); //on refresh, go to top of the page
        $(document).on('click', hideMenuIfClickedOutsiedMobile);

    }

    $(document).ready(function() {
        binds();
        hello();
    });


})(jQuery);
