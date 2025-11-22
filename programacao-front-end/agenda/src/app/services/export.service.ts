import { Injectable } from '@angular/core';
import { Contato } from '../models/contato';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  exportCSV(contatos: Contato[]) {
    const header = 'Nome,Telefone,E-mail\n';
    const linhas = contatos
      .map(c => `${c.nome},${c.telefone},${c.email}`)
      .join('\n');

    const csv = header + linhas;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'contatos.csv';
    link.click();
  }

  async exportPDF(contatos: Contato[]) {
    const pdf = await PDFDocument.create();
    const page = pdf.addPage();
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const { width, height } = page.getSize();

    let y = height - 40;

    page.drawText('Lista de Contatos', {
      x: 40,
      y,
      size: 18,
      font,
      color: rgb(0, 0, 0)
    });

    y -= 30;

    contatos.forEach(c => {
      page.drawText(`Nome: ${c.nome}`, { x: 40, y, size: 12, font });
      y -= 18;
      page.drawText(`Telefone: ${c.telefone}`, { x: 40, y, size: 12, font });
      y -= 18;
      page.drawText(`E-mail: ${c.email}`, { x: 40, y, size: 12, font });
      y -= 25;
    });

    const pdfBytes = await pdf.save();
    const arr = new Uint8Array(pdfBytes);
    const realBuffer = arr.slice().buffer;

    const blob = new Blob([realBuffer], { type: 'application/pdf' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'contatos.pdf';
    link.click();
  }
}
