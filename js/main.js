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
    var WOTD_FEED_URL = 'http://www.merriam-webster.com/word/index.xml';

    /* Public functions */
    function init(callback) {
        setSmoothieHeights();
    }

    function setSmoothieHeights() {
        var viewportHeight = $(window).height();
        console.debug(viewportHeight);
        $('.smoothies div').css('height', viewportHeight);
    }

    init();
}(jQuery));
