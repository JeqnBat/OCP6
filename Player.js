/**
 * <b>DESCR:</b><br>
 * Player class
 *
 * @constructor
 *
 * @param {name} string player's name
 * @param {hp} number player's hit points
 * @param {img} string link to player's miniature portrait
 * @param {gif} string link to player's animated gif
 * @param {portrait} string link to player's big background portrait
 * @param {weapon} object the weapon held by the players w/ all its properties
 * @param {status} string 'attack' or 'defend'
 * @param {posX} string vertical coordinate
 * @param {posY} string horizontal coordinate
 */
class Player {
  constructor(name, hp, img, gif, portrait, weapon, status, posX, posY) {
    this.name = name
    this.hp = hp
    this.img = img
    this.gif = gif
    this.portrait = portrait
    this.weapon = weapon
    this.status = null
    this.posX = posX
    this.posY = posY
  }

  /**
   * <b>DESCR:</b><br>
   * Calculates all the possible moves from the player's position
   * Stores the results in one array called 'possibleTiles'
   *
   * @param {playerMoves} number how many tiles the player can access at once
   * @param {boardWidth} number the board's width
   * @param {boardHeight} number the board's height
   * @param {board} object the 'board' object w/ all its properties
   * @returns {array} the coordinates of all the tiles accessible from that position
   */
  possibleMoves(playerMoves, boardWidth, boardHeight, board) {
    let playerPosX = parseInt(this.posX)
    let playerPosY = parseInt(this.posY)
    let possibleTiles = []
    // Check right
    for (let i = 1; i <= playerMoves; i++) {
      if (playerPosY + i > boardWidth -1 || board.tiles[playerPosX][playerPosY + i].isEmpty() == false) {
        break
      }
      $(`[data-pos-x="${playerPosX}"][data-pos-y="${(playerPosY+i)}"]`).addClass("lightpath")
      possibleTiles.push(board.tiles[playerPosX][playerPosY + i])
    }
    // Check left
    for (let i = 1; i <= playerMoves; i++) {
      if (playerPosY - i < 0 || board.tiles[playerPosX][playerPosY - i].isEmpty() == false) {
        break
     }
     $(`[data-pos-x="${playerPosX}"][data-pos-y="${(playerPosY-i)}"]`).addClass("lightpath")
     possibleTiles.push(board.tiles[playerPosX][playerPosY - i])
    }
    // Check top
    for (let i = 1; i <= playerMoves; i++) {
      if (playerPosX - i < 0 || board.tiles[playerPosX - i][playerPosY].isEmpty() == false) {
       break
      }
     $(`[data-pos-x="${(playerPosX-i)}"][data-pos-y="${playerPosY}"]`).addClass("lightpath")
     possibleTiles.push(board.tiles[playerPosX - i][playerPosY])
    }
    // Check bottom
    for (let i = 1; i <= playerMoves; i++) {
     if (playerPosX + i > boardHeight - 1 || board.tiles[playerPosX + i][playerPosY].isEmpty() == false) {
       break
     }
     $(`[data-pos-x="${(playerPosX+i)}"][data-pos-y="${playerPosY}"]`).addClass("lightpath")
     possibleTiles.push(board.tiles[playerPosX + i][playerPosY])
    }
    return possibleTiles
  }

  /**
   * <b>DESCR:</b><br>
   * Checks if the move is authorized by comparing
   * the coordinates of all the tile stored in 'possibleMoves'
   * w/ the coordinates of the tile on which the player has clicked
   *
   * @param {possibleTiles} array all tiles accessible from the player's position
   * @param {clickedX} string the X coordinate of the tile on which player has clicked
   * @param {clickedY} string the Y coordinate of the tile on which player has clicked
   * @returns {boolean} Yes, the move is possible || No, it is not possible
   */
  matchTest(possibleTiles, clickedX, clickedY) {
    for (const tile of possibleTiles) {
      if (tile.posX == clickedX && tile.posY == clickedY) {
        return true
      }
    }
    return false
  }

  /**
   * <b>DESCR:</b><br>
   * 1. Empties the tile on which the player stands
   * 2. Unloads the player's current weapon on that tile
   * 3. Empties the player's current weapon
   * 4. Loads the new weapon onto the player
   *
   * @param {board} object the current board w/ all its tiles
   * @param {newWeapon} object the new weapon object w/ all its properties
   */
  weaponSwap(board, newWeapon) {
    let playerPosX = parseInt(this.posX)
    let playerPosY = parseInt(this.posY)
    board.tiles[playerPosX][playerPosY].weapon = 0
    board.tiles[playerPosX][playerPosY].weapon = this.weapon
    this.weapon = 0
    this.weapon = newWeapon
  }

  /**
   * <b>DESCR:</b><br>
   * Checks if the enemy stands on a nearby tile
   * returns true if he does, else returns false
   *
   * @param {board} object the current board w/ all its tiles
   * @returns {boolean} Yes the enemy stands on a nearby tile || No he doesn't
   */
  checkEnemyPos(board) {
    let playerPosX = parseInt(this.posX)
    let playerPosY = parseInt(this.posY)
      // X - 1
      if (playerPosX - 1 >= 0 && board.tiles[playerPosX-1][playerPosY].player !== 0) {
        return true
      }
      // X + 1
      if (playerPosX + 1 < boardHeight && board.tiles[playerPosX+1][playerPosY].player !== 0) {
        return true
      }
      // Y - 1
      if (playerPosY - 1 >= 0 && board.tiles[playerPosX][playerPosY-1].player !== 0) {
        return true
      }
      // Y + 1
      if (playerPosY + 1 < boardWidth && board.tiles[playerPosX][playerPosY+1].player !== 0) {
        return true
      }
      return false
    }

    /**
     * <b>DESCR:</b><br>
     * Displays player's properties on the DOM using a dedicated DIV
     *
     * @param {playerIndex} string the player's number in the array
     */
   displayInfos(playerIndex) {
    $('#player' + playerIndex).html(
      `<h1>${this.name}</h1>
      <img src="${this.img}" class="img-fluid">
      <br>
      <div class="text">
      <h6>PV :</h6>
      this.hp
      <br><br>
      <h6>ARME :</h6>
      <img class="smallthumbnail" src="${this.weapon.icon}">
      <br>
      ${this.weapon.name}
      <br><br>
      <h6>DMG :</h6>
      ${this.weapon.dmg}
      </div>`
    )
  }

  /**
   * <b>DESCR:</b><br>
   * Two simple methods to switch player's status
   * either to 'attack' or 'defend'
   */
  attack() {
    this.status = 'attack'
  }
  defend() {
    this.status = 'defend'
  }

  /**
   * <b>DESCR:</b><br>
   * Identifies the enemy and then updates the program & the DOM
   * according to the player's choice to either attack or defend
   *
   * @param {activePlayer} object the player currently playing
   * @param {activePlayerIndex} number the active player's index
   * @param {game} object the game's instance
   */
  processFight(activePlayer, activePlayerIndex, game) {
    // Defines enemy
    if (activePlayerIndex+1 <= game.players.length-1) {
      this.enemy = game.players[activePlayerIndex+1]
      this.enemyIndex = activePlayerIndex+1
    } else {
      this.enemy = game.players[0]
      this.enemyIndex = 0
    }
    // Fight equations
    if (activePlayer.status != null && this.enemy.status != null) {
      if (this.enemy.status == 'defend' && activePlayer.status == 'attack') {
        this.enemy.hp -= (activePlayer.weapon.dmg/2)
        $(`<div class="hpleft">-${activePlayer.weapon.dmg/2} PV</div>`).insertBefore($(`img[name="${this.enemy.name}"]`))
        this.enemy.displayInfos(this.enemyIndex)
      } else if (this.enemy.status == 'attack' && activePlayer.status == 'attack') {
        this.enemy.hp -= activePlayer.weapon.dmg
        $(`<div class="hpleft">-${activePlayer.weapon.dmg} PV</div>`).insertBefore($(`img[name="${this.enemy.name}"]`))
        this.enemy.displayInfos(this.enemyIndex)
      } else if (this.enemy.status == 'defend' && activePlayer.status == 'defend') {
        this.enemy.displayInfos(this.enemyIndex)
      }
    }
  }

}
