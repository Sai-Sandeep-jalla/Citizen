/**
 * @file useTranslation.js
 * @description Custom hook for handling localized string translations across the app.
 */

import { useContext } from "react";

import { LanguageContext } from "../context/LanguageContext";

export default function useTranslation() {

    return useContext(LanguageContext);

}