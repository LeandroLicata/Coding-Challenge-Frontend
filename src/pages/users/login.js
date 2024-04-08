import AuthForm from "@/components/AuthForm";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center pt-4">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
        <AuthForm />
      </div>
    </div>
  );
};

export default LoginPage;
