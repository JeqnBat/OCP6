/**
 * <b>DESCR:</b><br>
 * The game board composed of 'tile' objects
 *
 * @constructor
 *
 * @param {height} number the number of tiles for the y axis
 * @param {width} number the number of tiles for the x axis
 */
class Board {
  constructor(height, width) {
    this.height = height
    this.width = width
    this.tiles = []

    $('#boardcontainer').addClass('fadeIn')
  }

  /**
   * <b>DESCR:</b><br>
   * Creates all the tiles that will compose the board
   *
   */
  create() {
    for (let x = 0;  x < this.height;  x++) {
      this.tiles[x] = []
      for (let y = 0;  y < this.width;  y++) {
        this.tiles[x][y] = new Tile(x,y)
      }
    }
  }

  /**
   * <b>DESCR:</b><br>
   * Uses the previous array to display tiles on the DOM
   * creating one DIV per tile
   */
  display() {
    $('#boardcontainer').html('')
    for (let i = 0;  i < this.height;  i++) {
      for (let j = 0;  j < this.width;  j++) {
        $('#boardcontainer')[0].appendChild(this.tiles[i][j].displayTile())
      }
    }
  }

  /**
   * <b>DESCR:</b><br>
   * Generates obstacles and put them on empty tiles
   *
   * @param {obstacleNb} number the number of obstacles to create
   */
  randomObstacle(obstacleNb) {
    let i = 0
    while (i < obstacleNb) {
      let x = Math.floor(Math.random() * this.height)
      let y = Math.floor(Math.random() * this.width)
      if (this.tiles[x][y].isEmpty()) {
        let obstacle = obstacles[Math.floor(Math.random() * obstacles.length)]
        this.tiles[x][y].obstacle = obstacle
        i++
      } else {
      }
    }
  }

  /**
   * <b>DESCR:</b><br>
   * Generates weapons and put them on empty tiles
   *
   * @param {weaponNb} number the number of weapons to create
   */
  randomWeapon(weaponNb) {
    let i = 0
    while (i < weaponNb) {
      let x = Math.floor(Math.random() * this.height)
      let y = Math.floor(Math.random() * this.width)
      if (this.tiles[x][y].isEmpty()) {
        let defaultWeapons = weapons.slice(1, 5)  // 'fist' is base weapon, not pickable weapon
        let weapon = defaultWeapons[Math.floor(Math.random() * defaultWeapons.length)]
        this.tiles[x][y].weapon = new Weapon(weapon.name, weapon.dmg, weapon.icon)
        i++
      } else {
      }
    }
  }

  /**
   * <b>DESCR:</b><br>
   * Generates players and put them on empty tiles
   *
   * @param {playerNb} number the number of players to create
   * @param {gamePlayers} array the players of that game's instance
   */
  randomPlayer(playerNb, gamePlayers) {
    let i = 0
    let charactersCopy = characters
    while (i < playerNb) {
      let x = Math.floor(Math.random() * this.height)
      let y = Math.floor(Math.random() * this.width)
      this.spawnCheck = () => {
          if (x - 1 >= 0 && this.tiles[x-1][y].player !== 0) {
            return true
          }
          if (x + 1 < this.height && this.tiles[x+1][y].player !== 0) {
            return true
          }
          if (y - 1 >= 0 && this.tiles[x][y-1].player !== 0) {
            return true
          }
          if (y + 1 < this.width && this.tiles[x][y+1].player !== 0) {
            return true
          }
          return false
        }
      if (this.tiles[x][y].isEmpty() && this.spawnCheck() == false) {
        let characterIndex = Math.floor(Math.random() * charactersCopy.length)
        let player = charactersCopy[characterIndex]
        charactersCopy.splice(characterIndex, 1)
        player.weapon = new Weapon(weapons[0].name, weapons[0].dmg, weapons[0].icon)
        this.tiles[x][y].player = new Player(player.name, player.hp, player.img, player.gif, player.portrait, player.weapon, player.status, x, y )
        gamePlayers.push(this.tiles[x][y].player)
        this.tiles[x][y].player.displayInfos(i)
        i++
      } else {
      }
    }
  }

}
