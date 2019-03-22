(function (jQuery) {

    jQuery.fn.carousel = function () {

        return this.each(function () {

            var minElementWidth = 200;
            var minElementsOnPage = 2;

            var $this = this;

            var elementTotalAmount = $($this).children('div').children('div').length;

            var carouselInterval = null;

            function setElementWidth() {
                if ($(window).outerWidth() / minElementWidth > minElementsOnPage) {
                    var elementsOnPage = Math.round($(window).outerWidth() / minElementWidth);
                    var width = Math.round($(window).outerWidth() / elementsOnPage);

                    $($this).children('div').children('div').css('width', width);
                }
            }

            function allElementsDisplayed() {
                var currentMarginLeft = parseInt($($this).children('div').css('margin-left'));
                currentMarginLeft = (currentMarginLeft < 0) ? currentMarginLeft * -1 : currentMarginLeft;

                var elementWidth = $($this).children('div').children('div').outerWidth();

                // @todo .9 does not work!, 0.95 instead. Use another logics or as a config option
                if (elementTotalAmount * elementWidth * 0.95 < $($this).outerWidth() + currentMarginLeft) {
                    return true;
                }

            }

            function next(duration) {
                var elementWidth = $(" .carousel > div > div").outerWidth();

                var currentMarginLeft = parseInt($($this).children('div').css('margin-left'));
                currentMarginLeft = (currentMarginLeft < 0) ? currentMarginLeft * -1 : currentMarginLeft;

                $($this).children('div').animate({'margin-left': '-' + (currentMarginLeft + elementWidth) + 'px'}, duration);

            }


            function setCarouselInterval() {
                carouselInterval = setInterval(function () {

                    if (!allElementsDisplayed()) {
                        next(2500);
                    } else {
                        clearInterval(carouselInterval);

                        $($this).children('div').animate({'margin-left': 0}, 2500, function () {

                            setCarouselInterval();
                        });
                    }

                }, 3000);
            }


            setElementWidth();
            setCarouselInterval();

            $(window).resizeEnd(function () {

                clearInterval(carouselInterval);

                $($this).children('div').stop().animate({
                    opacity: 0
                }, 500, function () {
                    setElementWidth();
                    $(this).css({'margin-left': 0});

                    $(this).animate({
                        opacity: 1
                    }, 500, function () {
                        setCarouselInterval();
                    });
                });

            }, 100);

        });
    };

}(jQuery));

