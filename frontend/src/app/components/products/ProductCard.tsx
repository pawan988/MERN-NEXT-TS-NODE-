"use client";

import Image from "next/image";
import React from "react";
import { truncateText } from "@/utils/truncateTextnpm";
import { formatePrice } from "@/utils/formatePricenpm";
import Rating from "../rating/Rating";
import { useRouter } from "next/navigation";
interface ProductCardProps {
  data: any;
}
const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/productDetail/${data?.id}`)}
      className="col-span-1 cursor-pointer border-[1.2px] border-slae-200 bg-slate-50 rounded-sm p-2 transition translate hover:scale-105 text-center text-sm"
    >
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            alt="product-img"
            src={data?.img_url}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-4">{truncateText(data?.name)}</div>
        <div>
          <Rating stars={data?.rating} />
        </div>
        <div>{data?.reviews?.length} reviews</div>
        <div>{formatePrice(data?.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
