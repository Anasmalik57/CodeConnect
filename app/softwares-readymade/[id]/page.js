import { API_BASE } from "@/lib/api";
import ProductDetailClient from "@/components/ReadyMadeProduct/ProductDetailClient";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`${API_BASE}/project/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return { title: "Product Not Found" };
    }

    const { success, data: product } = await res.json();

    if (!success || !product) {
      return { title: "Product Not Found" };
    }

    const title = `${product?.name} - Ready Made App`;
    const description = product.description.slice(0, 50) || "Production-ready app";

    const ogImage = product.screenshots?.[0] || "/productImage.webp";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [ogImage],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    };
  } catch (error) {
    return { title: "Loading..." };
  }
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
