package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Doctor;
import com.examly.springapp.repository.AppointmentRepository;
import com.examly.springapp.repository.DoctorRepository;

@Service
public class DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    // @Autowired
    // private PasswordEncoder passwordEncoder;

    public Doctor createDoctor(Doctor doctor) {
        // doctor.setPassword(passwordEncoder.encode(doctor.getPassword()));
        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor updateDoctorById(int id, Doctor doctor) {
        if(doctorRepository.existsById(id)) {
            doctor.setId(id);
        } else {
            throw new RuntimeException("Doctor with id " + id + " not found");
        }
        return doctorRepository.save(doctor);
    }

    public String deleteDoctorById(int id) {
        if(doctorRepository.existsById(id)) {
            long count = appointmentRepository.countByDoctorId(id);
            if(count > 0) {
                throw new RuntimeException("Cannot delete doctor with id " + id + " as there are existing appointments associated.");
            }
            doctorRepository.deleteById(id);
        } else {
            throw new RuntimeException("Doctor with id " + id + " not found");
        }
        return "Doctor with id " + id + " deleted successfully";
    }

}
