const { authenticateRequestor } = require('./auth');

const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Login required.' });
  } else {
    return next();
  }
};

const validateUserOwnership = (req, res, next) => {
  if (!req.user || req.user.id !== req.params.user_id) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    return next();
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.is_admin) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    return next();
  }
};


module.exports = {
  authenticateRequestor,
  isAuthenticated,
  validateUserOwnership,
  isAdmin
};