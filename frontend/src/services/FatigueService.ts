import axios from "axios";
import {FatigueResultsResponse} from "../pages/Fatigue/models/FatigueResultsResponse";
import {FatigueAnswersResponse} from "../pages/Fatigue/models/FatigueAnswersResponse";

export default class FatigueService {

    private static GET_RESULTS_PATH = "/api/fatigue/v1/results";
    private static POST_ANSWERS_PATH = "/api/fatigue/v1/answers"

    static async getResults(token: string | null, currentPage = 0, pageSize = 10) {

        const config = {
            params: {
                token: token,
                page: currentPage - 1,
                size: pageSize
            }
        }
        return await axios.get<FatigueResultsResponse>(this.GET_RESULTS_PATH, config);
    }

    static async postAnswers(token: string | null, quizId: string | null, answers: number[]) {

        const data: any = {answers: answers};
        if (token !== null) {
            data.token = token;
        }
        if (quizId !== null) {
            data.quiz_id = parseInt(quizId);
        }
        return await axios.post<FatigueAnswersResponse>(this.POST_ANSWERS_PATH, data)
    }
}

