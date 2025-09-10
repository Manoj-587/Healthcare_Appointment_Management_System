package com.examly.springapp.repository;

import com.examly.springapp.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {

    boolean existsByEmail(String email);

    boolean existsByPhoneNumber(String phoneNumber);

    Patient findByEmail(String email);

    Patient findByPhoneNumber(String phoneNumber);

    
}
