import { SlashCommand } from '@structures/Command'
import { convertEmbed, getPm2List } from '@utils/Utils'
import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js'

export default new SlashCommand(
  new SlashCommandBuilder()
    .setName('list')
    .setDescription('pm2 프로세스 리스트를 보여줍니다.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .toJSON(),
  async (client, interaction) => {
    const list = getPm2List()

    if (!Array.isArray(list)) return interaction.reply(list)

    const embed = convertEmbed(list, client)

    interaction.reply({
      embeds: [embed]
    })
  }
)
