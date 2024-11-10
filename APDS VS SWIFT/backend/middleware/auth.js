const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

module.exports = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    (req, res, next) => {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const token = authHeader.split(' ')[1];

      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;

        if (roles.length && !roles.includes(req.user.role)) {
          return res.status(403).json({ error: 'Forbidden' });
        }

        next();
      } catch (err) {
        console.error('JWT verification failed:', err);
        return res.status(401).json({ error: 'Unauthorized' });
      }
    },
  ];
};
