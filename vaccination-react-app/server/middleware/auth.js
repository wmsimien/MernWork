const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ errorMessage: 'Unauthorized' });
    }

    // validate token
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log('auth err: ', err);
        return res.status(403).json({ message: 'Forbidden' });
      }

      // set as current logged in client; allowed for later access
      req.user = decoded.username;
      req.roles = decoded.roles;

      console.log('auth: verified token', req.user, req.roles);
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ errorMessage: 'Unauthorized' });
  }

  next(); // call next in middleware line or move onto ontroller
};

module.exports = auth;
