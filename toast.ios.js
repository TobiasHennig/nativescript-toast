/*global exports*/

function makeText(text, duration) {
    "use strict";
    if (typeof (text) !== "string") {
        throw new Error("The `text` parameter is missing.");
    }
    var d = (typeof (duration) === "string" && duration[0] === "l") ? 3.5 : 2;
    return JLToast.makeText(text);
};

exports.makeText = makeText;
