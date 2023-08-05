package com.school.studentservice.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.school.studentservice.model.HttpResponse_;
import com.school.studentservice.model.Student;
import com.school.studentservice.service.StudentService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/student0")
@RequiredArgsConstructor

public class StudenController {

	private final StudentService studentService;

	private ResponseEntity<HttpResponse_> resultEntity(HttpStatus state, String Message, Object object) {
		return ResponseEntity.ok().body(HttpResponse_.builder().timeStamp((new Date()).toString())
				.data(Map.of("page", object)).message(Message).status(state).statusCode(state.value()).build());
	}

	@GetMapping("students")
	public ResponseEntity<HttpResponse_> searchStudentBy_name_lastName(@RequestParam Optional<String> txt,
			@RequestParam Optional<Integer> size, @RequestParam Optional<Integer> page) throws InterruptedException {
		Page<Student> result = this.studentService.findBy_name_lastName(txt.orElse(""), size.orElse(0),
				page.orElse(10));	
		//TimeUnit.SECONDS.sleep(1);
		//throw new RuntimeException("Error for Search Student");
		return resultEntity(HttpStatus.OK, "Student Retrivied", result);
	}
	
	@DeleteMapping("delete")//localhost..../student/delete/ public
	public ResponseEntity<HttpResponse_> deleteStudent(@RequestParam Long id)  {
	  //this.studentService.removeStudent(id);
		System.out.println("djflksdjflksdjfgkljsdglkjsdfglkjsdlkfgjsdlkgjsldkfgjlskdfg");
		
			  return resultEntity(HttpStatus.OK, "Student Retrivied", "");
	  }
	 @DeleteMapping("delete0")//localhost..../student/delete/ public
	 public ResponseEntity<?> deleteStudent0(@RequestParam Long id)  {
	  //this.studentService.removeStudent(id);
		System.out.println("djflksdjflksdjfgkljsdglkjsdfglkjsdlkfgjsdlkgjsldkfgjlskdfg");
		 return  ResponseEntity.status(HttpStatus.OK).body(null);
			 
	  }
	
	 @DeleteMapping("delete1")//localhost..../student/delete/ public
	 public void deleteStudent1(@RequestParam Long id)  {
	  //this.studentService.removeStudent(id);
		System.out.println("djflksdjflksdjfgkljsdglkjsdfglkjsdlkfgjsdlkgjsldkfgjlskdfg");
		
			 
	  }

	/*
	 * @GetMapping("students") public ResponseEntity<HttpResponse_>
	 * searchStudentBy_name_lastName(@RequestParam Optional<String> txt,
	 * 
	 * @RequestParam Optional<Integer> size, @RequestParam Optional<Integer> page) {
	 * 
	 * 
	 * 
	 * return ResponseEntity.ok(). body( HttpResponse_.builder(). timeStamp((new
	 * Date()).toString()).
	 * data(Map.of("data",this.studentService.findBy_name_lastName(txt.orElse(""),
	 * size.orElse(0), page.orElse(10)))). message("Student REtrivied").
	 * status(HttpStatus.OK). statusCode(HttpStatus.OK.value()). build()); }
	 * 
	 * 
	 * .status(HttpStatus.OK)
	 * .body(studentService.findBy_name_lastName(txt.orElse(""), size.orElse(0),
	 * page.orElse(10)));
	 * 
	 * 
	 * @PostMapping("save")//localhost..../student/save/ public
	 * ResponseEntity<Student> saveStudent(@RequestBody Student student) { return
	 * ResponseEntity.status(HttpStatus.CREATED).body(this.studentService.save(
	 * student)); }
	 * 
	 * 
	 * @PutMapping("update")//localhost..../student/update/ public
	 * ResponseEntity<Student> updateStudent(@RequestBody Student student) { return
	 * ResponseEntity.status(HttpStatus.OK).body(this.studentService.editStudent(
	 * student)); }
	 * 
	 * 
	 * @DeleteMapping("delete")//localhost..../student/delete/ public
	 * ResponseEntity<?> deleteStudent(@RequestParam Long id) {
	 * System.out.println("kjdkjd"); this.studentService.removeStudent(id); return
	 * ResponseEntity.status(HttpStatus.OK).body(null); }
	 * 
	 * 
	 * 
	 * 
	 * 
	 * @GetMapping("show") public ResponseEntity<Student> get_By_Id(@RequestParam
	 * Long id){ return
	 * ResponseEntity.status(HttpStatus.OK).body(studentService.Student_by_Id(id)) ;
	 * }
	 * 
	 * 
	 * @GetMapping("search_by") public ResponseEntity<List<Student>>
	 * getBy_name_LastName(@RequestParam String text,@RequestParam Integer
	 * size,@RequestParam Integer page) { return
	 * ResponseEntity.status(HttpStatus.CREATED).body(this.studentService.
	 * studentBy_name_lastName(text,size,page)); }
	 * 
	 * 
	 * /*@GetMapping("students") public ResponseEntity<List<Student>>
	 * getAll(@RequestParam Integer size,@RequestParam Integer page ){ return
	 * ResponseEntity.status(HttpStatus.OK).body(studentService.allStudentByPage(
	 * size,page)) ; }
	 * 
	 * 
	 * @GetMapping("students") public ResponseEntity<List<Student>> totalStudent(){
	 * return ResponseEntity.status(HttpStatus.OK).body(studentService.allStudent())
	 * ; }
	 * 
	 * 
	 */

}
