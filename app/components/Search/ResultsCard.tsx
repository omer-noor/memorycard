import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { Game } from "@/app/interfaces/interfaces";
import { getGamesBySearch, getCoverArtByGameID } from '@/app/providers/GameApiProvider'
import Link from "next/link";

export default async function ResultsCard({
  query,
}: {
  query: any;
}) {
  

  const games = await getGamesBySearch(query);
  if (games && games.length > 0) {
    const gamesWithCovers = await Promise.all(games.map(async (game) => {
      const coverObject = await getCoverArtByGameID(game.id);    
      console.log(game)  
      return { ...game, CoverObject: coverObject };
    }));
    return (
      <>
        <div className="box-content">
          {gamesWithCovers.map((game: Game, id: any) => (
            
            <Card
              className="border bg-indigo-900 rounded-lg hover:bg-indigo-600"
              shadow="sm"
              isHoverable={true}
              href = {`/game?gameID=${game.id}`}
              as={Link}
            >
              <CardBody className="[&&]:py-1 pl-1 truncate">
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center ">
                  <div className="relative col-span-6 md:col-span-2">
                    <Image
                      alt="Album cover"
                      className="max-h-xs max-w-14 rounded-lg"
                      shadow="md"
                      src={game.CoverObject?.url || ''}
                    />
                  </div>

                  <div className="flex flex-col col-span-6 md:col-span-8">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-0">
                        <h1 className="text-lg font-medium">{game.name}</h1>
                        <h3 className="text-sm font-semibold text-foreground/90">Released: {new Date(game.first_release_date * 1000).toLocaleDateString("en-US")}</h3>
                        <p className="text-xs text-foreground/80">{game.category}</p>
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
