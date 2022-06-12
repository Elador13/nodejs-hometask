const { FightRepository } = require('../repositories/fightRepository');
const {UserRepository} = require("../repositories/userRepository");

class FightersService {
  getAll() {
    const fights = FightRepository.getAll()
    if (!fights.length) {
      return null
    }
    return fights;
  }

  create(fightData) {
    const createdFight = FightRepository.create(fightData)
    return createdFight
  }
}

module.exports = new FightersService();
