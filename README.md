<p align="center"><img src="./logo.png" width="400" alt="UtilesJS Logo"></p>

<p align="center">
    <a href="https://www.npmjs.com/package/utilesjs" target="_blank"><img src="https://img.shields.io/npm/dt/utilesjs" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/utilesjs" target="_blank"><img src="https://img.shields.io/npm/v/utilesjs" alt="Version"></a>
    <img src="https://img.shields.io/npm/l/utilesjs" alt="Licence">
</p>

## About UtilesJS
UtilesJS is a set of javascript and css utilities to facilitate the manipulation and use of some javascript elements and the DOM:

- Arrays
- Objects
- Strings
- Numbers
- Keys events
- Inputs formats
- Transitions
- Etc.

See the full documentation in <a href="https://utilesjs.neocities.org" target="_blank">utilesjs.neocities.org</a>

## Usage

```javascript
// Principal function
import UtilesJS from 'utilesjs'

// Individual functions
import {nameOfFunction} from 'utilesjs/functions'

// Prototypes
import 'utilesjs/prototypes'
```

## Release Notes

### v1.0.0 - Oct 20, 2023

- CommonJS in next update
- utiles.js, animations.js and eventsUtiles.js are merged into utiles.js but in separate documentations (documentation in next update)
- prototypes.js and animationsPrototypes.js are merged into utiles.js but in separate documentations (documentation in next update)
- utiles.js functions can be used as a single function; "utilesJS()" or each of its functions can be used separately. "utilesJS()" will be the main mode of operation
- It is allowed to enter both the element (object) and the element id in the functions that require it
- The structure of some function arguments is changed

### v0.6.0 - Sep 04, 2023

- Add animationPrototypes.js and animationPrototypes.d.ts
- Change "CSS tools" to "Components"

### v0.5.0 - Aug 31, 2023

- Add scrollTransition function to eventsUtiles.js
- Add animationUtiles.js and animationUtiles.d.ts

### v0.4.0 - Aug 23, 2023
- Add eventUtiles.js and eventUtiles.d.ts
- Fix simulateKeyPress in prototypes

### v0.3.4 - Aug 22, 2023

- Prototype "simulateKeyPress" is separated into prototype of input and textarea

### v0.3.3 - Aug 21, 2023

- Add some folders and files to .npmignore

### v0.3.2 - Aug 21, 2023

- Change name of folder "ES6" to "ES"
- Add src/ and umd/ to .npmignore and .gitignore

### v0.3.1 - Aug 17, 2023

- Change package.json type "commonjs" to "module"
### v0.3.0 - Aug 17, 2023

- Add prototypes.js with .d.ts in commonJS, ES6 and umd

### v0.2.6 - Aug 16, 2023

- Add hash in filterPage function of utiles.js

### v0.2.5 - Aug 16, 2023

- DiscountPrice function now just return de new price
- Correction of variable in function listenerInputsFilter of utiles.js
- Add .d.ts to utiles.js

### v0.2.4 - Aug 09, 2023

- Update of readme

### v0.2.3 - Aug 08, 2023

- Add colors to "checkSwitch.css"

### v0.2.2 - Aug 07, 2023

- "arrayFusionByAttribute" function is corrected. The "arrayGroupBy" function was wrongly referenced in utiles.js
### v0.2.1 - Aug 06, 2023

- Jsdom dependency is uninstalled.
- Change utiles.js to utiles.cjs in CommonJS

### v0.2.0 - Aug 06, 2023

- Change UtilesClass for function UtilesJS.
- Finish utiles.js for node in ES6 and CommonJS.
- Update utiles.js in umd.
- Update documentation of utiles.js. Check in <a href="https://utilesjs.neocities.org">utilesjs.neocities.org</a>

### v0.1.0 - Aug 02, 2023

- UtilesJS project uploaded to repository.

