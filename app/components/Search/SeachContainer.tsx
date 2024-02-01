import { Card, CardBody, Button, Image } from "@nextui-org/react";
import ResultsCard from "./ResultsCard";
import SearchBox from "./SearchBox";
import { useRouter } from 'next/navigation';

export default async function SeachContainer({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {    
    const query = searchParams?.query || '';
    const game = [{
      name: "Fake Game Title",
      first_release_date: new Date('2024-01-01').getTime() / 1000, // Convert to UNIX timestamp
      category: "Adventure",
      CoverObject: {
        url: "http://images.igdb.com/igdb/image/upload/t_thumb/co62gs.jpg", // Placeholder image URL
      },
    },
     {
      name: "Fake Game Title",
      first_release_date: new Date('2024-01-01').getTime() / 1000, // Convert to UNIX timestamp
      category: "Adventure",
      CoverObject: {
        url: "http://images.igdb.com/igdb/image/upload/t_thumb/co2vyq.jpg", // Placeholder image URL
      },
    }];
    return (
        <>
            <div className="flex flex-col overflow-auto max-h-96">
                <div className="flex flex-col">
                    <SearchBox />
                </div>
                <div className="flex flex-col">
                  {query && <ResultsCard query={query}/>}                    
                </div>
            </div>
            {game.map((game: any, id: any) => (
            <Card      
      className="border box-content bg-indigo-500/70 rounded-lg"
      shadow="sm"
    >
      <CardBody className="[&&]:py-1 pl-1">
        <div className="grid grid-cols-6 md:grid-cols-12 md:gap-2 items-center justify-center">
          <div className="col-span-6 md:col-span-4">
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
          </div>
        </div>
      </CardBody>
    </Card>
    ))}
        </>
    );
}
