import { Avatar } from "@nextui-org/react";
import prisma from "@/db";
import ReviewContainer from "@/app/_components/Review/ReviewContainer";

export default async function UserProfile({ params }: { params: { id: string } }) {

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(params.id),
        },
    })

    return (
        <div className="flex flex-col pl-10 pt-10">
            <h1 className="text-3xl font-bold">{user?.username}'s Profile</h1>
            <div className="flex flex-col border rounded-lg w-fit mt-5 p-6 bg-blue-950/70">
                <div className="flex flex-row gap-5">
                    <Avatar src={user?.avatarPath ?? ""} size="lg" />
                    <div className="flex flex-col gap-0">
                        <p className="text-3xl font-medium font-bold">{user?.username}</p>
                        <p className="text-xs">Regular User</p>
                    </div>                   
                </div>    
                <div className="flex mt-10">
                        <p className="text-xl -mb-10 font-medium font-bold">{user?.username}'s Posts</p>                        
                </div>    
                <ReviewContainer containerTitle="" authorId={user?.id}/>        
            </div>
        </div>
    )
}