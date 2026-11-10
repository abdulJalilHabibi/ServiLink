import React, { useEffect } from "react";
import { LanguageContext } from "./LanguageContextObject";
import { translations } from "../data/translations";

const STORAGE_LANG_KEY = "servilink_language";

export const LanguageProvider = ({ children }) => {
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LANG_KEY, "en");
    } catch (e) {
      console.error(e);
    }
    document.documentElement.dir = "ltr";
    document.documentElement.lang = "en";
  }, []);

  const toggleLanguage = () => {};

  const t = (key) => {
    return translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language: "en", setLanguage: () => {}, toggleLanguage, t, isRTL: false }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
