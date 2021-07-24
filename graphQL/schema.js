const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: String!
        createdAt: String!
        updatedAt: String!
    }
    type User {
        _id: ID!
        email: String!
        name: String!
        password: String
        status: String!
        posts: [Post!]!
    }
    type AuthData{
        token: String!
        userId: String!
    }
    input UserInputData {
        email: String!
        name: String!
        password: String!
    }
    input PostInputData {
        title: String!
        content: String!
        imageUrl: String!
    }
    type rootMutation{
        createUser(userInput: UserInputData): User!
        createPost(postInput: PostInputData): Post!
    }
    type rootQuery{
        login(email: String!,password: String!): AuthData!
    }
    schema {
        query: rootQuery
        mutation: rootMutation
    }
`)