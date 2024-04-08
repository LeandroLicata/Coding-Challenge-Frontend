import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import axios from "axios";

const AuthForm = ({ isRegister }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    if (isRegister) {
      Swal.fire({
        title: "Registrando...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const signupResponse = await axios.post("/users/register", data);

        if (signupResponse.status === 201) {
          await signIn("credentials", {
            ...data,
            callbackUrl: "/",
            redirect: false,
          });

          Swal.close();
        } else {
          Swal.fire({
            title: "Error",
            text: "Error en el registro.",
            icon: "error",
          });
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Handle Axios network errors
          if (!error.response) {
            Swal.fire({
              title: "Error",
              text: "Error de conexión.",
              icon: "error",
            });
          } else {
            if (error.response.status === 409) {
              Swal.fire({
                title: "Error",
                text: "El email ya está en uso.",
                icon: "error",
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "Error al crear el usuario.",
                icon: "error",
              });
            }
          }
        } else {
          Swal.fire({
            title: "Error",
            text: "Un error inesperado ha ocurrido.",
            icon: "error",
          });
        }
      }
    } else {
      Swal.fire({
        title: "Iniciando sesión...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const response = await signIn("credentials", {
          ...data,
          callbackUrl: "/",
          redirect: false,
        });

        if (response.error) {
          if (response.status === 400) {
            Swal.fire({
              title: "Error",
              text: "Contraseña incorrecta.",
              icon: "error",
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "Error al iniciar sesión.",
              icon: "error",
            });
          }
        } else {
          // Inicio de sesión exitoso
          Swal.close();
          router.push("/"); // Redireccionar a la página principal
        }
      } catch (error) {
        // Manejo de otros errores
        Swal.fire({
          title: "Error",
          text: "Un error inesperado ha ocurrido.",
          icon: "error",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          name="email"
          placeholder="Ingrese su correo electrónico"
          {...register("email", { required: "Email es requerido" })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Contraseña:
        </label>
        <input
          type="password"
          name="password"
          placeholder="Ingrese su contraseña"
          {...register("password", { required: "Contraseña es requerida" })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>
      {isRegister && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Repetir contraseña:
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Repita su contraseña"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {password && (
            <span className="text-red-500">
              {password === watch("confirmPassword")
                ? ""
                : "Las contraseñas no coinciden"}
            </span>
          )}
        </div>
      )}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {isRegister ? "Registrarse" : "Iniciar sesión"}
      </button>
    </form>
  );
};

export default AuthForm;
