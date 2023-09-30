/*
 * MIT License
 *
 * Copyright (c) 2023 Artiom Bozieac
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { Input } from '@mui/material';
import { InputError } from '../../../utils/InputErrorUtils';
import { isFieldPresentInInputErrors } from '../../../utils/InputErrorUtils';
import { getFieldInputErrorMessage } from '../../../utils/InputErrorUtils';
import InputFields from '../../../utils/InputFields';
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';
import { TextField } from '@mui/material';

import Copyright from '../../footer/Copyright';
import Header from '../../Header';

import { useAppSelector } from '../../../hooks';
import { getUserPhoto, setUserPhoto, updateUser } from '../../../api/UserRequest';
import { useNavigate } from 'react-router-dom';
import { getTranslation } from '../../../../i18n/i18n';

const MyProfilePage = () => {
    const lang = useAppSelector(state => state.lang.lang);
    const jwt = useAppSelector(state => state.jwt.token);
    const username = useAppSelector(state => state.username.sub);
    const navigate = useNavigate();

    const [photo, setPhoto] = React.useState("");
    const [file, setFile] = React.useState<File | null>(null);

    const [email, setEmail] = React.useState("");

    const [inputErrors, setInputErrors] = React.useState<InputError[]>([]);
    const [isSuccess, setSuccess] = React.useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSavePhoto = async () => {
        setSuccess(false);
        setInputErrors([]);

        const response = await setUserPhoto(jwt, username, file);

        if (response.status) {
            if (response.status == 401) {
                navigate("/login");
            }
        }

        if (response.fieldErrors) {
            setInputErrors(response.fieldErrors);
        } else {
            setSuccess(true);
            setPhoto(URL.createObjectURL(file as Blob));
        }
    }

    const handleAlertClick = () => {
        setSuccess(false);
    };

    const handleSaveUser = async () => {
        setSuccess(false);
        setInputErrors([]);

        const response = await updateUser(jwt, username, email);

        if (response.status) {
            if (response.status == 401) {
                navigate("/login");
            }
        }

        if (response.fieldErrors) {
            setInputErrors(response.fieldErrors);
        } else {
            setSuccess(true);
        }
    }

    React.useEffect(() => {
        const getUserPhotoRequest = async () => {
            const photoBlob = await getUserPhoto(username);

            if ((photoBlob as Response).status) {
                if ((photoBlob as Response).status == 401) {
                    navigate("/login");
                }
            }

            setPhoto(URL.createObjectURL(photoBlob as Blob));
        }

        getUserPhotoRequest();
    }, []);

    return (
        <Container component="main" maxWidth={false} id="my-profile-container" disableGutters>
            <Header />
            {isSuccess &&
                <Snackbar open={isSuccess} autoHideDuration={2000} onClose={handleAlertClick}>
                    <Alert onClose={handleAlertClick} severity="success" sx={{ width: '100%' }}>
                        {getTranslation(lang, "user_information_updated_successfully")}
                    </Alert>
                </Snackbar>}
            <Box className="my-profile-image-container">
                <Paper sx={{ border: 0, boxShadow: "none", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <img width="196" height="196" className="user-image" src={photo} />
                    <Box className="my-profile-image-information-container">
                        <Input id='file' type='file' onChange={handleFileChange}></Input>
                        <Button variant="contained" sx={{ marginRight: "auto" }} onClick={handleSavePhoto}>
                            {getTranslation(lang, "save")}
                        </Button>
                    </Box>
                </Paper>
                <Typography variant="h4">{username}</Typography>
            </Box>
            <Box className="my-profile-user-information-container">
                <TextField
                    error={isFieldPresentInInputErrors(InputFields.EMAIL, inputErrors)}
                    helperText={isFieldPresentInInputErrors(InputFields.EMAIL, inputErrors) ? getFieldInputErrorMessage(InputFields.EMAIL, inputErrors, lang) : null}
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label={getTranslation(lang, "email")}
                    type="email"
                    id="email"
                    data-testid="email"
                    autoComplete="current-email"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(event.target.value);
                    }}
                />
                <Button sx={{ marginLeft: "auto" }} variant="contained" onClick={handleSaveUser}>
                    {getTranslation(lang, "save")}
                </Button>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container >
    );
}

export default MyProfilePage;