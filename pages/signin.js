import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import SignInComponent from "../src/components/templates/SignIn";

export default function SignIn() {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  if (user) {
    router.push("/home");
    return;
  }
  return <SignInComponent />;
}
