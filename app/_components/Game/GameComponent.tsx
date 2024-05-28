import { Game } from "@/app/_interfaces/interfaces";
import { getGameById } from "@/app/_services/GameApiService";
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { getGamesBySearch, getCoverArtByGameID } from '@/app/_services/GameApiService'
import Link from "next/link";
import SmallButton from "../SmallButton";
import { cache } from "react";

export default async function GameComponent() {
    const gamesArray = ["250616", "242408", "151665", "119171", "119133"]

    //Trying out caching the games list at the top of the page
    const getGames = cache(async () => {
        const games: Game[] = [];
        for (const element of gamesArray) {
            const game = await getGameById(element);
            if (game) {
                games.push(game);
            }
        }
        return games;
    });

    const games = await getGames()
    console.log(games)


    if (games && games.length > 0) {
        const gamesWithCovers = await Promise.all(games.map(async (game) => {
            const coverObject = await getCoverArtByGameID(game.id);
            const updatedUrl = coverObject?.url.replace('t_thumb', 't_cover_big') ?? '//images.igdb.com/igdb/image/upload/t_cover_big/co6c80.jpg'
            coverObject!.url = updatedUrl
            return { ...game, CoverObject: coverObject };
        }));
        return (
            <>

                <div className="box-content mt-5">
                    <h1 className="text-2xl font-bold mb-2 ml-2">Top games right now</h1>
                    <div className="flex flex-row">
                        {gamesWithCovers.map((game: Game, id: any) => (
                            <div className="relative flex flex-col mx-2 hover-target">
                            <Image
                                alt="Album cover"
                                width={180}
                                height={400}
                                shadow="md"
                                src={game.CoverObject?.url || '//images.igdb.com/igdb/image/upload/t_cover_big/co6c80.jpg'}
                            />
                            <div className="flex bg-indigo-900/80 items-center justify-center absolute z-10 top-0 bottom-0 left-0 right-0 rounded-sm opacity-0 transition-opacity duration-300 hover:opacity-100">
                                <div className="flex flex-row">
                                    <SmallButton link={`/game?gameID=${game.id.toString()}`} classNames="bg-sky-700 hover:bg-sky-500"> Game Page </SmallButton>
                                    <SmallButton link={`/review?gameID=${game.id.toString()}`} classNames="bg-lime-700 hover:bg-lime-500"> Review </SmallButton>
                                </div>
                            </div>
                        </div>

                        ))}
                    </div>
                </div>
            </>)
    } else { return (<>Cannot load games</>) }

}
