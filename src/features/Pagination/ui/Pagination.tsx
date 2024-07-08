"use client";

// ? Import Libraries
import { useState } from "react";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from '@mui/material/Pagination';

// ? Import Styles
import cls from "./styles.module.scss";

// ? Types
interface IPaginationProps {
    className?: string;
    quantityOfPage: number;
}

export const PaginationClient = ({ className, quantityOfPage }: IPaginationProps) => {
    // * Hooks
    const router = useRouter();
    const pathname = usePathname();
    const searchParams: ReadonlyURLSearchParams | null = useSearchParams();

    const currentPage = Number(searchParams?.get('page')) || 1;

    const [selectedPage, setSelectedPage] = useState(currentPage);

    // * Utils
    const toPage = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams || "");
        params.set('page', pageNumber.toString());
        router.push(`${pathname}?${params.toString()}`);
        return `${pathname}?${params.toString()}`;
    };

    // * Handlers
    const onChangeSelectedNumber = (event: React.ChangeEvent<HTMLSelectElement | unknown>, page: number) => {
        setSelectedPage(page);
        toPage(page);
    }

    // * Render
    return (
        <section>
            <Pagination count={quantityOfPage}
                        variant="outlined"
                        color="secondary"
                        page={selectedPage}
                        onChange={onChangeSelectedNumber}
            />
        </section>
    );
};
