(function () {
    var pressBtn = document.querySelector('.um-press-me-btn');
    pressBtn.innerText = "Press me!";

    function PressMeTimer() {
        this.startTime;
        this.stopTime;
    }

    PressMeTimer.prototype.start = function startTimer() {
        this.startTime = new Date();
        this.stopTime = null;
    }

    PressMeTimer.prototype.stop = function stopTimer() {
        this.stopTime = new Date();
        return this.formatResult();
    }

    PressMeTimer.prototype.formatResult = function formatResult(startTime, stopTime) {
        startTime = startTime || this.startTime;
        stopTime = stopTime || this.stopTime;
        var result = null;
        var formattedRsult = '...';

        if (startTime && stopTime) {
            result = stopTime - startTime;
            formattedRsult = (result/1000).toFixed(3);
        }

        return formattedRsult;
    }

    var timer = new PressMeTimer();

    function __onPress(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        if ((Modernizr.touchevents && evt instanceof TouchEvent && evt.targetTouches.length)
                || (!Modernizr.touchevents && evt instanceof MouseEvent && evt.button === 0)) {
            // touched by at least 1 finger or
            // pressed by the Main button
            timer.start();
            pressBtn.innerText = 'Timing..';
        }
    }

    function __onRelease(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        pressBtn.innerText = timer.stop();
    }

    if (Modernizr.touchevents) {
        // touch events enforced
        pressBtn.removeEventListener('touchstart', __onPress);
        pressBtn.addEventListener('touchstart', __onPress);
        pressBtn.removeEventListener('touchend', __onRelease);
        pressBtn.addEventListener('touchend', __onRelease);
        pressBtn.removeEventListener('touchcancel', __onRelease);
        pressBtn.addEventListener('touchcancel', __onRelease);
    } else {
        pressBtn.removeEventListener('mousedown', __onPress);
        pressBtn.addEventListener('mousedown', __onPress);
        pressBtn.removeEventListener('mouseup', __onRelease);
        pressBtn.addEventListener('mouseup', __onRelease);
    }

} ());