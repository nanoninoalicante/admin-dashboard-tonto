import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from "openai";
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery, useMutation, ApolloQueryResult } from '@apollo/client';

const apiKey = "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"
const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_URI_GRAPHQL,
    cache: new InMemoryCache(),
  });

  const INTERESTS = [
    "Networking",
    "Shows",
    "Sports",
    "Life",
    "Comedy",
    "Tech",
    "Music",
    "Interviews",
    "Arts",
    "Languages",
    "News",
    "Identity",
    "Travel",
  ];
const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

/* export async function getInterests(tag: string) {
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-0301",
        prompt: `${INTERESTS} from this list choose one to this tag ${tag}, just say the result in a array format`,

    });
    console.log(response.data.choices[0].text)
} */
