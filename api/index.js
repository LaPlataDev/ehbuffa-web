
const { readFile, writeFile } = require('fs');
const { resolve } = require('path');

const SCHEDULE_FILE = resolve(__dirname, '../.temp', 'SCHEDULES.JSON');  

module.exports = {

    get (req, reply) {
        readFile(SCHEDULE_FILE, 'utf8', (err, data) => {
            let schedules; 
            if (err) {
                schedules = []
            } else {
                schedules = JSON.parse(data);
            }
            reply(schedules);
        });
    },

    create (req, reply ) {
        const alarm = req.payload;
        
        readFile(SCHEDULE_FILE, 'utf8', (err, data) => {
            let schedules; 
            if (err) {
                schedules = []
            } else {
                schedules = JSON.parse(data);
            }

            schedules.push(alarm);
            
            const json = JSON.stringify(schedules);
            writeFile(SCHEDULE_FILE, json, (err) => {
                if (err) throw err;
                reply('success');
            });            
            
        });

    },

    update (req, reply) {
        const pos = req.params.pos;
        const alarm = req.payload;

        readFile(SCHEDULE_FILE, 'utf8', (err, data) => {
            let schedules; 
            if (err) {
                schedules = [];
            } else {
                schedules = JSON.parse(data);
            }

            if (!schedules[pos]) throw new Error(`Eh puto, no hay schedule para ${pos} que postea, gil, gato`);

            schedules[pos] = alarm;

            const json = JSON.stringify(schedules);
            writeFile(SCHEDULE_FILE, json, (err) => {
                if (err) throw err;
                reply('success');
            });

        });

    }

}
