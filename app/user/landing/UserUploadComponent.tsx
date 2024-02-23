import { ChangeEvent, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/dist/client/components/headers';
import prisma from "@/db";
import { redirect } from "next/navigation";


export async function UserUploadComponent(props: { userId: number }) {
    
    async function upload(formdata: FormData) {
        'use server'
        const cookieStore = cookies();
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        console.log("HJERE")
        const file: File | null = formdata.get('file') as unknown as File
        if (!file) {
            throw new Error('No file uploaded')
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const { data, error } = await supabase
            .storage
            .from('userImages')
            .upload(user?.id + "/" + uuidv4(), file)

        const updateUser = await prisma.user.update({
            where: {
                id: props.userId,
            },
            data: {
                avatarPath: "https://cpzcqtlzpdobhuojedwl.supabase.co/storage/v1/object/public/userImages/" + data?.path,
            },
        })
        return redirect("/user/landing");

    }

    return (
        <div className='flex flex-row mt-5 items-center'>
            <form action={upload} className="w-1/2">
                <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="file_input"
                >
                    Update Avatar
                </label>
                <input
                    name="file"
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                />
                <div className="flex flex-row">
                    <p
                        className="mt-1 text-xs text-gray-400 dark:text-gray-600"
                        id="file_input_help"
                    >
                        SVG, PNG, JPG or GIF (MAX. 800x400px).
                    </p>
                    <input type="submit" value="Upload" className="text-xs w-1/10 p-1 h-min rounded-md ml-auto mt-2 !bg-emerald-700 !hover:bg-emerald-200" />
                </div>
            </form>

        </div >
    )
}

export default UserUploadComponent;