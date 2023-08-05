package com.school.studentservice.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.school.studentservice.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long>  {
	
	
	@Query("select s from Student s where upper(s.name) like upper(concat('%',?1,'%'))"
			+ " or  upper(s.lastName) like upper(concat('%',?1,'%'))")
	public Page<Student>  findAllBy_name_lastName(String text,Pageable pageable);
	
	
}
