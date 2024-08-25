package com.example.rakshit.controller;


import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/app")
public class FileController {

	Logger log = LoggerFactory.getLogger(this.getClass());
	@GetMapping()
	public ResponseEntity<byte[]> getApp() throws IOException {
		log.info("GET app called");
		 Resource r = new ClassPathResource("file/Rakshit.jpg");
		 
		 if(r.exists() && r.isReadable()) {
			 return ResponseEntity.ok()
					 .contentType(MediaType.APPLICATION_OCTET_STREAM)
					 .header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename="+r.getFilename())
					 .body(r.getContentAsByteArray());
		 }
		 else {
			 throw new RuntimeException("File not found");
		 }
	}
	
	@PutMapping()
	public void setApp() {
		log.info("PUT app called");
	}
}
