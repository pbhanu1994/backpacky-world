import firebaseClient from '../src/firebaseClient';
import SignInComponent from '../src/components/SignIn';

export default function SignIn() {
  firebaseClient();
  return (
    <SignInComponent />
  )
}