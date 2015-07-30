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

var toast = Toast.makeText("Hello World");
toast.show();

// or

Toast.makeText("Hello World").show();
```