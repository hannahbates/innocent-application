/*!
 * Igneosaur JavaScript Library v1
 * http://igneosaur.co.uk/
 *
 * Copyright 2013 Igneosaur
 * Released under the MIT license
 *
 * Date: Mon Jul 01 2013
 */
(function ($) {
    'use strict';

    /*jslint browser: true*/
    /*global $, jQuery*/

    /* Vars */
    var smoothiesData = [],
        activeSmoothie = 0,
        $window = $(window),
    /* DOM elements */
        INGREDIENTS_SELECTOR = '.ingredients',
        SMOOTHIE_SELECTOR = '.smoothie';

    /* Functions */
    function highlightIngredients(ingredients) {
        var i = 0;

        $(INGREDIENTS_SELECTOR + ' li').removeClass('active');

        for (i; i < ingredients.length; i += 1) {
            $(INGREDIENTS_SELECTOR + ' .' + ingredients[i]).addClass('active');
        }
    }

    function setSmoothieHeights() {
        var smoothieHeight = $window.height();
        $(SMOOTHIE_SELECTOR).css('min-height', smoothieHeight);
    }

    function setSmoothiesData() {
        $(SMOOTHIE_SELECTOR).each(function (i) {
            var $smoothie = $(this),
                smoothieIngredients = $smoothie.data('ingredients') ? $smoothie.data('ingredients').split(' ') : false,
                thisSmoothieData = {
                    element : $smoothie,
                    ingredients : smoothieIngredients,
                    threshold : {
                        top : $smoothie.offset().top - ($smoothie.height() / 2),
                        bottom : $smoothie.height() + $smoothie.offset().top - ($smoothie.height() / 2)
                    }
                };

            smoothiesData.push(thisSmoothieData);
        });
    }

    function init(callback) {
        setSmoothieHeights();
        setSmoothiesData();

        // Document listeners.
        $(window).scroll(function () {
            var i = 0, scrollPosition = $window.scrollTop();

            for (i; i < smoothiesData.length; i += 1) {
                if (scrollPosition > smoothiesData[i].threshold.top
                        && scrollPosition < smoothiesData[i].threshold.bottom
                        && activeSmoothie !== i) {
                    activeSmoothie = i;
                    $(SMOOTHIE_SELECTOR).removeClass('active');
                    smoothiesData[i].element.addClass('active');
                    highlightIngredients(smoothiesData[i].ingredients);
                    break;
                }
            }
        });
    }

    init();
}(jQuery));
