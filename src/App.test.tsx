import App from './App';
import theme from './theme';
import {ThemeProvider} from '@mui/material';
import {render, screen} from '@testing-library/react';
import React from 'react';
import {beforeEach, describe, expect, it, vi} from 'vitest';

vi.mock('@mui/material', async () => {
    const actual = await vi.importActual<typeof import('@mui/material')>('@mui/material');

    return {
        ...actual,
        ThemeProvider: vi.fn(({children}) => <div data-testid="theme-provider">{children}</div>),
    };
});

describe('App', () => {
    const mockedThemeProvider = ThemeProvider as unknown as ReturnType<typeof vi.fn>;

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
