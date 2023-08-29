import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname: url, origin } = nextUrl;
  if (
    url.startsWith("/api") &&
    !url.includes("/api/getResult") &&
    !url.includes("/api/history")
  ) {
    const endpoint = url.substring(5);
    const arr = endpoint.split("/");
    let newStr = "";
    const getOperator = (str: string): string => {
      switch (str) {
        case "into":
          return "*";
        case "plus":
          return "+";
        case "minus":
          return "-";
        case "divide":
          return "/";
        default:
          return "";
      }
    };
    for (const elem of arr) {
      newStr += !isNaN(+elem) ? elem : getOperator(elem);
    }
    return NextResponse.redirect(origin + `/api/getResult?eq=${newStr}`);
  }
  return;
}
