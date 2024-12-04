const jwt = require('jsonwebtoken');

const setToken = (payload) =>{
    const token = jwt.sign(payload,process.env.JWT_SECRET_KEY);
    return token
}

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };


module.exports = {setToken,verifyToken}