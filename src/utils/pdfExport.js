import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export async function exportToPDF(title = 'Traivio Report', orgName = 'Acme Corp', dateRange = 'Q2 2025') {
  const pdf = new jsPDF('p', 'mm', 'a4')
  const w = pdf.internal.pageSize.getWidth()
  const h = pdf.internal.pageSize.getHeight()

  // Cover page
  pdf.setFillColor(26, 5, 51)
  pdf.rect(0, 0, w, h, 'F')

  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(28)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Traivio', 20, 50)

  pdf.setFontSize(13)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(196, 181, 253)
  pdf.text('AI-powered travel intelligence', 20, 60)

  pdf.setFillColor(124, 58, 237)
  pdf.rect(0, 80, w, 1, 'F')

  pdf.setFontSize(22)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(255, 255, 255)
  pdf.text(title, 20, 110)

  pdf.setFontSize(13)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(196, 181, 253)
  pdf.text(orgName, 20, 122)
  pdf.text(dateRange, 20, 132)

  pdf.setFontSize(10)
  pdf.setTextColor(148, 163, 184)
  pdf.text(`Generated ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`, 20, h - 20)
  pdf.text('Traivio · Confidential', w - 20, h - 20, { align: 'right' })

  pdf.addPage()
  return pdf
}

export async function captureSection(elementId, pdf, title) {
  const el = document.getElementById(elementId)
  if (!el) return

  const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#ffffff' })
  const imgData = canvas.toDataURL('image/png')

  const w = pdf.internal.pageSize.getWidth()
  const margin = 15
  const usableW = w - margin * 2
  const ratio = canvas.height / canvas.width
  const imgH = usableW * ratio

  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(26, 5, 51)
  pdf.text(title, margin, 25)

  pdf.addImage(imgData, 'PNG', margin, 35, usableW, Math.min(imgH, 220))
}
