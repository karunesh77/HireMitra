import AuthForm from '@/components/AuthForm';

export const metadata = {
  title: 'Login - HireMitra',
};

export default function LoginPage() {
  return (
    <div className="container py-16">
      <div className="max-w-md mx-auto">
        <AuthForm type="login" />
      </div>
    </div>
  );
}
