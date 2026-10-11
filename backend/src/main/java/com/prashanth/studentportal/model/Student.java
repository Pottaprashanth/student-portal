package com.prashanth.studentportal.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="student")
@Setter
@Getter
public class Student {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	Integer sid;
	String firstname;
	String lastname;
	int age;
	double marks;
	String city;
	
	

}
