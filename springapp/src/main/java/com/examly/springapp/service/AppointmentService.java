package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Appointment;
import com.examly.springapp.repository.AppointmentRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment updateAppointmentById(int id, Appointment appointment) {
        if(appointmentRepository.existsById(id)) {
            appointment.setId(id);
        } else {
            throw new RuntimeException("Appointment with id " + id + " not found");
        }
        return appointmentRepository.save(appointment);
    }

    public String deleteAppointmentById(int id) {
        if(appointmentRepository.existsById(id)) {
            appointmentRepository.deleteById(id);
        } else {
            throw new RuntimeException("Appointment with id " + id + " not found");
        }
        return "Appointment with id " + id + " deleted successfully.";
    }


}
