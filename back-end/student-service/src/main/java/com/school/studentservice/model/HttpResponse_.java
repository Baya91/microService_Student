package com.school.studentservice.model;

import java.util.Map;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder

public class HttpResponse_ {
	
	protected String timeStamp;
	protected int statusCode;
	protected HttpStatus status;
	protected String message;
	protected Map<?, ?> data;
	

}
