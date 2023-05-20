package com.burnoutstopper.gatewayservice.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.FileSystemResource
import org.springframework.core.io.Resource
import org.springframework.web.reactive.config.ResourceHandlerRegistry
import org.springframework.web.reactive.config.WebFluxConfigurer
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.resource.PathResourceResolver
import reactor.core.publisher.Mono


@Configuration
class WebFluxConfig : WebFluxConfigurer {

    @Value("\${frontend.path}")
    lateinit var frontendPath: String

    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("file:${frontendPath}**")
                .resourceChain(true)
                .addResolver(object : PathResourceResolver() {
                    override fun getResource(resourcePath: String, location: Resource): Mono<Resource> {
                        val requestedResource = location.createRelative(resourcePath)
                        return if (requestedResource.exists()) {
                            Mono.just(requestedResource)
                        } else {
                            Mono.just(FileSystemResource("${frontendPath}index.html"))
                        }
                    }
                })
    }
}
