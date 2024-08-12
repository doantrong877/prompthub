import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const GET = async (request) => {
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get('searchText') || '';

    try {
        await connectToDB();

        // Find users matching the search text
        const users = await User.find({ username: { $regex: searchText, $options: 'i' } }).select('_id');

        // Extract user IDs
        const userIds = users.map(user => user._id);

        // Find prompts where the prompt, tag, or creator's username matches the search text
        const prompts = await Prompt.find({
            $or: [
                { prompt: { $regex: searchText, $options: 'i' } },
                { tag: { $regex: searchText, $options: 'i' } },
                { creator: { $in: userIds } }
            ]
        }).populate('creator');

        return new Response(JSON.stringify(prompts), {
            status: 200,
        });
    } catch (error) {
        return new Response("Failed to fetch prompts", {
            status: 500,
        });
    }
};
