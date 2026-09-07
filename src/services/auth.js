import { signInAnonymously } from "firebase/auth";
import { auth } from "../firebase";

export async function loginAnonymously() {
  try {
    const result = await signInAnonymously(auth);

    console.log(
      "Anonymous login successful:",
      result.user.uid
    );

    return result.user;
  } catch (error) {
    console.error("Anonymous login failed:", error);
    throw error;
  }
}