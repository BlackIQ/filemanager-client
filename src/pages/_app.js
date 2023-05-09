import "@/styles/globals.sass";

import theme from "@/theme";

import { ThemeProvider, CssBaseline, Box, Container } from "@mui/material";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
}
