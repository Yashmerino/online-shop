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

import { Alert, Box, Button, Divider, Input, Paper, Snackbar, TextField, useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { InputError, isFieldPresentInInputErrors } from '../../../utils/InputErrorUtils';
import InputFields from '../../../utils/InputFields';
import Header from '../../Header';
import Copyright from '../../footer/Copyright';
import { updateInfo } from '../../../slices/infoSlice';
import NoPhoto from "../../../../img/no_photo.jpg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useNavigate } from 'react-router-dom';
import { getTranslation } from '../../../../i18n/i18n';
import { getUserPhoto, setUserPhoto, updateUser } from '../../../api/UserRequest';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import * as UserRequest from "../../../api/UserRequest";

const MyProfilePage = () => {
    const lang = useAppSelector(state => state.lang.lang);
    const jwt = useAppSelector(state => state.jwt.token);
    const username = useAppSelector(state => state.username.sub);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [photo, setPhoto] = React.useState(NoPhoto);
    const [file, setFile] = React.useState<File | null>(null);

    const [email, setEmail] = React.useState(useAppSelector(state => state.info.info.email));

    const [inputErrors, setInputErrors] = React.useState<InputError[]>([]);
    const [isSuccess, setSuccess] = React.useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setPhoto(URL.createObjectURL(e.target.files[0] as Blob));
        }
    };

    const handleSavePhoto = async () => {
        if (file != null) {
            const response = await setUserPhoto(jwt, username, file);

            if (response.status) {
                if (response.status == 401) {
                    navigate("/login");
                }
            }
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
            handleSavePhoto();
        }

        dispatch(updateInfo(await UserRequest.getUserInfo(username ?? "")));
    }

    React.useEffect(() => {
        const getUserPhotoRequest = async () => {
            const photoBlob = await getUserPhoto(username);

            if ((photoBlob as Response).status) {
                if ((photoBlob as Response).status == 401) {
                    navigate("/login");
                }
            }

            if ((photoBlob as Blob).size > 0) {
                setPhoto(URL.createObjectURL(photoBlob as Blob));
            }
        }

        getUserPhotoRequest();
    }, []);

    return (
        <Container component="main" maxWidth={false} id="my-profile-container" sx={{ height: "100vh" }} disableGutters>
            <Header />
            {isSuccess &&
                <Snackbar open={isSuccess} autoHideDuration={2000} onClose={handleAlertClick}>
                    <Alert onClose={handleAlertClick} id="alert-success" severity="success" sx={{ width: '100%' }}>
                        {getTranslation(lang, "user_updated_successfully")}
                    </Alert>
                </Snackbar>}
            <Paper square elevation={3} sx={{ width: "70%", padding: "2.5%", margin: "auto", mt: "2.5%", display: "flex" }}>
                <AccountCircleIcon fontSize='large' sx={{ marginRight: "1.5%" }} />
                <Typography variant="h4" fontWeight={800}>{getTranslation(lang, "my_profile")}</Typography>
            </Paper>
            <Paper square elevation={3} sx={{ width: "70%", margin: "auto", mt: "2.5%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
                <Box width={"47%"} sx={{ aspectRatio: "1/1", boxShadow: 12 }} ml={"2%"} mt={"2%"} mb={"2%"}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="photo-upload-button"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="photo-upload-button">
                        <Button component="span" sx={{ width: "100%", height: "100%" }}>
                            <img width={"100%"} height={"100%"} className="user-image" src={photo} />
                        </Button>
                    </label>
                </Box>
                <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "end", justifyContent: "flex-end", margin: "2.5%" }}>
                    <Paper square elevation={6} sx={{ width: "100%", p: "2.5%", display: "flex", flexDirection: 'row' }}>
                        <Box maxWidth={"30%"} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <Typography sx={{ fontSize: 20, mt: "35%", fontWeight: "200", wordWrap: "break-word" }} textAlign={"right"} lineHeight={1}>{getTranslation(lang, "username")}</Typography>
                            <Typography sx={{ fontSize: 20, fontWeight: "200", wordWrap: "break-word" }} textAlign={"right"} lineHeight={1}>{getTranslation(lang, "email")}</Typography>
                            <Typography sx={{ fontSize: 20, fontWeight: "200", wordWrap: "break-word" }} textAlign={"right"} lineHeight={1}>{getTranslation(lang, "address")}</Typography>
                            <Typography sx={{ fontSize: 20, mb: "35%", fontWeight: "200", wordWrap: "break-word" }} textAlign={"right"} lineHeight={1}>{getTranslation(lang, "phone")}</Typography>
                        </Box>
                        <Box width={"5%"}>
                            <Divider orientation="vertical" />
                        </Box>
                        <Box width={"100%"} marginLeft={"4%"}>
                            <TextField
                                defaultValue={username}
                                disabled
                                margin="normal"
                                required
                                fullWidth
                                name="username"
                                label={getTranslation(lang, "username")}
                                type="username"
                                id="username"
                                data-testid="username"
                                autoComplete="current-username"
                            />
                            <TextField
                                defaultValue={email}
                                error={isFieldPresentInInputErrors(InputFields.EMAIL, inputErrors)}
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
                            <TextField
                                margin="normal"
                                fullWidth
                                name="address"
                                label={getTranslation(lang, "address")}
                                type="address"
                                id="address"
                                data-testid="address"
                                autoComplete="current-address"
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                name="phone"
                                label={getTranslation(lang, "phone")}
                                type="phone"
                                id="phone"
                                data-testid="phone"
                                autoComplete="current-phone"
                            />
                        </Box>
                    </Paper>
                    <Button variant="contained" sx={{ marginTop: "2%" }} onClick={handleSaveUser}>
                        {getTranslation(lang, "save")}
                    </Button>
                </Box>
            </Paper>
            <Copyright />
        </Container >
    );
}

export default MyProfilePage;