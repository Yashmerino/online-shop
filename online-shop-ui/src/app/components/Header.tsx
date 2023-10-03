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
import AdbIcon from '@mui/icons-material/Adb';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getUserPhoto } from '../api/UserRequest';
import { updateJwt } from '../slices/jwtSlice';
import { Select, InputLabel, SelectChangeEvent } from '@mui/material';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Lang from '../../i18n/LangEnum';
import { getTranslation } from '../../i18n/i18n';
import { updateLang } from '../slices/langSlice';
import { setCookie } from '../utils/Utils';
import { updateTheme } from '../slices/themeSlice';

const Header = () => {
    const roles = useAppSelector(state => state.roles);
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
        const isDark = e.target.value.localeCompare(getTranslation(lang, "dark_theme")) == 0 ? "true" : "false";

        setCookie("online-shop-dark-theme", isDark);
        dispatch(updateTheme(isDark == "true"));
    }

    return (
        <AppBar position="static" sx={{ width: "100%" }}>
            <Container maxWidth={false} data-testid="header">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {getTranslation(lang, "online_shop")}
                    </Typography>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
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

                            {// @ts-ignore 
                                roles.roles.roles[0].name == "USER" ? <MenuItem onClick={handleMyCart}>{getTranslation(lang, "my_cart")}</MenuItem> : null}
                            {// @ts-ignore 
                                roles.roles.roles[0].name == "SELLER" ? <MenuItem onClick={handleAddProduct}>{getTranslation(lang, "add_product")}</MenuItem> : null}
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
                                value={theme ? getTranslation(lang, "dark_theme") : getTranslation(lang, "light_theme")}
                                label={getTranslation(lang, "theme")}
                                onChange={(value) => { handleChangeTheme(value) }}
                            >
                                <MenuItem value={getTranslation(lang, "light_theme")}>{getTranslation(lang, "light_theme")}</MenuItem>
                                <MenuItem value={getTranslation(lang, "dark_theme")}>{getTranslation(lang, "dark_theme")}</MenuItem>
                            </Select>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;