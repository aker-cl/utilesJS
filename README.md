<p align="center"><img src="https://utilesjs.neocities.org/images/logo.png" width="400" alt="UtilesJS Logo"></p>

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
import { nameOfFunction } from 'utilesjs'

import {
    arrayIndexBy,
    arrayGroupBy,
    arrayOrderBy,
    percentDiff,
    setValuesSelectMultiple
} from 'utilesjs'

const num1 = 15000
const num2 = 10000
const select = document.querySelector('#select-multiple')
const array = [
    {
        id: 1,
        name: "John",
        age: 36,
    },
    {
        id: 2,
        name: "Sebastian",
        age: 22
    },
    {
        id: 3,
        name: "Chris",
        age: 36
    }
]

const array1 = arrayIndexBy([...array], 'id')
const array2 = arrayGroupBy([...array], 'age')
const array2 = arrayOrderBy([...array]).string('name', 'desc')

const diff = percentDiff(num1, num2, true)
setValuesSelectMultiple(select, array, 'id')
```
