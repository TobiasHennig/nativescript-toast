# NativeScript Toast Plugin

> A NativeScript Toast Plugin for Android apps.

## What is a toast?

> A toast provides simple feedback about an operation in a small popup. It only fills the amount of space required for the message and the current activity remains visible and interactive. - [Android Developer](http://developer.android.com/guide/topics/ui/notifiers/toasts.html)

![image](showcase.png)

## Demo

How to install and use this plugin? Watch it on [YouTube](https://www.youtube.com/watch?v=2RWtX4crzyE)!

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

[![npm version](https://badge.fury.io/js/nativescript-toast.svg)](http://badge.fury.io/js/nativescript-toast)
