import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const { userId, promptId } = await req.json(); // Ensure you pass userId and promptId

    try {
        await connectToDB();
        const prompt = await Prompt.findById(promptId);

        if (!prompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Check if user has already voted
        if (prompt.votedUsers.includes(userId)) {
            return new Response("User has already voted", { status: 400 }); // User already voted
        }

        // Add user ID to votedUsers and increment upvotes
        prompt.votedUsers.push(userId);
        prompt.upvotes += 1;
        await prompt.save();

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.error("Error voting for prompt:", error);
        return new Response("Failed to vote for prompt", { status: 500 });
    }
};
