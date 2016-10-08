

module.exports = {
    scheduleHandler: (req, reply) => {
        reply([{
            time: new Date().toISOString(),
            text: 'ALARM 1',
            level: 0
        }]);
    } 
}
