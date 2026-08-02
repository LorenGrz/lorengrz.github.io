import { readFileSync, existsSync } from 'fs'
import { join, extname, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = join(__dirname, 'public')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain',
  '.pdf': 'application/pdf',
  '.webp': 'image/webp',
}

function serveFile(responseStream, filePath, statusCode = 200) {
  const ext = extname(filePath).toLowerCase()
  const contentType = MIME[ext] || 'application/octet-stream'
  const body = readFileSync(filePath)

  const stream = awslambda.HttpResponseStream.from(responseStream, {
    statusCode,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
    },
  })
  stream.write(body)
  stream.end()
}

export const handler = awslambda.streamifyResponse(async (event, responseStream) => {
  const rawPath = event.path || event.rawPath || '/'
  const path = rawPath === '/' ? '/index.html' : rawPath

  // Strip leading slash for file lookup
  const relativePath = path.startsWith('/') ? path.slice(1) : path
  const filePath = join(PUBLIC_DIR, relativePath)

  if (existsSync(filePath)) {
    return serveFile(responseStream, filePath)
  }

  // Next.js static export: try path/index.html for route paths
  const indexPath = join(PUBLIC_DIR, relativePath, 'index.html')
  if (existsSync(indexPath)) {
    return serveFile(responseStream, indexPath)
  }

  // SPA fallback to root index.html
  const fallback = join(PUBLIC_DIR, 'index.html')
  if (existsSync(fallback)) {
    return serveFile(responseStream, fallback)
  }

  const stream = awslambda.HttpResponseStream.from(responseStream, {
    statusCode: 404,
    headers: { 'Content-Type': 'text/plain' },
  })
  stream.write('Not found')
  stream.end()
})
