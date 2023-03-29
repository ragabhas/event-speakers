import { createContext, useState } from "react";
export const ThemeContext = createContext();

function ThemeProvider({ startingTheme, children }) {
  const [theme, setTheme] = useState(startingTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
