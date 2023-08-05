package com.school.studentservice.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.school.studentservice.model.Student;
import com.school.studentservice.service.StudentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("student")
@RequiredArgsConstructor
public class StudentController2 {
	
	private final StudentService studentService;
	
	@GetMapping
	public ResponseEntity<Page<Student>> getAllStudent_and_searchByTxt() {
		
		return ResponseEntity.ok( this.studentService.findBy_name_lastName("", 0, 10));
	}
	
	

}
