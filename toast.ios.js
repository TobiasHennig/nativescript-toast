/*global module*/

var Toast = function(){
    this.text = '';
};

Toast.prototype.makeText = function(text) {
    this.text = text;
    return this;
};

Toast.prototype.show = function() {
    console.log(this.text);
};

module.exports = new Toast();