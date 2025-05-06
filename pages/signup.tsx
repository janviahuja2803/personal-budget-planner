import Signup from '../components/SignUp';

export default function SignupPage() {
  return <Signup onSignupSuccess={() => window.location.href = '/dashboard'} />;
}
