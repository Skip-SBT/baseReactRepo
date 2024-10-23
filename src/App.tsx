import 'styles/index.scss';
import React from 'react';
import {ThemeProvider} from '@mui/material';
import theme from './theme';

export default function App() {
    return (
        <ThemeProvider theme={theme}>

        </ThemeProvider>
    );
}

