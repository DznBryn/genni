import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';


import cors from 'cors';
import { config } from 'dotenv';
import schemaGQL from './graphql/schema/index.js';
import rootGQL from './graphql/root/index.js';
import genniDB from './db/index.js';

const app = express();
const port = config().parsed.PORT || 4000;
const uri = 'mongodb+srv://bryan:GRz3vm0pdkfiE6IK@main.dhwsqyv.mongodb.net/';
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

genniDB(uri, clientOptions, 'memory').catch(console.dir);
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend domain
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const schema = buildSchema(schemaGQL);
const root = rootGQL;

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
