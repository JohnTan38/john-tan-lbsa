import { readFile } from 'node:fs/promises'
import path from 'node:path'
import {
  RESUME_PDF_FILENAME,
  RESUME_PDF_PUBLIC_PATH,
} from '@/lib/resumeDownload'

export const runtime = 'nodejs'

export async function GET() {
  const relativePublicPath = RESUME_PDF_PUBLIC_PATH.replace(/^\/+/, '')
  const filePath = path.join(process.cwd(), 'public', relativePublicPath)
  const fileBuffer = await readFile(filePath)

  return new Response(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${RESUME_PDF_FILENAME}"`,
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Content-Length': fileBuffer.byteLength.toString(),
    },
  })
}
