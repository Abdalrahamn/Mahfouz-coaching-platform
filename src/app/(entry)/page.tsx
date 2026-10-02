import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function Entry() {
  const cookie = await cookies();
  redirect(cookie.get("mahfouz-language")?.value === "ar" ? "/ar" : "/en");
}
