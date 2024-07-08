"use client";

// ? Import Libraries
import {useState} from "react";
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { useStoreon } from "storeon/react";
import { useRouter } from "next/navigation";

// * Types
interface ILoginFormProps {
    className?: string;
}
type TErrors = {
    login?: string,
    password?: string,
}

export const LoginForm = (props: ILoginFormProps) => {

    // * Hooks
    const { dispatch, user } = useStoreon('user');
    const router = useRouter();
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<TErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // * Utils
    const validate = () => {
        const newErrors: TErrors = {};
        if (!login) {
            newErrors.login = 'Login is required';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 4) {
            newErrors.password = 'Password must be at least 6 characters long';
        }
        return newErrors;
    };

    // ! Fake Request
    const fakeServerRequest = (login: string, password: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (login === 'test' && password === 'test') {
                    resolve();
                } else {
                    reject(new Error('Invalid login or password'));
                }
            }, 1000);
        });
    };

    // * Handlers
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            setIsLoading(true);
            try {
                await fakeServerRequest(login, password);
                dispatch('user/set', { login });
                await router.push('/');
            } catch (error) {
                setErrors({ login: 'Invalid login or password' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleLogout = () => {
        dispatch('user/clear');
    };

    // * Render
    return (
        <section>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        {user ? `Welcome, ${user.login}` : 'Войти'}
                    </Typography>
                    <p>(login: test; password: test)</p>
                    {!user ? (
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="login"
                                label="Login"
                                name="login"
                                autoComplete="login"
                                autoFocus
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                error={!!errors.login}
                                helperText={errors.login}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Вход...' : 'Войти'}
                            </Button>
                        </Box>
                    ) : (
                        <Button
                            onClick={handleLogout}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Logout
                        </Button>
                    )}
                </Box>
            </Container>
        </section>
    )
};
