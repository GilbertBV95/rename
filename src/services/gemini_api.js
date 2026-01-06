import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";

export const getFileRenameSuggestionFromIA = async (model, prompt) => {
	try {
		const ia = new ChatGoogleGenerativeAI({
			model,
			apiKey: process.env.GOOGLE_API_KEY
		});
		const response = await ia.invoke([new HumanMessage({ content: `hola.mp4, h_l4.srt` })]);
		console.log(response.content)
	} catch (error) {
		console.log(error, 'sss');
	}
}