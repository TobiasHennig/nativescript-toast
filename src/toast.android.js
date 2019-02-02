/*global require, exports, android*/

var application = require("application");

function makeText(text, duration) {
    "use strict";
    var Toast = android.widget.Toast;
    if (typeof (text) !== "string") {
        throw new Error("The `text` parameter is missing.");
    }
    var d = (typeof (duration) === "string" && duration[0] === "l") ? Toast.LENGTH_LONG : Toast.LENGTH_SHORT;

    var centeredText = new android.text.SpannableString(text);
    centeredText.setSpan(
        new android.text.style.AlignmentSpan.Standard(android.text.Layout.Alignment.ALIGN_CENTER),
        0,
        text.length - 1,
        android.text.Spannable.SPAN_INCLUSIVE_INCLUSIVE);

    return Toast.makeText(application.android.context, centeredText, d);
}

exports.makeText = makeText;
