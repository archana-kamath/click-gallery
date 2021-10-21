package com.sjsu.cloud.click;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@ComponentScan({"com.sjsu.cloud.click"})
@PropertySource(value = {"classpath:configuration.properties","classpath:application.properties"})
public class ClickApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClickApplication.class, args);
	}

}
