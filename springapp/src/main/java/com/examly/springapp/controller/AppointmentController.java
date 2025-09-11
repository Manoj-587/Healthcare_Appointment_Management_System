package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.dto.AppointmentRequest;
import com.examly.springapp.model.Appointment;
import com.examly.springapp.service.AppointmentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:8081")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // @PostMapping
    // public Appointment createAppointment(@Valid @RequestBody Appointment appointment) {
    //     return appointmentService.createAppointment(appointment);
    // }

    @GetMapping
    public List<Appointment> getAppointments() {
        return appointmentService.getAllAppointments();
    }

    @PutMapping("/{id}")
    public Appointment updateAppointment(@PathVariable int id,@Valid @RequestBody Appointment appointment) {
        return appointmentService.updateAppointmentById(id, appointment);
    }    

    @DeleteMapping("/{id}")
    public String deleteAppointment(@PathVariable int id) {
        return appointmentService.deleteAppointmentById(id);
    }

    @GetMapping("/patient/{patientId}")
    public List<Appointment> getAppointmentsByPatient(@PathVariable Integer patientId) {
        return appointmentService.getAppointmentsByPatient(patientId);  
    }

    @PutMapping("/cancel/{id}")
    public String cancelAppointment(@PathVariable int id) {
        appointmentService.cancelAppointment(id);
        return "Appointment with id " + id + " cancelled successfully.";
    }

    @PostMapping
    public Appointment createAppointment(@Valid @RequestBody AppointmentRequest request) {
        return appointmentService.createAppointment(
                request.getPatientId(),
                request.getDoctorId(),
                request.getAppointmentDate(),
                request.getAppointmentTime(),
                request.getReason()
        );
    }
}
