import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'; 
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    flexDirection: 'column'
  },
  content: {
    flex: 1,
    overflow: 'auto',
  },
}));

export const Layout = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  }
  const toggleDrawer = () => {
    setOpen(!open);
  }
  const { isAuthenticated } = useAuth();


  if(isAuthenticated) {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Topbar 
          // sidebarOpen={open} 
          onMenuButton={toggleDrawer} 
        />
        <Sidebar 
          open={open} 
          onClose={handleDrawerClose} 
        />
  
        <main className={classes.content}>
          {children}
        </main>
      </div>
    );
  } else {
    return children;
  }
}