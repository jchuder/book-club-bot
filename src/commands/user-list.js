const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  registerCommand: new SlashCommandBuilder().setName('user-list').setDescription('Get all user in list.'),
  async execute(client, interaction) {
    return interaction.reply({ content: `Channel member:\n${interaction.member}`, ephemeral: true });
  },
};
