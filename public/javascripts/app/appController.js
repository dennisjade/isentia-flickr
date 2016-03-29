/***
* Created By : Dennis Jade C. Toribio
* Date : March 20, 2016
* Description : This is a combination of all Angular components. This can be better separation into different file tobecom e more modular
*               Here we created a factory so we can consume it as needed. Our controller is called when there is an event in the search input box.
*               We created also 2 directives. One to handle the image layout and the other to handle when the DOM element is ready 
*               so we can load the initial page
***/

(function() {

  angular.module('flickrApp', ['ngResource'])

  .factory('Flickr', function($resource, $q) {
    var photosPublic = $resource('/api/public/photo-feeds', 
          { format: 'json' }, 
          {'load': {'method': 'GET'}})
    return {
      search: function(query) {
        var q = $q.defer();
        photosPublic.load({
          tags: query
        }, function(resp) {
          q.resolve(resp);
        }, function(err) {
          q.reject(err);
        })
        
        return q.promise;
      }
    }
  })

  .controller('FlickrCtrl', function($scope, Flickr) {
    var doSearch = function(query) {
      Flickr.search(query).then(function(resp) {
        $scope.photos = resp.data;
      });
    };
    
    $scope.search = function() {
      doSearch($scope.query);
    }
  })

  .directive('photo', function($window) {
    return {
      restrict: 'C',
      link: function($scope, $element, $attr) {
        var size = ($window.outerWidth / 3) - 10;
        $element.css('width', size + 'px');
      }
    }
  })

  .directive( 'elemReady', function( $parse, Flickr ) {
     return {
         restrict: 'A',
         link: function( $scope, elem, attrs ) {    
            elem.ready(function(){
              Flickr.search('').then(function(resp) {
                $scope.photos = resp.data;
              });
            })
         }
      }
  });
  
}).call(this);