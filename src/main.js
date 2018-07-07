import { getRotationFromCoords, normalizeAngle, noop } from './utils.js';

/**
 * Modified version of Denis Radin's
 * {@link https://github.com/PixelsCommander/Propeller Propeller}.
 */
export default class Rotator {
    constructor(element, options) {
        this.active = false;
        this._angle = 0;
        this.element = element;
        this.element.style.willChange = 'transform';

        this.initOptions(options);
        this.updateCSS();
        this.bindHandlers();
        this.addListeners();
    }

    get angle() {
        return this._angle;
    }

    set angle(value) {
        if (this._angle !== value) {
            this._angle = value;
            this.updateCSS();
        }
    }

    initOptions(options) {
        options = options || {};

        this.onRotate = options.onRotate || noop;
        this.onDragStart = options.onDragStart || noop;
        this.onDragStop = options.onDragStop || noop;

        this._angle = options.angle || 0;
    }

    bindHandlers() {
        this.onRotationStart = this.onRotationStart.bind(this);
        this.onRotated = this.onRotated.bind(this);
        this.onRotationStop = this.onRotationStop.bind(this);
    }

    addListeners() {
        this.element.addEventListener('touchstart', this.onRotationStart, { passive: true });
        this.element.addEventListener('touchmove', this.onRotated);
        this.element.addEventListener('touchend', this.onRotationStop, { passive: true });
        this.element.addEventListener('touchcancel', this.onRotationStop, { passive: true });

        this.element.addEventListener('mousedown', this.onRotationStart, { passive: true });
        this.element.addEventListener('mousemove', this.onRotated);
        this.element.addEventListener('mouseup', this.onRotationStop, { passive: true });
        this.element.addEventListener('mouseleave', this.onRotationStop);
    }

    removeListeners() {
        this.element.removeEventListener('touchstart', this.onRotationStart);
        this.element.removeEventListener('touchmove', this.onRotated);
        this.element.removeEventListener('touchend', this.onRotationStop);
        this.element.removeEventListener('touchcancel', this.onRotationStop);

        this.element.removeEventListener('mousedown', this.onRotationStart);
        this.element.removeEventListener('mousemove', this.onRotated);
        this.element.removeEventListener('mouseup', this.onRotationStop);
        this.element.removeEventListener('mouseleave', this.onRotationStop);
    }

    destroy() {
        this.onRotationStop();
        this.removeListeners();
    };

    onRotationStart(event) {
        this.initDrag();
        this.onDragStart(event);
    };

    onRotationStop() {
        if (this.active) {
            this.active = false;
            this.onDragStop();
        }

        this.active = false;
    }

    onRotated(event) {
        event.preventDefault();

        if (this.active) {
            const point = event.targetTouches ? event.targetTouches[0] : event;

            this.updateAngleToMouse({
                x: point.clientX,
                y: point.clientY,
            });

            this.updateCSS();
            this.onRotate(this._angle);
        }
    }

    setAngleFromEvent(ev) {
        const newAngle = getRotationFromCoords(
            { x: ev.clientX, y: ev.clientY },
            this.element.getBoundingClientRect()
        );

        // atan2 gives values between -180 to 180 deg
        // add 90 degrees offset so that it starts from 0 deg (or red)
        // and then normalize negative values
        this._angle = normalizeAngle(newAngle + 90);

        this.updateCSS();
        this.onRotate(this._angle);
    }

    updateAngleToMouse(newPoint) {
        const newMouseAngle = getRotationFromCoords(
            newPoint,
            this.element.getBoundingClientRect()
        );

        if (!this.lastMouseAngle) {
            this.lastElementAngle = this._angle;
            this.lastMouseAngle = newMouseAngle;
        }

        this._angle = normalizeAngle(this.lastElementAngle + newMouseAngle - this.lastMouseAngle);
    }

    initDrag() {
        this.active = true;
        this.lastMouseAngle = undefined;
        this.lastElementAngle = undefined;
    }

    updateCSS() {
        this.element.style.transform = `rotate(${this._angle}deg)`;
    }
}
