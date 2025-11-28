import { ResumeData } from "./types";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';

import { DevFolioTemplate } from "@/components/resume-builder/templates/portfolios/DevFolioTemplate";
import { DesignerFolioTemplate } from "@/components/resume-builder/templates/portfolios/DesignerFolioTemplate";
import { SimpleFolioTemplate } from "@/components/resume-builder/templates/portfolios/SimpleFolioTemplate";
import { CorporateFolioTemplate } from "@/components/resume-builder/templates/portfolios/CorporateFolioTemplate";
import { ArtisticFolioTemplate } from "@/components/resume-builder/templates/portfolios/ArtisticFolioTemplate";

export const exportToPDF = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found:", elementId);
    return;
  }

  try {
    // Clone the element to avoid messing with the live preview and handle scaling
    const clone = element.cloneNode(true) as HTMLElement;
    
    // Reset styles that affect layout/scale for the capture
    clone.style.transform = "scale(1)"; // Force scale to 1
    clone.style.transformOrigin = "top left";
    clone.style.margin = "0";
    clone.style.position = "absolute";
    clone.style.top = "0";
    clone.style.left = "0";
    clone.style.zIndex = "-9999";
    clone.style.width = "210mm"; // Force A4 width
    clone.style.minHeight = "297mm";
    
    // Append to a hidden container to ensure styles are applied but not visible
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "-9999px";
    container.style.left = "-9999px";
    container.style.width = "210mm"; // Match clone width
    container.style.overflow = "visible"; // Allow full content to be visible to html2canvas
    container.appendChild(clone);
    document.body.appendChild(container);

    // Wait a moment for styles to settle (sometimes needed for fonts/images)
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(clone, {
      scale: 2, // High resolution
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: clone.offsetWidth,
      height: clone.scrollHeight, // Capture full scroll height
      windowWidth: clone.offsetWidth,
      windowHeight: clone.scrollHeight,
    });

    // Cleanup
    document.body.removeChild(container);

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error("PDF Export failed:", error);
  }
};

export const exportToDOCX = async (data: ResumeData, fileName: string) => {
  try {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: data.personal.fullName,
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              children: [
                new TextRun({ text: data.personal.email }),
                new TextRun({ text: " | " }),
                new TextRun({ text: data.personal.phone || "" }),
                new TextRun({ text: " | " }),
                new TextRun({ text: data.personal.location || "" }),
              ],
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({ text: "" }), // Spacer
            
            // Summary
            ...(data.personal.summary ? [
              new Paragraph({
                text: "Professional Summary",
                heading: HeadingLevel.HEADING_2,
              }),
              new Paragraph({
                text: data.personal.summary,
              }),
              new Paragraph({ text: "" }),
            ] : []),

            // Experience
            ...(data.experience.length > 0 ? [
              new Paragraph({
                text: "Experience",
                heading: HeadingLevel.HEADING_2,
              }),
              ...data.experience.flatMap(exp => [
                new Paragraph({
                  children: [
                    new TextRun({ text: exp.position, bold: true }),
                    new TextRun({ text: ` at ${exp.company}` }),
                  ]
                }),
                new Paragraph({
                  text: `${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''}`,
                  style: "Heading 4"
                }),
                new Paragraph({ text: exp.description || "" }),
                new Paragraph({ text: "" }),
              ])
            ] : []),

             // Education
             ...(data.education.length > 0 ? [
              new Paragraph({
                text: "Education",
                heading: HeadingLevel.HEADING_2,
              }),
              ...data.education.flatMap(edu => [
                new Paragraph({
                  children: [
                    new TextRun({ text: edu.degree, bold: true }),
                    new TextRun({ text: `, ${edu.institution}` }),
                  ]
                }),
                new Paragraph({
                  text: `${edu.startDate || ''} - ${edu.endDate || ''}`,
                }),
                new Paragraph({ text: "" }),
              ])
            ] : []),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${fileName}.docx`);
  } catch (error) {
    console.error("DOCX Export failed:", error);
  }
};

export const exportToHTMLZIP = async (data: ResumeData, fileName: string, templateId: string = "simple") => {
    let Component;
    
    // Select the correct component
    switch (templateId) {
        case "dev":
            Component = DevFolioTemplate;
            break;
        case "designer":
            Component = DesignerFolioTemplate;
            break;
        case "corporate":
            Component = CorporateFolioTemplate;
            break;
        case "artistic":
            Component = ArtisticFolioTemplate;
            break;
        case "simple":
        default:
            Component = SimpleFolioTemplate;
            break;
    }

    // Render the component to static HTML
    const div = document.createElement('div');
    const root = createRoot(div);
    
    // Use flushSync to ensure synchronous rendering
    flushSync(() => {
        root.render(<Component data={data} />);
    });
    
    // Brief timeout to ensure render completes (though flushSync should handle it)
    await new Promise(resolve => setTimeout(resolve, 0));

    const componentHtml = div.innerHTML;
    
    // Cleanup
    setTimeout(() => root.unmount(), 0);

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personal.fullName} - Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Reset and Base Styles */
        body { margin: 0; padding: 0; }
    </style>
</head>
<body>
    ${componentHtml}
</body>
</html>
    `;

    const zip = new JSZip();
    zip.file("index.html", htmlContent);
    
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `${fileName}-portfolio.zip`);
};
