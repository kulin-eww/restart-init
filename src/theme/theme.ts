import { createTheme } from "@mui/material";

const palette = {
  backgroundDefault: "#FFFF",
  backgroundPaper: "#e9e8eb",
  textPrimary: "#2f2b3de6",
  textSecondary: "#2f2b3d8c",
  buttonText: "#FFFF",
};

export const getMuiTheme = () => {
  return createTheme({
    palette: {
      background: {
        default: "#FFFF",
        paper: "#FFFF",
      },
      text: {
        primary: "#2f2b3de6",
        secondary: "#2f2b3d8c",
      },
      primary: {
        main: "#277869",
      },
      secondary: {
        main: "#20c997",
      },
      error: {
        main: "#ea5455",
      },
      warning: {
        main: "#FF8228",
      },
      info: {
        main: "#007bff",
      },
      success: {
        main: "#28c76f",
      },
    },
    typography: {
      fontFamily: "Mulish, sans-serif",
      fontSize: 16,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              "&:hover fieldset": {
                borderColoaazar: "#277869",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#84A9BF",
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            textTransform: "none",
            background: "linear-gradient(90deg, #8B0000 0%, #2A0B0A 145.34%)",
            color: palette.buttonText,
            "&:hover": {
              backgroundColor: "#98DD9A",
            },
          },
        },
        variants: [
          {
            props: { variant: "cancel" },
            style: {
              backgroundColor: "#a7a7a6",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#7a7a7a",
              },
            },
          },
        ],
      },
    },
  });
};
