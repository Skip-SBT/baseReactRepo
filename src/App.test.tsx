import React from 'react';
import {render, screen} from '@testing-library/react';
import {ThemeProvider} from '@mui/material';
import App from './App';
import theme from './theme';

jest.mock('@mui/material', () => {
    const actual = jest.requireActual('@mui/material');

    return {
        ...actual,
        ThemeProvider: jest.fn(({children}) => <div data-testid="theme-provider">{children}</div>),
    };
});

describe('App', () => {
    const mockedThemeProvider = ThemeProvider as unknown as jest.Mock;

    beforeEach(() => {
        mockedThemeProvider.mockClear();
    });

    it('renders the app root without crashing', () => {
        render(<App />);

        expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    });

    it('passes the shared theme to ThemeProvider', () => {
        render(<App />);

        expect(mockedThemeProvider).toHaveBeenCalledTimes(1);
        expect(mockedThemeProvider.mock.calls[0][0].theme).toBe(theme);
    });
});

