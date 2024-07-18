const Client = require('../models/Client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Login
 * POST
 * localhost:9000/api/auth
 */
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: 'Username and password is required.' });

  const foundClient = await Client.findOne({ username }).exec();
  console.log('foundClient: ', foundClient);
  if (!foundClient || !foundClient.active) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // compare the password sent w/ request against password of the existingUser (found user)
  const match = await bcrypt.compare(password, foundClient.password);

  if (!match) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // create JWTs; accessToken stored in memory on the frontend
  const accessToken = jwt.sign(
    {
      ClientInfo: {
        username: foundClient.username,
        roles: foundClient.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '15m',
    }
  );

  const refreshToken = jwt.sign(
    { username: foundClient.username, roles: foundClient.roles },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '1d', // should be longer that access token
    }
  );

  const id = foundClient._id;

  // saving refreshToken with current user
  foundClient.refreshToken = refreshToken;
  foundClient.save().then((result) => {
    console.log('saved refreshToken w/ client: ', result);
  });

  // create secure cookie with refresh token
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });

  res.json({ id, roles: foundClient.roles, active: foundClient.active });
};

// get refresh token as access token has expired
const refresh = (req, res) => {
  console.log('req: ', req.headers);

  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      console.log('decoded: ', decoded);
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      const foundClient = await Client.findOne({
        username: decoded.username,
      }).exec();

      if (!foundClient) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const accessToken = jwt.sign(
        {
          ClientInfo: {
            username: foundClient.username,
            roles: foundClient.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '30s',
        }
      );

      res.json({ accessToken });
    }
  );
};

// logout; clear cookie, if exist
const logout = async (req, res) => {
  const cookies = req.cookies;
  console.log('logout clear cookie:', cookies);

  if (!cookies?.jwt) {
    return res.sendStatus(204); // set status and sent to client - no content
  }

  const refreshToken = cookies.jwt;

  // check if refresh token is in db
  // const foundClient = await Client.findOne({
  //   refreshToken,
  // }).exec();

  console.log('logout clear - cookie:', cookies.jwt);
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });
  //return res.sendStatus(204); // set status and sent to client - no content

  // removed refresh token in db
  const updatedClient = await Client.findOneAndUpdate(
    { refreshToken },
    {
      $set: {
        refreshToken: '',
      },
    }
  );
  res.json({ message: 'Cookie cleared.' });
};

//
const loggedIn = (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.json(false);
    }

    // validate token
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.json(false);
      }
    });

    res.send(true);
  } catch (error) {
    res.json(false);
  }
};

module.exports = {
  login,
  refresh,
  logout,
  loggedIn,
};
