import { ThemeProvider } from "@mui/material";
import { AppRouter } from "./utils/Router";
import useAppSelector from "./hooks/useAppSelector";
import { getMuiTheme } from "./theme/theme";

const App = () => {
  return (
    <>
      <ThemeProvider theme={getMuiTheme()}>
        <AppRouter />
      </ThemeProvider>
    </>
  );
};

export default App;
