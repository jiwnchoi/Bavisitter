import { useModelState } from "@anywidget/react";
import { TColorMode } from "@shared/types";

export default function useColorMode() {
  const [colorMode, _setColorMode] = useModelState<TColorMode>("color_mode");

  const toggleColorMode = () => {
    _setColorMode(colorMode === "light" ? "dark" : "light");
  };

  return {
    colorMode,
    toggleColorMode,
  };
}
