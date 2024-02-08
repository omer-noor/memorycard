import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { Game } from "@/app/interfaces/interfaces";
import { getGamesBySearch, getCoverArtByGameID } from '@/app/providers/GameApiProvider'
import Link from "next/link";
import SmallButton from "../SmallButton";

export default async function ResultsCard({
  query,
}: {
  query: string;
}) {  
  const games = await getGamesBySearch(query);
  if (games && games.length > 0) {
    const gamesWithCovers = await Promise.all(games.map(async (game) => {
      const coverObject = await getCoverArtByGameID(game.id);
      return { ...game, CoverObject: coverObject };
    }));
    return (
      <>
        <div className="box-content">
          {gamesWithCovers.map((game: Game, id: any) => (

            <Card
              className="bg-gradient-to-b from-slate-900 to-slate-950 hover:bg-indigo-600"
              shadow="sm"
              isHoverable={true}
              //href={`/game?gameID=${game.id}`}
              // as={Link}
              radius="none"
            >
              <CardBody className="[&&]:py-1 pl-1 truncate">
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center ">
                  <div className="relative col-span-6 md:col-span-2">
                    <Image
                      alt="Album cover"
                      className="max-h-xs max-w-14 rounded-lg"
                      shadow="md"
                      src={game.CoverObject?.url || '//images.igdb.com/igdb/image/upload/t_thumb/co6c80.jpg'}
                    />
                  </div>

                  <div className="flex flex-col col-span-6 ml-2 md:col-span-8">
                    <div className="flex items-start">
                      <div className="flex flex-col gap-0">
                        <h1 className="text-lg font-medium">{game.name}</h1>
                        <h3 className="text-xs font-semibold text-foreground/90">Released: {new Date(game.first_release_date * 1000).toLocaleDateString("en-US")}</h3>
                        <div className="flex flex-row items-start">
                        <SmallButton link={`/game?gameID=${game.id.toString()}`} classNames="bg-indigo-700 hover:bg-indigo-500"> Game Page </SmallButton>
                        <SmallButton link={`/review?gameID=${game.id.toString()}`} classNames="bg-emerald-700 hover:bg-emerald-500"> Review </SmallButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

          ))}
        </div>
      </>)
  }

}
