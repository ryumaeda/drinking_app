import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const thinkGame = async (content: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content }],
      temperature: 0.7,
    });
    console.log(response.choices[0].message);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
  }
};

export default thinkGame;