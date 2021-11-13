'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js')

module.exports = async (req, res, next) => {
  // const basic = req.headers.authorization.split(' ')[1];
  if (!req.headers.authorization) { return _authError(); }
  let basic = req.headers.authorization.split(' ').pop();
  
  // let basic = req.headers.authorization;
  let [username, pass] = base64.decode(basic).split(':');
  // console.log(  await users.authenticateBasic(username, pass))
  try {
    
    req.user = await users.authenticateBasic(username, pass)
    // console.log(req.user)
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}