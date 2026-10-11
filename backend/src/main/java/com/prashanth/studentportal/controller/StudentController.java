package com.prashanth.studentportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prashanth.studentportal.model.Student;
import com.prashanth.studentportal.service.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
})
public class StudentController {

    @Autowired
    StudentService studentService;

    @PostMapping("/insert")
    public Student saveStudent(@RequestBody Student s) {
        return studentService.saveStudent(s);
    }

    @GetMapping("/get")
    public List<Student> getAllStudents() {
        return studentService.getAllStudent();
    }

    @GetMapping("/getstudent/{id}")
    public Student getStudent(@PathVariable Integer id) {
        return studentService.getStudent(id);
    }

    @PutMapping("/update/{id}")
    public Student updateStudent(
            @PathVariable Integer id,
            @RequestBody Student s) {

        return studentService.updateStudent(id, s);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteStudent(@PathVariable Integer id) {
        studentService.deleteStudent(id);
    }
}