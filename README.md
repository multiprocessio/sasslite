# cssplus

Expands nested CSS rules efficiently by fuzzy parsing and not
validating the specific syntax of selectors and property values.

## Install

```bash
$ yarn add github.com/multiprocessio/cssplus@
```

## Use

```js
import fs from 'fs';
import { transform } from 'cssplus';

const myCSSPlusFile = fs.readFileSync('myfile.css').toString();
const css = transform(myCSSPlusFile);
```

## Command-line example

Create a CSS file:

```scss
$ cat example.css
input .input, button .button {
  color: white;
  border: 1px solid blue;

  a[value="{foobar,"] {
    font-size: 0;
  }
}

/* Testing out some things */

a {
  background: url('mygreaturl;).,}{');
}

@keyframes pulse {
  0% {
    background: white;
  }
  50% {
    background: red;
  }
}
```

Run:

```css
$ node ./node_modules/cssplus/scripts/cssplus.js example.css
input .input,
button .button {
  color: white;
  border: 1px solid blue;
}

input .input a[value="{foobar,"],
button .button a[value="{foobar,"] {
  font-size: 0;
}

a {
  background: url('mygreaturl;).,}{');
}

@keyframes pulse {
  0% {
    background: white;
  }
  50% {
    background: red;
  }
}
```
