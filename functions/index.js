const { onRequest } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express');
const app = express();

app.post('/addTeam', async (req, res) => {
    try {
        const writeResult = await admin.firestore().collection('teams').add(req.body);
        res.json({ result: `Team with ID: ${writeResult.id} added.`, success: true });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/updateTeam/:id', async (req, res) => {
    try {
        const document = admin.firestore().collection('teams').doc(req.params.id);
        await document.update(req.body);
        res.json({ result: `Team with ID: ${req.params.id} updated.`, success: true });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/deleteTeam/:id', async (req, res) => {
    try {
        const document = admin.firestore().collection('teams').doc(req.params.id);
        await document.delete();
        res.json({ result: `Team with ID: ${req.params.id} deleted.`, success: true });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/getTeam/:id', async (req, res) => {
    try {
        const document = admin.firestore().collection('teams').doc(req.params.id);
        const team = await document.get();
        const response = team.data();
        res.json(response);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/getTeams', async (req, res) => {
    try {
        const querySnapshot = await admin.firestore().collection('teams').get();
        const teams = [];
        querySnapshot.forEach(
            (doc) => {
                teams.push({
                    id: doc.id,
                    data: doc.data()
                });
            }
        );
        res.json(teams);
    } catch (error) {
        res.status(500).send(error);
    }
});

exports.app = onRequest(app);