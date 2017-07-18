const db = require('../config/config');
const bcrypt = require('bcryptjs');

// EMPTY USER OBJECT
const User = {};

// FIND USER BY USERNAME
User.findByUserName = userName => {
    return db.oneOrNone('SELECT * FROM users WHERE username = $1', userName);
}

// FIND USER BY ID
User.findById = (id, callback) => {
    return db.oneOrNone('SELECT * FROM users WHERE id = $1', id).then(user => { callback(null, user); });
}

// CREATE A USER
User.create = user => {
    return db.one(
    `
        INSERT INTO users
        (username, password, email)
        VALUES ($1, $2, $3) RETURNING *
    `
    ,[user.username, user.password, user.email])
}

// ADD A USER
// USE BCRYPT TO ENCRYPT PASSWORD
User.addUser = newUser => {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newUser.password, salt);

    return User.create({
        username: newUser.username,
        password: hash,
        email: newUser.email
    });
}

// COMPARE PASSWORD WHEN LOGGING IN
User.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}

// VALIDATE EMAIL USING REGEX
User.validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = User;