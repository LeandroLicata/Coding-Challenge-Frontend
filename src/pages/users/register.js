import AuthForm from "@/components/AuthForm";

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Registro</h1>
        <AuthForm isRegister={true} />
      </div>
    </div>
  );
};

export default RegisterPage;
