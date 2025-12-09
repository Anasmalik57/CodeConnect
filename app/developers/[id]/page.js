import DeveloperDetailClient from "@/components/Developer/DeveloperDetailClient";
import { API_BASE } from "@/lib/api";
import React from "react";



export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const res = await fetch(`${API_BASE}/developer/${id}`, {
      cache: "no-store",
    });

    if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) {
      return { title: "Developer Not Found | Nodesk Developer" };
    }

    const { success, data: developer } = await res.json();

    if (!success || !developer) {
      return { title: "Developer Not Found | Nodesk Developer" };
    }

    // Clean title & description
    const title = `${developer.name} - ${developer.level} Developer`;
    const cleanDescription = developer.bio
      ? developer.bio.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 20) + "..."
      : "Experienced developer ready to build your next project at Nodesk Developer";

    // Developer photo as image (agar nahi hai to fallback)
    const ogImage = developer.photo?.startsWith("http")
      ? developer.photo
      : `https://www.nodeskdeveloper.com${developer.photo || "/default-dev-photo.jpg"}`;

    return {
      title,
      description: cleanDescription,

      openGraph: {
        title,
        description: cleanDescription,
        url: `https://www.nodeskdeveloper.com/developers/${id}`,
        siteName: "Nodesk Developer",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: developer.name,
          },
        ],
        locale: "en_IN",
        type: "website",
      },

      twitter: {
        card: "summary_large_image",
        title,
        description: cleanDescription,
        images: [ogImage],
      },

      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error("Metadata fetch failed:", error);
    return {
      title: "Loading... | Nodesk Developer",
    };
  }
}


const DeveloperDetailPage = () => {
  return (
    <>
      <DeveloperDetailClient />
    </>
  );
};

export default DeveloperDetailPage;
