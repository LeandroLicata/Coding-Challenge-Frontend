import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createProduct, updateProduct } from "@/features/product/productSlice";
import useBrands from "@/hooks/useBrands";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const ProductForm = ({ id, product = {}, isEditing }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const { brands } = useBrands();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await dispatch(updateProduct({ productId: id, productData: data }));
        Swal.fire({
          icon: "success",
          title: "Producto actualizado",
          text: "El producto ha sido actualizado exitosamente.",
        });
      } else {
        await dispatch(createProduct(data));
        Swal.fire({
          icon: "success",
          title: "Producto agregado",
          text: "El producto ha sido agregado exitosamente.",
        });
        // Restablecer los valores del formulario después de crear el producto
        setValue("name", "");
        setValue("description", "");
        setValue("image_url", "");
        setValue("price", null);
        setValue("brand", "");
      }
      router.push("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error al procesar la solicitud.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={product.name || ""}
          placeholder="Ingrese el nombre del producto"
          {...register("name", { required: true })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic">Este campo es requerido</p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={product.description || ""}
          placeholder="Ingrese la descripción del producto"
          {...register("description", { required: true })}
          rows={4} // Puedes ajustar la cantidad de filas según tu preferencia
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.description ? "border-red-500" : ""
          }`}
        />
        {errors.description && (
          <p className="text-red-500 text-xs italic">Este campo es requerido</p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="image_url"
        >
          URL de la Imagen
        </label>
        <input
          type="url"
          id="image_url"
          name="image_url"
          defaultValue={product.image_url || ""}
          placeholder="Ingrese la URL de la imagen del producto"
          {...register("image_url", { required: true })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.image_url ? "border-red-500" : ""
          }`}
        />
        {errors.image_url && (
          <p className="text-red-500 text-xs italic">Este campo es requerido</p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="price"
        >
          Precio
        </label>
        <input
          type="number"
          id="price"
          name="price"
          defaultValue={product.price || null}
          placeholder="Ingrese el precio del producto"
          {...register("price", { required: true })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.price ? "border-red-500" : ""
          }`}
        />
        {errors.price && (
          <p className="text-red-500 text-xs italic">Este campo es requerido</p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="brand"
        >
          Marca
        </label>
        <select
          id="brand"
          name="brand"
          defaultValue={product.Brand ? product.Brand.name : ""}
          {...register("brand", { required: true })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.brand ? "border-red-500" : ""
          }`}
        >
          <option value="" disabled>
            Seleccione una marca
          </option>
          {brands.map((brand, index) => (
            <option key={index} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>
        {errors.brand && (
          <p className="text-red-500 text-xs italic">Este campo es requerido</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isEditing ? "Editar Producto" : "Agregar Producto"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
