package com.travello;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.travello"})
@EntityScan(basePackages = {"com.travello"})
public class TravelloApplication {
    public static void main(String[] args) {
        SpringApplication.run(TravelloApplication.class, args);
    }
}