/*!
 * Igneosaur JavaScript Library v0.1
 * http://igneosaur.co.uk/
 *
 * Copyright 2012 Igneosaur
 * Released under the MIT license
 *
 * Date: Wed Oct 10 2012
 */
(function ($) {
    'use-strict';

    /* Private vars */
    var smoothieHeight = $(window).height();
    var smoothiesData = [];
    var activeSmoothie = 0;

    /* Functions */
    function init(callback) {
        setSmoothieHeights();
        setSmoothiesData();

        // Document listeners.
        $(window).scroll(function() {
            var scrollPosition = $(window).scrollTop();

            for(var i = 0; i < smoothiesData.length; i++) {
                if(scrollPosition > smoothiesData[i].threshold.top
                   && scrollPosition < smoothiesData[i].threshold.bottom
                   && activeSmoothie !== i) {
                    activeSmoothie = i;
                    $('.smoothie').removeClass('active');
                    smoothiesData[i].element.addClass('active');
                    highlightIngredients(smoothiesData[i].ingredients);
                    break;
                }
            }
        });
    }

    function setSmoothieHeights() {
        $('.smoothie').css('height', smoothieHeight);
    }

    function setSmoothiesData() {
        $('.smoothie').each(function(i) {
            var $smoothie = $(this);
            var smoothieIngredients = $smoothie.data('ingredients') ? $smoothie.data('ingredients').split(' ') : false;
            
            var thisSmoothieData = {
                element : $smoothie,
                ingredients : smoothieIngredients,
                threshold : {
                    top : $smoothie.offset().top - ($smoothie.height()/2),
                    bottom : $smoothie.height() + $smoothie.offset().top - ($smoothie.height()/2)
                }
            };
            
            smoothiesData.push(thisSmoothieData);
        });
    }
    
    function highlightIngredients(ingredients) {
        $('.ingredients li').removeClass('active');
        for(var i = 0; i < ingredients.length; i++) {
            $('.ingredients .' + ingredients[i]).addClass('active');
        }
    }

    init();
}(jQuery));
