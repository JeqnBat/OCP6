/**
 * <b>DESCR:</b><br>
 * Deals with all the DOM animations & manipulations
 *
 * @constructor
 */
class Animation {
  constructor() {
    // "Fight !"
    const fightSound = new Audio("sounds/fight.wav")
  }

  /**
   * <b>DESCR:</b><br>
   * #1 slides to the left
   */
  slideLeft() {
    $('#dialog').animate({left: '-40vw'}, 380)
  }
  /**
   * <b>DESCR:</b><br>
   * #2 slides to the right
   */
  slideRight() {
    $('#dialog').animate({left: '40vw'}, 380)
  }
  /**
   * <b>DESCR:</b><br>
   * #3 selects a player's DIV & makes it fade out
   */
  playerFadeOut(activePlayerIndex) {
    $('#player' + activePlayerIndex).fadeTo(400, 0.2)
  }
  /**
   * <b>DESCR:</b><br>
   * #4 selects a player's DIV & makes it fade in
   */
  playerFadeIn(activePlayerIndex) {
    $('#player' + activePlayerIndex).fadeTo(400, 1)
  }
  /**
   * <b>DESCR:</b><br>
   * #5 selects the dialog box's DIV & makes it fade out
   */
  dialogFadeOut() {
    $('#dialog').fadeOut()
  }

  /**
   * <b>DESCR:</b><br>
   * Transitions from main board phase 1 to main board phase 2
   * with a countdown
   *
   * @param {object} players instance of 'players'
   * @param {object} game instance of 'game'
   */
  letsFight(players, game) {
    $('#main').fadeOut()
    $('#boardcontainer').remove()
    $('<div id="fightcontainer"></div>').insertAfter($('#player0'))
    $('.sidebar').removeClass('slideFL slideFR').fadeTo(100, 1)
    // Ready ?
    setTimeout(() => {
      $('body').prepend($('<div id="TTF" class="slideFT"><h3>Ready ?</h3></div>'))
    }, 350)
    // Fight !
    setTimeout(() => {
      $('#TTF').remove()
      $('body').prepend($('<div id="TTF" class="woweffect"><h1 style="color:red ">FIGHT !</h1></div>'))
      // fightSound.play()
    }, 1600)
    setTimeout(() => {
      $('body').fadeOut()
    }, 2000)
    setTimeout(() => {
      $('#TTF').remove()
      $('body').css('background', 'url("img/bg/bg.jpg") repeat-x, radial-gradient(circle, #a82020, #100000)').css(
      'background-blend-mode', 'multiply').css('background-position', 'center')
      $('#fightcontainer').append($(`<div class="square"><img src="${players[0].gif}" name="${players[0].name}"></div>`))
      $('#fightcontainer').append($('<div id="buttons" class="square"></div>'))
      $('#fightcontainer').append($(`<div class="square"><img src="${players[1].gif}" name="${players[1].name}" class="mirrored"></div>`))
      $('#buttons').append($(
        `<input type="button" value="attaquer" id="attack" class="fightbutton btn btn-outline-warning">
         <input type="button" value="défendre" id="defend" class="fightbutton btn btn-outline-warning">`
      ))
      $('#main').fadeIn()
      $('#dialog').fadeIn()
      $('body').fadeIn()
      game.gameMode = 'Fight'
      game.fight()
    }, 2300)
  }

  /**
   * <b>DESCR:</b><br>
   * Transitions from fighting board to ending screen
   *
   * @param {object} winner the winner's object w/ all its properties
   */
  endingScreen(winner) {
    $('body').fadeOut(400)
    $('body').html('')
    setTimeout(() => {
      $('body').css('background', '#000914')
      $('body').append($('<div id="gameover"><h1 class="gameovertext">GAME OVER</h1></div>'))
      $('.gameovertext').fadeOut()
      $('#gameover').append($('<div id="gameoverleft"></div>'))
      $('#gameoverleft').fadeTo(100, 0)
      $('#gameoverleft').css(
      'background', '#071e42').css(
      'background-image', `url("${winner.portrait}")`).css(
      'background-blend-mode', 'luminosity').css('background-position', 'center top').css(
      'background-repeat', 'no-repeat').css('background-size', 'cover')
      $('#gameover').append($(
        `<div id="gameoverright">
         <br>
         <h2><span style="color: orange ">${winner.name}</span> l\'emporte avec <span style="color: orange "> ${winner.hp}
         </span> points de vie restants !</div>`
       ))
      $('#gameoverright').addClass('slowslide')
      $('<a href="index.html"><div id="playagain" class="blink">Lancer une nouvelle partie</div></a>').insertAfter($('#gameover'))
      $('#playagain').fadeOut()
    }, 400)
    setTimeout(() => {
      $('body').fadeIn()
    }, 700)
    setTimeout(() => {
      $('#gameoverleft').fadeTo(800, 1)
    }, 1500)
    setTimeout(() => {
      $('.gameovertext').fadeIn()
      $('#gameoverleft').addClass('growingportrait')
    }, 2000)
    setTimeout(() => {
      $('#playagain').fadeIn()
    }, 4000)
  }

}
