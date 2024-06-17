import Image from 'next/image';
import Link from 'next/link';

export default function PhotoList({ photo }) {
    return  <div key={photo.id} className='flex flex-col gap-1'>
                <Link href={`/photos/${photo.id}`}>
                    <Image width={720} height={720} src={photo.src.large} alt={photo.alt} loading="lazy" className='w-full shadow' />
                </Link>
                <p className='text-sm'>Made by: <Link href={photo.photographer_url} target='_blank' className='relative after:w-0 after:transition-all after:duration-200 after:left-0 after:absolute after:bg-black after:h-px after:hover:w-full after:ease-in-out after:bottom-0'>{photo.photographer}</Link></p>
            </div>;
}

