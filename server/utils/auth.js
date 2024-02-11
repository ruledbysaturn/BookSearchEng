const jwt = require('jsonwebtoken');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');

const typeDefs = require('../schemas/typeDefs');
const resolvers = require('../schemas/resolvers');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

const authMiddleware = ({ req }) => {
  // allows token to be sent via req.query or headers

  let token = req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    throw new AuthenticationError('You have no token!');
  }

  // verify token and get user data out of it
  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    return { user: data };
  } catch  (err) {
    console.log('Invalid token', err);
    throw new AuthenticationError('Invalid token!');
  }
 };

 const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

 const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { authMiddleware, signToken, server };
