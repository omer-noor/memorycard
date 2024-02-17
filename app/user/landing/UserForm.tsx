import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import LargeButton from "../components/LargeButton"
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import prisma from "@/db"

export default async function UserForm(props:{any: any}) {

    return (
        <>
            <form className="w-full mx-auto px-10" action={signIn}>
                <div className="mb-5">
                    <label
                        htmlFor="review-title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Review Title
                    </label>
                    <input
                        name="review-title"
                        type="text"
                        id="review-title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="review-text"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Review
                    </label>
                    <input
                        name="review-text"
                        type="text"
                        id="review-text"
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-row items-end">
                    <div className="flex flex-col">
                        <label
                            htmlFor="review-rating"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Rating
                        </label>
                        <input
                            name="review-rating"                            
                            type="number"
                            max="5"
                            id="review-rating"
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <LargeButton classNames="ml-auto" color="emerald">Submit</LargeButton>
                </div>
                <p className="mt-1 block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                    Reviewing as {username}
                </p>
            </form>

        </>
    )
}