import { useEffect, useState } from "react";
import prisma from "@/db";
import Link from "next/link";
import SmallButton from "../SmallButton";
import { Avatar, Card, CardBody, Divider, User } from "@nextui-org/react";
import { Comment } from "../Review/ReviewInterfaces";

export default function CommentCard({comment}:{comment:Comment}) {
    

    return (
        <>
            <div className="w-full p-2 border-b-1 border-white/10">
                <div className="flex flex-row w-full gap-2">
                    <div className="relative">
                        <Avatar src={comment.author?.avatarPath ?? ""} size="md" />
                    </div>
                    <div className="flex flex-col ml-2">
                        <div className="flex items-start">
                            <div className="flex flex-col gap-0">
                                <div className="flex flex-row items-end gap-2 mb-1">
                                    <h1 className="text-md font-medium">{comment.author?.name}</h1>
                                    |
                                    <h1 className="text-xs">{comment.createdAt.toDateString()}</h1>
                                </div>
                                <h3 className="text-md text-foreground/90">{comment.text}</h3>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
