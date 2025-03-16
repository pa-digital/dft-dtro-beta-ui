export const isProductionEnv = (): boolean => {
  return import.meta.env.VITE_ENV === "PROD";
};
