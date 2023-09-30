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
import { updateLang } from '../slices/langSlice';
import { setCookie } from '../utils/Utils';

const Header = () => {
    const roles = useAppSelector(state => state.roles);
    const lang = useAppSelector(state => state.lang);
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
                        Online Shop
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
                        Online Shop
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
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
                            <MenuItem onClick={handleProfile}>Profile</MenuItem>

                            {// @ts-ignore 
                                roles.roles.roles[0].name == "USER" ? <MenuItem onClick={handleMyCart}>My Cart</MenuItem> : null}
                            {// @ts-ignore 
                                roles.roles.roles[0].name == "SELLER" ? <MenuItem onClick={handleAddProduct}>Add Product</MenuItem> : null}
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            <InputLabel sx={{ textAlign: "center", fontSize: "15px" }} id="select-language-label">Language</InputLabel>
                            <Select
                                sx={{ width: '150px', margin: "0 15px" }}
                                labelId="select-language-label"
                                id="select-language"
                                value={lang.lang.toString()}
                                label="Language"
                                onChange={(value) => { handleLanguageSelection(value) }}
                            >
                                <MenuItem value={Lang.ENG.toString()}>English</MenuItem>
                                <MenuItem value={Lang.RU.toString()}>Russian</MenuItem>
                                <MenuItem value={Lang.RO.toString()}>Romanian</MenuItem>
                            </Select>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;