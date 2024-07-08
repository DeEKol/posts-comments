// ? Import Libraries
import { Suspense } from "react";

// ? Import Widgets
import { Spreadsheet, TColumns } from "@/widgets/Spreadsheet";

// ? Import Slice
import { TComments } from "../../types";
import { getComments } from "@/shared/api";

// * Types
interface ISearchParams {
    searchParams?: {
        query?: string;
        page?: string;
    };
}

interface IParams {
    params?: {
        id?: string;
    };
}

interface IPageProps extends ISearchParams, IParams {
  className?: string;
}

export default async function Page({params, searchParams}: IPageProps) {
    // * Variables
    const rowsPerPage = 3;
    const currentPage = Number(searchParams?.page) || 1;
    const roomId = Number(params?.id) || 1;

    // * Models
    const columns: TColumns[] = [
        { field: 'postId', headerName: 'Post Id', width: 70 },
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'body', headerName: 'Body', width: 130 },
    ]

    const comments: TComments[] = await getComments(roomId);

    // * Props To
    const propsToPosts = {
        title: `Comments in Post ${roomId}`,
        columns,
        rowsPerPage,
        rows: comments,
        currentPage,
    }
  return (
      <Suspense fallback={<div>Loading...</div>}>
          <Spreadsheet {...propsToPosts} />
      </Suspense>
  );
};
