import { AutoComplete } from '@structures/Interaction'
import { getPm2List } from '@utils/Utils'
import { ApplicationCommandOptionChoiceData } from 'discord.js'

export default new AutoComplete(
  ['restart', 'stop'],
  async (client, interaction) => {
    const list = getPm2List()

    if (!Array.isArray(list)) return

    const choise: ApplicationCommandOptionChoiceData<string | number>[] = []

    list.forEach((data) => {
      choise.push({
        name: `${data.name} (${data.pm_id})`,
        value: data.name
      })
    })
    await interaction.respond(choise)
  }
)
