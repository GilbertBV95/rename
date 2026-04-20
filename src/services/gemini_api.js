import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { exit } from 'node:process';

export const getFileRenameSuggestionFromIA = async (model, prompt, spinner) => {
	try {
		const ia = new ChatGoogleGenerativeAI({
			model,
			apiKey: process.env.GOOGLE_API_KEY,
			json: true
		});
		const response = await ia.invoke([
			new HumanMessage(
				{
					type: 'text',
					content: prompt
				})
		]);

		return JSON.parse(response.content);
	} catch (error) {
		spinner.error(error.statusText || error.message.split(' or ')[0]);
		exit(1);
	}
}