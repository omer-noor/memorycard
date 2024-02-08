import ReviewForm from "./ReviewForm";
import BackButton from "../components/BackButton";
import { Image } from "@nextui-org/react";
import { getGameById, getCoverArtByGameID } from "../providers/GameApiProvider";

export default async function Page({
  searchParams,
}: {
  searchParams: { gameID: string };
}) {
  const game = await getGameById(searchParams.gameID)
  const coverObject = game?.id ? await getCoverArtByGameID(game?.id) : null;
  const coverUrl = coverObject?.url.replace('t_thumb', 't_cover_big')    
  const date = game?.first_release_date
  ? new Date(game.first_release_date * 1000).getFullYear().toString()
  : "";
  const gameId = game?.id
  console.log(gameId)
  return (
    <>
      <div className="flex flex-col border border-white min-h-1/2 rounded-lg sm:w-full md:w-3/5 p-5 pr-7 m-auto mt-10">
        <div className="flex flex-row ml-4 gap-2 mb-5">
          <BackButton />
          <div className="flex flex-col ml-4 items-start">
            <h1 className='text-s font-bold'>Reviewing</h1>
            <h1 className='text-3xl font-bold'>{game?.name}</h1>
            <h1 className='text-s ml-1'>{date}</h1>
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <Image
              alt="Album cover"
              className="h-1/2 rounded-lg m-4"              
              src={coverUrl}
            />
            <ReviewForm gameId={gameId??0}/>
          </div>
        </div>
      </div>
    </>
  )

}