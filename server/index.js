const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const cred = require('./db_config.json');
const DatabaseCommands = require('./DatabaseCommands.js');
const app = express();
const multer = require('multer');
const uuid = require('uuid').v4;
const schedule = require('node-schedule');

const PORT = 3001;

var db = mysql.createConnection({
    host: cred.host,
    user: cred.user,
    password: cred.password,
    database: cred.database
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbCommands = new DatabaseCommands(db);

const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;
rule.tz = 'America/Los_Angeles';
schedule.scheduleJob(rule, function () {
    dbCommands.cleanFiles();
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'tmp/')
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, `${uuid()}__${originalname}`);
    }
})

const upload = multer({ storage });

const adminStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'tmp/adminUploads/')
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, `${originalname}`);
    }
})

const adminUpload = multer({ adminStorage });

app.use('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    dbCommands.getUsersPasswordAndId(username).then((response) => {
        //Checking for username and password here
        if (!response) {
            res.send({
                message: 'error',
            });
        }
        else {
            if (password == response.password) {
                res.send({
                    user_id: response.id,
                    token: 'test123'
                });
            }
        }
    });
});

app.get('/')

app.post('/api/post/transport/', (req, res) => dbCommands.insertNewTransport(req, res));

app.get('/api/get/counties', (req, res) => dbCommands.getCounties(req, res));

app.get('/api/get/facilities', (req, res) => dbCommands.getFacilities(req, res));

app.get('/api/get/userpermissions', (req, res) => dbCommands.userpermissions(req, res));

app.get('/api/get/search', (req, res) => dbCommands.searchDB(req, res));

app.post('/api/post/toggledelete', (req, res) => dbCommands.toggleDelete(req, res));

app.post('/api/post/file', upload.array('pond', 12), (req, res) => dbCommands.dealWithFile(req, res));

//This is just a rough draft, don't try to call this until the admin panel is setup
app.post('/api/post/admin/file', adminUpload.array('adminFiles', 12), (req, res) => { })

app.get('/api/get/admin/file', function (req, res) {
    const file = `tmp/adminUploads/${req.query.fileName}`;
    res.download(file); // Set disposition and send it.
});

app.post('/api/edit/transport', (req, res) => dbCommands.editTransport(req, res));

app.listen(PORT, function () {
    console.log("Running on port 3001");
});
