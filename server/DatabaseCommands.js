const path = require('path');
const fs = require('fs');

class DatabaseCommands {
    db = null;
    prisonerInfo = null;
    transportInfo = null;

    constructor(db) {
        this.db = db;
    }

    setTransportInfo(info) {
        return new Promise(data => {
            let tempTransportInfo = {
                prisoner_id: info.prisoner_id,
                leaving: info.leaving,
                activity_log: null,
                destination: info.destination,
                facility: info.facility,
                notes: info.notes,
                leavingDate: info.leavingDate,
                relayDate: info.relayDate,
                arrivalDate: info.arrivalDate,
                creationDate: "CURDATE()"
            }
            data(tempTransportInfo);
        });
    }

    setPrisonerInfo(info) {
        //In Order to set this.prisonerInfo you will need to do so where you made this method call
        info = this.setNulls(info);
        return new Promise(data => {
            let tempPrisonerInfo = {
                f_name: info.f_name,
                m_initial: info.m_initial,
                l_name: info.l_name,
                DOB: info.DOB,
                sex: info.sex,
                race: info.race,
                other: info.other,
                height: info.height,
                lbs: info.lbs,
                hair_color: info.hair_color,
                eye_color: info.eye_color,
                warrent_num_1: info.warrent_num_1,
                warrent_num_2: info.warrent_num_2,
                warrent_num_3: info.warrent_num_3,
                charge_1: info.charge_1,
                charge_2: info.charge_2,
                charge_3: info.charge_3,
                misdemeanor: info.misdemeanor,
                felony: info.felony,
                caution: info.caution,
                optn: info.optn,
                medical_files: info.medical_files,
                creationDate: "CURDATE()"
            }
            data(tempPrisonerInfo);
        });
    }

    setNulls(info) {
        if (info.height === '') {
            info.height = null;
        }

        if (info.lbs === '') {
            info.lbs = null;
        }

        if (info.medical_files === undefined || info.medical_files.length === 0) {
            info.medical_files = null;
        }

        return info;
    }

    isThereAnError(err) {
        if (err) {
            throw err;
        }
    }

    findLocationID(countyName) {
        //Returns the locationID
        return new Promise(data => {
            let destinationQuery = 'SELECT * FROM counties WHERE county_name = (?)'
            this.db.query(destinationQuery, [countyName], (err, result) => {
                this.isThereAnError(err);
                try {
                    data(result[0].county_id);
                } catch {
                    data(null);
                }
            });
        });
    }

    findFacilityID(facilityID) {
        //Returns the facilityID
        return new Promise(data => {
            let destinationQuery = 'SELECT * FROM destination_facility WHERE facility_name = (?)'
            this.db.query(destinationQuery, [facilityID], (err, result) => {
                this.isThereAnError(err);
                try {
                    data(result[0].facility_id);
                } catch {
                    data(null);
                }
            });
        });
    }

    createInsertQuery(keys, vals, table) {
        let finalQuery = `INSERT INTO ${table} (`
        let endOfQuery = ""
        for (let i = 0; i < keys.length; i++) {
            finalQuery = finalQuery + `${keys[i]},`;
            if (keys[i] === 'medical_files') {
                endOfQuery += `'[${this.prisonerInfo.medical_files}]', `
            } else if (vals[i] === false || vals[i] === true || keys[i] === 'creationDate' || vals[i] === null) {
                endOfQuery += `${vals[i]}, `;
            } else {
                endOfQuery += `'${vals[i]}', `;
            }
        }
        finalQuery = finalQuery.substring(0, finalQuery.length - 1);
        finalQuery = finalQuery + ") VALUES(";
        endOfQuery = endOfQuery.substring(0, endOfQuery.length - 2);

        endOfQuery = endOfQuery + ");"
        finalQuery = finalQuery + endOfQuery;
        return finalQuery
    }

    insertIntoTransport(table, info) {
        return new Promise(data => {
            let insertTransportQuery = this.createInsertQuery(Object.keys(info), Object.values(info), table);
            this.db.query(insertTransportQuery, (err, result) => {
                if (err) {
                    console.error(err);
                    data(err);
                    return;
                }
                data(result.insertId);
            });
        })
    }

    async insertNewTransport(req, res) {
        if (req.body.DOB === '') {
            req.body.DOB = null;
        }
        if (req.body.arrivalDate === '') {
            req.body.arrivalDate = null;
        }
        if (req.body.relayDate === '') {
            req.body.relayDate = null;
        }
        if (req.body.leavingDate === '') {
            req.body.leavingDate = null;
        }
        this.prisonerInfo = await this.setPrisonerInfo(req.body);
        let prisonerID = await this.insertIntoTransport("prisoner", this.prisonerInfo);
        if (typeof (prisonerID) !== 'number') {
            res.status(500).send(prisonerID);
            return;
        }
        req.body.prisoner_id = prisonerID;
        this.transportInfo = await this.setTransportInfo(req.body);
        let insertRes = await this.insertIntoTransport("transport", this.transportInfo);
        if (typeof (insertRes) !== 'number') {
            res.status(500).send(insertRes);
            return;
        }
        res.sendStatus(200);
        return;
    }

    getUsersPasswordAndId(username) {
        return new Promise(data => {
            let connection =
                'SELECT password, user_id \
                FROM users \
                WHERE username = ?'
            this.db.query(connection, username, (err, result) => {
                this.isThereAnError(err);
                data(result[0]);
            });
        });
    }

    getCounties(req, res) {
        return new Promise(data => {
            //TODO Set the state variable with whats passed
            let state = "1";
            let query = `SELECT county_name FROM counties WHERE state_id = "${state}"`;
            this.db.query(query, (err, result) => {
                this.isThereAnError(err);
                let final = new Array;
                for (let i of result) {
                    final.push(i.county_name);
                }
                data(final);
                res.send(final);
            });
        });
    }

    userpermissions(req, res) {
        return new Promise(data => {
            let query = `SELECT facility_name 
                FROM destination_facility 
                WHERE id = ?`;

            this.db.query(query, (err, result) => {
                this.isThereAnError(err);
                let final = new Array;
                for (let i of result) {
                    final.push(i.facility_name);
                }
                data(final);
                res.send(final);
            });
        });
    }

    getFacilities(req, res) {
        return new Promise(data => {
            //TODO Set the state variable with whats passed
            let state = "1";
            let query = `SELECT facility_name FROM destination_facility WHERE state_id = "${state}"`;
            this.db.query(query, (err, result) => {
                this.isThereAnError(err);
                let final = new Array;
                for (let i of result) {
                    final.push(i.facility_name);
                }
                data(final);
                res.send(final);
            });
        });
    }

    async searchDB(req, res) {
        Object.keys(req.query).forEach(k => (!req.query[k] && req.query[k] !== undefined) && delete req.query[k]);
        req.query = this.removeFalse(req.query);
        let type = req.query.type;
        delete req.query.type;
        let result = null;
        if (type === "AND") {
            result = await this.createSearchQuery(req.query);
        } else if (type === "OR") {
            result = await this.createTransportList(req.query);
        }
        if (typeof (result) !== 'object' && typeof (result) !== "undefined") {
            res.status(500).send(result);
            return;
        }
        res.send(result);
    }

    removeFalse(query) {
        if (query.misdemeanor == 'false') {
            delete query.misdemeanor;
        }
        if (query.felony == 'false') {
            delete query.felony;
        }
        if (query.caution == 'false') {
            delete query.caution;
        }
        return query;
    }

    async createSearchQuery(queryInfo) {
        // const prisonerInfo = this.createPrisonerInfoSearch(queryInfo);
        let keys = Object.keys(queryInfo);
        let vals = Object.values(queryInfo);
        if (keys.length == 0) {
            return;
        }
        let finalQuery = this.firstHalfQuery(queryInfo);
        for (let i = 0; i < keys.length; i++) {
            if (vals[i] === 'false' || vals[i] === 'true') {
                finalQuery += `${keys[i]} = ${vals[i]} AND `;
            } else {
                finalQuery += `${keys[i]} = '${vals[i]}' AND `;
            }
        }
        finalQuery = finalQuery.substring(0, finalQuery.length - 4);
        finalQuery += ';';
        let result = await this.queryWithOutArr(finalQuery);
        return result;
    }

    async createTransportList(queryInfo) {
        let keys = Object.keys(queryInfo);
        let vals = Object.values(queryInfo);
        if (keys.length == 0) {
            return;
        }
        let finalQuery = this.firstHalfQuery(queryInfo);
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === 'leavingDate' || keys[i] === 'relayDate' || keys[i] === 'arrivalDate') {
                finalQuery += `${keys[i]} = '${vals[i]}' OR `;
            } else {
                finalQuery += `${keys[i]} = '${vals[i]}' AND (`;
            }
        }
        finalQuery = finalQuery.substring(0, finalQuery.length - 4);
        finalQuery += ');';
        let result = await this.queryWithOutArr(finalQuery);
        return result;
    }

    firstHalfQuery() {
        let finalQuery = "SELECT * FROM transport LEFT JOIN prisoner ON transport.prisoner_id=prisoner.prisoner_id ";
        finalQuery += "WHERE ";
        return finalQuery;
    }

    //Returns the result of a query that does not use an array with arguments
    queryWithOutArr(query) {
        return new Promise(data => {
            this.db.query(query, (err, result) => {
                this.isThereAnError(err);
                data(result);
            });
        });
    }

    toggleDelete(req, res) {
        let q = `UPDATE transport SET isActive = !isActive WHERE transport_id = ${req.body.transport_id}`
        this.queryWithOutArr(q);
    }

    dealWithFile(req, res) {
        let fileName = req.files[0].filename;
        let uuid = fileName.split('_')[0];
        res.json(uuid);
    }

    clearObjects(obj) {
        Object.keys(obj).forEach(key => {
            if (obj[key] === undefined || obj[key] === null) {
                delete obj[key];
            }
        });
        return obj;
    }

    async editTransport(req, res) {
        let info = req.body;
        let pinfo = await this.setPrisonerInfo(info);
        let tinfo = await this.setTransportInfo(info);
        pinfo = await this.clearObjects(pinfo);
        tinfo = await this.clearObjects(tinfo);
        let tid = info.transport_id;
        if (Object.keys(pinfo).length > 0) {
            let pid = await this.findPID(tid);
            pinfo.prisoner_id = pid;
            let result = await this.updateTable("prisoner", pinfo);
            if (typeof (result) !== 'number') {
                res.status(500).send(result);
                return;
            }
            res.sendStatus(200);
            return;
        }
        tinfo.transport_id = tid;
        result = await this.updateTable("transport", tinfo);
        if (typeof (result) !== 'number') {
            res.status(500).send(result);
            return;
        }
        res.sendStatus(200);
        return;
    }

    findPID(tid) {
        return new Promise(data => {
            let query = `SELECT prisoner_id FROM transport WHERE transport_id = "${tid}"`;
            this.db.query(query, (err, result) => {
                data(result[0].prisoner_id);
            });
        });
    }

    updateTable(table, info) {
        let keys = Object.keys(info);
        let vals = Object.values(info);
        let finalQuery = `UPDATE ${table} SET `
        for (let i = 0; i < keys.length - 1; i++) {
            if (vals[i] === false || vals[i] === true || keys[i] === 'creationDate') {
                finalQuery += `${keys[i]} = ${vals[i]}, `;
            } else if (keys[i] == "medical_files") {
                finalQuery += `${keys[i]} = '[${info.medical_files}]', `;
            } else {
                finalQuery += `${keys[i]} = '${vals[i]}', `;
            }
        }
        finalQuery = finalQuery.substring(0, finalQuery.length - 2);
        finalQuery += ` WHERE ${keys[keys.length - 1]} = ${vals[vals.length - 1]};`
        return new Promise(data => {
            this.db.query(finalQuery, (err, result) => {
                if (err) {
                    data(err);
                    return;
                }
                data(result.insertId);
            });
        });
    }

    setTransportRetention(numDays) {
        let query = `DELIMITER $$
        ALTER EVENT cleaning ON SCHEDULE EVERY 1 DAY ENABLE DO 
        BEGIN
            INSERT INTO files (deletedFiles)
                SELECT medical_files 
                    FROM prisoner 
                        WHERE prisoner.creationDate < CURRENT_TIMESTAMP - INTERVAL ${numDays} DAY;
            DELETE FROM transport WHERE creationDate < CURRENT_TIMESTAMP - INTERVAL ${numDays} DAY;
            DELETE FROM prisoner WHERE creationDate < CURRENT_TIMESTAMP - INTERVAL ${numDays} DAY;
        END$$;
        DELIMITER ;`
        try {
            this.db.query(query, (err, result) => { });
        } catch (err) {
            console.error(err);
        }
    }

    async cleanFiles() {
        let query = "SELECT deletedFiles FROM files;";
        let result = await this.queryWithOutArr(query);
        if (result.length === 0) {
            console.log("Nothing to delete!");
            return;
        }
        for (let i = 0; i < result.length; i++) {
            let str = result[i].deletedFiles.replace('[', '').replace(']', '');
            str = str.replace(/["]+/g, '').replace(/[" "]+/g, '')
            let arr = str.split(',');
            for (let j = 0; j < arr.length; j++) {
                const directoryPath = path.join(__dirname, 'tmp');
                fs.readdir(directoryPath, function (err, files) {
                    if (err) {
                        return console.log('Unable to scan directory: ' + err);
                    }
                    //listing all files using forEach
                    files.forEach(function (file) {
                        if (file.substring(0, 36) === arr[j]) {
                            try {
                                fs.unlinkSync(`tmp/${file}`);
                                console.log("File removed:", file);
                            } catch (err) {
                                console.error(err);
                            }
                        }
                    });
                });
            }
        }
        query = "DELETE FROM files;";
        result = await this.queryWithOutArr(query);
    }

}

module.exports = DatabaseCommands;