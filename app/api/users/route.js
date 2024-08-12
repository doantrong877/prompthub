import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (request) => {
    try {
        // Connect to the database
        await connectToDB();

        // Fetch all users
        const users = await User.find();

        // Return the users in the response
        return new Response(JSON.stringify(users), {
            status: 200,
        });
    } catch (error) {
        return new Response("Failed to fetch all users", {
            status: 500,
        });
    }
};
