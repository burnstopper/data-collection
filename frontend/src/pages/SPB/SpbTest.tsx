import React from 'react';
import Test from "../../common/components/Test/Test";
import CookiesUtils from "../../utils/CookiesUtils";
import {SPB_QUESTIONS} from "../../data/SPB/Questions";
import {SpbResult} from "./models/SpbResult";
import SpbResultCard from "./SpbResultCard";
import SpbService from "../../services/SpbService";
import {BurnoutAnswersResponse} from "../Burnout/models/BurnoutAnswersResponse";
import BurnoutService from "../../services/BurnoutService";
import {AxiosResponse} from "axios";
import {SpbAnswersResponse} from "./models/SpbAnswersResponse";
import {useSearchParams} from "react-router-dom";

const SpbTest = () => {
    const [showResults, setShowResults] = React.useState(false)
    const [result, setResult] = React.useState<SpbResult>({
        date_time: "0000-00-00T00:00:00Z",
        catastrophizing: 0,
        duty_to_self: 0,
        duty_to_others: 0,
        low_frustration_tolerance: 0,
        self_esteem: 0
    })

    const [searchParams] = useSearchParams()
    const submitAnswer = async (answers: number[]) => {
        const token = CookiesUtils.get("token")
        const quizId = searchParams.get('quiz_id')
        const redirectUrl = searchParams.get('redirect_url')
        let response: AxiosResponse<SpbAnswersResponse>
        if (quizId !== null && redirectUrl !== null) {
            response = await SpbService.postAnswers(token, quizId, answers)
        } else {
            response = await SpbService.postAnswers(token, null, answers)
        }
        if (response.data.token.length > 0) {
            CookiesUtils.set("token", response.data.token)
        }
        setResult(response.data.result)
        setShowResults(true)
    }

    return (
        <>
            {!showResults && <Test questions={SPB_QUESTIONS} previousPage="/spb" submitAnswers={submitAnswer}/>}
            {showResults && <SpbResultCard result={result}/>}
        </>
    );
};

export default SpbTest;
