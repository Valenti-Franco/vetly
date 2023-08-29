import fs from 'node:fs'
import path from 'node:path'

const usersFilePath = path.join(process.cwd(), 'server', 'db', 'users.json')
const categoriesFilePath = path.join(process.cwd(), 'server', 'db', 'categories.json')

// Read files (users or categories) and return it like JSON
export function getAllItems (collection = 'users') {
  if (collection === 'categories') {
    try {
      const data = fs.readFileSync(categoriesFilePath, 'utf8')
      return JSON.parse(data)
    } catch (error) {
      return []
    }
  }

  try {
    const data = fs.readFileSync(usersFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

// Write users JSON file
export function saveItem (item) {
  fs.writeFileSync(usersFilePath, JSON.stringify(item, null, 2), 'utf8')
}
