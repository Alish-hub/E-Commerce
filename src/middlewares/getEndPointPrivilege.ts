export const getEndPoints = (role: string) => {
  switch (role) {
    case "Admin":
      return [
        "createProduct",
        "updateProduct",
        "deleteProduuct",
        "createCategory",
      ];

    case "Customer":
      return [
        "getproductByCategory",
        "addWishList",
        "getAllWishList",
        "createCart",
      ];

    default:
      return [];
  }
};

export const getEndPoints1 = (role: string) => {
  switch (role) {
    case "admin":
      return [
        "/create/category",
        "/createProduct",
        "/product/update",
        "/product/delete",
      ];

    case "customer":
      return [
        "/getProducts",
        "/wish/add",
        "/wish/getall",
        "/cart/create",
      ];

    default:
      return [];
  }
};
