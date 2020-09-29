import createBreakpoints from '@material-ui/core/styles/createBreakpoints'

import WorkSansTTF from '../assets/fonts/WorkSans-VariableFont_wght.ttf';
import OswaldTTF from '../assets/fonts/Oswald-VariableFont_wght.ttf';

const WorkSans = {
  fontFamily: 'Work Sans Thin',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Work Sans Thin'),
    local('Work Sans Thin'),
    url(${WorkSansTTF}) format('truetype')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const Oswald = {
  fontFamily: 'Oswald Regular',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Oswald Regular'),
    local('Oswald Regular'),
    url(${OswaldTTF}) format('truetype')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

export const colors = {
  white: "#161A35",
  black: '#000',
  darkBlue: "#2c3b57",
  blue: "#2F80ED",
  gray: "#e1e1e1",
  lightGray: "#161A35",
  lightBlack: "#6a6a6a",
  darkBlack: "#ffffff",
  green: '#13d871',
  red: '#ed4337',
  orange: 'orange',
  pink: '#DC6BE5',
  compoundGreen: '#00d395',
  tomato: '#e56b73',
  purple: '#935dff',

  text: "#ffffff",
  lightBlue: "#2F80ED",
  topaz: "#0b8f92",
  darkGray: "#ccc",
  borderBlue: '#2D3459'
};

const breakpoints = createBreakpoints({
  keys: ["xs", "sm", "md", "lg", "xl"],
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1800
  }
})

const iswapTheme =  {
  typography: {
    fontFamily: [
      '"Work Sans Thin"',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '48px',
      fontWeight: '600',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2
    },
    h2: {
      fontSize: '36px',
      fontWeight: '600',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2
    },
    h3: {
      fontSize: '22px',
      fontWeight: '600',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2
    },
    h4: {
      fontSize: '16px',
      fontWeight: '600',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2
    },
    h5: {
      fontSize: '14px',
      fontWeight: '600',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2
    },
    body1: {
      fontSize: '16px',
      fontWeight: '300',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
    body2: {
      fontSize: '16px',
      fontWeight: '300',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
  },
  type: 'light',
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [WorkSans],
      },
    },
    MuiSelect: {
      select: {
        padding: '9px'
      },
      selectMenu: {
        minHeight: '30px',
        display: 'flex',
        alignItems: 'center'
      }
    },
    MuiButton: {
      root: {
        borderRadius: '50px',
        padding: '10px 24px'
      },
      outlined: {
        padding: '10px 24px',
        borderWidth: '2px !important'
      },
      text: {
        padding: '10px 24px'
      },
      label: {
        textTransform: 'none',
        fontSize: '1rem'
      }
    },
    MuiInput: {
      underline: {
        '&:before': { //underline color when textfield is inactive
          display: 'none !important',
          height: '0px',
          borderBottom: 'none !important'
        },
        '&:after': { //underline color when textfield is inactive
          display: 'none !important',
          height: '0px',
          borderBottom: 'none !important'
        },
        '&:hover:not($disabled):before': { //underline color when hovered
          display: 'none !important',
          height: '0px',
          borderBottom: 'none !important'
        },
    MuiIconButton: {
      root: {
        color: colors.darkBlack
      }
    },
    MuiInputBase: {
      input: {
        fontSize: '16px',
        fontWeight: '600',
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        lineHeight: 1.2,
        border: '1px solid',
        borderColor: colors.gray
      }
    },
    MuiOutlinedInput: {
      adornedStart: {
        border: '1px solid',
        borderColor: colors.borderBlue
      },
      inputAdornedStart: {
        border: 0
      },
      input: {
        "&::placeholder": {
          color: colors.text
        },
        color: colors.text,
        padding: '14px',
        borderRadius: '50px'
      },
      root: {
        // border: "none !important",
        borderRadius: '50px'
      },
      notchedOutline: {
        // border: "none !important"
      }
    },
    MuiSnackbar : {
      root: {
        maxWidth: 'calc(100vw - 24px)'
      },
      anchorOriginBottomLeft: {
        bottom: '12px',
        left: '12px',
        '@media (min-width: 960px)': {
          bottom: '50px',
          left: '80px'
        }
      }
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: colors.white,
        padding: '0px',
        minWidth: 'auto',
        '@media (min-width: 960px)': {
          minWidth: '500px',
        }
      },
      message: {
        padding: '0px'
      },
      action: {
        marginRight: '0px'
      }
    },
    MuiAccordion: {
      root: {
        border: '1px solid '+colors.borderBlue,
        borderRadius: '50px',
        margin: '8px 0px',
        '&:before': { //underline color when textfield is inactive
          backgroundColor: 'none',
          height: '0px'
        },
      }
    },
    MuiAccordionSummary: {
      root: {
        padding: '12px 24px',
        '@media (min-width: 960px)': {
          padding: '30px 42px',
        }
      },
      content: {
        margin: '0px !important'
      }
    },
    MuiAccordionDetails: {
      root: {
        padding: '0 12px 15px 12px',
        '@media (min-width: 960px)': {
          padding: '0 24px 30px 24px',
        }
      }
    },
    MuiToggleButton: {
      root: {
        borderRadius: '50px',
        textTransform: 'none',
        minWidth:  '100px',
        border: 'none',
        background: colors.white,
        '& > span > h4': {
          color: colors.text
        },
        '&:hover': {
          backgroundColor: colors.borderBlue
        },
        "&$selected": {
          backgroundColor: '#2f80ed',
          '& > span > h4': {
            color: colors.text
          },
          '&:hover': {
            backgroundColor: colors.borderBlue,
            '& > span > h4': {
              color: colors.text
            },
          },
        }
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: colors.white
      },
      elevation1: {
        boxShadow: 'none'
      }
    },
    MuiToggleButtonGroup: {
      root: {
        border: '1px solid '+colors.borderBlue,
        borderRadius: '50px',
      },
      groupedSizeSmall: {
        padding: '42px 30px'
      }
    },
    MuiFormControlLabel: {
      label: {
        color: colors.darkBlack,
        fontSize: '14px',
        fontWeight: '600',
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        lineHeight: 1.2
      }
    }
  },
  palette: {
    primary: {
      main: colors.blue
    },
    secondary: {
      main: colors.topaz
    },
    text: {
      primary: colors.text,
      secondary: colors.text
    }
  },
  breakpoints: breakpoints
};

export default iswapTheme;
