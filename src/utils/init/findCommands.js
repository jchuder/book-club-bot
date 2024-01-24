const fs = require('fs');
const log = new require('../logger.js');
const logger = new log('Command loader');
const { SlashCommandBuilder } = require('@discordjs/builders');
const pathToCommands = __dirname + '/../../commands/';

module.exports = (client) => {
  const commands = fs.readdirSync(pathToCommands).filter((file) => file.endsWith('.js'));

  let stack = [];
  client.commands = {};

  for (const command of commands) {
    const commandLoaded = require(pathToCommands + command);
    if (!commandLoaded) {
      logger.error(`${command} not valid`);
      continue;
    }
    if (typeof commandLoaded.execute === 'undefined' || typeof commandLoaded.execute !== 'function') {
      logger.error(`${command} does not have the execute function`);
      continue;
    }
    if (commandLoaded.registerCommand instanceof SlashCommandBuilder == false) {
      logger.error(`${command} does not have the registerCommand SlashCommandBuilder instance`);
      continue;
    }

    if (Object.keys(client.commands).includes(commandLoaded.registerCommand.name)) {
      logger.warning(`Two or more commands share the name ${commandLoaded.registerCommand.name}`);
      continue;
    }

    client.commands[commandLoaded.registerCommand.name] = commandLoaded;
    stack.push(commandLoaded.registerCommand);

    logger.success(`Successfully loaded ${command}`);
  }
  logger.info('Commands loaded');
  return stack;
};
