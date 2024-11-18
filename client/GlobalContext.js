import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
    const [user, setUser] = useState(null);

    return <GlobalContext.Provider value={{ user, setUser }}>{children}</GlobalContext.Provider>;
}
