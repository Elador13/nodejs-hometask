exports.fighter = {
    id: '',
    name: {required: true},
    health: {type: 'number', min: 80, max: 120, default: 100},
    power: {type: 'number', required: true, min: 1, max: 100},
    defense: {type: 'number', required: true, min: 1, max: 10},
}
