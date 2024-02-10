import { getProductApi } from "../apis/productApi";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import { productList } from "@/utils/productListnpm";
import ProductCard from "./components/products/ProductCard";
export default function Home() {
  getProductApi("hi i will you send data");
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 2xl:grid-cols-6 gap-8">
          {productList?.map((items, index) => {
            return <ProductCard data={items} />;
          })}
        </div>
      </Container>
    </div>
  );
}
