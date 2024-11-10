import "./_styles/globals.css";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";


export const metadata = {
  title: "Stream Vibe",
};

export default function RootLayout({children}) {

  return (
    <html lang="en">
      <body className="bg-black-8">
        <Navbar />
        <main className="mx-4 sm:mx-[6%]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
