import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class AuthHandler {
  static async generateAuthToken(req, res) {
    const {
      userId,
      userName,
      userEmail,
      userStatus,
    } = req;

    const token = jwt.sign({
      userId,
      userName,
      userEmail,
      userStatus,
    }, process.env.JWT_SECRET);

    res.status(200).json({
      status: 'success',
      message: 'user logged in successfully',
      auth_token: token,
    });
  }

  static authenticate(req, res, next) {
    const token = req.header('x-auth');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      req.userName = decoded.userName;
      req.userEmail = decoded.userEmail;
      req.userStatus = decoded.userStatus;
      return next();
    } catch (error) {
      return res.status(401).json({
        status: 'error',
        message: 'you must be logged in to use this route',
      });
    }
  }

  static authenticateAdmin(req, res, next) {
    if (req.userStatus !== 'admin') {
      return res.status(401).json({
        status: 'error',
        message: 'only admins can use this route',
      });
    }

    return next();
  }
}

export default AuthHandler;
