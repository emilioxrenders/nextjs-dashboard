import Head from 'next/head';
import Layout from '../../components/layout';
import Header from '../../components/header';
import Image from 'next/image';
import Link from 'next/link'

export async function getServerSideProps(context) {
    const { id } = context.params;

    const res = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
        headers: {
            Authorization: process.env.PEXELS_API_KEY,
        },
    });

    const photo = await res.json();

    return {
        props: {
            photo,
        },
    };
}

export default function PhotoPage({ photo }) {
    return (
        <>
        <Header />
        
        <Layout>
            {/* Metadata */}
            <Head>
                <title>{photo.photographer} - Photo</title>
            </Head>

            {/* Page */}
            <div className='flex flex-col gap-10'>
                <Link href="/" className='w-fit relative after:w-0 after:transition-all after:duration-200 after:left-0 after:absolute after:bg-black after:h-px after:hover:w-full after:ease-in-out after:bottom-0'>Back to home</Link>
                
                {/* Image view */}
                <div className='flex flex-col lg:flex-row gap-10'>
                    <Image
                        width={1280}
                        height={1280}
                        src={photo.src.large2x}
                        alt={photo.alt}
                        className='w-full max-w-lg'
                    />
                    <div className='flex flex-col gap-1'>
                        <h1 className='text-2xl'>Photo by <Link href={photo.photographer_url} target='_blank' className='relative after:w-0 after:transition-all after:duration-200 after:left-0 after:absolute after:bg-black after:h-px after:hover:w-full after:ease-in-out after:bottom-0'>{photo.photographer}</Link></h1>
                        <p>{photo.alt}</p>
                    </div>
                </div>
            </div>
        </Layout>
        </>
    );
}
