const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../secrets').jwtSecret;
const u = require('../users/users-model');

router.post('/api/register', (req, res) => {
let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
user.password = hash;

u.add(user)
    .then(saved => {res.status(201).json(saved);})
    .catch(error => {console.log(error); res.status(500).json(error);});
});

router.post('/api/login', (req, res) => {
let { username, password } = req.body;
u.findBy({ username })
    .first()
    .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({message: `Welcome ${user.username}!`,token,});
    } else {
        res.status(401).json({ message: 'Invalid Credentials' });
    }
    })
    .catch(error => {res.status(500).json(error);});
});

function generateToken(user) {
const payload = {
    subject: user.id,
    username: user.username,
    roles: ['student', 'ta'],
};
const options = {
    expiresIn: '1d',
};
return jwt.sign(payload, secret, options); 
}

module.exports = router;