/*global require, exports, android*/

var application = require("application");

function makeText(text, duration) {
    "use strict";
    var Toast = android.widget.Toast;
    if (typeof (text) !== "string") {
        throw new Error("The `text` parameter is missing.");
    }
    var d = (typeof (duration) === "string" && duration[0] === "l") ? Toast.LENGTH_LONG : Toast.LENGTH_SHORT;
    return Toast.makeText(application.android.context, text, d);
}

exports.makeText = makeText;
