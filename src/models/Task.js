import mongoose from 'mongoose';

// {"title": "foo", "isCompleted": true, "labels": [123, 321]}
const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    labels: {
        type: Array,
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const task = mongoose.model('Tasks', taskSchema);

export default task;