import { styled } from '@mui/system';
import { Badge as BaseBadge, badgeClasses } from '@mui/material';

const blue = {
    500: '#007FFF',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const smallBadgeStyles = `
    & .${badgeClasses.badge} {
        min-width: 34px;
        height: 22px;
        padding: 0 8px;
        font-size: 14px;
        line-height: 22px;
        border-radius: 12px;
        background: ${grey[700]};
    }
`;

export const Badge = styled(BaseBadge)(
    ({ theme }) => `
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 28px;
    font-variant: tabular-nums;
    list-style: none;
    font-family: 'IBM Plex Sans', sans-serif;
    position: relative;
    display: inline-block;
    line-height: 1;

    & .${badgeClasses.badge} {
        z-index: auto;
        position: absolute;
        top: 10px;
        right: 10px;
        min-width: 68px;
        height: 44px;
        padding: 0 16px;
        color: #fff;
        font-weight: 600;
        font-size: 28px;
        line-height: 44px;
        white-space: nowrap;
        text-align: center;
        border-radius: 24px;
        background: ${blue[500]};
        box-shadow: 0px 8px 16px ${theme.palette.mode === 'dark' ? grey[900] : grey[300]};
        transform: translate(50%, -50%);
        transform-origin: 100% 0;
    }

    &.small {
        ${smallBadgeStyles}
    }
    `
);