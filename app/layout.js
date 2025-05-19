import "./_styles/globals.css";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";
import {UserProvider} from "./context/UserContext";


export const metadata = {
  title: "Stream Vibe",
};

export default function RootLayout({children}) {

  return (
    <html lang="en">
      <body className="bg-black-8">
        <UserProvider>
        <Navbar />
        <main className="mx-4 sm:mx-[6%]">{children}</main>
        <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
