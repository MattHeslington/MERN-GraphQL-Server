const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

const resolvers = {
    Query: {
        async getPosts() {
            try{
                const posts = await Post.find();
                return posts;
            }   catch (err) {
                throw new Error(err);
            }
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

 mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('DB Connected And That')
        return server.listen ({port:9999})
    })
    .then(res => {
        console.log(`DEB Server Running at ${res.url}`)
    })

