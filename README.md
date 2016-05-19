# NativeScript Toast Plugin

> A NativeScript Toast Plugin for Android and iOS apps.

## What is a toast?

> A toast provides simple feedback about an operation in a small popup. It only fills the amount of space required for the message and the current activity remains visible and interactive. - [Android Developer](http://developer.android.com/guide/topics/ui/notifiers/toasts.html)

![image](showcase.png)

## Demo

How to install and use this plugin? Watch it on [YouTube](https://www.youtube.com/watch?v=2RWtX4crzyE)!

Want simple example application to play with? [nativescript-toast-example](https://github.com/TobiasHennig/nativescript-toast-example)

## Installation

Run the following command from the root of your project:

```
$ tns plugin add nativescript-toast
```

## Usage only for Ios

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

## Usage only for Android

Simple toast
```js
    var Toast = require("nativescript-toast");
    //Default duration is short in Simple Toast
    Toast.makeText("Hello World").show();
    //For long duration
    Toast.makeText("Hello World",{"duration": "long"}).show();
```

Custom toast
```js
    var Toast = require("nativescript-toast");
    // Set the options
    var options = {
        // This sets the background color of Toast. (OPTIONAL)
        backgroundColor: "#BB00796B",
        // This sets the corner radius of the Toast. (OPTIONAL)
        cornerRadius: 1,
        // This sets the text color of the Toast. (OPTIONAL)
        textColor: "#BBFFFFFF",
        //This sets the duration. (OPTIONAL)
        duration: "long"
    };
    Toast.makeText("Your Toast text", options).show();
```

**Note**:- If a very large value is set to cornerRadius then the may not appear. The colors can also be transparent i.e #BB00796B with transparency and #00796B without 00796B.

[![npm version](https://badge.fury.io/js/nativescript-toast.svg)](http://badge.fury.io/js/nativescript-toast)
