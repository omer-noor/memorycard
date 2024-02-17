'use client'
import { useEffect, useState } from "react";
import prisma from "@/db";

export default function LikeCount({ createLikeEntry, likeState, likes}: { createLikeEntry: any, likeState: boolean, likes:number }) {

    console.log(likes, "LIKE COUNT")
    const [liked, setLiked] = useState(likeState);
    const [likeCountLocal, setlikeCountLocal] = useState(likes);

    function handleClick() {       
        if(liked){
            setlikeCountLocal(likeCountLocal-1)
        }
        else{setlikeCountLocal(likeCountLocal+1)}
        setLiked(!liked);
        createLikeEntry(liked);
    }

    const svgStyle = liked
        ? { fill: "red", strokeWidth: "0" } // Styles when liked
        : { fill: "none", strokeWidth: "1.5" }; // Default styles

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 cursor-pointer hover:fill-red" // Added cursor-pointer for click indication
                fill={liked ? "red" : "none"} // Conditional fill based on liked state
                strokeWidth={liked ? "0" : "1.5"} // Conditional stroke width based on liked state
                stroke="currentColor"
                onClick={handleClick}
            // Hover styles can be handled in external CSS if needed
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
            </svg>
            <p className="-ml-1 text-sm text-gray-500">{likeCountLocal}</p>
        </>
    )
}
