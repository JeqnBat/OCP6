/**
 * <b>DESCR:</b><br>
 * The Weapon class.
 *
 * @param {name} string the weapon's name
 * @param {dmg} number the weapon's power
 * @param {icon} string link to the weapon's icon file
 */
class Weapon {
  constructor(name, dmg, icon) {
    this.name = name
    this.dmg = dmg
    this.icon = icon
  }
}
