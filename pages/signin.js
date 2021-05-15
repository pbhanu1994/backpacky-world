import { useRouter } from "next/router";
import SignInComponent from "../src/components/templates/SignIn";
import { useAuth } from "../src/handlers/auth";

export default function SignIn() {
  const { user } = useAuth();
  const router = useRouter();

  if (user && user.uid) {
    router.push("/home");
  }
  return <SignInComponent />;
}
