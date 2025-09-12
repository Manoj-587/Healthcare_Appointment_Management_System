package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.dto.AppointmentRequest;
import com.examly.springapp.model.Appointment;
import com.examly.springapp.service.AppointmentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/patient/book")
    public ResponseEntity<Appointment> bookAppointment(@Valid @RequestBody AppointmentRequest request, 
            Authentication authentication) {
        try {
            String patientEmail = authentication.getName();
            Appointment appointment = appointmentService.createAppointment(request, patientEmail);
            return ResponseEntity.ok(appointment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/patient/my-appointments")
    public ResponseEntity<List<Appointment>> getPatientAppointments(Authentication authentication) {
        String patientEmail = authentication.getName();
        List<Appointment> appointments = appointmentService.getPatientAppointments(patientEmail);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/doctor/my-appointments")
    public ResponseEntity<List<Appointment>> getDoctorAppointments(Authentication authentication) {
        String doctorEmail = authentication.getName();
        List<Appointment> appointments = appointmentService.getDoctorAppointments(doctorEmail);
        return ResponseEntity.ok(appointments);
    }

    @PutMapping("/doctor/{appointmentId}/approve")
    public ResponseEntity<Appointment> approveAppointment(@PathVariable Integer appointmentId, 
            Authentication authentication) {
        try {
            String doctorEmail = authentication.getName();
            Appointment appointment = appointmentService.updateAppointmentStatus(
                appointmentId, Appointment.Status.APPROVED, doctorEmail);
            return ResponseEntity.ok(appointment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/doctor/{appointmentId}/reject")
    public ResponseEntity<Appointment> rejectAppointment(@PathVariable Integer appointmentId, 
            Authentication authentication) {
        try {
            String doctorEmail = authentication.getName();
            Appointment appointment = appointmentService.updateAppointmentStatus(
                appointmentId, Appointment.Status.REJECTED, doctorEmail);
            return ResponseEntity.ok(appointment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{appointmentId}/cancel")
    public ResponseEntity<Appointment> cancelAppointment(@PathVariable Integer appointmentId, 
            Authentication authentication) {
        try {
            String userEmail = authentication.getName();
            Appointment appointment = appointmentService.cancelAppointment(appointmentId, userEmail);
            return ResponseEntity.ok(appointment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }
}