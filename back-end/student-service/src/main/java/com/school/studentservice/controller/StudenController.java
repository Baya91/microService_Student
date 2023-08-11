package com.school.studentservice.controller;

import java.io.IOException;
import java.util.Date;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import javax.validation.Valid;

import org.bouncycastle.crypto.engines.ISAACEngine;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.school.studentservice.model.HttpResponse;
import com.school.studentservice.model.Student;
import com.school.studentservice.service.StudentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/page_student")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class StudenController {

	private final StudentService studentService;

	private ResponseEntity<HttpResponse> returnResult(HttpStatus httpStatus, String message, Object object) {
		HttpResponse httpResponse = HttpResponse.builder().status(httpStatus).codeStatus(httpStatus.value())
				.message(message).timeResponse(new Date()).data(Map.of("page", object)).build();

		return ResponseEntity.ok(httpResponse);

	}

	@GetMapping("find")
	public ResponseEntity<HttpResponse> getStudentById(@RequestParam Long id) {
		return this.returnResult(HttpStatus.OK, "Student", this.studentService.getStudentById(id));

	}

	@GetMapping("find_all")
	public ResponseEntity<HttpResponse> getAllStudent_and_SearchByName(@RequestParam Optional<String> txt,
			@RequestParam Optional<Integer> page, @RequestParam Optional<Integer> size) throws InterruptedException {
		TimeUnit.SECONDS.sleep(1);
		return this.returnResult(HttpStatus.OK, "all Student",
				this.studentService.findBy_name_lastName(txt.orElse(""), page.orElse(0), size.orElse(10)));

	}

	@PostMapping("save_with_image")
	public ResponseEntity<HttpResponse> save_Student_with_image(@RequestParam("file") MultipartFile imageFile, @RequestParam("imageUrl") String imageUrl,
			@RequestParam("name") String name, @RequestParam("lastName") String lastName,
			@RequestParam("email") String email, @RequestParam("genre") String genre) throws IOException {
		Student student = Student.builder().name(name).lastName(lastName).email(email).genre(genre)
				.imageUrl("https://randomuser.me/api/portraits/men/8.jpg").image(imageFile.getBytes()).build();

		return this.returnResult(HttpStatus.OK, "update Student Student", this.studentService.save(student));
	}
	
	@PostMapping("save")
	public ResponseEntity<HttpResponse> save_Student_without_image(@RequestBody Student student) {
		
		student.setImageUrl("https://randomuser.me/api/portraits/men/8.jpg");
		return this.returnResult(HttpStatus.OK, "update Student Student", this.studentService.save(student));
	}
	
	

	@PutMapping("update_with_image")
	public ResponseEntity<HttpResponse> update_with_image(@RequestParam("id") Long id,
			@RequestParam("file") MultipartFile image, @RequestParam("imageUrl") String imageUrl,
			@RequestParam("name") String name, @RequestParam("lastName") String lastName,
			@RequestParam("email") String email, @RequestParam("genre") String genre) throws IOException {
		Student student = Student.builder().id(id).name(name).lastName(lastName).email(email).genre(genre)
				.image(image.getBytes()).imageUrl(imageUrl).build();
if (imageUrl==null) {
	student.setImageUrl("https://randomuser.me/api/portraits/men/56.jpg");
}
		System.out.println(student.toString());
		return this.returnResult(HttpStatus.OK, "update Student Student", this.studentService.editStudent(student));
	}

	
	
	@PutMapping("update")
	public ResponseEntity<HttpResponse> update_without_img(@RequestBody Student student) {
		if (student.getImageUrl()== null) {
			student.setImageUrl("https://randomuser.me/api/portraits/men/87.jpg");
		}
	
		return this.returnResult(HttpStatus.OK, "update Student Student", this.studentService.editStudent(student));
	}

	@DeleteMapping("delete")
	public ResponseEntity<HttpResponse> removeById(@RequestParam Long id) {
		
		this.studentService.removeStudent(id);
		return this.returnResult(HttpStatus.OK, "delete Student", "");

	}

}
