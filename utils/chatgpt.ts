import { Configuration, OpenAIApi } from "openai";
const interests = [
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
async function getInterestFromAI(tag: string) {
    const configuration = new Configuration({
        apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
    messages: [{role: "user", content: `${interests} from this list choose just one for this tag ${tag}`}],
    });
    console.log(completion.data.choices[0].message);
    return(completion.data.choices[0].message)
}

export default getInterestFromAI;
  

/* export async function getInterests(tag: string) {
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-0301",
        prompt: `${INTERESTS} from this list choose one to this tag ${tag}, just say the result in a array format`,

    });
    console.log(response.data.choices[0].text)
} */
