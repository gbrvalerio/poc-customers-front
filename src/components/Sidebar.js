import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { useHistory } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText, Collapse, Badge } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTheme } from '@material-ui/core/styles';
import { useAuth } from '../contexts/AuthContext';
import { SidebarLinks } from './SidebarLinks';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  logo: {
    width: drawerWidth * 0.5,
    marginRight: 28,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    height: '100%'
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
    height: '100%'
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const AppListIcon = ({ link }) => {
  const { getUserPreference } = useAuth();
  if(!link.badge) return link.icon;

  let badge = link.badge;
  if(typeof badge === 'function') {
    badge = link.badge({ getUserPreference })
  }

  if(!badge) return link.icon;

  return (
    <Badge color="error" badgeContent={badge}>
      {link.icon}
    </Badge>
  )
}

const AppListItem = ({ link, onClickLink, collapseLevel, collapsed }) => {
  const theme = useTheme()
  const getLeftPadding = () => collapseLevel > 0 ? theme.spacing(4) * collapseLevel : undefined
  return (
    <ListItem button onClick={(e) => onClickLink(link)} key={'list_item_' + link.path} style={{ paddingLeft: getLeftPadding() }}>
      <ListItemIcon>
        <AppListIcon link={link} />
      </ListItemIcon>
      <ListItemText primary={link.label} secondary={link.secondaryLabel} />
      {link.links && (collapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
    </ListItem>
  )
}

const renderLinks = ({ links, collapseLevel = 0, collapseState = {}, onClickLink }) => {
  const getListComponent = () => collapseLevel > 0 ? "div" : undefined
  return (
    <List component={getListComponent()} disablePadding={collapseLevel > 0}>
      { 
        links.map(link => (
          <>
            <AppListItem 
              link={link}
              onClickLink={onClickLink} 
              collapseLevel={collapseLevel}
              collapsed={!!collapseState[link.path]}
            />
            {
              link.links &&
              <Collapse in={!!collapseState[link.path]} timeout="auto" unmountOnExit>
                { 
                  renderLinks({ 
                    links: link.links, 
                    collapseLevel: collapseLevel + 1,
                    collapseState, onClickLink
                  }) 
                }
              </Collapse>
            }
          </>
        ))
      }
    </List>
  );
}

export const Sidebar = ({ open, onClose }) => {
  const classes = useStyles();
  const history = useHistory();
  const [collapseState, setCollapseState] = useState({});

  const onClickLink = useCallback((link) => {
    if(link.links) {
      setCollapseState({ ...collapseState, [link.path]: !collapseState[link.path] })
    } else {
      history.push(link.path)
      onClose()
    }
  }, [history, collapseState, setCollapseState, onClose])

  return (
    <Drawer
      anchor="left"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>

      { 
        SidebarLinks.map(links => (
          <>
            <Divider />
            {
              renderLinks({
                links,
                classes,
                onClickLink,
                collapseLevel: 0,
                collapseState
              })
            }
          </>
        ))
      }
      {/* <Divider /> */}
    </Drawer>
  )
}