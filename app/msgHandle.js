const logger = require('./logger.js');
const c = require('config');
const config = c.get("Main");
const fetch = require('node-fetch');
const rp = require('request-promise');
const cheerio = require('cheerio');

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
        getBoth(msg.content)
            .then((res => {
                let m = "<no correction>";
                m = res[0].queryInfo.spellingSuggestion;
                m += res[1]?" ::: "+res[1]:" ::: undefined";
                if (msg.content == m) m = "<no correction>";
                if (m === ' ::: undefined' || m === 'undefined ::: undefined') m = "<no correction>";
                msg.channel.send(m)
            }))
    }
}

function getGigablast(text){
    let url = `https://www.gigablast.com/search?q=${text}&userid=206&code=1993227782&n=0&format=json&spell=1&autospell=1`;
    return fetch(url).then(results=>results.json());
}

function getGoogle(text){
    let url = `https://www.google.com/search?q=${text}`;
    return rp({uri:url})/* ,transform: function(r){ return cheerio.load(r);} */
        .then(function(html){
            let $ = cheerio.load(html);
            return $('a.gL9Hy').text()
            // $('a').each(function(k,v){
            //     console.log($(this).html());
            // })
        }).catch(function(err){
            console.log(err);
        });
}

function getBoth(text){
    return Promise.all( [getGigablast(text), getGoogle(text)] );
}

module.exports = { handle };