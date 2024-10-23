/* eslint-disable no-unused-vars */
/* eslint-disable  @typescript-eslint/no-unused-vars */
import { Palette, PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        link: Palette['primary'];
    }

    interface PaletteOptions {
        link?: PaletteOptions['primary'];
    }
}
