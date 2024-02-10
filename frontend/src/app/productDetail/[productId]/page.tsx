import React from "react";
import Container from "@/app/components/Containernpm";
import ProductDetail from "./ProductDetails";
import { productDetail } from "@/utils/productDetailnpm";
interface IPrams {
  productId?: string;
}
const Product = ({ params }: { params: IPrams }) => {
  return (
    <div className="p-8">
      <Container>
        <ProductDetail product={productDetail} />
      </Container>
    </div>
  );
};

export default Product;
