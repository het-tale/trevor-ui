"use client";
import { i18 } from "@/lib/i18n";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useTranslations = () => {
	//   const selectedLang = useAppSelector((state) => state.lang.main);
	const langs = [
		{
			name: "en",
			id: "en",
			isRtl: false
		},
		{
			name: "ar",
			id: "ar",
			isRtl: true
		},
		{
			name: "fr",
			id: "fr",
			isRtl: false
		}
	];
	const { t } = useTranslation();
	const defaultLang = langs[1];
	const selectedLang =
		langs.find((lang) => lang.id === defaultLang.id) || langs[1];
	useEffect(() => {
		if (defaultLang.id !== selectedLang.name) {
			i18.changeLanguage(selectedLang.name);
		}
	}, [selectedLang.name]);

	return { t, isRtl: selectedLang.isRtl, lng: selectedLang.name };
};
