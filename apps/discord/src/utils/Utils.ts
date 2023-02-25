import BotClient from '@structures/BotClient.js'
import { ProcessList } from '@types'
import { execSync } from 'child_process'
import { EmbedField, InteractionReplyOptions } from 'discord.js'
import { readdirSync, statSync } from 'fs'
import { ProcessStatusString } from './Constants.js'
import Embed from './Embed.js'

// https://gist.github.com/kethinov/6658166
export const readAllFiles = (dirPath: string, fileList: string[] = []) => {
  const files = readdirSync(dirPath)
  for (const file of files) {
    const filePath = dirPath + '/' + file
    const stat = statSync(filePath)

    if (stat.isFile()) fileList.push(filePath)
    else fileList = readAllFiles(filePath, fileList)
  }

  return fileList
}

export const getPm2List = (): ProcessList[] | InteractionReplyOptions => {
  const lists = JSON.parse(execSync('pm2 jlist').toString()) as ProcessList[]

  if (lists.length == 0)
    return {
      content: '현재 pm2 내 프로세스가 없습니다.',
      ephemeral: true
    }
  else {
    lists.map(
      (data) => (data.status = ProcessStatusString[data.pm2_env.status])
    )
    return lists
  }
}

export function msToString(ms: number) {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  const s = seconds % 60
  const m = minutes % 60
  const h = hours % 24
  const d = days

  let result = ''
  if (d !== 0) {
    result += `${d}일 `
  }
  if (h !== 0) {
    result += `${h}시간 `
  }
  result += `${m}분 ${s}초`
  return result.trim()
}

export const convertEmbed = (pm2Data: ProcessList[], client: BotClient) => {
  const field: EmbedField[] = []
  pm2Data.forEach((data) => {
    const value = [
      `**상태**: ${data.status}`,
      `**모드**: ${data.pm2_env.exec_mode}`,
      `**PID**: ${data.pid}`,
      `**업타임**: ${msToString(Date.now() - data.pm2_env.pm_uptime)}`,
      `**재시작 횟수**: ${data.pm2_env.restart_time}회`,
      `**CPU 사용량**: ${data.monit.cpu}%`,
      `**램 사용량**: ${(data.monit.memory / 1048576) | 0}MB`
    ].join('\n')
    field.push({
      name: `${data.name}(${data.pm_id})`,
      value,
      inline: true
    })
  })

  const embed = new Embed(client, 'default')
    .setTitle('프로세스 정보')
    .setFields(field)

  return embed
}
