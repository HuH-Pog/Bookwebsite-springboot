package com.example.VIT_Semester_Result_Springboot.repository;

import com.example.VIT_Semester_Result_Springboot.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
}
