package com.school.studentservice.model;

import java.util.Date;
import java.util.Map;

import org.springframework.http.HttpStatus;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class HttpResponse {

	
	protected int codeStatus;
	protected HttpStatus status;
	protected String message;
	protected Map<?, ?> data;
	protected Date timeResponse;

}
