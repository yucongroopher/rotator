## Radial Color Picker - Rotator

<p>
    <a href="https://www.npmjs.com/package/@radial-color-picker/rotator">
        <img src="https://img.shields.io/npm/dt/@radial-color-picker/rotator.svg" alt="Downloads">
    </a>
    <a href="https://www.npmjs.com/package/@radial-color-picker/rotator">
        <img src="https://img.shields.io/npm/v/@radial-color-picker/rotator.svg" alt="Version">
    </a>
    <a href="https://www.npmjs.com/package/@radial-color-picker/rotator">
        <img src="https://img.shields.io/npm/l/@radial-color-picker/rotator.svg" alt="License">
    </a>
</p>

Minimal, framework-agnostic companion plugin for managing the rotator of the Radial Color Picker.

## Install

Via yarn

```bash
$ yarn add @radial-color-picker/rotator
```

## Usage

```js
new Rotator(el, {
    angle: 0, // initial angle
    onRotate: onRotate, // callback to subscribe for rotation changes
    onDragStart: onDragStart, // callback to subscribe for drag start
    onDragStop: onDragStop // callback to subscribe for drag stop
});
```

## Change log

Please see [Releases][link-releases] for more information on what has changed recently.

## Credits

- [Rosen Kanev][link-author]
- [All Contributors][link-contributors]

This plugin is a modernized and heavily modified version of Denis Radin's plugin [Propeller][link-propeller].

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.

[Back To Top](#user-content-introduction)

[link-propeller]: https://github.com/PixelsCommander/Propeller
[link-author]: https://github.com/rkunev
[link-contributors]: ../../contributors
[link-releases]: ../../releases
