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

    delete(userId) {
        //TODO: check if user exist
        const deletedId = UserRepository.delete(userId)
        return deletedId
    }
}

module.exports = new UserService();
