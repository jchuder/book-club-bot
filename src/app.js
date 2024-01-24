const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
require('dotenv').config();
const assert = require('assert');
const findEvents = require('./utils/init/findEvents');
const findCommands = require('./utils/init/findCommands');
const registerCommands = require('./utils/init/registerCommands');

assert(
  process.env.DISCORD_TOKEN,
  'A Discord Token for your bot is required ! Set your token then as an environmental variable.'
);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    // GatewayIntentBits.MessageContent,
    // GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

findEvents(client);

const commands = findCommands(client);

client.login(process.env.DISCORD_TOKEN);

client.once(Events.ClientReady, (client) => {
  registerCommands(client, commands);
});
