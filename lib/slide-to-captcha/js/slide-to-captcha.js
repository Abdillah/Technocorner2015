(function($) {
    $.fn.slideToCAPTCHA = function(options) {
        options = $.extend({
            handle: '.handle',
            cursor: 'move',
            direction: 'x', //x or y
            customValidation: false,
            completedText: 'Done!'
        }, options);

        var $handle = this.find(options.handle),
            $slide = this,
            handleOWidth,
            xPos,
            yPos,
            slideXPos,
            slideWidth,
            slideOWidth,
            $activeHandle,
            $formEl = $slide.parents('form');

        startSlider();

        $handle.css('cursor', options.cursor)
            .on('mousedown', function(e){ slideOn(e); });

        function startSlider() {
            $formEl.attr('data-valid', 'false');

            $slide.addClass('slide-to-captcha');
            $handle.addClass('slide-to-captcha-handle');

            handleOWidth = $handle.outerWidth();
            slideWidth = $slide.width();
            slideOWidth = $slide.outerWidth();
        }

        function slideOn(e) {
            $activeHandle = $handle.addClass('active-handle');

            xPos = $handle.offset().left + handleOWidth - e.pageX;

            //if(options.direction === 'y') {
            //    yPos = $handle.offset().top + handleHeight = e.pageY;
            //}
            slideXPos = $slide.offset().left + ((slideOWidth - slideWidth) / 2);

            $activeHandle.on('mousemove', function(e){ slideMove(e); })
                .on('mouseup', function(e){ slideOff(); });

            e.preventDefault();
        }

        function slideMove(e) {
            var padding = 5;
            var handleXPos = e.pageX + xPos - handleOWidth;
            if(handleXPos > slideXPos && handleXPos < slideXPos + slideWidth - handleOWidth - padding) {
                if ($handle.hasClass('active-handle')) {
                    $('.active-handle').offset({left: handleXPos});
                }
            } else {
                if(handleXPos <= slideXPos === false) {
                    sliderComplete();
                }
                $activeHandle.mouseup();
            }
        }

        function sliderComplete() {
            var padding = 5;
            $activeHandle.offset({left: slideXPos + slideWidth - handleOWidth - padding});
            $activeHandle.off();
            slideOff();
            $formEl.attr('data-valid', 'true');
            $slide.addClass('valid');
            $('input[name=captcha]').val('done');
            $('.slide-to-captcha').attr('data-content', options.completedText);
        }

        function slideOff() {
            $activeHandle.removeClass('active-handle');
        }
    }
})(jQuery);