(function($) {
    'use strict';
    //vars
    var
        $header = $('header'),
        $root = $('html, body'),
        $window = $(window),
        scrollSpeed = 600,
        $navigationItems = $header.find('ul');

    //Function for reloading browser on resize
    function toggleMobileMenu() {
        var $windowWidth = $window.width();
    /*    if ($windowWidth <= 1000) {
            window.location.href = '#welcome';
            location.reload;
        }*/
        if ($windowWidth > 810) {
            $navigationItems.css('display', 'block');
        } else {
            $navigationItems.css('display', 'none');
        }
    }
    /*scrollable ancors on click*/
    function scrollAncors(event) {
      event.preventDefault();
      var $this = $(this);
        $root.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, scrollSpeed);
        if(history.pushState){ //change hash in the url bar to the selected section
          history.pushState(null, null, $this.attr('href') );
        }else{
          location.hash = $this.attr('href');
        }
    }
    /*function for reloading to  top when page is refreshed*/
    function reloadWindow() {
        window.location.href = '#welcome';
        location.reload;
    }

    //Function for slideToggle the mobile menu
    function mobileMenuClick() {
        $navigationItems.slideToggle();
    }
    /*Function for hiding   menu when user click outside of it*/
    function hideMenuIfClickedOutsied(e) {
        if ($window.width() <= 810) {
            if (!$header.is(e.target) && $header.has(e.target).length === 0) {
                $navigationItems.hide();
            } else {
                $navigationItems.css('display', 'block');
            }
        }
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
        $window.resize(toggleMobileMenu); //reload page on resize
        $window.scroll(parallax);
        $('#header a, #welcome a').on('click', scrollAncors); //scrollable ancors
        $(document).on('click','#header a', scrollAncors);
        reloadWindow(); //on refresh, go to top of the page
        $('header #mobile-nav').on('tap', mobileMenuClick);
        $(document).on('click', hideMenuIfClickedOutsied);

    }

    $(document).ready(function() {
        binds();
    });

})(jQuery);
