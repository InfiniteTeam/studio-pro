import { SlashCommand } from '@structures/Command'
import { convertEmbed, getPm2List } from '@utils/Utils'
import { execSync } from 'child_process'
import { codeBlock, SlashCommandBuilder } from 'discord.js'

export default new SlashCommand(
  new SlashCommandBuilder()
    .setName('stop')
    .setDescription('선택한 프로세스를 종료시킵니다.')
    .addStringOption((data) =>
      data
        .setAutocomplete(true)
        .setName('name')
        .setDescription('종료할 프로세스를 선택해주세요.')
    )
    .toJSON(),
  async (client, interaction) => {
    const name = interaction.options.getString('name')

    await interaction.deferReply()

    try {
      execSync(`pm2 stop ${name}`)

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
