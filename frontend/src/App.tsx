import React from 'react';
import './styles/App.css';

import {Box} from "@chakra-ui/react";
import {Route, Routes, useLocation} from "react-router-dom";
import Navbar from "./common/components/Navbar/Navbar";
import Main from "./pages/Main/Main";
import Burnout from "./pages/Burnout/Burnout";
import BurnoutTest from "./pages/Burnout/BurnoutTest";
import Fatigue from "./pages/Fatigue/Fatigue";
import FatigueTest from "./pages/Fatigue/FatigueTest";
import CopingTest from "./pages/Coping/CopingTest";
import Coping from "./pages/Coping/Coping";
import Spb from "./pages/SPB/Spb";
import SpbTest from "./pages/SPB/SpbTest";
import Footer from "./common/components/Footer/Footer";

function App() {
    const location = useLocation()
    return (
        <Box minHeight='100vh'>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/burnout" element={<Burnout/>}/>
                <Route path="/burnout/test" element={<BurnoutTest/>}/>
                <Route path="/fatigue" element={<Fatigue/>}/>
                <Route path="/fatigue/test" element={<FatigueTest/>}/>
                <Route path="/coping" element={<Coping/>}/>
                <Route path="/coping/test" element={<CopingTest/>}/>
                <Route path="/spb" element={<Spb/>}/>
                <Route path="/spb/test" element={<SpbTest/>}/>
                <Route path="*" element={<Main/>}/>
            </Routes>
            {location.pathname === '/' && <Footer/>}
        </Box>);
}

export default App;
