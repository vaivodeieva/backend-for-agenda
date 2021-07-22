import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();


// GET /tasks - returns list of all the tasks
// POST /tasks - create a new task. {"title": "foo", "isCompleted": true, "labels": [123, 321]}
// PUT /tasks/{id} - update the task {"title": "foo", "isCompleted": true, "labels": [123, 321]}
// DELETE /tasks/{id} - deletes a task

router.get('/', async (req, res) => {
    try {
        // query the database
        const query = Task.find({});
        const tasks = await query.exec();
        res.json(tasks);
    } catch(e) {
        res.json({error: true, message: e});
    }
});

router.post('/', async (req, res) => {
    const newTaskData = {
        title: req.body.title,
        labels: req.body.labels,
    };
    const task = new Task(newTaskData);
    try {
        const taskEntity = await task.save();
        res.json(taskEntity);
    } catch(e) {
        res.json({error: true, message: e});
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = Task.findById(id);
        const task = await query.exec();
        if (!task) {
            res.status(404).json({notFound: true});
            return;
        }

        // updates the ojbect proerties
        task.title = req.body.title;
        task.labels = req.body.labels;
        task.isCompleted = req.body.isCompleted;

        await task.save(); // triggers the save in the database
        
        res.json(task);
    } catch(e) {
        res.json({error: true, message: e});
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = Task.deleteOne({
            _id: id
        });
        await query.exec();
        
        res.json({success: true});
    } catch(e) {
        res.json({error: true, message: e});
    }
});

export default router;