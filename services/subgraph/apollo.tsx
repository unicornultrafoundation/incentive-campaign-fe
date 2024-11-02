// eslint-disable-next-line import/no-extraneous-dependencies
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SUBGRAPH_URL } from '@/config/env';

export const subgraphClient = new ApolloClient({
  uri: SUBGRAPH_URL,
  cache: new InMemoryCache(),
});
