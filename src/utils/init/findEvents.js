const fs = require('fs');
const log = new require('../logger.js');
const logger = new log('Event loader');
const pathToEvents = __dirname + '/../../events/';

module.exports = (client) => {
  const events = fs.readdirSync(pathToEvents).filter((file) => file.endsWith('.js'));

  for (const element of events) {
    const elementLoaded = require(pathToEvents + element);
    if (!elementLoaded.type) {
      logger.error(`Failed to load ${element} type`);
      continue;
    }
    if (!elementLoaded.call) {
      logger.error(`Failed to load ${element} call`);
      continue;
    }
    switch (elementLoaded.type) {
      case 'on': {
        logger.success(`Successfully loaded ${element} event`);
        client.on(elementLoaded.event, (...args) => elementLoaded.call(client, ...args));
        break;
      }
      case 'once': {
        logger.success(`Successfully loaded ${element} event`);
        client.once(elementLoaded.event, (...args) => elementLoaded.call(client, ...args));
        break;
      }
      default:
        return logger.error(`Type of ${element} is not allowed!`);
    }
  }
  return logger.info('Events loaded');
};
