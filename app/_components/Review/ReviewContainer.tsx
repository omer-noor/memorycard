import { Divider } from "@nextui-org/react";
import Review from "./Review";
import prisma from "@/db"

export default async function ReviewContainer(props: {
    containerTitle: string,
    authorId?: number}){
    
    const getReviews = async () => {
        if (props?.authorId) {
            const reviews2 = await prisma.post.findMany({ 
                where: {
                    authorId: {
                        equals: props.authorId,
                    }
                },       
                orderBy: {
                    createdAt: 'desc'
                }
            });
            return reviews2;
        } else {
            const reviews = await prisma.post.findMany({        
                orderBy: {
                    createdAt: 'desc'
                }
            });
            return reviews;
        }
    };  
    
    const reviews = await getReviews();

    return (
        <>
        {reviews &&
            <div className="flex flex-col pl-10 pt-10 mb-10">
                <h1 className="text-2xl font-bold m-auto">{props.containerTitle}</h1>
                <div className="flex flex-col border border-slate-900 drop-shadow-xl bg-sky-950 rounded-lg w-3/4 gap-2 mt-5 p-6 m-auto animate-in">
                    {reviews.map((review, i) => (
                        <>
                        <Review reviewObject = {review} key={i} />
                        <Divider />
                        </>
                    ))}                
                </div>
            </div>}
        </>
    )
}