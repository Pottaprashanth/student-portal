package com.prashanth.studentportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashanth.studentportal.model.Student;
import com.prashanth.studentportal.repository.StudentRepo;

@Service
public class StudentServiceImp implements StudentService {

    @Autowired
    StudentRepo studentRepo;

    @Override
    public Student saveStudent(Student s) {
        return studentRepo.save(s);
    }

    @Override
    public Student getStudent(Integer id) {

        return studentRepo.findById(id)
                .orElseThrow(() ->
                    new RuntimeException(
                        "Student not found with ID: " + id
                    )
                );
    }

    @Override
    public void deleteStudent(Integer id) {

        Student student = studentRepo.findById(id)
                .orElseThrow(() ->
                    new RuntimeException(
                        "Student not found with ID: " + id
                    )
                );

        studentRepo.delete(student);
    }

    @Override
    public List<Student> getAllStudent() {
        return studentRepo.findAll();
    }

    @Override
    public Student updateStudent(Integer id, Student s) {

        Student existingStudent = studentRepo.findById(id)
                .orElseThrow(() ->
                    new RuntimeException(
                        "Student not found with ID: " + id
                    )
                );

        existingStudent.setFirstname(s.getFirstname());
        existingStudent.setLastname(s.getLastname());
        existingStudent.setAge(s.getAge());
        existingStudent.setMarks(s.getMarks());
        existingStudent.setCity(s.getCity());

        return studentRepo.save(existingStudent);
    }
}