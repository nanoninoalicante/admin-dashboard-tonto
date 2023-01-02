import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

export default function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: 'https://tonto-admin-graphql-staging-nov2022-us-gtngqbdaaq-uk.a.run.app/graphql',
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
