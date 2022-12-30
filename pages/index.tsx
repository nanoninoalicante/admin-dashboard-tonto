import { Inter } from '@next/font/google'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const client = new ApolloClient({
    uri: 'https://flyby-gateway.herokuapp.com/',
    cache: new InMemoryCache(),
  });

  client
    .query({
      query: gql`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
    })
    .then((result) => console.log(result));
  return (
    <>
      <main className="h-screen bg-gray-300">
        <div className='top-0 w-full h-[4em] bg-[#64748B] flex justify-center items-center'>
          <ul className='flex flex-row gap-10 text-2xl'>
            <li className='border-b-2'>
              <Link href="/tags">Tags</Link>
            </li>
            <li className='border-b-2'>
              <Link href="/interests">Interests</Link>
            </li>
          </ul>
        </div>
      </main>
    </>
  )
}
