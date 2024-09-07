package com.example.rakshit.controller;

import org.aspectj.apache.bcel.ExceptionConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.example.rakshit.models.Msg;

@Controller
@CrossOrigin(origins ="*",allowedHeaders ="*")
public class PingController {

	@Autowired
	private SimpMessagingTemplate simpMsgTemp; 
	
	Logger log =LoggerFactory.getLogger(this.getClass());
	
	@MessageMapping("/msg") 
	@SendTo("/topic")
	public Msg ping(@Payload Msg msg) throws Exception {
		log.info(msg.toString());
		//throw new Exception("Controller issue");
		//simpMsgTemp.convertAndSendToUser(msg.getUserName(),"/msg", msg);
		return msg;
	}
}
