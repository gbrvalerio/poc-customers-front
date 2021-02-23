import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import Hidden from '@material-ui/core/Hidden';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { AccountCircle } from '@material-ui/icons';
import { useAuth } from '../contexts/AuthContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: 999,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 24,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  rootDiv: {
    zIndex: 999
  },
  logo: {
    width: 100,
    filter: 'brightness(0) invert(1)'
  }
}));

const AccountMenu = ({  }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [logginOut, setLogginOut] = React.useState(false);
  const auth = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={null} color="error">
          <AccountCircle />
        </Badge>
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem 
          disabled={logginOut}
          onClick={() => {
            setLogginOut(true)
            auth.logout()
              .then(() => setLogginOut(false))
              .catch(error => setLogginOut(false)) //notify error
          }}
        >{logginOut ? 'Saindo...' : 'Sair'}</MenuItem>
      </Menu>
    </>
  )
}

export const Topbar = ({ onMenuButton, sidebarOpen, title }) => {
  const classes = useStyles();
  const auth = useAuth();

  return (
    <div className={classes.rootDiv}>
      <AppBar position="static" className={clsx(classes.appBar, sidebarOpen && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuButton}
            className={clsx(classes.menuButton, sidebarOpen && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>

          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {title}
          </Typography>

          <Hidden smDown>
            <Typography>
                Olá, <span style={{ fontWeight: '800', marginRight: 8 }}>{auth.currentUser ? auth.currentUser.user.username : '-'}</span>
            </Typography>
          </Hidden>

          <AccountMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
}