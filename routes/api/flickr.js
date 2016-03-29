/***
* Created By : Dennis Jade C. Toribio
* Created DAte: March 26 2016
* Description : Flickr route contains all routes related to getting information from the flicker
***/

(function() {

  var common = require('../../helpers/common')

  module.exports =  function(app){

    getPublicFeeds = function(req, res) {
      var opts = {
        method: 'JSONP',
        url : "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=parseResponse&format=json&tags=" + req.query.tags
      }

      function parseResponse (data) {
        return data;
      }

      common.makeRequest(opts, function(err, response){
        var flickrData = {status:200, msg:'Success', data:null}
        if (err){
          flickrData.status = 500
          flickrData.msg = 'Failed'
          flickrData.data = err
        }else{
          flickrData.data = eval(response.body)
        }
        
        return res.json(flickrData)
      })
    }

    app.get('/api/public/photo-feeds', getPublicFeeds)
  }
}).call(this);