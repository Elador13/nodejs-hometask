const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
  search(search) {
    const item = FighterRepository.getOne(search);
    if(!item) {
      return null;
    }
    return item;
  }

  getAll() {
    const fighters = FighterRepository.getAll()
    if (!fighters.length) {
      return null
    }
    return fighters;
  }

  create(fighterData) {
    const createdFighter = FighterRepository.create(fighterData)
    return createdFighter
  }

  update(fighterId, data) {
    const updatedFighter = FighterRepository.update(fighterId, data)
    return updatedFighter
  }

  delete(fighterId) {
    const deletedId = FighterRepository.delete(fighterId)
    if (!deletedId.length) {
      return null
    }
    return deletedId;
  }
}

module.exports = new FighterService();
