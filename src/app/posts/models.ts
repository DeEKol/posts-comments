// ? Import Widgets
import { TColumns } from "@/widgets/Spreadsheet";

// ? Import Shared
import { getUser } from "@/shared/api";

// ? Import Slice
import { TPost, TPostWithLinkUsername, TUserFetch, TUsers } from "./types";

// * Utils
// Метод для проверки существования юзера в массиве по ключу userId
const containsUserId = (_users: TUsers, _userId: number) => {
    return String(_userId) in _users;
}

// * Models
export const postsColumnsModel: TColumns[] = [
    { field: 'username', headerName: 'Username', width: 100 },
    { field: 'userId', headerName: 'User Id', width: 30 },
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'title', headerName: 'Title', width: 130 },
    { field: 'body', headerName: 'Body', width: 130 },
    { field: 'link', headerName: 'Link To Comments', width: 130 },
]

// ! Объект с юзерами, чтоб не совершать лишних запросов
const users: TUsers = {};
export const postsWithLinkWithUsernameConstructor = async (_posts: TPost[]) => {
    const postsWithLinkWithUsername: TPostWithLinkUsername[] = [];
    for (const post of _posts) {
        const postReturned: TPostWithLinkUsername = post;

        // ! Совершать ли запрос за юзером
        if (!containsUserId(users, post.userId)) {
            const userFetching: TUserFetch = await getUser(post.userId);
            users[String(post.userId)] = userFetching.username;
        }

        // Добавляем поля
        const updatedPostReturned = {
            username: users[String(post.userId)],
            ...postReturned,
            link: `/posts/${post.id}/comments`,
        };

        postsWithLinkWithUsername.push(updatedPostReturned);
    }

    return postsWithLinkWithUsername;
}
