import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { Game } from "@/app/interfaces/interfaces";
import { getGamesBySearch, getCoverArtByGameID } from '@/app/providers/GameApiProvider'

export default async function ResultsCard({
  query,
}: {
  query: any;
}) {
  console.log(query);
  const games = await getGamesBySearch(query);
  if (games && games.length > 0) {
    const gamesWithCovers = await Promise.all(games.map(async (game) => {
      const coverObject = await getCoverArtByGameID(game.id);
      return { ...game, CoverObject: coverObject }; 
    }));
    return (
      <>
        {gamesWithCovers.map((game: Game, id: any) => (
          <Card
          className="border box-content bg-indigo-500/70 rounded-lg"
          shadow="sm"
          >
            <CardBody className="[&&]:py-1 pl-1">
              <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                <div className="relative col-span-6 md:col-span-4">
                  <Image
                   alt="Album cover"
                   className="max-h-xs max-w-xs rounded-lg"                    
                   shadow="md"
                    src={game.CoverObject?.url || ''}                    
                  />
                </div>

                <div className="flex flex-col col-span-6 md:col-span-8 pl-1">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-0">
                    <h1 className="text-2xl font-medium ">{game.name}</h1>
                      <h3 className="font-semibold text-foreground/90">Released: {new Date(game.first_release_date * 1000).toLocaleDateString("en-US")}</h3>
                      <p className="text-small text-foreground/80">{game.category}</p>
                    </div>
                  </div>

                  <div className="flex w-full">
                    <Button
                      isIconOnly
                      className="data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                    >
                      Hello
                    </Button>
                    <Button
                      isIconOnly
                      className="data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                    >
                      Hello
                    </Button>
                    <Button
                      isIconOnly
                      className="data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                    >
                      Hello
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </>)
  }
}
