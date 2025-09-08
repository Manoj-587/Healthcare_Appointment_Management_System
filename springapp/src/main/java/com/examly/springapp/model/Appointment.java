package com.examly.springapp.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
@Table(name = "appointments")
public class Appointment {  

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @NotNull(message = "Patient is mandatory")
    private Patient patient;
    @ManyToOne
    @NotNull(message = "Doctor is mandatory")
    private Doctor doctor;
    @FutureOrPresent(message = "Appointment date must be today or in the future")
    private LocalDate appointmentDate;
    @NotNull(message = "Appointment time is mandatory")
    private LocalTime appointmentTime;
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Status status; // e.g., "Scheduled", "Completed", "Cancelled"

    public enum Status {
        SCHEDULED,
        COMPLETED,
        CANCELLED,
        REQUESTED
    }
}
