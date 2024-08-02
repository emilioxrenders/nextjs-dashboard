import Head from "next/head";
import Layout from "../components/layout";
import Link from "next/link";
import Header from "../components/header";
import PhotoList from "../components/photoList";
import Hero from "../components/hero";

const PER_PAGE = 9;

export async function getServerSideProps(context) {
  const page = context.query.page || 1;

  const res = await fetch(
    `https://api.pexels.com/v1/curated?per_page=${PER_PAGE}&page=${page}`,
    {
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
    }
  );

  const data = await res.json();

  return {
    props: {
      photos: data.photos,
      page: parseInt(page, 10),
    },
  };
}

export default function Home({ photos, page }) {
  return (
    <>
      <Header />
      <Hero image="mountains.webp" alt="Mountains" />

      {/* Page */}
      <Layout>
        {/* Metadata */}
        <Head>
          <title>Pexels Project</title>
        </Head>

        {/* Photo list */}
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {photos.map((photo) => (
              <PhotoList key={photo.id} photo={photo}></PhotoList>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex gap-5">
            <Link
              href={`/?page=1`}
              className="relative after:w-full after:transition-all after:duration-200 after:left-0 after:absolute after:bg-black after:h-px after:hover:w-0 after:ease-in-out after:bottom-0"
            >
              <p>Start</p>
            </Link>
            {page > 1 && (
              <Link
                href={`/?page=${page - 1}`}
                className="relative after:w-full after:transition-all after:duration-200 after:left-0 after:absolute after:bg-black after:h-px after:hover:w-0 after:ease-in-out after:bottom-0"
              >
                <p>Previous</p>
              </Link>
            )}
            <Link
              href={`/?page=${page + 1}`}
              className="relative after:w-full after:transition-all after:duration-200 after:left-0 after:absolute after:bg-black after:h-px after:hover:w-0 after:ease-in-out after:bottom-0"
            >
              <p>Next</p>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
