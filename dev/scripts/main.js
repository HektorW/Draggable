require.config({
  paths: {
    jquery: '../bower_components/jquery/jquery'
  }
});

require([
  'draggable'
], function(Draggable) {

  $('img').draggable();

});