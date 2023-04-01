import { SlashCommand } from '@structures/Command'
import { convertEmbed, getPm2List } from '@utils/Utils'
import { execSync } from 'child_process'
import { codeBlock, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js'

export default new SlashCommand(
  new SlashCommandBuilder()
    .setName('restart')
    .setDescription('선택한 프로세스를 재부팅합니다.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addStringOption((data) =>
      data
        .setAutocomplete(true)
        .setName('name')
        .setDescription('재부팅할 프로세스를 선택해주세요.')
    )
    .toJSON(),
  async (client, interaction) => {
    const name = interaction.options.getString('name')

    await interaction.deferReply()

    try {
      execSync(`pm2 restart ${name}`)

      const list = getPm2List()

      if (!Array.isArray(list)) return interaction.reply(list)

      const embed = convertEmbed(list, client)

      await interaction.editReply({
        content: '재시작 완료!',
        embeds: [embed]
      })
    } catch (error) {
      interaction.editReply(
        `알수없는 오류가 발생했습니다. \n${codeBlock(String(error))}`
      )
    }
  }
)
