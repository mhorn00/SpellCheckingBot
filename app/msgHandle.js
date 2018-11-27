const logger = require('./logger.js');
const c = require('config');
const config = c.get("Main");
const sp = require('spellchecker');

const handle = function (msg, client) {
    if (msg.content.charAt(0) === config.get("prefix") && !msg.author.bot) {
        let cmd = msg.content.substring(1).trim().split(" ");
        if (cmd[0] === 'ping') {
            msg.channel.send('Pong! (' + Math.round(client.ping) + 'ms)').then(m => {
                logger.logInfo(msg.author.username + ' executed command "' + cmd[0] + '", replyed with "' + m.content + '"');
            });
        }
        if (cmd[0] === 'shutdown') {
            msg.channel.send('Shuting down! Goodbye!').then(m => {
                logger.logInfo(msg.author.username + ' executed command "' + cmd[0] + '", Shuting down gracfully');
            });
            client.destroy();
        }
        if (cmd[0] === 'help') {
            let p = config.get("prefix");
            let pingH = `${p}ping - Pong\n`;
            msg.channel.send(`${pingH}`).then(m => {
                logger.logInfo(msg.author.username + ' executed command "' + cmd[0] + '", replyed with "Help Message"')
            });
        }
    }else{
        let m = "";
        msg.content.split(" ").forEach(e => {
            if (sp.isMisspelled(e)){
                m = m + "\*"+sp.getCorrectionsForMisspelling(e)[0]+" ";
            }
        });
        if (m !== ""){
            msg.channel.send(m);
        }
    }
};

module.exports = { handle };