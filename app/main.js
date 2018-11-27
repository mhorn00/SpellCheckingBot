const Discord = require('discord.js');
const client = new Discord.Client();
const msgHandle = require('./msgHandle.js');
const logger = require('./logger.js');
const fs = require('fs');
const c = require('config');
const config = c.get("Main");

client.on('ready', () => {
  logger.logInfo(`Logged in as ${client.user.tag}!`);
});

client.on('error', err => {
  logger.logWarn(err.message);
});

client.on('message', msg => {
  msgHandle.handle(msg, client);
});

client.login(config.has('token')?config.get('token'):logger.logFatal('Missing token from config file')).catch(err => logger.logFatal(`Login Failed, ${err}`));