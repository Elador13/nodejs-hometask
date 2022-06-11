const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }

    getAll() {
        const users = UserRepository.getAll()
        if (!users.length) {
            return null
        }
        return users;
    }

    create(userData) {
        const createdUser = UserRepository.create(userData)
        return createdUser
    }

    update(userId, data) {
        const updatedUser = UserRepository.update(userId, data)
        return updatedUser
    }

    delete(userId) {
        const deletedId = UserRepository.delete(userId)
        if (!deletedId.length) {
            return null
        }
        return deletedId;
    }
}

module.exports = new UserService();
