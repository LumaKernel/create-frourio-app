import fs from 'fs'
import path from 'path'
import { API_ORIGIN, API_BASE_PATH, API_USER_ID, API_USER_PASS } from './envValues'
import { MulterFile } from '$/$server'

const iconsDir = 'public/icons'
const createIconURL = (name: string) =>
  `${API_ORIGIN}${API_BASE_PATH}/icons/${name}`
const userInfo = {
  name: 'sample user',
  icon: createIconURL(
    fs
      .readdirSync(path.resolve(iconsDir))
      .filter((n) => n !== 'dummy.svg')
      .pop() ?? 'dummy.svg'
  )
}

export const validateUser = (id: string, pass: string) =>
  id === API_USER_ID && pass === API_USER_PASS

export const getUserInfoById = (id: string) => ({ id, ...userInfo })

export const changeIcon = async (id: string, iconFile: MulterFile) => {
  const iconName = `${Date.now()}${path.extname(iconFile.originalname)}`

  await fs.promises.copyFile(iconFile.path, path.resolve(iconsDir, iconName))
  await fs.promises.unlink(iconFile.path)

  userInfo.icon = createIconURL(iconName)
  return { id, ...userInfo }
}