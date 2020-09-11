$(function() {

  $('#main').css('display', 'none')

  let game = new Game()
  $('#start').click(function() {
    $('#start').remove()
    $('#logo').remove()
    $('<div id="dialog"></div>').insertBefore($('#main'))
    $('#dialog').addClass('slideFT')
    $('#main').css('display', '')
    game.init()
  })

})
