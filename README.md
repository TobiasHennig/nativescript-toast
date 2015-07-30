# NativeScript Toast Plugin

A NativeScript Toast Plugin for Android apps.

## Installation

Run the following command from the root of your project:

```
$ tns plugin add nativescript-toast
```

## Usage

```js
var Toast = require("nativescript-toast");

// ...

var toast = Toast.makeText("Hello World");
toast.show();
```

It is also possible to chain the methods.
```js
Toast.makeText("Hello World").show();
```

Pass `"long"` to the `makeText` function to show the toast a bit longer.
```js
Toast.makeText("Hello World", "long").show();
```
