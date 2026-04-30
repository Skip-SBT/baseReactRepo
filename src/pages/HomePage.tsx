import {Box, Container, Link, Typography} from '@mui/material';
import React from 'react';

export default function HomePage() {
    return (
        <Container maxWidth="sm">
            <Box sx={{mt: 8, textAlign: 'center'}}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Hello World
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Start editing <code>src/pages/HomePage.tsx</code> to build your app.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
                    Add routes in <code>src/App.tsx</code> &mdash; see{' '}
                    <Link href="https://reactrouter.com" target="_blank" rel="noreferrer">
                        React Router docs
                    </Link>
                    .
                </Typography>
            </Box>
        </Container>
    );
}
