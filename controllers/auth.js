const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({ email: req.body.email })
    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            // generate token, password matched
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, { expiresIn: 60 * 60 })
            res.status(200).json({
                message: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: 'password not matched'
            })
        }
    } else {
        res.status(404).json({
            message: 'User not found'
        })
    }
}

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({ email: req.body.email })

    if (candidate) {
        // if user exist, send the error
        res.status(409).json({
            message: 'This email already exist. Try again'
        })
    } else {
        // need create user
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            // handle the error
        }
    }
}