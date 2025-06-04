import "./_styles/globals.css";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";
import {UserProvider} from "./context/UserContext";
import {getUserFromCookie} from "./lib/services/getUserFromCooki";

export const metadata = {
  title: "Stream Vibe",
};

export default async function RootLayout({children}) {
  const userFromServer = await getUserFromCookie();

  return (
    <html lang="en">
      <body className="bg-black-8">
        <UserProvider userFromServer={userFromServer}>
          <Navbar />
          <main className="mx-4 sm:mx-[6%]">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
