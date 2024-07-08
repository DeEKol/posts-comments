// ? Import Libraries
import { Suspense } from "react";

// ? Import Widgets

// ? Import Slice

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

    // * Fetches

    // * Models

    // * Props To

    // * Render
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <main>auth</main>
        </Suspense>
    );
};
