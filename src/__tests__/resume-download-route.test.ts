import { GET } from '@/app/download/resume/route'
import {
  RESUME_PDF_FILENAME,
  RESUME_PDF_PUBLIC_PATH,
} from '@/lib/resumeDownload'

describe('resume download route', () => {
  it('returns the resume as an attachment with the expected filename', async () => {
    const response = await GET()
    const contentLength = Number(response.headers.get('Content-Length'))

    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toBe('application/pdf')
    expect(response.headers.get('Content-Disposition')).toBe(
      `attachment; filename="${RESUME_PDF_FILENAME}"`,
    )
    expect(response.headers.get('Cache-Control')).toBe('public, max-age=0, must-revalidate')
    expect(contentLength).toBeGreaterThan(0)

    const body = await response.arrayBuffer()

    expect(body.byteLength).toBe(contentLength)
    expect(RESUME_PDF_PUBLIC_PATH).toBe(`/assets/${RESUME_PDF_FILENAME}`)
  })
})
