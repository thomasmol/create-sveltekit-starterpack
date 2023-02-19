import type { RequestHandler } from "./$types";
import openai from "$lib/openai";

export const POST = (async () => {
  const prompt = "This is a test prompt";
  const response = await openai.createCompletion({
    prompt: prompt,
    max_tokens: 1000,
    temperature: 0.5,
    model: "text-davinci-003",
  });

  const completion = response.data.choices[0].text;

  return new Response(JSON.stringify({ completion }));
}) satisfies RequestHandler;
