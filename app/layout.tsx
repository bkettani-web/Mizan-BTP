import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/navigation/app-shell";
import { AppProvider } from "@/lib/store";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Mizan BTP — L'équilibre de vos chantiers",
  description:
    "Mizan BTP, l'application de gestion de chantier pour promoteurs immobiliers : suivez vos budgets, dépenses et marges en toute simplicité.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full bg-surface font-sans text-ink">
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
