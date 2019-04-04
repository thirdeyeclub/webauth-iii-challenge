const router = require('express').Router();
const u = require('./users-model');

router.get('/', withRole('staff'), (req, res) => {
u.find()
    .then(users => {
    res.json(users);
    })
    .catch(err => res.send(err));
});

function withRole(role) {
return function(req, res, next) {
    if (req.decodedJwt && req.decodedJwt.roles && req.decodedJwt.roles.includes(role)) {
    next();
    } else {
    res.status(403).json({ message: 'FORBIDDEN' });
    }
};
}

module.exports = router;