/*global require, exports, android*/

var application = require("application");
var context = application.android.context;
var Toast = android.widget.Toast;

function makeText(text, duration) {
    "use strict";
    if (typeof (text) !== "string") {
        throw new Error("The `text` parameter is missing.");
    }
    var d = (typeof (duration) === "string" && duration[0] === "l") ? Toast.LENGTH_LONG : Toast.LENGTH_SHORT;
    return Toast.makeText(context, text, d);
}

exports.makeText = makeText;
