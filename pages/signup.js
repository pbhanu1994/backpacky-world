import firebaseClient from '../src/firebaseClient';
import SignUpComponent from '../src/components/SignUp';

export default function SignUp() {
  firebaseClient();
  return (
    <SignUpComponent />
  )
}