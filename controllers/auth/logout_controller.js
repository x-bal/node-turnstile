const jwt = require('jsonwebtoken');

async function logout(req, res) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        await jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }   
}

module.exports = logout;