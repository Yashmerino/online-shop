import * as React from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import Copyright from '../footer/Copyright';
import UserInputFields from './UserInputFields';
import { Link as RouterLink } from 'react-router-dom';

const RegisterPage = () => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <Container component="main" maxWidth="xs">
            <Grid container>
                <Grid item>
                    <UserInputFields title="Sign Up" buttonText="Sign Up" handleSubmit={handleSubmit} />
                </Grid>
                <Grid item>
                    <Link component={RouterLink} to={'/login'} variant="body2">
                        {"Have already an account? Log in"}
                    </Link>
                </Grid>
            </Grid>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}

export default RegisterPage;