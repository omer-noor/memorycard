import { Card, CardBody, Button, Image } from "@nextui-org/react";
import ResultsCard from "./ResultsCard";
import SearchBox from "./SearchBox";
import { useRouter } from 'next/navigation';

export default async function SearchContainer({query}:{query:string}) {   
    
    return (
        <>
            <div className="flex flex-col overflow-auto max-w-96 max-h-96">
                <div className="flex flex-col">
                    <SearchBox />
                </div>
                <div className="flex flex-col">
                  {query && <ResultsCard query={query}/>}                    
                </div>
            </div>         
        </>
    );
}
