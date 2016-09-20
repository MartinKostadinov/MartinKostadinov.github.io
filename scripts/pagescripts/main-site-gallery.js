(function($) {
    'use strict';
    //Caching  the dom
    var
        $mainGallery = $('#main-gallery'),
        $galleryNav = $('.gallery-nav'),
        $smallGallery = $('#small-gallery-container'),
        liLength = $mainGallery.find('.slide').length,
        $smallGalleryImgWidth = $galleryNav.find('li').width(),
        $imageSlider = $mainGallery.find('ul'),
        $swipeTouch = $imageSlider.find('li'),
        $selectSmallImages = $galleryNav.find('img'),
        $galleryNavList = $galleryNav.find('li'),
        $imageSlider2 = $galleryNav.children(),
        $findImageIdIndex = $imageSlider.find("li[id^='img_']"),
        $imgResizeOnZoom = $mainGallery.find('img'),
        $toggleElementsOnZoom = $('.gallery-nav, .dot-navigation, .description, .btn-zoom-gallery'),
        $rightSlideButton = $mainGallery.children('#right-side-button'),
        $leftSlideButton = $mainGallery.children('#left-side-button'),
        $closeButton = $mainGallery.children('.btn-close-gallery'),
        $bulletNav = $mainGallery.siblings('.dot-navigation'),
        $bulletElements = $bulletNav.find('li'),
        current = 1;

    //add description to every picture and  update it on picture change
    function updatePicDescription(e) {
        $(".description p[class^='desc']").css({
            'display': 'none'
        });
        $('.desc' + e).css({
            'display': 'block'
        });

    }
    //hide elements which aren't on focus
    function hideElements(e) {
        $findImageIdIndex.fadeOut();
        $selectSmallImages.removeClass('active1');
        $bulletElements.removeClass('active');
        $('#img_' + e).fadeIn();
    }
    //check if animation is going
    function checkIfIsAnimated() {
        if ($imageSlider.is(':animated')) {
            return false;
        }
    }
    //uodate gallery elements on click
    function updateGalleries(e) {
        hideElements(e);
        updatePicDescription(e);
        activate(e);
    }
    //nav galery functionality
    function smallPics() {
        var $this = $(this),
            index2 = $this.index() + 1,
            current = index2;
        updateGalleries(current);
    }
    //bullet navigation
    function dotNav() {
        var $this = $(this),
            index = $this.index() + 1,
            current = index;
        $this.addClass('active');
        updateGalleries(current);

    }
    // Checks  if it is  possible to move to next picture and update small gallery and img position
    function checkImageCurrentRight() {
        if (current >= liLength) {
            current = 1;
            $imageSlider2.css('margin-left', $smallGalleryImgWidth);
        } else {
            current++;
        }
        $imageSlider2.css({
            'margin-left': '-=' + $smallGalleryImgWidth + 'px '
        });
    }
    // Checks  if it is  possible to move to prev picture and update small gallery and img position
    function checkImageCurrentLeft() {
        var totalImgLength = (liLength * $smallGalleryImgWidth) - $smallGalleryImgWidth;
        console.log($smallGalleryImgWidth);
        if (current <= 1) {
            current = liLength;
            $imageSlider2.css('margin-left', '-' + totalImgLength + 'px');
        } else {
            current--;
            $imageSlider2.css({
                'margin-left': '+=' + $smallGalleryImgWidth + 'px '
            });
        }
    }
    //add classes active to images and bullets
    function activate(e) {
        var $updateSmallImgIndex = $('#smallImg_' + e),
            $bullet = $('.bullet' + e),
            $getSelectedImg = $updateSmallImgIndex.children('img');
        $bullet.addClass('active'); //update bullet
        $getSelectedImg.addClass('active1'); //
    }
    //right sliding  image  button
    function rightImageSlide() {
        checkIfIsAnimated();
        checkImageCurrentRight();
        updateGalleries(current);

    }

    //left sliding  image  button
    function leftImageSlide() {
        checkIfIsAnimated();
        checkImageCurrentLeft();
        updateGalleries(current);

    }
    // doing styles after zoomIn is presssed
    function zoomIn() {
        $mainGallery.removeClass('main-gallery-container');
        $mainGallery.addClass('zoomIn');
        $smallGallery.css({
            'display': 'none'
        });
        $imgResizeOnZoom.addClass('zoomed');

        $toggleElementsOnZoom.css({
            'display': 'none'
        });

        $closeButton.css({
            'display': 'block'
        });

    }
    //setting  defaults styles after close button is clicked
    function zoomOut() {
        $mainGallery.removeClass('zoomIn');
        $mainGallery.addClass('main-gallery-container');
        $smallGallery.css({
            'display': 'inline-block'
        });
        $imgResizeOnZoom.removeClass('zoomed');
        $toggleElementsOnZoom.css({
            'display': 'block'
        });

        $closeButton.css({
            'display': 'none'
        });

    }
    //add animation to M wall
    function animateCon() {
        var $this = $(this),
            scroll = $this.scrollTop();
        if (scroll > 1550 && scroll < 1850) {
            $('#right-cover').animate({
                'top': '1200px'

            }, 3500);
            $('#left-cover').animate({
                'top': '-1200px'
            }, 3500);
            setTimeout(function() {
                $('.cover-div').addClass('hidden');
                $('#gallery').css('display', 'block');
            }, 1500);
        }
    }
    // all events and binding
    function binds() {
        $(window).scroll(animateCon);
        $('.btn-zoom-gallery').on('click', zoomIn);
        $closeButton.on('click', zoomOut);
        $rightSlideButton.on('click ', rightImageSlide);
        $leftSlideButton.on('click ', leftImageSlide);
        $('#small-gallery-right-btn').on('click ', checkImageCurrentRight);
        $('#small-gallery-left-btn').on('click ', checkImageCurrentLeft);
        $swipeTouch.on('swipeleft', leftImageSlide);
        $swipeTouch.on('swiperight', rightImageSlide);
        $bulletElements.on('click', dotNav);
        $galleryNavList.on('click', smallPics);
    }

    $(document).ready(function() {
        binds();
    });
}(jQuery));
