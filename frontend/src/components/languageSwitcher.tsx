import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  // Get language from localStorage or default to "en"
  const storedLanguage = localStorage.getItem("language") || "en";
  
  // Set language on change
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng); // Save selected language to localStorage
  };

  return (
    <div>
      <FormControl
        sx={{
          position: "fixed",
          bottom: "15px",
          right: "15px",
        }}
      >
        <Select
          size="small"
          value={storedLanguage} // Use stored language, or fallback to "en"
          onChange={(e: SelectChangeEvent) => {
            changeLanguage(e.target.value);
          }}
          id="language-switcher"
        >
          <MenuItem value={"hi"}>हिंदी</MenuItem>
          <MenuItem value={"es"}>Español</MenuItem>
          <MenuItem value={"fr"}>Français</MenuItem>
          <MenuItem value={"en"}>English</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default LanguageSwitcher;
