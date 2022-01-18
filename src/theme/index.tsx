import { extendTheme } from "@chakra-ui/react";
import "@fontsource/ibm-plex-sans";

const theme = extendTheme({
  fonts: {
    body: "IBM Plex Sans",
    heading: "IBM Plex Sans",
    mono: "IBM Plex Sans",
  },
  colors: {
    brand: {
      blue: "#0084FF",
      gray: "#f7f7f7",
      "gray.100": "#F6F6F6",
      "gray.200": "#9E9E9E",
      red: "#FF4D4F",
      line: "#E5E5E5",
      green: "#3EA919",
      alert: "#fedbdc",
    },
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "12px",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    "3": ".75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  components: {
    FormLabel: {
      baseStyle: {
        fontWeight: "bold",
        fontSize: "14px",
        fontFamily: "IBM Plex Sans",
        marginBottom: "5px",
        marginTop: "10px",
      },
    },
    FormHelperText: {
      baseStyle: {
        fontSize: "5px",
        fontFamily: "IBM Plex Sans",
      },
    },
    Textarea: {
      baseStyle: {
        fontWeight: 500,
        fontSize: "14px",
        fontFamily: "IBM Plex Sans",
      },
    },

    Button: {
      sizes: {
        xl: {
          h: "56px",
          fontSize: "lg",
          px: "32px",
        },
      },

      variants: {
        link: () => ({
          color: "black",
          textDecoration: "underline",
          fontWeight: "regular",
          fontSize: "12px",
          _hover: {
            color: "gray.600",
          },
        }),
        box: (props: any) => ({
          border: "1px solid",
          borderColor: "black",
          borderRadius: "4px",
          fontSize: "14px",
          lineHeight: "18px",
          padding: 8,
          margin: 2,
          fontWeight: 300,
          color: props.isSelected ? "white" : "black",
          backgroundColor: props.isSelected ? "brand.blue" : "white",

          _hover: {
            borderColor: "brand.blue",
            color: "brand.blue",
            svg: {
              rect: {
                stroke: "brand.blue",
                fill: "transparent",
              },
              circle: {
                stroke: "brand.blue",
                fill: "transparent",
              },
              fill: "brand.blue",
              stoke: "brand.blue",
              line: {
                stroke: "brand.blue",
              },
              path: {
                fill: "brand.blue",
                stroke: "brand.blue",
                line: {
                  stroke: "brand.blue",
                },
              },
            },
            path: {
              fill: "brand.blue",
              stroke: "brand.blue",
              line: {
                stroke: "brand.blue",
              },
            },
          },
        }),
        rounded: () => ({
          bg: "black",
          borderRadius: "50px",
          color: "white",
          padding: "0 30px",
          border: "1px solid",
          fontWeight: "bold",
          fontSize: "12px",
          _hover: {
            bg: "gray.700",
            color: "white",
          },
        }),
        roundedBlue: () => ({
          bg: "brand.blue",
          borderRadius: "50px",
          color: "white",
          padding: "0 30px",
          fontWeight: "regular",
          fontSize: "12px",
          _hover: {
            bg: "blue",
            color: "white",
            _disabled: {
              bg: "brand.blue",
            },
          },
        }),
        roundedTransparent: () => ({
          bg: "transparent",
          borderRadius: "50px",
          fontSize: "12px",
          color: "black",
          padding: "0 20px",
          border: "1px solid",
          _hover: {
            bg: "black",
            color: "white",
          },
        }),
      },
    },

    Container: {
      variants: {
        hierarchy: () => ({
          width: "100%",
          margin: "0 auto",
          border: "1px solid #F7F7F7F7",
          padding: "5",
          backgroundColor: "#fdfdfdf1",
        }),
        inputContainer: (props: any) => ({
          margin: 5,
          border: "1px",
          padding: 4,
          borderRadius: 5,
          borderColor: props.colorMode === "dark" ? "white" : "gray.300",
          backgroundColor: "white",
          width: "-webkit-fill-available",
          maxWidth: "unset",
          _hover: {
            cursor: "grab",
          },
        }),
        hr: () => ({
          borderTop: "1px solid",
          borderColor: "brand.line",
          width: "100%",
          height: "1px",
        }),
        createformColumn: (props: any) => ({
          bg: props.colorMode === "dark" ? "gray.200" : "white",
          color: props.colorMode === "dark" ? "white" : "gray.800",
          height: "100vh",
          overflow: "auto",
          marginBottom: "100px",
          display: "flex",
          justifyContent: "center",
          maxWidth: "unset",
          minWidth: "unset",
        }),
        rightPart: {
          justifyContent: "flex-start",
          p: 0,
          flexDirection: "column",
          borderLeft: "1px",
          variant: "createformColumn",
          minW: "300px",
          overflowY: "auto",
          w: "100%",
          maxW: "53%",
          height: "100vh",
        },
      },
    },
    Text: {
      variants: {
        xxs: () => ({
          fontWeight: 300,
          fontSize: "10px",
          lineHeight: "13px",
        }),
        xs: () => ({
          fontWeight: 300,
          fontSize: "12px",
          lineHeight: "15.6px",
        }),
        xsRegular: () => ({
          fontWeight: 400,
          fontSize: "12px",
          lineHeight: "18px",
        }),
        xsMedium: () => ({
          fontWeight: 500,
          fontSize: "12px",
          lineHeight: "15.6px",
        }),
        currentLight: () => ({
          fontWeight: 300,
          fontSize: "14px",
          lineHeight: "21.2px",
        }),
        current: () => ({
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "21.2px",
        }),
        currentBold: () => ({
          fontWeight: 700,
          fontSize: "14px",
          lineHeight: "18.2px",
        }),
        smallTitle: () => ({
          fontWeight: 300,
          fontSize: "18px",
          lineHeight: "23.4px",
        }),
        titleParaLight: () => ({
          fontWeight: 300,
          fontSize: "20px",
          lineHeight: "26px",
        }),
        baseline: () => ({
          fontWeight: 300,
          fontSize: "25px",
          lineHeight: "32.5px",
        }),
        xl: () => ({
          fontWeight: 300,
          fontSize: "35px",
          lineHeight: "45.5px",
        }),
        statsDashboard: () => ({
          fontWeight: 300,
          fontSize: "55px",
          lineHeight: "71.5px",
        }),
        xxl: () => ({
          fontWeight: 300,
          fontSize: "75px",
          lineHeight: "97.5px",
        }),
        xxlMobile: () => ({
          fontWeight: 300,
          fontSize: "25px",
          lineHeight: "32.5px",
        }),
      },
    },
  },
});
export default theme;
