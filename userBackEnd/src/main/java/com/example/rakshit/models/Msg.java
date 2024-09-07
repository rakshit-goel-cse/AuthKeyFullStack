package com.example.rakshit.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Msg {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int id;
	private String userName;
	private String Type;
	private String msg;
	
	public String setPingMsgType() {
		this.Type="ping";
		return this.Type;
	}
	
	public String setMsgMsgType() {
		this.Type="msg";
		return this.Type;
	}
}
