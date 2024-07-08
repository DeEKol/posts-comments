export const getUser = async (userId: number) => {
    const url = `https://jsonplaceholder.typicode.com/users/${userId}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        return json;
    } catch (error: any | unknown) {
        console.warn(error.message);
    }
}

export const getPosts = async (_currentPage: number) => {
    // ! Fake Pagination
    const urlQueryPage = `?page=${_currentPage}`;
    const url = `https://jsonplaceholder.typicode.com/posts${urlQueryPage}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        return json;
    } catch (error: any | unknown) {
        console.warn(error.message);
    }
}

export const getComments = async (_roomId: number) => {
    const url = `https://jsonplaceholder.typicode.com/posts/${_roomId}/comments`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        return json;
    } catch (error: any | unknown) {
        console.warn(error.message);
    }
}
