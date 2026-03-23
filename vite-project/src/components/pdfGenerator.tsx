import { jsPDF } from "jspdf";

/* ---------- MAIN PDF ---------- */
export const generateBookingConfirmationPDF = (
  data: any,
  contact?: any
): jsPDF => {
  const doc = new jsPDF();
  let y = 20;

  const format = (val: any) => `Rs. ${Number(val || 0).toFixed(2)}`;

  /* ---------- HEADER ---------- */
  doc.setFillColor(0, 128, 128);
  doc.rect(0, 0, 210, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("BOOKING CONFIRMATION", 105, 18, { align: "center" });

  doc.setFontSize(10);
  doc.text("Mayan Resort", 105, 25, { align: "center" });

  doc.setTextColor(0, 0, 0);
  y = 40;

  /* ---------- CUSTOMER ---------- */
  const c = data.customerDetails;

  doc.setFillColor(245, 245, 245);
  doc.roundedRect(12, y - 6, 186, 32, 4, 4, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Customer Details", 16, y);

  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  doc.text(`Name: ${c.firstName} ${c.lastName}`, 16, y);
  y += 6;
  doc.text(`Email: ${c.email}`, 16, y);
  y += 6;
  doc.text(`Phone: ${c.phone}`, 16, y);

  y += 18;

  /* ---------- BOOKINGS ---------- */
  data.bookingSummary.forEach((b: any, index: number) => {
    doc.setFillColor(230, 247, 255);
    doc.roundedRect(12, y - 6, 186, 12, 3, 3, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`${index + 1}. ${b.packageTitle}`, 16, y + 2);

    y += 12;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    doc.text("Booking Date:", 16, y);
    doc.text(b.bookingDate || "-", 100, y);

    y += 6;

    doc.text("Arrival Date:", 16, y);
    doc.text(b.arrivingDate || "-", 100, y);

    y += 6;

    doc.text("Guests:", 16, y);
    doc.text(
      `${b.adults || 0} Adults, ${b.children || 0} Children`,
      100,
      y
    );

    y += 10;

    doc.roundedRect(12, y - 6, 186, 36, 4, 4);

    doc.text("Subtotal", 16, y);
    doc.text(format(b.subtotal), 190, y, { align: "right" });

    y += 7;

    doc.text("Tax", 16, y);
    doc.text(format(b.tax), 190, y, { align: "right" });

    y += 7;

    doc.text("Discount", 16, y);
    doc.text(format(b.discount), 190, y, { align: "right" });

    y += 8;

    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 128, 0);

    doc.text("Grand Total", 16, y);
    doc.text(format(b.grandTotal), 190, y, { align: "right" });

    doc.setTextColor(0, 0, 0);

    y += 18;

    if (y > 250) {
      doc.addPage();
      y = 20;
    }
  });

  /* ---------- CONTACT (API + FALLBACK) ---------- */
  const contactInfo = {
    address:
      contact?.Address ||
      "Javanammana Doddi, Virupasandra, Karnataka 562117",
    phone: contact?.MobileNo || "+91 7899192277",
    email:
      contact?.Email?.trim() ||
      "infomayansresort@gmail.com",
  };

  let footerY = 270;

  /* LINE */
  doc.setDrawColor(220);
  doc.line(20, footerY - 8, 190, footerY - 8);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80);

  /* TEXT */
  doc.text("Thank you for choosing Mayan Resort", 105, footerY, {
    align: "center",
  });

  footerY += 6;

  doc.text(`Phone: ${contactInfo.phone}`, 105, footerY, {
    align: "center",
  });

  footerY += 5;

  doc.text(`Email: ${contactInfo.email}`, 105, footerY, {
    align: "center",
  });

  footerY += 5;

  doc.text(contactInfo.address, 105, footerY, {
    align: "center",
    maxWidth: 170,
  });

  footerY += 6;

  doc.setFont("helvetica", "italic");
  doc.text("We look forward to welcoming you!", 105, footerY, {
    align: "center",
  });

  return doc;
};

/* ---------- BASE64 ---------- */
export const generateBookingPDFBase64 = (
  data: any,
  contact?: any
): string => {
  return generateBookingConfirmationPDF(data, contact)
    .output("datauristring")
    .split(",")[1];
};

/* ---------- DOWNLOAD ---------- */
export const downloadBookingPDF = (
  data: any,
  contact?: any,
  filename: string = "booking-confirmation.pdf"
) => {
  generateBookingConfirmationPDF(data, contact).save(filename);
};