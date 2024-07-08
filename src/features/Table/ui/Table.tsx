// ? Import Libraries
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from "next/link";

// ? Import App
import { TPost, TPostWithLink } from "@/app/posts";
import { TComments } from "@/app/posts";

// ? Import Widgets
import { type TColumns } from "@/widgets/Spreadsheet";

// ? Import Slice
import cls from "./styles.module.scss";

// * Types
interface ITableProps {
    className?: string;
    currentPage: number;
    rowsPerPage: number;
    columns: TColumns[];
    rows: TPost[] | TComments[];
}

export const TableSSR = (props: ITableProps) => {
    // * Props From
    const { currentPage, rowsPerPage, columns, rows } = props;

    // * Hooks

    // * Utils
    const currentDataArr = (
            rows: TPostWithLink[] | TComments[],
            dataCount: number,
            page: number
    ): TPostWithLink[] | TComments[] => {
        const _startSlice = page === 1 ? 0 : dataCount * (page - 1);
        const _endSlice = dataCount;

        const rowsReturn = rows.splice(_startSlice, _endSlice);

        return rowsReturn;
    }

    // * Handlers

    // * Render
    return (
        <section>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.field}>{column.headerName}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentDataArr(rows, rowsPerPage, currentPage).map((row) => (
                            <TableRow key={row.id}>
                                {Object.values(row).map((value, index) => (
                                    <TableCell key={index}>
                                    {row?.link === value ? (
                                        <Link className={cls.link} href={String(value)}>
                                            COMMENTS
                                        </Link>
                                    ) : (
                                        <span>{value}</span>
                                    )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    )
};
