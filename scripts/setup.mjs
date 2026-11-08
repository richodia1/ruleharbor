import fs from 'node:fs'
import crypto from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const destination = path.join(root, '.env')
if (fs.existsSync(destination)) {
  console.log('Existing .env preserved.')
} else {
  const template = fs.readFileSync(path.join(root, '.env.example'), 'utf8')
  fs.writeFileSync(destination, template.replace('POSTGRES_PASSWORD=\n', `POSTGRES_PASSWORD=${crypto.randomBytes(24).toString('hex')}\n`), { mode: 0o600, flag: 'wx' })
  console.log('Created ignored .env with a random local database password.')
}
