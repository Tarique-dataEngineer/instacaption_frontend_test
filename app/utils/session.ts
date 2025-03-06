import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_auth",
    secrets: ["your-secret-key"],
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  },
});

export const getSession = (request: Request) => {
  return sessionStorage.getSession(request.headers.get("Cookie"));
};
