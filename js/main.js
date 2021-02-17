$(document).ready(function(){
  var favorites = JSON.parse(localStorage.getItem('favorites')) || []
  $('.likes-count').text('('+ favorites.length +')')
  

  $.ajax({
    url: 'https://api.unsplash.com/photos/random?count=30&orientation=squarish&client_id=kfKv2eE4uFO3dEnB4lw7PlWZg6sZVc70qTbRRGDAfnU',
    method: 'GET',
    dataType: 'JSON',
    success: function(data){
      for(var i = 0; i<data.length; i++){
        $('.box img').eq(i).attr('src',data[i].urls.thumb)
      }
    }
  })
  $('.times').click(function(){
    $(this).parent().parent().fadeOut();
  })
  $('.check').click(function(){
    var _src = $(this).parent().prev().attr('src');
    favorites.push(_src)
    localStorage.setItem('favorites', JSON.stringify(favorites))

    $('.likes-count').text('('+ favorites.length +')')
    $(this).parent().parent().fadeOut();
  })
})