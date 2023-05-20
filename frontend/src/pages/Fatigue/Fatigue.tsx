import React from 'react';
import {FatigueResult} from "./models/FatigueResult";
import FatigueService from "../../services/FatigueService";
import TestCard from "../../common/components/TestCard/TestCard";
import Pagination from "../../common/components/Pagination/Pagination";
import {Box, Flex, Spacer} from "@chakra-ui/react";
import FatigueHistoryTable from "./FatigueHistoryTable";
import {FATIGUE_BODY, FATIGUE_INTRO, FATIGUE_TITLE} from "../../data/Fatigue/Text";
import CookiesUtils from "../../utils/CookiesUtils";
import {useSearchParams} from "react-router-dom";

const Fatigue = () => {
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [pageSize, _] = React.useState(6);
    const [total, setTotal] = React.useState(1);
    const [results, setResults] = React.useState<FatigueResult[]>([]);
    const [searchParams] = useSearchParams()
    const quizId = searchParams.get('quiz_id')
    const redirectUrl = searchParams.get('redirect_url')

    React.useEffect(() => {
        const token = CookiesUtils.get("token")
        if (token === null) {
            return
        }
        FatigueService.getResults(token, currentPage, pageSize).then((response) => {
            setResults(response.data.data)
            setTotal(response.data.total)
        })
    }, [currentPage]);


    return (
        <Box>
            <TestCard title={FATIGUE_TITLE} intro={FATIGUE_INTRO} body={FATIGUE_BODY} pathToNavigate={"/fatigue/test"}/>
            {!(quizId && redirectUrl) && (results.length > 0) &&
                <Box>
                    <FatigueHistoryTable results={results}/>
                    <Spacer marginY="8"/>
                    <Flex alignItems="center" justifyContent="center" direction="column">
                        <Pagination currentPage={currentPage} pageSize={pageSize} total={total}
                                    onChange={(page) => setCurrentPage(page!)}/>
                    </Flex>
                </Box>}
        </Box>
    );
};

export default Fatigue;
