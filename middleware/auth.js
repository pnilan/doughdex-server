require('dotenv').config();
const { initializeApp } = require('firebase-admin/app');
const firebase = initializeApp();
const { getAuth } = require('firebase-admin/auth');
const db = require('../db');

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized'});
    }
    const token = authHeader.split(' ')[1];

    const decodedToken = await getAuth(firebase).verifyIdToken(token);

    const userQuery = {
      'text': 'SELECT * FROM users WHERE uid = $1',
      'values': [decodedToken.uid],
    };

    const userResult = db.query(userQuery);
    const user = userResult.rows[0];

    if (!user) {
      res.status(401).json({ message: 'Unauthorized'});
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { authenticateUser };