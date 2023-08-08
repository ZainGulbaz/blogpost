import { Configuration,OpenAIApi } from "openai";

let config= new Configuration({
    apiKey:process.env.OPEN_AI_KEY
})

let openaiAPI=new OpenAIApi(config);

export default openaiAPI;