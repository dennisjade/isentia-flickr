(function() {

  module.exports =  function(app){

    getPublicFeeds = function(req, res) {

      var flickrData = {}
      return res.json(flickrData)
    }

    app.get('/api/public/photo-feeds', getPublicFeeds)
  }
}).call(this);