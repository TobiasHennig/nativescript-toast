/*global exports*/

var Toast = {
    text: "",
    makeText: function(text) {
        this.text = text;
        return this;
    },
    show: function() {
        console.log(this.text);
    }
};

exports.Toast = Toast;
