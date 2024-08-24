package com.example.rakshit.controller;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.rakshit.models.Users;
import com.example.rakshit.repository.UserRepository;
import com.nimbusds.oauth2.sdk.util.StringUtils;

import ch.qos.logback.core.util.StringUtil;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins="*")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	private static Logger log = LoggerFactory.getLogger(UserController.class);

	
	public Users getUser(String userName) {
		Optional<Users> user = userRepository.findByUsername(userName);
		if(user.isPresent()) {
			return user.get();
		}
		return null;
	}
	
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestParam(name = "userName", required = true) String userName,
			@RequestParam(name = "password", required = true) String password) {
		log.info("inside register");
		try {
			Users user = getUser(userName);
			if (null!=user) {
				return ResponseEntity.status(HttpStatus.CONFLICT).body("user already exists");
			}
			Users userToSave = new Users();
			userToSave.setUsername(userName);
			userToSave.setPassword(password);

			userRepository.save(userToSave);
			return ResponseEntity.ok("User created");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
		}

	}

	@PutMapping("/authKey")
	public ResponseEntity<String> saveAuthKey(@RequestParam(name = "userName", required = true) String userName,
			@RequestParam(name = "password", required = true) String pass,
			@RequestParam(name = "authkey", required = true) String key) {
		try {
			Users user = getUser(userName);
			log.warn("auth key- "+key+" "+userName+" "+pass);
			if (null!=user && user.getPassword().equals(pass)
					&& StringUtil.notNullNorEmpty(key) && StringUtils.isNumeric(key) && key.length() == 6) {
				//log.info("Saving key");
				user.setSecuritykey(Integer.parseInt(key));
				userRepository.save(user);
				return ResponseEntity.ok("Authkey saved");
			}
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Condition failed to store authkey");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
		}
	}
	
	@PostMapping("/loginByPassword")
	public ResponseEntity<String> loginByPassword(@RequestBody Users body){
		try {
			log.info("LoginByPassword "+body.toString());
			if(StringUtil.isNullOrEmpty(body.getUsername())) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("UserName can not be empty");
			}
			if(StringUtil.isNullOrEmpty(body.getPassword())) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password can not be empty");
			}
			Users user = getUser(body.getUsername());
			log.info("LoginByPassword "+user.toString());
			if(null!=user && StringUtil.notNullNorEmpty(user.getPassword()) && user.getPassword().equalsIgnoreCase(body.getPassword())) {
				return ResponseEntity.ok("loged in");
			}
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Password is wrong");
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
		}
	}
	
	@PostMapping("/loginByKey")
	public ResponseEntity<String> loginByAuthKey(@RequestBody Users body){
		try {
			log.info("LoginByAuthKey "+body.toString());
			if(StringUtil.isNullOrEmpty(body.getUsername())) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("UserName can not be empty");
			}
			if(String.valueOf(body.getSecuritykey()).length()!=6) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Authkey is not correct");
			}
			Users user = getUser(body.getUsername());
			if(null!=user && StringUtil.notNullNorEmpty(user.getPassword()) && user.getSecuritykey()==body.getSecuritykey()) {
				return ResponseEntity.ok("loged in");
			}
			return ResponseEntity.status(HttpStatus.CONFLICT).body("AuthKey is wrong");
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
		}
	}
}
