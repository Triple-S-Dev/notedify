// Back end services with Express, Mongo DB, and Graph QL
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

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
    notes: () => notes,
    note: (parent, args) => {
      return notes.find(note => note.id === args.id);
    }
  },

  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: 'Adam Scott'
      };
      notes.push(noteValue);
      return noteValue;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/api' });

// app.get('/', (req, res) => res.send('Hello Server!!!'));

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost${port}${server.graphqlPath}`
  )
);
