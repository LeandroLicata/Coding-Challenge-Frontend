import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "@/features/brand/brandSlice";

const useBrands = () => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brand.brands);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  return { brands };
};

export default useBrands;
