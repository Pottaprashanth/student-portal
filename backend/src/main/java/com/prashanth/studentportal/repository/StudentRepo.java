
package com.prashanth.studentportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prashanth.studentportal.model.Student;

@Repository
public interface StudentRepo extends JpaRepository<Student, Integer> {

}