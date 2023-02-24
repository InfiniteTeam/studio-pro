import { execSync } from 'child_process'
import { readdirSync, statSync } from 'fs'
import { ProcessList } from './Constants.js'

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

export const getPm2List = (): ProcessList[] | undefined => {
  const lists = JSON.parse(execSync('pm2 jlist').toString()) as ProcessList[]

  if (lists.length == 0) return undefined
  else lists
}
