import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import SignUpComponent from "../src/components/templates/SignUp";

export default function SignUp() {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  if (user) {
    router.push("/home");
    return;
  }
  return <SignUpComponent />;
}
