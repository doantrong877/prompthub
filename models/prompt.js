import {Schema, model,models} from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',

    },
    prompt:{
        type: String,
        required: [true, 'Prompt is required.'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.']
    },
    upvotes: {
        type: Number,
        default: 0, // Initialize upvotes to zero
    },
    votedUsers: { // Add this field to keep track of users who have voted
        type: [Schema.Types.ObjectId], // Array of user IDs
        ref: 'User',
        default: [],
    },
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;