package com.school.studentservice.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "_Student")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Student {
	
	//@Column(name = "_")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	@Column(name = "_id")
	private Long id;
	
	@Size(min = 3,max = 30)
	@Column(name = "_name")
	private String name;
	
	@Size(min = 3,max = 30)
	@Column(name = "_lastName")
	private String lastName;
	
	@Size(min = 3,max = 90)
	@Column(name = "_email",unique = true)
	private String email;
	 
	@Size(min = 3,max = 10)
	@Column(name = "_genre")
	private String genre;
	 
	 
	@Column(name = "_imageUrl")
	private String imageUrl; 
	
	@Column(name = "_dateCreated" ,updatable = false)
	 @JsonIgnoreProperties()
	@CreatedDate
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateCreated;
	
	@Lob
	@Column(name = "_image")
	private byte[] image;
	

	 @PrePersist  //دور  هو توفير قيم افتراضية للحقول المرتبطة بالكائن قبل إدراجه في قاعدة البيانات.
	    public void prePersist() {
		 dateCreated = new Date();
	    }

	 

}
