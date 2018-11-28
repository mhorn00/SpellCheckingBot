const logger = require('./logger.js');
const c = require('config');
const config = c.get("Main");
const sp = require('spellchecker');
const fetch = require('node-fetch');

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
    }else{
        if(msg.author.bot) return;
        getGoogle(msg.content);
        
    }
};

function getGigablast(text){
    let url = `https://www.gigablast.com/search?q=${text}&userid=206&code=1993227782&n=0&format=json&spell=1&autospell=1`;
    return fetch(url).then(results=>results.json());
}

function getGoogle(text){
    let url = `https://www.google.com/search?q=${text}`;
    fetch(url, {method: 'GET',headers:{
        'Content-Type': 'text/html'
      }}).then(res=>{
        console.log(res)
    })
}

function getBoth(text){
return Promise.all([getGigablast(), getGoogle()]);
}
module.exports = { handle };