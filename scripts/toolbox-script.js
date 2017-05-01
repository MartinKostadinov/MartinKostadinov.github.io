(function(global) {
  'use strict';

  // The route for any requests from the googleapis origin
global.toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'googleapis',
    },
    origin: /\.googleapis\.com$/
  });
})(self);