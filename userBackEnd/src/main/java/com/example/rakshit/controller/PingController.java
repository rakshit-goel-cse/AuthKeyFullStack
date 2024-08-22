package com.example.rakshit.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.example.rakshit.models.Msg;

@Controller
public class PingController {

	@Autowired
	private SimpMessagingTemplate simpMsgTemp;
	
	Logger log =LoggerFactory.getLogger(this.getClass());
	
	@MessageMapping("msg") // ping/msg
	public Msg ping(@Payload Msg msg) {
		log.warn(msg.toString());
		simpMsgTemp.convertAndSendToUser(msg.getUserName(), "", msg);
		return msg;
	}
}
