import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("/products");
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId) => {
    const response = await axios.get(`/products/${productId}`);
    return response.data;
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData) => {
    const response = await axios
      .post("/products", productData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Producto agregado",
          text: "El producto ha sido agregado exitosamente.",
        })
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha ocurrido un error al intentar agregar el producto.",
        });
      });
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, productData }) => {
    const response = await axios
      .put(`/products/${productId}`, productData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Producto actualizado",
          text: "El producto ha sido actualizado exitosamente.",
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha ocurrido un error al intentar actualizar el producto.",
        });
      });
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    const response = await axios.delete(`/products/${productId}`);
    return response.data;
  }
);

const initialState = {
  products: [],
  productDetail: null,
  status: "idle",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeded";
        state.productDetail = action.payload;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.status = "succeded";
      })
      .addCase(createProduct.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.status = "succeded";
      })
      .addCase(updateProduct.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.status = "succeded";
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default productSlice.reducer;
