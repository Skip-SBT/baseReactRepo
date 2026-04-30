import './styles/index.scss';
import HomePage from './pages/HomePage';
import theme from './theme';
import {ThemeProvider} from '@mui/material';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
