package com.examly.springapp.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.dto.AppointmentRequest;
import com.examly.springapp.model.Appointment;
import com.examly.springapp.model.Doctor;
import com.examly.springapp.model.Patient;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.AppointmentRepository;
import com.examly.springapp.repository.DoctorRepository;
import com.examly.springapp.repository.PatientRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;
    
    @Autowired
    private UserService userService;

    public Appointment createAppointment(AppointmentRequest request, String patientEmail) {
        User patientUser = userService.findByEmail(patientEmail);
        Patient patient = patientRepository.findByUser(patientUser)
                .orElseThrow(() -> new RuntimeException("Patient profile not found"));

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        validateAppointment(doctor, request.getAppointmentDate(), request.getAppointmentTime());

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setAppointmentTime(request.getAppointmentTime());
        appointment.setReason(request.getReason());
        appointment.setStatus(Appointment.Status.PENDING);

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getPatientAppointments(String patientEmail) {
        User patientUser = userService.findByEmail(patientEmail);
        Patient patient = patientRepository.findByUser(patientUser)
                .orElseThrow(() -> new RuntimeException("Patient profile not found"));
        return appointmentRepository.findByPatientId(patient.getId());
    }
    
    public List<Appointment> getDoctorAppointments(String doctorEmail) {
        User doctorUser = userService.findByEmail(doctorEmail);
        Doctor doctor = doctorRepository.findByUser(doctorUser)
                .orElseThrow(() -> new RuntimeException("Doctor profile not found"));
        return appointmentRepository.findByDoctorId(doctor.getId());
    }
    
    public Appointment updateAppointmentStatus(Integer appointmentId, Appointment.Status status, String doctorEmail) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        User doctorUser = userService.findByEmail(doctorEmail);
        Doctor doctor = doctorRepository.findByUser(doctorUser)
                .orElseThrow(() -> new RuntimeException("Doctor profile not found"));
        
        if (!appointment.getDoctor().getId().equals(doctor.getId())) {
            throw new RuntimeException("Unauthorized to update this appointment");
        }
        
        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }
    
    public Appointment cancelAppointment(Integer appointmentId, String userEmail) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        User user = userService.findByEmail(userEmail);
        boolean authorized = false;
        
        if (user.getRole() == User.Role.PATIENT) {
            Patient patient = patientRepository.findByUser(user)
                    .orElseThrow(() -> new RuntimeException("Patient profile not found"));
            authorized = appointment.getPatient().getId().equals(patient.getId());
        } else if (user.getRole() == User.Role.DOCTOR) {
            Doctor doctor = doctorRepository.findByUser(user)
                    .orElseThrow(() -> new RuntimeException("Doctor profile not found"));
            authorized = appointment.getDoctor().getId().equals(doctor.getId());
        }
        
        if (!authorized) {
            throw new RuntimeException("Unauthorized to cancel this appointment");
        }
        
        appointment.setStatus(Appointment.Status.CANCELLED);
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    private void validateAppointment(Doctor doctor, LocalDate date, LocalTime time) {
        if (doctor.getDailyAvailability() == null) {
            throw new RuntimeException("Doctor availability not set");
        }
        
        DayOfWeek day = date.getDayOfWeek();
        String dayName = day.name();

        Map<String, String> availability = doctor.getDailyAvailability();
        if (!availability.containsKey(dayName)) {
            throw new RuntimeException("Doctor is not available on " + dayName);
        }

        String slots = availability.get(dayName);
        if (slots == null || slots.trim().isEmpty()) {
            throw new RuntimeException("Doctor has no available slots on " + dayName);
        }
        
        boolean valid = false;
        for (String slot : slots.split(",")) {
            String[] parts = slot.trim().split("-");
            if (parts.length == 2) {
                LocalTime start = LocalTime.parse(parts[0].trim());
                LocalTime end = LocalTime.parse(parts[1].trim());
                if (!time.isBefore(start) && !time.isAfter(end)) {
                    valid = true;
                    break;
                }
            }
        }

        if (!valid) {
            throw new RuntimeException("Selected time is not within doctor's available slots on " + dayName);
        }
    }
}