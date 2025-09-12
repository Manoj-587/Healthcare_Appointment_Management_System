package com.examly.springapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.util.Map;

import com.examly.springapp.converter.MapToJsonConverter;

@Entity
@Data
@Table(name = "doctors")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NotBlank(message = "Specialization is mandatory")
    @Size(min = 3, max = 100)
    private String specialization;

    @Pattern(regexp = "\\d{10}", message = "Phone number should be 10 digits")
    private String phoneNumber;

    @NotBlank(message = "Qualifications are mandatory")
    private String qualifications;
    
    private String clinicName;
    
    private String contactInfo;

    // Store daily availability as JSON in the database
    // Example: {"MONDAY":"09:00-12:00,14:00-17:00", "TUESDAY":"09:00-12:00"}
    @Convert(converter = MapToJsonConverter.class)
    private Map<String, String> dailyAvailability;
}
