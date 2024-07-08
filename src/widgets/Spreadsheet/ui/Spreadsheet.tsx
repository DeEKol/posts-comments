// ? Import App
import { TPost } from "@/app/posts";
import { TComments } from "@/app/posts";

// ? Import Features
import { Pagination } from "@/features/Pagination";
import { Table } from "@/features/Table";

// ? Import Slice
import cls from "./styles.module.scss";
import { TColumns } from "../types";

// ? Types
interface ISpreadsheetProps {
    className?: string;
    title: string;
    currentPage: number;
    rowsPerPage: number;
    columns: TColumns[];
    rows: TPost[] | TComments[];
}

export const Spreadsheet = (props: ISpreadsheetProps) => {
    // * Props From
    const { title, currentPage, rowsPerPage, columns, rows } = props;

    // * Variables
    const quantityOfPage = Math.ceil(rows.length / rowsPerPage);

    // * Conditions
    const isPageExists = (_quantityOfPage: number, _currentPage: number) => {
        if (0 < _currentPage && _quantityOfPage >= _currentPage) {
            return true;
        } else {
            return  false;
        }
    }

    // * Props To
    const propsToTable = {
        currentPage,
        rowsPerPage,
        columns,
        rows
    }

    // * Render
    return (
        <main>
            <h2 className={cls.title}>{title}</h2>
            {isPageExists(quantityOfPage, currentPage) ? (
                <Table {...propsToTable} />
            ) : (
                <p className={cls["condition_false"]}>Страницы не существует!</p>
            )}
            <Pagination quantityOfPage={quantityOfPage} />
        </main>
    );
};
