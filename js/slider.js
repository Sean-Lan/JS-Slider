/* global $ */

/* exported SliderMaker */

var SliderMaker = function($container, leftMin, leftMax) {
    var Slider = (function() {
        var
            configMap = {
                mainHtml: String() +
                    '<div class="slider-outter">' +
                    '<div class="slider-inner">' +
                    '</div>' +
                    '</div>',
                leftMin: null,
                leftMax: null
            },
            stateMap = {
                $container: null,
                docMouseMoveCB: null
            },
            jqueryMap = {},
            setJqueryMap, setEventListener, setConfigMap, setStateMap,
            docMouseMoveWrapper, docUnbindMouseMove,
            init;

        setJqueryMap = function() {
            var $container = stateMap.$container;
            jqueryMap.$document = $(document);
            jqueryMap.$outter = $container.find('.slider-outter');
            jqueryMap.$inner = $container.find('.slider-inner');
        };

        setEventListener = function() {
            var $inner = jqueryMap.$inner;
            $inner.on('mousedown', function(event) {
                var $inner = jqueryMap.$inner;
                var $document = jqueryMap.$document;
                var curX = event.pageX - $inner.offset().left;
                var docMouseMoveCB = docMouseMoveWrapper(curX);
                stateMap.docMouseMoveCB = docMouseMoveCB;
                $document.on('mousemove', docMouseMoveCB);
            });

            jqueryMap.$document.on('mouseup', docUnbindMouseMove);

        };

        setConfigMap = function(leftMin, leftMax) {
            var $outter = jqueryMap.$outter;
            var $inner = jqueryMap.$inner;
            if (leftMin === undefined) {
                configMap.leftMin = 0;
            } else {
                configMap.leftMin = leftMin;
            }

            if (leftMax === undefined) {
                configMap.leftMax = $outter.width() - $inner.width();
            } else {
                configMap.leftMax = leftMax;
            }
        };

        setStateMap = function() {
            var $inner = jqueryMap.$inner;
            $inner.css('left', configMap.leftMin);
        };

        docMouseMoveWrapper = function(curX) {
            return function(event) {
                var $inner = jqueryMap.$inner;
                var $outter = jqueryMap.$outter;
                var leftMin = configMap.leftMin;
                var leftMax = configMap.leftMax;
                var left = event.pageX - $outter.offset().left - curX;
                if (left > leftMax) left = leftMax;
                if (left < leftMin) left = leftMin;
                $inner.css('left', left);
            };
        };

        docUnbindMouseMove = function() {
            if (setStateMap.docMouseMoveCB !== null) {
                var $document = jqueryMap.$document;
                $document.off('mousemove', stateMap.docMouseMoveCB);
            }
        };

        init = function($container, leftMin, leftMax) {
            stateMap.$container = $container;
            $container.html(configMap.mainHtml);
            setJqueryMap();
            setConfigMap(leftMin, leftMax);
            setStateMap();
            setEventListener();
        };

        // the only outlet.
        return {
            init: init
        };

    })();

    return Slider.init($container, leftMin, leftMax);
};
