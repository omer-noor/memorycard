import { Divider, Image, User } from "@nextui-org/react";
import StaticStars from "../StaticStars";
import prisma from "@/db";
import LikeCount from "./LikeCount";
import { createClient } from "@/utils/supabase/server";
import SmallButton from "../SmallButton";
import CommentContainer from "./CommentContainer";
import router from "next/router";
import { redirect } from "next/navigation";

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

    const getComments = async () => {
        "use server"
        const comments = await prisma.post.findUnique({
            where: { id: props.reviewObject.id! },
            include: {
                comments: {
                    include:{
                        author:true
                    }
                }
            },
        })
        return comments?.comments ?? []
    }

    const getCommentAuthor = async (comment: { authorId: any; }) => {
        "use server"
        const commentAuthor = await prisma.user.findUnique({
            where: {
                id: comment.authorId
            },
        })
        return commentAuthor
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

    const submitCommentForm = async (comment:string) =>{        
        "use server"
        const create = await prisma.comment.create({
            data: {
                text: comment,
                postId: props.reviewObject.id!,
                authorId: dbUser?.id!
            },
        })
        return redirect("/");
    }

    const likeState = await getLikeState();
    const likeCount = await getLikeCount();
    const comments = await getComments();
    console.log(comments)
    const commentCount = comments.length
    const isUser = dbUser !== null ? true : false

    const createLikeEntry = async (likeState: boolean) => {
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
            data: {
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
                    
                    <div className="flex flex-col items-center mt-5">
                      {comments && <CommentContainer commentCount={commentCount} isUser={isUser} createLikeEntry={createLikeEntry} likeState={likeState} likeCount={likeCount} submitCommentForm={submitCommentForm} comments={comments}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}