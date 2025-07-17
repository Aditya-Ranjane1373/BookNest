package com.Hotel.Controller;

import com.HotelModel.Booking;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;


import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

public class PDFGenerator {
    public static void generateInvoice(HttpServletResponse response, Booking booking) throws IOException {
        Document document = new Document();
        try {
            PdfWriter.getInstance(document, response.getOutputStream());
            document.open();

            Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph title = new Paragraph("Hotel Booking Invoice", font);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            document.add(new Paragraph("Booking ID: " + booking.getId()));
            document.add(new Paragraph("Customer: " + booking.getCustomer().getName()));
            document.add(new Paragraph("Room: " + booking.getRoom().getRoomType()));
            document.add(new Paragraph("Check-in Date: " + booking.getCheckInDate()));
            document.add(new Paragraph("Check-out Date: " + booking.getCheckOutDate()));
            document.add(new Paragraph("Total Amount: ₹" + booking.getTotalAmount()));

        } catch (DocumentException e) {
            e.printStackTrace();
        } finally {
            document.close();
        }
    }
}

