export type TPost = {
    userId: number,
    id: number,
    title: string,
    body: string,
}

export type TPostWithLink = TPost & { link?: string; };
export type TPostWithLinkUsername = TPostWithLink & { username?: string };

export type TUserFetch = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string,
        }
    };
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string,
    };
};

export type TUsers = Record<string, string>;

export type TComments = {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string,
    link?: string,
}
