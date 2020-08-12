const postsResolvers = require('./posts');
const usersResolvers = reuqire('./users');

module.exports = {
    Query: {
       ...posts.Resolvers.Query
    }
}