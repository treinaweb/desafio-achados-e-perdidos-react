import { styled } from '@material-ui/core/styles';
import { AppBar, AppBarProps, Drawer } from '@material-ui/core';
// import { HeaderProps } from './Header';

export const HeaderAppBar = styled((props: AppBarProps) => (
    <AppBar position={'sticky'} {...props} />
))`
    &.MuiAppBar-root {
        background-color: ${({ theme }) => theme.palette.background.paper};
        color: ${({ theme }) => theme.palette.text.secondary};
        box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.05);
    }

    .MuiToolbar-root {
        display: grid;
        grid-template-columns: repeat(2, auto);
        justify-content: space-between;
    }

    ${({ theme }) => theme.breakpoints.up('md')} {
        .MuiToolbar-root {
            height: 100px;
            gap: ${({ theme }) => theme.spacing(9)};
        }
    }
`;

export const HeaderLogo = styled('img')`
    height: 35px;

    ${({ theme }) => theme.breakpoints.up('md')} {
        height: 47px;
    }
`;

export const HeaderDrawer = styled(Drawer)`
    .MuiPaper-root {
        padding: ${({ theme }) => theme.spacing()};
        background-color: ${({ theme }) => theme.palette.primary.main};
        color: ${({ theme }) =>
            theme.palette.getContrastText(theme.palette.primary.main)};
    }
    .MuiDivider-root {
        border-color: ${({ theme }) => theme.palette.primary.light};
        margin: ${({ theme }) => theme.spacing(2)};
    }
`;

export const ButtonsContainer = styled('div')`
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: ${({ theme }) => theme.spacing(2)};
`;
