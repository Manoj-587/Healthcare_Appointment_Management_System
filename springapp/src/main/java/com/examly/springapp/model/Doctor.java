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

    @NotBlank(message = "Name is mandatory")
    @Size(min = 3, max = 50)
    private String name;

    @NotBlank(message = "Specialization is mandatory")
    @Size(min = 3, max = 100)
    private String specialization;

    @Email(message = "Email should be valid")
    private String email;

    @Pattern(regexp = "\\d{10}", message = "Phone number should be 10 digits")
    private String phoneNumber;

    @NotBlank(message = "Password is mandatory")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    @NotBlank(message = "Qualifications are mandatory")
    private String qualifications;

    // Store daily availability as JSON in the database
    // Example: {"MONDAY":"09:00-12:00,14:00-17:00", "TUESDAY":"09:00-12:00"}
    @Convert(converter = MapToJsonConverter.class)
    private Map<String, String> dailyAvailability;
}
