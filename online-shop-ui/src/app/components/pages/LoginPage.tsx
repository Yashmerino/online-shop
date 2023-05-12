import * as React from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import Copyright from '../footer/Copyright';
import UserInputFields from './UserInputFields';
import { Link as RouterLink } from 'react-router-dom';

const LoginPage = () => {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Grid container>
        <Grid item>
          <UserInputFields title="Sign In" buttonText="Sign In" handleSubmit={handleSubmit} />
        </Grid>
        <Grid item>
          <Link component={RouterLink} to={'/register'} variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

export default LoginPage;