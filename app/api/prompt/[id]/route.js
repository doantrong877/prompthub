import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, {params}) => {

    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response("Prompt not found", {status: 404})
        return new Response(JSON.stringify(prompt), {
            status: 200
        })
        
    } catch (error) {
        return new Response("Failed to fetch all prompts", {status: 500})
    }
}

export const PATCH = async (request, {params}) => {
    const {prompt, tag} = await request.json();

    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response("Prompt not found", {status: 404})
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to update the prompt", {status: 500})
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Check if the prompt exists
        const prompt = await Prompt.findById(params.id);
        if (!prompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Delete the prompt
        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully", {
            status: 200
        });
    } catch (error) {
        console.error("Error deleting prompt:", error); // Log error details
        return new Response(`Failed to delete the prompt: ${error.message}`, { status: 500 });
    }
};