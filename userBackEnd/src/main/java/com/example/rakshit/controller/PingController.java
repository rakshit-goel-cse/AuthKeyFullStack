package com.example.rakshit.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.rakshit.dto.MsgDTO;

@Controller
@CrossOrigin(origins ="*",allowedHeaders ="*")
public class PingController {

	@Autowired
	private SimpMessagingTemplate simpMsgTemp; 
	
	Logger log =LoggerFactory.getLogger(this.getClass());
	
	@MessageMapping("/web") 
	public MsgDTO pingToWeb(@Payload MsgDTO msg) throws Exception {
		log.info("PingToWeb- "+msg.toString());
		simpMsgTemp.convertAndSendToUser(msg.getUserName(),"/web", msg);  // /user/$user/des
		//log.info("PingToWeb2- "+msg.getUserName()+"/web");
		return msg;
	}
	
	@MessageMapping("/app") 
	public MsgDTO pingToApp(@Payload MsgDTO msg) throws Exception {
		log.info("Ping To APP"+msg.toString());
		//throw new Exception("Controller issue");
		//simpMsgTemp.setUserDestinationPrefix("/app");
		simpMsgTemp.convertAndSendToUser(msg.getUserName(),"/app", msg);
		return msg;
	}
} 
