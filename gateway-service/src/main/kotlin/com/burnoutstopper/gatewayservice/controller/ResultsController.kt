package com.burnoutstopper.gatewayservice.controller

import com.burnoutstopper.gatewayservice.dto.results.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.env.Environment
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.reactive.function.client.WebClient
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono


@RestController
@RequestMapping("/api/gateway/v1/results")
class ResultsController @Autowired constructor(private val webClient: WebClient,
                                               env: Environment) {

    val uriMap = mapOf(
            1 to "${env.getProperty("service.uri.burnout")}/api/burnout",
            2 to "${env.getProperty("service.uri.fatigue")}/api/fatigue",
            3 to "${env.getProperty("service.uri.coping")}/api/coping",
            4 to "${env.getProperty("service.uri.spb")}/api/spb")

    @GetMapping("/exists")
    fun exists(@RequestParam("quiz_id") quizId: Int,
               @RequestParam("test_ids") testIds: List<Int>,
               @RequestParam("respondent_id", required = false) respondentId: Int?): Mono<Boolean> {

        var urlPath = "/v1/results/exists?quiz_id=${quizId}"
        if (respondentId != null) {
            urlPath += "&respondent_id=$respondentId"
        }
        val responseFlux = Flux.merge(
                testIds.map {
                    webClient.get().uri("${uriMap[it]}${urlPath}")
                            .retrieve().bodyToMono(Boolean::class.java)
                })
                .takeUntil { it == true }

        return responseFlux.any { it == true }
    }


    @GetMapping("/by-quiz")
    fun getResults(@RequestParam("quiz_id") quizId: Int,
                   @RequestParam("test_ids") testIds: List<Int>,
                   @RequestParam("respondent_id", required = false) respondentId: Int?): Mono<ResultsByQuizDTO> {

        var urlPath = "/v1/results/by-quiz?quiz_id=${quizId}"
        if (respondentId != null) {
            urlPath += "&respondent_id=$respondentId"
        }

        val test1Mono = getResultsIfContains<ResultsBurnoutDTO>(testIds, 1, urlPath)

        val test2Mono = getResultsIfContains<ResultsFatigueDTO>(testIds, 2, urlPath)

        val test3Mono = getResultsIfContains<ResultsCopingDTO>(testIds, 3, urlPath)

        val test4Mono = getResultsIfContains<ResultsSpbDTO>(testIds, 4, urlPath)

        return Mono.zip(test1Mono, test2Mono, test3Mono, test4Mono)
                .map {
                    ResultsByQuizDTO(it.t1, it.t2, it.t3, it.t4)
                }
    }

    private inline fun <reified T> getResultsIfContains(testIds: List<Int>, id: Int, urlPath: String): Mono<List<T>> {
        if (testIds.contains(id)) {
            return webClient.get()
                    .uri("${uriMap[id]}${urlPath}")
                    .retrieve()
                    .bodyToFlux(T::class.java).collectList()
        }
        return Mono.just(listOf())
    }
}
