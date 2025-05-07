import Signup from '../components/Signup';

export default function SignupPage() {
  return <Signup onSignupSuccess={() => window.location.href = '/dashboard'} />;
}
