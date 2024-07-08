"use client";

// ? Import Libraries
import { useStoreon } from "storeon/react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

// ? Import Styles
import cls from "./styles.module.scss";

// ? Types
interface IHeaderProps {
    className?: string;
}

export const Header = (props: IHeaderProps) => {
    // * Hooks
    const router = useRouter();
    const { dispatch, user } = useStoreon('user');

    // * Handlers
    const handleLogout = () => {
        dispatch('user/clear');
    };
    const handleLogin = async () => {
        await router.push('/login');
    }
    const handlePosts = async () => {
        await router.push('/posts');
    }


    // * Render
    return (
        <header className={cls.header}>
            <Button
                onClick={handlePosts}
                fullWidth
                variant="outlined"
                sx={{ mt: 1, mb: 1, maxWidth: '120px' }}
            >
                To Posts
            </Button>
            {user?.login ? (
                <div className={cls.data}>
                    <h3>User: {user?.login}</h3>
                    <Button
                        onClick={handleLogout}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 1 }}
                    >
                        Logout
                    </Button>
                </div>
            ) : (
                <div className={cls.data}>
                    <h3>Войдите!</h3>
                    <Button
                            onClick={handleLogin}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 1 }}
                    >
                        Login
                    </Button>
                </div>
            )}
        </header>
    );
};
