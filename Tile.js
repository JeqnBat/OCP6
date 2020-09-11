/**
 * <b>DESCR:</b><br>
 * All instances of 'tile' build the game's board
 * A tile can be either empty or occupied by a player
 * an obstacle or a weapon
 * Each tile can be located and identified by a set
 * of X & Y coordinates
 *
 * @constructor
 *
 * @param {posX} string the X coordinate of the tile
 * @param {posY} string the Y coordinate of the tile
 */
class Tile {
  constructor(posX, posY) {
    this.posX = posX
    this.posY = posY
    this.className = 'tile'
    this.obstacle = 0
    this.weapon = 0
    this.player = 0
  }

  /**
   * <b>DESCR:</b><br>
   * Checks if the tile is empty by looking at its
   * player & obstacle properties value
   *
   * @returns {boolean} yes tile is empty || no it is not
   */
  isEmpty() {
    if (this.player == 0 && this.obstacle == 0) {
      return true
    }
    return false
  }

  /**
   * <b>DESCR:</b><br>
   * Displays tile on the DOM by creating a DIV
   * Fills in the DIV accoring to the tile's properties
   * values
   *
   * @returns {object} returns the DIV element with its css
   */
  displayTile() {
    let tile = document.createElement('div')
    tile.className = this.className
    if (this.obstacle != 0) {
      tile.style.backgroundImage = `url("${this.obstacle}")`
      tile.style.backgroundRepeat = "no-repeat"
      tile.style.backgroundSize = "cover"
    }
    if (this.weapon != 0) {
      tile.style.backgroundImage = `url("${this.weapon.icon}")`
      tile.style.backgroundRepeat = "no-repeat"
      tile.style.backgroundSize = "cover"
    }
    if (this.player != 0) {
      tile.style.backgroundImage = `url("${this.player.img}")`
      tile.style.backgroundRepeat = "no-repeat"
      tile.style.backgroundSize = "cover"
      $(tile).html(
        `<img src="${this.player.weapon.icon}" class="thumbnail rounded">`
      )
    }
    tile.dataset.posX = this.posX
    tile.dataset.posY = this.posY
    return tile
  }

}
