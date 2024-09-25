import React from "react";
import { useState } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import Header from "../components/header";
import SignalCard from "../components/signalCard";
import { SignalApiResponse } from "../types/signal";

interface HomeProps {
  data: SignalApiResponse;
}

export async function getServerSideProps() {
  const res = await fetch(process.env.API_URL as string, {
    headers: {
      Authorization: process.env.API_KEY as string,
    },
  });

  const data: SignalApiResponse = await res.json();

  return {
    props: {
      data: data,
    },
  };
}

export default function Home({ data }: HomeProps) {
  const predictionsArray = Object.entries(data).reverse();
  const itemsPerPage = 10;
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + itemsPerPage);
  };

  return (
    <>
      <Header />

      {/* Page */}
      <Layout>
        {/* Metadata */}
        <Head>
          <title>Nextjs Dashboard</title>
        </Head>

        {/* List */}
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto">
            {predictionsArray.slice(0, visibleItems).map(([id, signal]) => (
              <SignalCard key={id} signal={signal}></SignalCard>
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
