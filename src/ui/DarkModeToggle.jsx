import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

import { useDarkModeContext } from "../contexts/DarkModeContext";
import ButtonIcon from "./ButtonIcon";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkModeContext();

  return (
    <ButtonIcon
      onClick={toggleDarkMode}
      title={isDarkMode ? "Light Mode" : "Dark Mode"}
    >
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}
