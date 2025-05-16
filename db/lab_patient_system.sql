CREATE DATABASE lab_patient_system;
USE lab_patient_system;

CREATE TABLE patients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  birth_date DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
