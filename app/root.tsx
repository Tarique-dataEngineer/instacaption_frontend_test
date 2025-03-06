import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./tailwind.css";
import AppContextProvider from "~/context/AppContextProvider";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Your site description" />
        <meta name="keywords" content="Razorpay, Payments, Credits" />
        <meta name="author" content="Your Name" />
        <title>instacaption</title>
        <Meta />
        <Links />
        
      </head>
      <body className="min-h-screen flex flex-col">
        <ToastContainer position="bottom-right" autoClose={3000} />
        {children}
        <ScrollRestoration />
        <Scripts />
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <AppContextProvider>
      <Layout>
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </Layout>
    </AppContextProvider>
  );
}
