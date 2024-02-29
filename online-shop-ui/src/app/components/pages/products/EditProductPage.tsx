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
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { addProduct, getProductPhoto, setProductPhoto, updateProduct } from '../../../api/ProductRequest';
import Alert from '@mui/material/Alert';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import { InputError } from '../../../utils/InputErrorUtils';
import { getFieldInputErrorMessage, isFieldPresentInInputErrors } from '../../../utils/InputErrorUtils';
import InputFields from '../../../utils/InputFields';
import { Paper, Input, Snackbar } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import { Category } from './AddProductPage';

import Header from '../../Header';
import Copyright from '../../footer/Copyright';

import { useAppSelector } from '../../../hooks'
import { Stack, Typography } from '@mui/material';
import { getCategories } from '../../../api/CategoryRequest';
import { getTranslation } from '../../../../i18n/i18n';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 4.5 + 8,
            width: 350,
        },
    },
};

const EditProductPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const lang = useAppSelector(state => state.lang.lang);
    const roles = useAppSelector(state => state.info.info.roles);
    const jwt = useAppSelector(state => state.jwt);

    const [name, setName] = React.useState(location.state ? location.state.title : "default");
    const [description, setDescription] = React.useState(location.state ? location.state.description : "default");
    const [price, setPrice] = React.useState(location.state ? location.state.price : 0.01);
    const [categories, setCategories] = React.useState<string[]>(location.state ? location.state.categories ? location.state.categories.map((category: Category) => category.name) : [] : []);
    const [fetchedCategories, setFetchedCategories] = React.useState<Category[]>([]);

    const [inputErrors, setInputErrors] = React.useState<InputError[]>([]);
    const [error, setError] = React.useState("");
    const [isSuccess, setSuccess] = React.useState(false);

    const [photo, setPhoto] = React.useState("");
    const [file, setFile] = React.useState<File | null>(null);

    const handleAlertClick = () => {
        setSuccess(false);
        setError("");
    };

    React.useEffect(() => {
        const token = jwt.token;

        const fetchCategories = async () => {
            const categoriesRequest = await getCategories(token);

            if (categoriesRequest.status) {
                if (categoriesRequest.status == 401) {
                    navigate("/login");
                }
            }

            setFetchedCategories(categoriesRequest);
        }

        fetchCategories(); // NOSONAR: It should not await.

        const getProductPhotoRequest = async () => {
            const photoBlob = await getProductPhoto(location.state ? location.state.id : "1");
            setPhoto(URL.createObjectURL(photoBlob));
            setFile(photoBlob as File);
        }

        getProductPhotoRequest();
    }, []);

    const handleSubmit = async () => {
        setSuccess(false);
        setInputErrors([]);
        setError("");

        let categoriesDTO: Category[] = [];
        categories.forEach((category) => {
            fetchedCategories.forEach((fetchedCategory) => {
                if (fetchedCategory.name.localeCompare(category) == 0) {
                    const categoryDTO = {
                        id: fetchedCategory.id,
                        name: fetchedCategory.name
                    }

                    categoriesDTO.push(categoryDTO);
                }
            }
            )
        })

        const response = await updateProduct(jwt.token, location.state ? location.state.id : 1, name, categoriesDTO, price, description);

        if (response.error) {
            setError(response.error);
        } else if (response.fieldErrors) {
            setInputErrors(response.fieldErrors);
        } else {
            if (file != null) {
                await setProductPhoto(jwt.token, location.state ? location.state.id : 1, file);
            }

            setSuccess(true);
            navigate("/profile/products");
        }
    }

    const handleCategoriesChange = (event: SelectChangeEvent<typeof categories>) => {
        const { target: { value }, } = event;
        setCategories(typeof value === 'string' ? value.split(',') : value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);

            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0] as Blob);
            reader.onload = function () {
                setPhoto(reader.result as string);
            };
        }
    };

    return (
        <Container component="main" maxWidth={false} id="main-container" sx={{ height: "100vh" }} disableGutters>
            <Header />
            {isSuccess &&
                <Snackbar open={isSuccess} autoHideDuration={2000} onClose={handleAlertClick}>
                    <Alert data-testid="alert-success" id="alert-success" onClose={handleAlertClick} severity="success" sx={{ width: '100%' }}>
                        {getTranslation(lang, "product_updated_successfully")}
                    </Alert>
                </Snackbar>}
            {error.length > 0 &&
                <Snackbar open={error.length > 0} autoHideDuration={2000} onClose={handleAlertClick}>
                    <Alert data-testid="alert-error" id="alert-error" onClose={handleAlertClick} severity="error" sx={{ width: '100%' }}>
                        {getTranslation(lang, error)}
                    </Alert>
                </Snackbar>}
            <Paper square elevation={3} sx={{ width: "70%", padding: "2.5%", margin: "auto", mt: "2.5%" }}>
                <Typography variant="h4" fontWeight={800}>{getTranslation(lang, "update_product")}</Typography>
            </Paper>
            {// @ts-ignore 
                roles[0].name == "SELLER"
                    ? (<Paper square elevation={3} sx={{ width: "70%", height: "40%", margin: "auto", mt: "2.5%", display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Box width={"65%"} sx={{ aspectRatio: "1/1", boxShadow: 12 }} ml={"2%"} mt={"2%"} mb={"2%"}>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="photo-upload-button"
                                type="file"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="photo-upload-button">
                                <Button component="span" sx={{ width: "100%", height: "100%" }}>
                                    <img width={"100%"} height={"100%"} className="user-image" src={photo} data-testid="photo" />
                                </Button>
                            </label>
                        </Box>
                        <Paper square elevation={6} sx={{ height: "80%", width: "100%", display: "flex", flexDirection: "row", mr: "2.5%", ml: "2%", mb: "4%", mt: "4%" }}>
                            <Box margin={"4%"} sx={{ width: "100%" }}>
                                <TextField
                                    defaultValue={name}
                                    error={isFieldPresentInInputErrors(InputFields.NAME, inputErrors)}
                                    required
                                    fullWidth
                                    name="name"
                                    label={getTranslation(lang, "name")}
                                    type="name"
                                    id="name-field"
                                    data-testid="name-field"
                                    autoComplete="current-name"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setName(event.target.value);
                                    }}
                                />
                                <TextField
                                    defaultValue={description}
                                    sx={{ marginTop: "6%", marginBottom: "4%", width: "100%" }}
                                    multiline
                                    rows={7}
                                    error={isFieldPresentInInputErrors(InputFields.DESCRIPTION, inputErrors)}
                                    name="description"
                                    label={getTranslation(lang, "description")}
                                    type="description"
                                    id="description"
                                    data-testid="description"
                                    autoComplete="current-description"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setDescription(event.target.value);
                                    }}
                                />
                            </Box>
                        </Paper>
                        <Box sx={{ width: "100%", height: "80%", display: "flex", flexDirection: "column", justifyContent: "space-between", mr: "3%" }}>
                            <Paper square elevation={6} sx={{ width: "100%" }}>
                                <Box sx={{ margin: "4%" }}>
                                    <TextField
                                        value={price}
                                        sx={{ width: "100%" }}
                                        error={isFieldPresentInInputErrors(InputFields.PRICE, inputErrors)}
                                        onChange={(event) => { setPrice(Number(event.target.value)) }}
                                        required
                                        id="price-field"
                                        data-testid="price-field"
                                        label={getTranslation(lang, "price") + '€'}
                                        type="number"
                                        inputProps={{ min: 1 }} />
                                    <Select
                                        id="categories-field"
                                        data-testid="categories-field"
                                        displayEmpty
                                        multiple
                                        label={getTranslation(lang, "categories")}
                                        value={categories}
                                        onChange={handleCategoriesChange}
                                        input={<OutlinedInput />}
                                        renderValue={(selected) => (
                                            selected.length === 0
                                                ? (<em>{getTranslation(lang, "categories")}</em>)
                                                : (<em>{getTranslation(lang, "categories")}</em>)
                                        )}
                                        MenuProps={MenuProps}
                                        sx={{ width: "100%", mb: "0", mt: "6%", maxWidth: "100%" }}
                                    >
                                        {fetchedCategories.map((fetchedCategory) => (
                                            <MenuItem key={fetchedCategory.name} value={fetchedCategory.name}>
                                                <Checkbox checked={categories.indexOf(fetchedCategory.name) > -1} />
                                                <ListItemText primary={getTranslation(lang, fetchedCategory.name)} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                            </Paper>
                            <Button
                                type="submit"
                                data-testid="submit-button"
                                variant="contained"
                                sx={{ width: "16%", ml: "auto" }}
                                onClick={handleSubmit}
                            >
                                {getTranslation(lang, "update")}
                            </Button>
                        </Box>
                    </Paper>)
                    : (<Typography align='center' marginTop={10}>{getTranslation(lang, "no_rights_to_access")}</Typography>)}
            <Copyright />
        </Container>
    );
}

export default EditProductPage;