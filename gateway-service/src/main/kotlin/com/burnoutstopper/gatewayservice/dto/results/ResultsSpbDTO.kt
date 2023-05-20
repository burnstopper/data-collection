package com.burnoutstopper.gatewayservice.dto.results

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.OffsetDateTime

data class ResultsSpbDTO(
        @JsonProperty("respondent_id")
        val respondentId: Int,

        @JsonProperty("quiz_id")
        val quizId: Int?,

        @JsonProperty("date_time")
        val dateTime: OffsetDateTime,


        @JsonProperty("catastrophizing")
        val catastrophizing: Int,

        @JsonProperty("duty_to_self")
        val dutyToSelf: Int,

        @JsonProperty("duty_to_others")
        val dutyToOthers: Int,

        @JsonProperty("low_frustration_tolerance")
        val lowFrustrationTolerance: Int,

        @JsonProperty("self_esteem")
        val selfEsteem: Int
)
