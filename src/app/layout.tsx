import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import { ReactNode } from "react";
import "@/app/globals.css";

// const DEBUG_MODE = false;

const poppings = Poppins({
	weight: ["400", "500", "600", "700"],
	style: "normal",
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: "Personal Library",
	description: "Ui library for personal project"
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="fr" suppressHydrationWarning>
			<body className={cn(poppings.className)}>{children}</body>
		</html>
	);
}
