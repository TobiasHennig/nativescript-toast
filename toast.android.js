/*global require, exports, android*/

var application = require("application");
var context = application.android.context;
var Toast = android.widget.Toast;
var Color = android.graphics.Color;
var GradientDrawable = android.graphics.drawable.GradientDrawable;

function makeText(text, options) {
    "use strict";
    if (typeof (text) !== "string") {
        throw new Error("The `text` parameter is missing.");
    }
    var d;
    if (typeof (options.duration) === "undefined") {
      d = Toast.LENGTH_SHORT;
    }else {
      d = (typeof (options.duration) === "string" && options.duration[0] === "l") ? Toast.LENGTH_LONG : Toast.LENGTH_SHORT;
    }
    var toast = Toast.makeText(context, text, d);

    //enters only if atleast one option is set
    if (typeof options != "undefined") {
      var shape =  new GradientDrawable();
      //sets the default background color for the toast
      if (!options.backgroundColor) {
        options.backgroundColor = "#BB000000";
      }

      //sets the default corner radius for the toast
      if (!options.cornerRadius) {
        options.cornerRadius = 100;
      }

      //sets the default text color of toast
      if (!options.textColor) {
        options.textColor = "#FFFFFF";
      }

      //we set values to shape and text
      shape.setColor(Color.parseColor(options.backgroundColor));
      shape.setCornerRadius(options.cornerRadius);
      toast.getView().findViewById(android.R.id.message).setTextColor(Color.parseColor(options.textColor));
      toast.getView().setBackground(shape);
    }

    return toast;
}

exports.makeText = makeText;
