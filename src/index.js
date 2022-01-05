// Back end services with Express, Mongo DB, and Graph QL
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
require('dotenv').config();
const db = require('./db');
const app = express();
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;
const models = require('./models');

// Data
let notes = [
  { id: '1', content: 'This is a note', author: 'Adam Scott' },
  { id: '2', content: 'This is another note', author: 'Harvey Elliot' },
  { id: '3', content: 'Yet, This is another note!', author: 'Harry Potter' }
];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Mutation {
    newNote(content: String!): Note!
  }

  type Query {
    notes: [Note!]!
    note(id: ID!): Note!
  }
`;

// Provide resolver functions for our schema fields
const resolvers = {
  Query: {
    notes: async () => {
      return await models.Note.find();
    },
    note: async (parent, args) => {
      return await models.Note.findById(args.id);
    }
  },

  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: 'Adam Scott'
      });
    }
  }
};

// Connect To Database
db.connect(DB_HOST);

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/api' });

// app.get('/', (req, res) => res.send('Hello Server!!!'));

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost${port}${server.graphqlPath}`
  )
);
