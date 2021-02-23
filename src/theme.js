import { createMuiTheme } from '@material-ui/core'

const palette = {
  primary: {
      light: '#2d4390',
      main: '#2d4390',
      dark: '#2d4390',
      contrastText: '#ffffff',
  },
  secondary: {
      light: '#f6f9ff',
      dark: '#f6f9ff',
      main: '#f6f9ff',
      contrastText: '#000000',
      50: '#ffffff',
      100: '#ffffff',
      200: '#ffffff',
      300: '#ffffff',
      400: '#ffffff',
      500: '#ffffff',
      600: '#ffffff',
      700: '#ffffff',
      800: '#ffffff',
      900: '#ffffff',
  },
  contrastThreshold: 3,
  tonalOffset: 0.2,
  grey: {
        50: '#f6f9ff',
        100: '#e8f0fa',
        200: '#dce6f4',
        300: '#cddaed',
        400: '#becde3',
        500: '#b0c2db',
        600: '#9fb0c7',
        700: '#8b98ac',
        800: '#7a8494',
        900: '#646d7a',
  },
};

const theme = createMuiTheme({
    typography: {
        // Use the system font instead of the default Roboto font.
        useNextVariants: true,
        fontFamily: [
            'Proxima Nova',
            // 'Open Sans',
            // 'Lato',
            'Montserrat',
            'Nunito Sans',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    palette,
    shape: {
        borderRadius: '0.375rem',
    },
    overrides: {
        // MuiTableRow: {
        //     root: {
        //         '&:hover': {
        //             backgroundColor: `${palette.secondary[50]} !important`,
        //         },
        //     },
        // },
        // MuiFilledInput: {
        //     root: {
        //         backgroundColor: palette.grey[100],
        //         '&.Mui-focused': {
        //             backgroundColor: palette.grey[200],
        //         },
        //         '&:hover': {
        //             backgroundColor: palette.grey[200],
        //         },
        //     },
        // },
        // MuiDrawer: {
        //     root: {
        //         backgroundColor: 'white',
        //     },
        // },
        // MuiTab: {
        //     root: {
        //         fontWeight: '700',
        //         borderTopLeftRadius: 6,
        //         borderTopRightRadius: 6,
        //         backgroundColor: palette.grey[200],
        //         borderColor: palette.grey[400],
        //         borderWidth: 1,
        //         borderStyle: 'solid',
        //         '&.Mui-selected': {
        //             backgroundColor: palette.primary.main,
        //             color:  palette.primary.contrastText,
        //             borderWidth: 0,
        //         },
        //         transition: 'all 0.2s ease-in-out',
        //         '&:hover': {
        //             transform: 'translateY(1px)',
        //         },
        //     }
        // },
        // RaLabeled: {
        //     value: {
        //         marginTop: 10
        //     }
        // },
        // RaTabbedForm: {
        //     content: {
        //         paddingTop: 20,
        //     }
        // },
        // RaMenuItemLink: {
        //     active: {
        //         color: palette.primary.main,
        //         fontWeight: '900'
        //     },
        //     icon: {
        //         color: null
        //     }
        // },
        // MuiListItemIcon: {
        //     root: {
        //         color: null,
        //     }
        // },
        // MuiListItem: {
        //     root: {
        //         paddingTop: 0,
        //         paddingBottom: 0
        //     }
        // },
        // MuiListItemText: {
        //     root: {
        //         marginTop: 0,
        //         marginBottom: 0
        //     }
        // },
        // RaAutocompleteSuggestionList: {
        //     suggestionsContainer: {
        //         zIndex: 9999
        //     }
        // }
  },
});

export default theme;