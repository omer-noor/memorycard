'use client'
import { useEffect, useState } from "react";
import prisma from "@/db";
import Link from "next/link";
import SmallButton from "../SmallButton";

export default function CommentForm({submitCommentForm}:{submitCommentForm:any}) {

    const [inputClass, setInputClass] = useState("cursor-not-allowed bg-gray-900");
    const [comment, setComment] = useState("")    

    const handleFormChange = (event: { target: { value: any; }; }) =>{
        setComment(event?.target.value)
        if (comment.trim().length !== 0) {
            setInputClass("bg-green-900")
          } else {
            setInputClass("cursor-not-allowed bg-gray-900")
          }
    }

    const handleSubmit = () =>{        
        submitCommentForm(comment)  
        setComment('')    
        setInputClass("cursor-not-allowed bg-gray-900")  
    }
    
    const handleCancel = () =>{
        setComment('')
        setInputClass("cursor-not-allowed bg-gray-900")
    }

    return (
        <>
            <input
                type="text"
                value={comment}
                id="comment-reply"
                className="rounded-md rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 
                focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500"
                placeholder="Leave a reply"
                onChange={handleFormChange}
            />
            <div className="flex flex-row ml-auto items-center">
                <SmallButton onClick={handleCancel}>Cancel</SmallButton>
                <SmallButton classNames={`p-1 ${inputClass}`} onClick={handleSubmit}>Reply</SmallButton>
            </div>
        </>
    )
}
