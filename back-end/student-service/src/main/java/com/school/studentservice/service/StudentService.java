package com.school.studentservice.service;

import java.util.List;

import javax.validation.constraints.Size;

import org.hibernate.validator.internal.constraintvalidators.bv.number.sign.NegativeOrZeroValidatorForLong;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.school.studentservice.exception.ResourceNotFoundException;
import com.school.studentservice.exception.ValidationMessages;
import com.school.studentservice.model.Student;
import com.school.studentservice.repository.StudentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentService {
	
	private final StudentRepository studentRepository;
	
	
	public Page<Student> findBy_name_lastName(String txt, Integer size,Integer page) {
			
		log.info("fetching studens for page {} of size {}",page,size);
		return this.studentRepository.findAllBy_name_lastName(txt, PageRequest.of(page, size));

	}
	
	
	
	
	public void removeStudent(Long id) {
		log.info("seccuss deletid studens ");
		 this.studentRepository.deleteById(id);
	}
	
	
	
	public Student save(Student student) {
		return this.studentRepository.save(student);
	}
	
	
	public Student editStudent(Student student) {
		return this.studentRepository.save(student);
	}
		

	
	public Student Student_by_Id(Long id){
		return this.studentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ValidationMessages.RESOURCE_NO_FOUND));
	}
	
	public  List<Student> studentBy_name_lastName(String text, Integer size,Integer page) {
		Pageable pageable =PageRequest.of(page,size);
		return this.studentRepository.findAllBy_name_lastName(text,pageable).getContent();
	}
	
	
	
	public List<Student> allStudentByPage( Integer size,Integer page){
		Pageable pageable =PageRequest.of(page,size);
		return this.studentRepository.findAll(pageable).getContent();
	}
	
	public List<Student> allStudent(){
		return this.studentRepository.findAll();
	}
}
