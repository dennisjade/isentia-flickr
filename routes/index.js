(function() {
  var fs = require('fs');
  var path = require('path');

  module.exports = function(app) {
    fs.readdirSync("./routes/api").forEach(function(file) {
      if (path.extname(file) === '.js') {
        return require("./api/" + file)(app);
      }
    });
    fs.readdirSync("./routes/server").forEach(function(file) {
      if (path.extname(file) === '.js') {
        return require("./server/" + file)(app);
      }
    });
  };

}).call(this);