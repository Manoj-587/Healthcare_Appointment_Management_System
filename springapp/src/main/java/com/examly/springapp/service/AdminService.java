package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Admin;
import com.examly.springapp.repository.AdminRepository;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    // @Autowired
    // private PasswordEncoder passwordEncoder;

    public Admin createAdmin(Admin admin) {
        // admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Admin updateAdmin(int id, Admin admin) {
        if(adminRepository.existsById(id)) {
            admin.setId((long)id);
        } else {
            throw new RuntimeException("Admin with id " + id + " not found");
        }
        return adminRepository.save(admin);
    }

    public String deleteAdmin(int id) {
        if(adminRepository.existsById(id)) {
            adminRepository.deleteById(id);
        } else {
            throw new RuntimeException("Admin with id " + id + " not found");
        }
        return "Admin with id " + id + " deleted successfully.";
    }

}
