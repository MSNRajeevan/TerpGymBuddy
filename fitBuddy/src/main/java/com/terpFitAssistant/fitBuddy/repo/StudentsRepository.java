package com.terpFitAssistant.fitBuddy.repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.terpFitAssistant.fitBuddy.models.Student;


public interface StudentsRepository extends JpaRepository<Student, Long> {

}
