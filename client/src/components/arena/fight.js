import {controls} from './controls';

export async function fight(firstFighter, secondFighter) {
  console.log(firstFighter)
  console.log(secondFighter)
  return new Promise((resolve) => {
    firstFighter.maxHealth = firstFighter.health
    secondFighter.maxHealth = secondFighter.health

    firstFighter.attack = firstFighter.power / 8
    secondFighter.attack = secondFighter.power / 8

    firstFighter.healthBar = document.querySelector('#left-fighter-indicator')
    secondFighter.healthBar = document.querySelector('#right-fighter-indicator')

    firstFighter.canCritical = true
    secondFighter.canCritical = true

    function decreaseHealth(fighter, damage) {
      if (fighter.health <= damage) {
        fighter.health = 0
        fighter.healthBar.style.width = '0px'
        resolve(firstFighter.name === fighter.name ? secondFighter : firstFighter)
      }
      fighter.health = fighter.health - damage
      fighter.healthBar.style.width = `${100 * fighter.health / fighter.maxHealth}%`;
    }

    const checkControl = (event) => {
      // eslint-disable-next-line default-case
      switch (event.code) {
        case controls.PlayerOneAttack:
          if (!firstFighter.block && !secondFighter.block) {
            decreaseHealth(secondFighter, getDamage(firstFighter, secondFighter))
          }
          break
        case controls.PlayerTwoAttack:
          if (!secondFighter.block && !firstFighter.block) {
            decreaseHealth(firstFighter, getDamage(secondFighter, firstFighter))
          }
          break
      }
    }

    //Block
    document.addEventListener('keydown', event => {
      if (event.repeat) return null
      if (event.code === controls.PlayerOneBlock) {
        firstFighter.block = true
      } else if (event.code === controls.PlayerTwoBlock) {
        secondFighter.block = true
      }
    })
    document.addEventListener('keyup', event => {
      if (event.repeat) return null
      if (event.code === controls.PlayerOneBlock) {
        firstFighter.block = false
      }
      if (event.code === controls.PlayerTwoBlock) {
        secondFighter.block = false
      }
    })

    //Combo
    let comboFirst = 0
    let comboSecond = 0
    document.addEventListener('keydown', event => {
      if (event.repeat) return null
      if (controls.PlayerOneCriticalHitCombination.some((key) => key === event.code)) {
        comboFirst++
      } else if (controls.PlayerTwoCriticalHitCombination.some((key) => key === event.code)) {
        comboSecond++
      }
      if (comboFirst === 3 && firstFighter.canCritical) {
        let damage = 2 * firstFighter.attack
        firstFighter.canCritical = false
        decreaseHealth(secondFighter, damage)
        setTimeout(() => firstFighter.canCritical = true, 10000)
      } else if (comboSecond === 3 && secondFighter.canCritical) {
        let damage = 2 * secondFighter.attack
        secondFighter.canCritical = false
        decreaseHealth(firstFighter, damage)
        setTimeout(() => secondFighter.canCritical = true, 10000)
      }
    })
    document.addEventListener('keyup', event => {
      if (event.repeat) return null
      if (controls.PlayerOneCriticalHitCombination.some((key) => key === event.code)) {
        comboFirst = 0
      } else if (controls.PlayerTwoCriticalHitCombination.some((key) => key === event.code)) {
        comboSecond = 0
      }
    })

    document.addEventListener('keyup', ev => {
      checkControl(ev)
    })
  });
}

export function getDamage(attacker, defender) {
  let attack = getHitPower(attacker)
  let block = getBlockPower(defender)
  let damage = (attack < block) ? 0 : (attack - block);
  return damage
}

export function getHitPower(fighter) {
  let criticalHitChance = Math.random() * (2 - 1) + 1
  return fighter.attack * criticalHitChance
}

export function getBlockPower(fighter) {
  let dodgeChance = Math.random() * (2 - 1) + 1
  return fighter.defense * dodgeChance
}
