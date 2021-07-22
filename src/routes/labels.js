import express from 'express';
import Label from '../models/Label.js';

const router = express.Router();



// GET /labels - returns list of all the labels
// POST /labels - create a new label. {"title": "foo", "color": "#FF0000"}
// PUT /labels/{id} - update the label {"title": "foo", "color": "#FF0000"}
// DELETE /labels/{id} - deletes a label

router.get('/', async (req, res) => {
    try {
        // query the database
        const query = Label.find({});
        const labels = await query.exec();
        res.json(labels);
    } catch(e) {
        res.json({error: true, message: e});
    }
});

router.post('/', async (req, res) => {
    const newLabelData = {
        title: req.body.title,
        color: req.body.color,
    };
    const label = new Label(newLabelData);
    try {
        const labelEntity = await Label.save();
        res.json(labelEntity);
    } catch(e) {
        res.json({error: true, message: e});
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = Label.findById(id);
        const label = await query.exec();
        if (!label) {
            res.status(404).json({notFound: true});
            return;
        }

        // updates the ojbect proerties
        label.title = req.body.title;
        label.labels = req.body.labels;
        label.isCompleted = req.body.isCompleted;

        await label.save(); // triggers the save in the database
        
        res.json(label);
    } catch(e) {
        res.json({error: true, message: e});
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = Label.deleteOne({
            _id: id
        });
        await query.exec();
        
        res.json({success: true});
    } catch(e) {
        res.json({error: true, message: e});
    }
});

export default router;