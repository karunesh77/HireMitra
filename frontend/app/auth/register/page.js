import AuthForm from '@/components/AuthForm';

export const metadata = {
  title: 'Register - HireMitra',
};

export default function RegisterPage() {
  return (
    <div className="container py-16">
      <div className="max-w-md mx-auto">
        <AuthForm type="register" />
      </div>
    </div>
  );
}
