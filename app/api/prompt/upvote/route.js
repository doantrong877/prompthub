// File: /pages/api/prompt/upvote.js

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (request) => {
    const { promptId } = await request.json();

    try {
        await connectToDB();

        // Find the prompt by ID and increment the upvote count
        const prompt = await Prompt.findById(promptId);
        if (!prompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        prompt.upvotes = (prompt.upvotes || 0) + 1; // Increment upvote count
        await prompt.save();

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to upvote prompt", { status: 500 });
    }
};
