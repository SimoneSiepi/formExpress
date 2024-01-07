const express = require('express');
const path = require('path');
const app = express();
const porta = 3000;
const queryString = require('querystring');

const users = [
    { username: 'user1', password: 'password1', Nome: 'simone', Cognome: 'siepi' },
    { username: 'user2', password: 'password2', Nome: 'aleandro', Cognome: 'ferrez VI' },
    { username: 'user3', password: 'password3', Nome: 'svona', Cognome: 'smatteo' }
];

app.set("appName", "form con express");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//middleware
app.use(express.urlencoded({ extended: true }));//Analizza dati form codificati in URL

//route
app.post('/accesso', (req, res) => {
    const { username, password } = req.body;
    console.log("username:",username," password:",password);
    const user = users.find(us => us.username === username && us.password === password);
    if (user) {
        res.render('accesso', { user: user }); // Qui passo direttamente l'oggetto user alla view
    } else {
        res.send('Credenziali non valide.');
    }
});
//gestisco il percorso di default 
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(porta, () => {
    console.log(`Server in ascolto su http://localhost:${porta}`);
});
