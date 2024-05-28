import { useRouter } from 'next/navigation'
import SearchContainer from '../_components/Search/SeachContainer'
import BackButton from '../_components/BackButton';

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query ?? ""
  return (
    <>

      <div className="flex flex-col border border-white rounded-lg sm:w-full md:w-3/5 p-5 pr-7 m-auto mt-10 bg-blue-950/70">
        <div className="flex flex-row ml-4 gap-2 mb-5">
          <BackButton />
          <div className="flex flex-col ml-4 items-start">
            <h1 className='text-xs font-bold'>Reviewing</h1>
            <h1 className='text-xl font-bold'>Search for a game to review</h1>
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-center items-center">
            <SearchContainer query={query} />
          </div>
        </div>
      </div>

    </>
  )
}