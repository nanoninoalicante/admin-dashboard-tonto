import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import Link from "next/link"
import MenuBar from "../components/MenuBar"


const tags = () => {
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
    return (
        <>
            <MenuBar props={"tags"}></MenuBar>

        </>
    )
}

export default tags 