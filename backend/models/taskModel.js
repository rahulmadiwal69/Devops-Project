import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
    name: String,
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

export default model('Task', TaskSchema);
