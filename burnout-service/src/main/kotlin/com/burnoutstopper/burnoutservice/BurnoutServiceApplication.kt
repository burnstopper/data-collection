package com.burnoutstopper.burnoutservice

import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.servers.Server
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.context.annotation.Bean
import org.springframework.web.client.RestTemplate


@SpringBootApplication
@OpenAPIDefinition(
        servers = [
            Server(url = "/", description = "Default Server URL"),
        ]
)
class BurnoutServiceApplication

fun main(args: Array<String>) {
    runApplication<BurnoutServiceApplication>(*args)
}
