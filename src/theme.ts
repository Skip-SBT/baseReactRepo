import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#ffffff',
        },
        link: {
            main: '#ffffff',
        },
    },
    typography: {
        fontFamily: 'Georgia, Serif, serif',
    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: ({theme}) => ({
                    textDecoration: 'none',
                    color: theme.palette.link.main,
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                }),
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: ({theme}) => ({
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.secondary.main,
                }),
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: ({theme}) => ({
                    '& .MuiListItemText-primary': {
                        color: theme.palette.link.main,
                        fontWeight: 'bold',
                    },
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.primary.main,
                        '& .MuiListItemText-primary': {
                            color: theme.palette.primary.main,
                        },
                    },
                    textDecoration: 'none',
                }),
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontWeight: 'bold',
                },
            },
        },
    },
});

export default theme;
