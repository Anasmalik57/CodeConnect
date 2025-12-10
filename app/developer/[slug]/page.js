import DeveloperDetailBySlug from "@/components/Developer/DeveloperDetailBySlug";
import { API_BASE } from "@/lib/api";

export async function generateMetadata({ params }) {
  const { slug } = await params; // Ab slug se fetch

  try {
    const res = await fetch(`${API_BASE}/developer/slug/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return { title: "Developer Not Found" };
    }

    const { success, data: developer } = await res.json();

    if (!success || !developer) {
      return { title: "Developer Not Found | Nodesk Developer" };
    }

    const title = `${developer?.name} - ${developer?.level} Developer`;
    const description = `${developer?.name} - ${developer?.level} Developer with ${developer?.experience}+ years experience. Available for hire.`;

    const ogImage = developer?.photo || "/dev.webp";

    return {
      title,
      description, // Ye add kar do (pehle nahi tha isliye generic aa rha tha)
      openGraph: {
        title,
        description,
        url: `https://www.nodeskdeveloper.com/developer/${slug}`,
        siteName: "Nodesk Developer",
        images: [ogImage],
        type: "profile",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    };
  } catch (error) {
    console.error("Metadata fetch failed:", error);
    return { title: "Loading... | Nodesk Developer" };
  }
}

// Optional: Agar static generation chahte ho (build time pre-render)
export async function generateStaticParams() {
  const res = await fetch(`${API_BASE}/developers`); // All developers endpoint
  const { data: developers } = await res.json();

  return developers.map((dev) => ({
    slug: dev.slug,
  }));
}

const DeveloperDetailPage = () => {
  return <DeveloperDetailBySlug />;
};

export default DeveloperDetailPage;
