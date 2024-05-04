import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";

export default function Login() {
  return (
    <>
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </>
  );
}
