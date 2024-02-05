import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { getBackgroundImageByGameId, getCoverArtByGameID, getGameById, getGenresByIDs, getPlatformsByIDs } from "../providers/GameApiProvider";
import { Genre } from "../interfaces/interfaces";

export default async function GamePage({
    searchParams,
}: {
    searchParams: { gameID: string };
}) {
    const game = await getGameById(searchParams.gameID)
    const genres = game?.genres ? await getGenresByIDs(game?.genres) : []
    const coverObject = game?.id ? await getCoverArtByGameID(game?.id) : null;
    const coverUrl = coverObject?.url.replace('t_thumb', 't_cover_big')
    const backgroundObject = game?.id ? await getBackgroundImageByGameId(game?.id) : null;
    const backgroundUrl = backgroundObject?.url.replace('t_thumb', 't_1080p')
    const platforms = game?.genres ? await  getPlatformsByIDs(game?.platforms) : []
    console.log(platforms)

    return (
        <div className="flex flex-col pl-10 pt-10 w-full">
            <div style={{ backgroundImage: `url(${backgroundUrl}` }} className=" border-2 border-solid border border-white rounded-lg gap-2 mt-5">
                <div className="flex flex-row backdrop-blur-sm backdrop-brightness-50 bg-gradient-to-r from-sky-200/20 to-slate-900/90 ">
                    <div className="flex flex-col h-full p-6">
                        <div className="flex flex-col gap-0">
                            <p className="text-4xl font-bold">{game?.name}</p>
                            <div className="flex flex-row gap-4 ml-1 items-center">
                                <p className="text-s">
                                    ★ {game?.rating ? game?.rating.toPrecision(2)+"/100": "No rating"}
                                </p>
                                |
                                <p className="text-s">
                                    Released:{" "}
                                    {
                                        new Date(
                                            (game?.first_release_date ?? 0) * 1000 // Fallback to 0 if first_release_date is undefined
                                        ).toLocaleDateString("en-US")
                                    }
                                </p>
                                |

                                <p className="text-s">
                                    {genres.map((genre: Genre, index: number) => (
                                        <span key={index}>
                                            {genre.name}{index < genres.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </p>

                            </div>
                        </div>
                        <div className="flex flex-row gap-5 mt-10">
                            <p>{game?.summary}</p>
                        </div>
                        <div className="flex flex-row gap-1 mt-10">
                            <p className="font-medium mr-2">Platforms: </p>
                            {platforms!.map((platform: string, index: number) => (
                                <button className="px-1 border border-white/20 border-1 rounded-md no-underline bg-indigo-900 hover:bg-btn-background-hover">
                                    {platform}
                                </button>
                            ))}                            
                        </div>
                    </div>
                    <Image
                        alt="Album cover"
                        className="min-h-max min-w-min border-indigo-400/40 border-2 border-solid rounded-lg m-4"
                        shadow="lg"
                        src={coverUrl || ''}
                    />
                </div>
            </div>
        </div>
    )
}