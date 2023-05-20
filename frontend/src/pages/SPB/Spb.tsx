import React from 'react';
import {Box, Flex, Spacer} from "@chakra-ui/react";
import TestCard from "../../common/components/TestCard/TestCard";
import Pagination from "../../common/components/Pagination/Pagination";
import {SPB_BODY, SPB_INTRO, SPB_TITLE} from "../../data/SPB/Test";
import {SpbResult} from "./models/SpbResult";
import SpbHistoryTable from "./SpbHistoryTable";
import CookiesUtils from "../../utils/CookiesUtils";
import SpbService from "../../services/SpbService";
import {useSearchParams} from "react-router-dom";

const Spb = () => {
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [pageSize, _] = React.useState(6);
    const [total, setTotal] = React.useState(1);
    const [results, setResults] = React.useState<SpbResult[]>([]);

    const [searchParams] = useSearchParams()
    const quizId = searchParams.get('quiz_id')
    const redirectUrl = searchParams.get('redirect_url')

    React.useEffect(() => {
        const token = CookiesUtils.get("token")
        if (token === null) {
            return
        }
        SpbService.getResults(token, currentPage, pageSize).then((response) => {
            setResults(response.data.data)
            setTotal(response.data.total)
        })
    }, [currentPage]);

    return (
        <Box>
            <TestCard title={SPB_TITLE} intro={SPB_INTRO} body={SPB_BODY} pathToNavigate={"/burnout/test"}/>
            {!(quizId && redirectUrl) && (results.length > 0) &&
                <Box>
                    <SpbHistoryTable results={results}/>
                    <Spacer marginY="8"/>
                    <Flex alignItems="center" justifyContent="center" direction="column">
                        <Pagination currentPage={currentPage} pageSize={pageSize} total={total}
                                    onChange={(page) => setCurrentPage(page!)}/>
                    </Flex>
                </Box>}
        </Box>
    );
};

export default Spb;
