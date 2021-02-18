$(document).ready(function () {
  var favorites = JSON.parse(localStorage.getItem('favorites')) || []
  $('.likes-count').text('(' + favorites.length + ')')

  $.ajax({
    url: 'https://api.unsplash.com/photos/random?count=30&orientation=squarish&client_id=kfKv2eE4uFO3dEnB4lw7PlWZg6sZVc70qTbRRGDAfnU',
    method: 'GET',
    dataType: 'JSON',
    success: function (data) {
      for (var i = 0; i < data.length; i++) {
        $('.box img').eq(i).attr('src', data[i].urls.thumb)
      }
    }
  })

  $('.times').click(function () {
    $(this).parent().parent().fadeOut();
  })

  $('.check').click(function () {
    var _src = $(this).parent().prev().attr('src');
    favorites.push(_src)
    localStorage.setItem('favorites', JSON.stringify(favorites))

    $('.likes-count').text('(' + favorites.length + ')')
    $(this).parent().parent().fadeOut();
  })

  $('.likes-container-body').on('click', '.delete-img', function () {
    var src = $(this).prev().attr('src');
    var ind = favorites.indexOf(src);
    favorites.splice(ind, 1)
    localStorage.setItem('favorites', JSON.stringify(favorites));
    $('.likes-count').text('(' + favorites.length + ')')
    $(this).parent().fadeOut(500);
    if (favorites.length == 0) {
      $('.likes-container, .backdrop').fadeOut(500);
    }
  })

  $('.myButton').click(function () {
    if (favorites.length > 0) {
      $('.likes-container-body').html('')
      for (var i = 0; i < favorites.length; i++) {
        $('.likes-container-body').append('<div class="likes-img"><img src="' + favorites[i] + '"/><i class="fas fa-times delete-img"></i></div>')
      }
      $('.likes-container, .backdrop').show();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Lütfen favori fotoğrafınızı seçin',
      })
    }
  })
  $("body").keydown(function (e) {
    if (e.keyCode == 27) {
      $('.likes-container, .backdrop').fadeOut(400);
    }
  });

  $('.likes-container i').click(function () {
    $('.likes-container, .backdrop').fadeOut(400);
  })
  $('.backdrop').click(function () {
    $('.likes-container').hide();
    $(this).hide();
  })
})