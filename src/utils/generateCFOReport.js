import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import React from 'react'
import { createRoot } from 'react-dom/client'
import CFOReport from '../components/reports/CFOReport'

export async function downloadCFOReport(stats, orgName = 'Acme Corp') {
  // ── 1. Create a hidden off-screen container ────────────────────────────────
  const container = document.createElement('div')
  container.style.cssText = [
    'position:fixed',
    'left:-9999px',
    'top:0',
    'width:794px',
    'background:white',
    'z-index:-1',
  ].join(';')
  document.body.appendChild(container)

  // ── 2. Render the report component into the container ──────────────────────
  const root = createRoot(container)
  await new Promise(resolve => {
    root.render(React.createElement(CFOReport, { stats, orgName }))
    // Give React time to flush + fonts/images to settle
    setTimeout(resolve, 600)
  })

  // ── 3. Capture at 2× scale (retina quality) ────────────────────────────────
  const canvas = await html2canvas(container, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    width: 794,
    logging: false,
    windowWidth: 794,
  })

  // ── 4. Build the PDF ───────────────────────────────────────────────────────
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: 'a4',
  })

  const pdfW = pdf.internal.pageSize.getWidth()   // px at 72dpi ≈ 595
  const pdfH = pdf.internal.pageSize.getHeight()  // px at 72dpi ≈ 842

  // canvas is 2× → logical size is canvas / 2
  const logicalW = canvas.width / 2
  const logicalH = canvas.height / 2

  const ratio        = pdfW / logicalW
  const scaledHeight = logicalH * ratio
  const imgData      = canvas.toDataURL('image/png')

  // Paginate: slice the canvas into page-sized chunks
  let yOffset = 0
  let remaining = scaledHeight

  while (remaining > 0) {
    pdf.addImage(imgData, 'PNG', 0, -yOffset, pdfW, scaledHeight)
    remaining -= pdfH
    yOffset   += pdfH
    if (remaining > 0) pdf.addPage()
  }

  // ── 5. Save ─────────────────────────────────────────────────────────────────
  const date = new Date().toISOString().split('T')[0]
  pdf.save(`traivio-cfo-report-${date}.pdf`)

  // ── 6. Cleanup ───────────────────────────────────────────────────────────────
  root.unmount()
  document.body.removeChild(container)
}
