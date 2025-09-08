package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Appointment;
import com.examly.springapp.service.AppointmentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping
    public Appointment createAppointment(@Valid @RequestBody Appointment appointment) {
        return appointmentService.createAppointment(appointment);
    }

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
}
