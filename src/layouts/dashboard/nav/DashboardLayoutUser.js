import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//
// import Header from './header';
import Header from '../header/index';
import NavUser from './indexUser';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  maxWidth: '80%',
  overflow: 'hidden',
  marginLeft: 'auto',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayoutUser() {
  const [open, setOpen] = useState(false);

  return (
    <StyledRoot>
      <Header onOpenNavUser={() => setOpen(true)} />

      <NavUser openNavUser={open} onCloseNavUser={() => setOpen(false)} />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
