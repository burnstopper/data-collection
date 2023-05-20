package com.burnoutstopper.copingservice

import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.servers.Server
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
@OpenAPIDefinition(
        servers = [
            Server(url = "/", description = "Default Server URL"),
        ]
)
class CopingServiceApplication

fun main(args: Array<String>) {
    runApplication<CopingServiceApplication>(*args)
}
