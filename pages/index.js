import { useState } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import Header from "../components/header";
import List from "../components/list";
import Hero from "../components/hero";

export async function getServerSideProps() {
  const res = await fetch(process.env.API_URL, {
    headers: {
      Authorization: process.env.API_KEY,
    },
  });

  const data = await res.json();

  console.log(data);

  return {
    props: {
      data: data,
    },
  };
}

export default function Home({ data }) {
  const predictionsArray = Object.entries(data);
  const itemsPerPage = 10;
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + itemsPerPage);
  };

  return (
    <>
      <Header />
      <Hero />

      {/* Page */}
      <Layout>
        {/* Metadata */}
        <Head>
          <title>Nextjs Dashboard</title>
        </Head>

        {/* List */}
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {predictionsArray.slice(0, visibleItems).map(([id, prediction]) => (
              <List key={id} prediction={prediction}></List>
            ))}
          </div>

          {visibleItems < predictionsArray.length && (
            <button
              className="bg-gray-800 text-white py-2 px-6 rounded w-full"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          )}
        </div>
      </Layout>
    </>
  );
}
