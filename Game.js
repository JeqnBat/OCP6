/**
 * <b>DESCR:</b><br>
 * The app's main object. 'Game' uses all the other objects
 * Defines player's movements, turns & fights
 *
 * @constructor
 */
class Game {
  init() {
    this.players = []
    this.animation = new Animation()
    this.board = new Board(boardHeight, boardWidth)
    this.board.create()
    this.board.randomPlayer(playerNb, this.players)
    this.board.randomObstacle(obstacleNb)
    this.board.randomWeapon(weaponNb)
    this.gameIsRunning = 0
    this.gameMode = 'Move'
    this.activePlayer = null
    this.board.display()
    this.startGame()
  }

  /**
   * <b>DESCR:</b><br>
   * Sets all the conditions to start a new game
   *
   */
  startGame() {
    this.activePlayer = this.players[0]
    this.activePlayerIndex = 0
    this.gameIsRunning = 1
    this.firstTurn = true
    this.playerTurn()
  }

  /**
   * <b>DESCR:</b><br>
   * Shows on the DOM which player will play next.
   *
   */
  playerTurn() {
    if (this.firstTurn == true) {
      $('#dialog').html(
        `c'est à <span style="color: orange;">${this.activePlayer.name}</span> de jouer`
      )
      this.firstTurn = false
    } else {
      $('#dialog').html(
        `c'est à <span style="color: orange;">${this.activePlayer.name}</span> de jouer`).append(
          '<div class="arrow-down"></div')
    }

    this.animation.playerFadeIn(this.activePlayerIndex)

    if (this.gameMode == 'Move') {
      this.movePlayer()
      return
    }
    if (this.gameMode == 'StartFight') {
      this.animation.letsFight(this.players, this)
      return
    }
    if (this.gameMode == 'Fight') {
      return
    }
  }

  /**
   * <b>DESCR:</b><br>
   * Move player from one tile to another
   * Checks if the tile is accessible
   * Checks if the players tiles touch each other
   *
   */
  movePlayer() {
    let possibleTiles = this.activePlayer.possibleMoves(playerMoves, boardWidth, boardHeight, this.board)
    let classInstance = this
    $('.tile').click(function() {
      let clickedX = $(this).attr("data-pos-x")
      let clickedY = $(this).attr("data-pos-y")
      if (classInstance.activePlayer.matchTest(possibleTiles, clickedX, clickedY) == true) {
        $('.tile').click(function() {
          return false
        })
        let currentPosX = classInstance.activePlayer.posX
        let currentPosY = classInstance.activePlayer.posY
        classInstance.activePlayer.posX = clickedX
        classInstance.activePlayer.posY = clickedY
        classInstance.board.tiles[currentPosX][currentPosY].player = 0
        classInstance.board.tiles[clickedX][clickedY].player = classInstance.activePlayer
        // Weapon swap
        let checkWeapon = classInstance.board.tiles[clickedX][clickedY].weapon
        if (checkWeapon !== 0) {
          classInstance.activePlayer.weaponSwap(classInstance.board, checkWeapon)
        }
        classInstance.board.display()
        classInstance.activePlayer.displayInfos(classInstance.activePlayerIndex)
        // Proximity check
        if (classInstance.activePlayer.checkEnemyPos(classInstance.board) == true) {
          classInstance.gameMode = 'StartFight'
        }
        classInstance.nextPlayer()
      }
    })
  }

  /**
   * <b>DESCR:</b><br>
   * Deals with the fight by using 2 buttons 'attack' & 'defend'
   * & their values.
   * Checks if the game must end after each turn
   *
   */
  fight() {
    let classInstance = this
    $('.hpleft').remove()
    // Attack & Defend
    $('.fightbutton').click(function() {
      $('.fightbutton').click(function() {
        return false
      })
      let target = $(event.target)
      if (target.is('#attack')) {
        classInstance.activePlayer.attack()
        classInstance.nextPlayer()
      } else {
        classInstance.activePlayer.defend()
        classInstance.nextPlayer()
      }
      classInstance.activePlayer.processFight(classInstance.activePlayer, classInstance.activePlayerIndex, classInstance)
      classInstance.checkEndGame(classInstance.activePlayer, classInstance.activePlayer.enemy)
    })
  }

  /**
   * <b>DESCR:</b><br>
   * Makes next player play his turn
   * Uses animations to illustrate the new round
   * Scans for the active player & switches him with the other one
   *
   */
  nextPlayer() {
    this.animation.playerFadeOut(this.activePlayerIndex)

    if (this.gameMode == 'StartFight') {
      this.animation.dialogFadeOut()
    }

    if (this.activePlayerIndex+1 <= this.players.length-1) {
      this.animation.slideRight()
      this.activePlayerIndex++
    } else {
      this.animation.slideLeft()
      this.activePlayerIndex = 0
    }

    this.activePlayer = this.players[this.activePlayerIndex]
    this.playerTurn()
  }

  /**
   * <b>DESCR:</b><br>
   * Checks if one of the player's hp is equal to or below 0
   * Ends the game if it is
   *
   */
  checkEndGame() {
    let winner
    if (this.activePlayer.enemy.hp <= 0) {
      winner = this.activePlayer
      this.gameMode = 'EndGame'
    } else if (this.activePlayer.hp <= 0) {
      winner = this.activePlayer.enemy
      this.gameMode = 'EndGame'
    }

  	if (this.gameMode == 'EndGame') {
      this.animation.endingScreen(winner)
    }
  }

}
