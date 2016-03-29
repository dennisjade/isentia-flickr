(function() {

  module.exports =  function(app){

    showHome = function(req, res) {
      var json = {}
      return res.render('index.jade', json)
    }

    app.get('/', showHome)
  }
}).call(this);