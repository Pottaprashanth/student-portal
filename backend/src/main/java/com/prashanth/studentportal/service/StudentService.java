package com.prashanth.studentportal.service;

import java.util.List;

import com.prashanth.studentportal.model.Student;

public interface StudentService {

    Student saveStudent(Student s);

    Student getStudent(Integer id);

    void deleteStudent(Integer id);

    List<Student> getAllStudent();

    Student updateStudent(Integer id, Student s);
}