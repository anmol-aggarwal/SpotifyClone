import React, { createContext, useState } from "react";
import { Song,RightPaneContextType,ContextProviderProps } from "../Components/Types";

export const RightPaneContext = createContext<RightPaneContextType | null>(null);


export function RightPaneContextProvider({ children } : ContextProviderProps) : JSX.Element {
  const [rightPaneContent, setRightPaneContent] = useState<Song|undefined>();
  const [rightPaneDisplay, setRightPaneDisplay] = useState(false);
  const handleRightPaneClick = (song:Song) => {
    setRightPaneContent(song);
    setRightPaneDisplay(true);
  };
  const rightPaneContextValue = {
    rightPaneContent,
    setRightPaneContent,
    rightPaneDisplay,
    setRightPaneDisplay,
    handleRightPaneClick,
  };

  return <RightPaneContext.Provider value={rightPaneContextValue}>{children}</RightPaneContext.Provider>;
}
