package com.oms.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	@org.springframework.beans.factory.annotation.Value("${spring.data.mongodb.uri:NOT_FOUND}")
	private String mongoUri;

	@org.springframework.context.annotation.Bean
	public org.springframework.boot.CommandLineRunner testUri() {
		return args -> System.out.println("MONGO URI FROM PROPERTIES: " + mongoUri);
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
