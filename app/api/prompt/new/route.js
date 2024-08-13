import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json(); // Removed upvotes from destructuring

    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
            // upvotes is omitted, so it will default to 0 in the schema
        });
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        console.error("Error creating prompt:", error); // Log the error for debugging
        return new Response("Failed to create a new prompt", { status: 500 });
    }
};
