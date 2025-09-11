package com.examly.springapp.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Appointment;
import com.examly.springapp.model.Doctor;
import com.examly.springapp.model.Patient;
import com.examly.springapp.repository.AppointmentRepository;
import com.examly.springapp.repository.DoctorRepository;
import com.examly.springapp.repository.PatientRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment createAppointment(Appointment appointment) {
        appointment.setStatus(Appointment.Status.SCHEDULED);
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

    public List<Appointment> getAppointmentsByPatient(Integer patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public void cancelAppointment(int id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment with id " + id + " not found"));
        appointment.setStatus(Appointment.Status.CANCELLED);
        appointmentRepository.save(appointment);    
    }

    //date and time validation 
    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    public Appointment createAppointment(Integer patientId, Integer doctorId, LocalDate date, LocalTime time, String reason) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));

        validateAppointment(doctor, date, time);

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(date);
        appointment.setAppointmentTime(time);
        appointment.setReason(reason);
        appointment.setStatus(Appointment.Status.REQUESTED);

        return appointmentRepository.save(appointment);
    }

    private void validateAppointment(Doctor doctor, LocalDate date, LocalTime time) {
        DayOfWeek day = date.getDayOfWeek();
        String dayName = day.name(); // MONDAY, TUESDAY, etc.

        Map<String, String> availability = doctor.getDailyAvailability();
        if (!availability.containsKey(dayName)) {
            throw new IllegalArgumentException("Doctor is not available on " + dayName);
        }

        String slots = availability.get(dayName); // e.g., "09:00-12:00,14:00-17:00"
        boolean valid = false;
        for (String slot : slots.split(",")) {
            String[] parts = slot.split("-");
            LocalTime start = LocalTime.parse(parts[0]);
            LocalTime end = LocalTime.parse(parts[1]);
            if (!time.isBefore(start) && !time.isAfter(end)) {
                valid = true;
                break;
            }
        }

        if (!valid) {
            throw new IllegalArgumentException("Selected time is not within doctor's available slots on " + dayName);
        }
    }
}
