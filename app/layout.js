import "@/app/_styles/globals.css";

export const metadata = {
  title: "Stream Vibe",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
