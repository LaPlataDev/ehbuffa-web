
const { readFile, writeFile, mkdir } = require('fs');
const { resolve } = require('path');

const SCHEDULE_FOLDER = resolve(__dirname, '../.temp');
const SCHEDULE_FILE = resolve(SCHEDULE_FOLDER, 'SCHEDULES.JSON');  


const doWrite = (json, reply) => (err) => {
    if (err) {  
       return mkdir(SCHEDULE_FOLDER, (err) => {
            if (err) throw err;
                writeFile(SCHEDULE_FILE, json, (err) => {
                    if (err) throw err;

                    reply('success');
                });
        });
    }
    reply('success');
} 


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
            
            writeFile(SCHEDULE_FILE, json, doWrite(json, reply));            
            
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
            writeFile(SCHEDULE_FILE, json, doWrite(json, reply));

        });

    }

}
