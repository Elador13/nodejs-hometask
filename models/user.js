exports.user = {
    id: {absent: true},
    firstName: {required: true},
    lastName: {required: true},
    email: {required: true, regexp: /(\W|^)[\w.+\-]*@gmail\.com(\W|$)/ig},
    phoneNumber: {required: true, regexp: /^(?:\+38)?(0\d{9})$/},
    password: {required: true, min: 3} // min 3 symbols
}
