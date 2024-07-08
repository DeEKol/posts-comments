// ? Import Libraries
import { Suspense } from "react";

// ? Import Widgets
import { Spreadsheet, TColumns } from "@/widgets/Spreadsheet";

// ? Import Shared
import { getPosts } from "@/shared/api";

// ? Import Slice
import { TPost, TPostWithLinkUsername } from "./types";
import {
    postsColumnsModel,
    postsWithLinkWithUsernameConstructor
} from "./models";


// * Types
interface ISearchParams {
    searchParams?: {
        query?: string;
        page?: string;
    };
}

interface IPageProps extends ISearchParams {
  className?: string;
}

export default async function Page({searchParams}: IPageProps) {
    // * Variables
    const rowsPerPage = 6;
    const currentPage = Number(searchParams?.page) || 1;

    // * Models
    const columns: TColumns[] = postsColumnsModel;
    const posts: TPost[] = await getPosts(currentPage);
    const postsWithLinkUsername: TPostWithLinkUsername[] = await postsWithLinkWithUsernameConstructor(posts);

    // * Props To
    const propsToPosts = {
        title: "Posts",
        columns,
        rowsPerPage,
        rows: postsWithLinkUsername,
        currentPage,
    }

    // * Render
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Spreadsheet {...propsToPosts} />
        </Suspense>
    );
};
