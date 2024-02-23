import { Divider, Image, User } from "@nextui-org/react";
import StaticStars from "../StaticStars";
import prisma from "@/db";
import LikeCount from "./LikeCount";
import { createClient } from "@/utils/supabase/server";

export default async function Review(props: {
    reviewObject: {
        id: number;
        title: string;
        content: string | null;
        spoilers: boolean;
        rating: number;
        gameId: string;
        gameName: string;
        gameCover: string | null;
        published: boolean;
        authorId: number;
        createdAt: Date;
        updatedAt: Date;
    },
    key: number
}) {
    const supabase = await createClient()

    const postAuthor = await prisma.user.findUnique({
        where: {
            id: props.reviewObject.authorId,
        },
    })

    const {
        data: { user },
    } = await supabase.auth.getUser();
    
    const dbUser = await prisma.user.findUnique({
        where: {
            authUID: user?.id ?? "0",
        },
    })

    const getLikeCount = async () => {
        "use server"
        const likeCount = await prisma.post.findUnique({
            where: { id: props.reviewObject.id! },
            select: {
              _count: {
                select: {
                  reactions: { where: { state: true } },
                },
              },
            },
        })
        return likeCount?._count.reactions ?? 0     
    }

    const getCommentCount = async () => {
        "use server"
        const comments = await prisma.post.findUnique({
            where: { id: props.reviewObject.id! },
            select: {              
                  comments:true
            },            
        })
        return comments?.comments ?? []   
    }

    const getLikeState = async () => {
        "use server"        
        const likeState = await prisma.postReaction.findUnique({
            where: {
                postId_authorId: {
                    postId: props.reviewObject.id!,
                    authorId: dbUser?.id ?? 0,
                }
            },
            select: {
                state: true
            }
        })        
        return likeState?.state ?? false
    }

    const likeState = await getLikeState();
    const likeCount = await getLikeCount();
    const comments = await getCommentCount();
    const commentCount = comments.length
    const isUser = dbUser!==null ? true:false

    const createLikeEntry = async (likeState:boolean) => {
        "use server"
        const upsertPostReaction = await prisma.postReaction.upsert({
            where: {
                postId_authorId: {
                    postId: props.reviewObject.id!,
                    authorId: dbUser?.id!,
                }
            },
            update: {
                state: likeState ? !likeState : true,
            },
            create: {
                // Data to create a new postReaction if it doesn't exist
                authorId: dbUser?.id!,
                postId: props.reviewObject.id!,
                state: true,                
            },
        })       

        await prisma.post.update({
            where: { id: props.reviewObject.id! },
            data:{
               reactions: {
                connect: {
                    postId_authorId: {
                      postId: upsertPostReaction.postId,
                      authorId: upsertPostReaction.authorId,
                    },
                  },
               }          
            }
        })
    };

    const coverURL = props.reviewObject.gameCover ?? ""
    return (
        <div className="flex items-center p-4">
            <div className="flex flex row w-full">
                <Image
                    alt="Album cover"
                    className="h-1/4 rounded-lg w-1/4"
                    src={coverURL}
                    removeWrapper={true}
                />
                <div className="w-full flex flex-col gap-2 px-2 ml-2">
                    <h1 className='text-3xl font-bold'>{props.reviewObject.title}</h1>
                    <div className="flex flex-row items-center">
                        <StaticStars stars={props.reviewObject.rating} />

                        <Divider orientation="vertical" className="ml-2" />
                        <div className="col ml-2">
                            <p className="text-xs">Reviewing</p>
                            <p>{props.reviewObject.gameName}</p>
                        </div>
                        <Divider orientation="vertical" className="ml-2" />
                        <User
                            name={postAuthor?.username}
                            className="ml-2"
                            description="Free User"
                            avatarProps={{
                                src: postAuthor?.avatarPath ?? ""
                            }}
                        />
                    </div>
                    <p className="text-xs text-slate-600">Posted {props.reviewObject.createdAt.toDateString()}</p>
                    <Divider />
                    <p>
                        {props.reviewObject.content}
                    </p>
                    <div className="flex flex-row items-center gap-2 ml-auto">
                        {likeState!==null && likeCount!==null &&  <LikeCount createLikeEntry={createLikeEntry} isUser={isUser} likeState={likeState} likes={likeCount} />}        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                        </svg>
                        <p className="-ml-1 text-sm text-gray-500">{commentCount}</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">

                    </div>
                </div>
            </div>
        </div>
    ) 
}