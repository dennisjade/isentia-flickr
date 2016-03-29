(function() {

  var request = require('request') //will use the request package to contact the flikr webservice

  /***/
  /*Desc  : Make an http/s request 
  /*Params: opts : Object with structure of {method = 'POST', url = 'https://flikr.com/websevices'} 
  /*Return: A value of two parameter; Object type if not null
  /***/
  module.exports.makeRequest = function(opts, callback) {
    request(opts, function (error, response, body) {
      if (error)
        callback(error, null)
      else
        callback(null, {response: response, body: body})
    })
  }

}).call(this)