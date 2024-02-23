'use client'
import { useEffect, useState } from "react";
import prisma from "@/db";
import Link from "next/link";

export default function LikeCount({ createLikeEntry, likeState, likes, isUser }: { createLikeEntry: any, likeState: boolean, likes: number, isUser: boolean }) {

    console.log(likes, "LIKE COUNT")
    const [liked, setLiked] = useState(likeState);
    const [likeCountLocal, setlikeCountLocal] = useState(likes);
    const [showError, setShowError] = useState(false);

    function handleClick() {
        if (!isUser) {
            setShowError(true)
            setTimeout(function(){
                setShowError(false)
            }, 5000);
            return
        }
        if (liked) {
            setlikeCountLocal(likeCountLocal - 1)
        }
        else { setlikeCountLocal(likeCountLocal + 1) }
        setLiked(!liked);
        createLikeEntry(liked);
    }

    function closeError(){
        setShowError(false)
    }

    const svgStyle = liked
        ? { fill: "red", strokeWidth: "0" } // Styles when liked
        : { fill: "none", strokeWidth: "1.5" }; // Default styles

    return (
        <>
            { showError &&
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 w-1/2 py-3 rounded absolute m-auto left-0 right-0 mb-2 z-50" role="alert">
                <strong className="font-bold">You must log in first!</strong>
                <span className="block sm:inline"><Link href="/auth/login" className="text-blue-900">Login</Link> or <Link className="text-blue-900" href="/auth/signup">Signup</Link></span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg className="fill-current h-6 w-6 text-red-500" role="button" onClick={closeError} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </span>
            </div> }
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
