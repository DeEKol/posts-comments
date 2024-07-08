// ? Import Libraries
import { Suspense } from "react";

// ? Import Widgets
import { LoginForm } from "@/widgets/LoginForm";

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

export default async function Page(props: IPageProps) {

    // * Render
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <main>
                <LoginForm />
            </main>
        </Suspense>
    );
};
