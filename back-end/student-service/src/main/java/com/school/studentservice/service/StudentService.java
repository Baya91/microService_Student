package com.school.studentservice.service;

import java.util.List;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import com.school.studentservice.model.Student;
import com.school.studentservice.repository.StudentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentService {
	
	private final StudentRepository studentRepository;
	
	
	public Page<Student> findBy_name_lastName(String txt,Integer page, Integer size) {
			
		log.info("fetching studens for page {} of size {}",page,size);
		return this.studentRepository.findAllBy_name_lastName(txt, PageRequest.of(page, size));

	}
	
	
	public Student getStudentById(Long id) {
		log.info("seccuss deletid studens ");
		return this.studentRepository.findById(id).get();
	}
	
	
	
	public void removeStudent(Long id) {
		log.info("seccuss deletid studens ");
		 this.studentRepository.deleteById(id);
	}
	
	
	
	public Student save(Student student) {
		log.info("seccuss save studens ");
		return this.studentRepository.save(student);
	}
	
	
	public Student editStudent(Student student) {
		log.info("seccuss update studens ");
		return this.studentRepository.save(student);
	}
		


	

	
	

	
}
