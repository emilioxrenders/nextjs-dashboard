import Head from 'next/head';
import Layout from '../components/layout';
import Link from 'next/link';
import Image from 'next/image'
import Header from '../components/hero';

const PER_PAGE = 15;

export async function getServerSideProps(context) {
  const page = context.query.page || 1;

  const res = await fetch(`https://api.pexels.com/v1/curated?per_page=${PER_PAGE}&page=${page}`, {
    headers: {
      Authorization: process.env.PEXELS_API_KEY,
    },
  });

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
    <Layout>
      {/* Metadata */}
      <Head>
        <title>Pexels Project</title>
      </Head>

      {/* Page */}
      <div>
        {/* Title */}
        <div className='flex flex-col gap-2 mb-10'>
          <h1 className='text-2xl'>Nextjs Pexels Project</h1>
          <p>Welcome to my little project working with <Link href="https://www.pexels.com/" target='_blank' className='relative after:w-0 after:transition-all after:duration-200 after:left-0 after:absolute after:bg-black after:h-px after:hover:w-full after:ease-in-out after:bottom-0'>Pexels'</Link> API. This project displays a paginated list of images that navigate to a dedicated page for each image. Curious to see how I made this? Check it out here!</p>
        </div>

        {/* Photo list */}
        <div className='flex flex-col gap-5'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {photos.map(photo => (
              <div key={photo.id} className='flex flex-col gap-1'>
                <Link href={`/photos/${photo.id}`}>
                  <Image width={720} height={720} src={photo.src.large} alt={photo.alt} className='w-full shadow' />
                </Link>
                <p className='text-sm'>Made by: <Link href={photo.photographer_url} target='_blank' className='relative after:w-0 after:transition-all after:duration-200 after:left-0 after:absolute after:bg-black after:h-px after:hover:w-full after:ease-in-out after:bottom-0'>{photo.photographer}</Link></p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className='flex gap-5'>
            <Link href={`/?page=1`} className='relative after:w-0 after:transition-all after:duration-200 after:left-0 after:absolute after:bg-black after:h-px after:hover:w-full after:ease-in-out after:bottom-0'>
              <p>Start</p>
            </Link>
            {page > 1 && (
              <Link href={`/?page=${page - 1}`} className='relative after:w-0 after:transition-all after:duration-200 after:left-0 after:absolute after:bg-black after:h-px after:hover:w-full after:ease-in-out after:bottom-0'>
                <p>Previous</p>
              </Link>
            )}
            <Link href={`/?page=${page + 1}`} className='relative after:w-0 after:transition-all after:duration-200 after:left-0 after:absolute after:bg-black after:h-px after:hover:w-full after:ease-in-out after:bottom-0'>
              <p>Next</p>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
    </>
  );
}
