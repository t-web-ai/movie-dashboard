import type { Metadata } from "next";

import styles from "./landing.module.css";

export const metadata: Metadata = {
  title: "T Movie Dashboard",
  description: "Manage movies and others",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main
      className={`${styles.landing} min-h-screen bg-background text-foreground`}
      data-landing-page
    >
      <div className="py-10 text-center font-semibold">
        Manage Authentication
      </div>
    </main>
  );
}
