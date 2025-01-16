const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username: username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (await bcrypt.compare(password, user.password)) {
            // Generate a new JWT token
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: 'Login successful', token, user });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function checkToken(req, res) {
    try {
        const { token } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).json({ message: 'Token is expired' });
        }
        return res.status(200).json({ message: 'Token is valid' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    login,
    checkToken
}