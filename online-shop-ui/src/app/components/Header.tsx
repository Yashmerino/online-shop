import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getUserPhoto } from '../api/UserRequest';
import { updateJwt } from '../slices/jwtSlice';
import { Select, InputLabel, SelectChangeEvent } from '@mui/material';
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import SellIcon from '@mui/icons-material/Sell';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Lang from '../../i18n/LangEnum';
import { getTranslation } from '../../i18n/i18n';
import { updateLang } from '../slices/langSlice';
import { setCookie } from '../utils/Utils';
import { updateTheme } from '../slices/themeSlice';

const Header = () => {
    const roles = useAppSelector(state => state.info.info.roles);
    const lang = useAppSelector(state => state.lang.lang);
    const theme = useAppSelector(state => state.theme.theme);
    const username = useAppSelector(state => state.username.sub);
    const dispatch = useAppDispatch();

    const [photo, setPhoto] = React.useState("");

    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMyCart = () => {
        navigate("/cart");
    }

    const handleAddProduct = () => {
        navigate("/product/add");
    }

    const handleProfile = () => {
        navigate("/profile");
    }

    const handleSearch = () => {
        navigate("/search");
    }

    const handleMyProducts = () => {
        navigate("/profile/products");
    }

    const handleLogout = () => {
        dispatch(updateJwt(""));
        navigate("/login");
    }

    const handleLanguageSelection = (e: SelectChangeEvent<string>) => {
        setCookie("online-shop-lang", e.target.value);

        Object.keys(Lang).forEach(lang => {
            if (e.target.value.localeCompare(lang) == 0) {
                dispatch(updateLang(lang as Lang));
            }
        });
    }

    const handleChangeTheme = (e: SelectChangeEvent<string>) => {
        const isLight = e.target.value.localeCompare(getTranslation(lang, "light_theme")) == 0 ? "true" : "false";

        setCookie("online-shop-light-theme", isLight);
        dispatch(updateTheme(isLight == "true"));
    }

    return (
        <AppBar position="static" sx={{ width: "100%" }}>
            <Container maxWidth={false} data-testid="header">
                <Toolbar disableGutters>
                    <LocalMallIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#/products"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Roboto',
                            fontWeight: "Bold",
                            fontSize: 28,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {getTranslation(lang, "online_shop")}
                    </Typography>
                    <LocalMallIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#/products"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {getTranslation(lang, "online_shop")}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button key={1} startIcon={<AccountCircleIcon />} onClick={handleProfile} sx={{ ml: "2vh", my: 2, color: 'white', display: 'flex', fontWeight: "Bold" }}>{getTranslation(lang, "profile")}</Button>
                        {// @ts-ignore 
                            roles[0].name == "USER" ?
                                <Button key={2} startIcon={<ShoppingCartIcon />} onClick={handleMyCart} sx={{ ml: "2vh", my: 2, color: 'white', display: 'flex', fontWeight: "Bold" }}>{getTranslation(lang, "my_cart")}</Button> :
                                null
                        }
                        {// @ts-ignore 
                            roles[0].name == "SELLER" ?
                                <Button key={3} startIcon={<AddIcon />} onClick={handleAddProduct} sx={{ ml: "2vh", my: 2, color: 'white', display: 'flex', fontWeight: "Bold" }}>{getTranslation(lang, "add_product")}</Button> :
                                null
                        }
                        {// @ts-ignore 
                            roles[0].name == "SELLER" ?
                                <Button key={4} startIcon={<SellIcon />} onClick={handleMyProducts} sx={{ ml: "2vh", my: 2, color: 'white', display: 'flex', fontWeight: "Bold" }}>{getTranslation(lang, "my_products")}</Button> :
                                null
                        }
                        <Button key={5} startIcon={<SearchIcon />} onClick={handleSearch} sx={{ ml: "2vh", my: 2, color: 'white', display: 'flex', fontWeight: "Bold" }}>{getTranslation(lang, "search")}</Button>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={getTranslation(lang, "open_settings")}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar src={photo} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleProfile}>{getTranslation(lang, "profile")}</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            <InputLabel sx={{ textAlign: "center", fontSize: "15px" }} id="select-language-label">{getTranslation(lang, "language")}</InputLabel>
                            <Select
                                sx={{ width: '150px', margin: "0 15px" }}
                                labelId="select-language-label"
                                id="select-language"
                                value={lang.toString()}
                                label={getTranslation(lang, "language")}
                                onChange={(value) => { handleLanguageSelection(value) }}
                            >
                                <MenuItem value={Lang.ENG.toString()}>{getTranslation(lang, "english")}</MenuItem>
                                <MenuItem value={Lang.RU.toString()}>{getTranslation(lang, "russian")}</MenuItem>
                                <MenuItem value={Lang.RO.toString()}>{getTranslation(lang, "romanian")}</MenuItem>
                            </Select>
                            <InputLabel sx={{ textAlign: "center", fontSize: "15px" }} id="select-theme-label">{getTranslation(lang, "theme")}</InputLabel>
                            <Select
                                sx={{ width: '150px', margin: "0 15px" }}
                                labelId="select-theme-label"
                                id="select-theme"
                                value={theme ? getTranslation(lang, "light_theme") : getTranslation(lang, "dark_theme")}
                                label={getTranslation(lang, "theme")}
                                onChange={(value) => { handleChangeTheme(value) }}
                            >
                                <MenuItem value={getTranslation(lang, "dark_theme")}>{getTranslation(lang, "dark_theme")}</MenuItem>
                                <MenuItem value={getTranslation(lang, "light_theme")}>{getTranslation(lang, "light_theme")}</MenuItem>
                            </Select>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;