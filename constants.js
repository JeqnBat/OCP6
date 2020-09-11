/**
 * <b>DESCR:</><br>
 * Stores all the constants of the game :
 * Board height & length, obstacle number,
 * player number, etc.
 */
const boardWidth = 10
const boardHeight = 7
const obstacleNb = 5
const weaponNb = 4
const playerNb = 2
const playerMoves = 3

const obstacles = [
  'img/obstacles/mur.jpg',
  'img/obstacles/dumpster.jpg',
]

const weapons = [
  {"name": "poing", "dmg": 10, "icon": "img/weapons/fist.png"},
  {"name": "mitraillette", "dmg" : 20, "icon": "img/weapons/machinegun.png"},
  {"name": "fusil à pompe", "dmg": 25, "icon": "img/weapons/shotgun.png"},
  {"name": "lance roquette", "dmg": 30, "icon": "img/weapons/rocketlauncher.png"},
  {"name": "railgun", "dmg": 40, "icon": "img/weapons/railgun.png"},
]

const characters = [
  {"name": "Axel", "hp": 100, "img": "img/players/Axel.png", "gif": "img/players/Axel.gif", "portrait": "img/players/Axel.jpg"},
  {"name": "Adam", "hp": 100, "img": "img/players/Adam.png", "gif": "img/players/Adam.gif", "portrait": "img/players/Adam.jpg"},
  {"name": "Blaze", "hp": 100, "img": "img/players/Blaze.png", "gif": "img/players/Blaze.gif", "portrait": "img/players/Blaze.jpg"},
]
