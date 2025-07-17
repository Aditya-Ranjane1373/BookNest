package com.Hotel.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Hotel.Service.RazorpayService;
import com.razorpay.Order;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private RazorpayService razorpayService;

    @PostMapping("/create-order/{amount}")
    public String createOrder(@PathVariable double amount) {
        try {
            Order order = razorpayService.createOrder(amount);
            return order.toString(); // sends order_id, amount, currency to frontend
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to create Razorpay order";
        }
    }
}
