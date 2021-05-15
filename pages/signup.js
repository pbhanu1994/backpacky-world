import { useRouter } from "next/router";
import SignUpComponent from "../src/components/SignUp";
import { useAuth } from "../src/handlers/auth";

export default function SignUp() {
  const { user } = useAuth();
  const router = useRouter();

  if (user && user.uid) {
    router.push("/home");
  }
  return <SignUpComponent />;
}
