exports.user = {
    id: '',
    firstName: {type: 'string', required: true},
    lastName: {type: 'string', required: true},
    email: {type: 'string', required: true, regexp: /^[a-z0-9](\.?[a-z0-9])+@g(oogle)?mail\.com$/},
    phoneNumber: {type: 'string', required: true, regexp: /^(?:\+38)?(0\d{9})$/},
    password: {type: 'string', required: true, min: 3} // min 3 symbols
}
