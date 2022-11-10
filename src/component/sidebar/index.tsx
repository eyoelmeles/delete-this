import React from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import { List, ListItemIcon, ListSubheader, ListItemButton, Collapse,ListItemText, Box } from "@mui/material";
import {Send, ExpandLess, ExpandMore, StarBorder, Drafts, Inbox } from "@mui/icons-material"

const Sidebar = () => {
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
	return (
		<div>
		<Box sx={{margin: 2 }}>
		<form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
		</Box>
		<List
      sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Management
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Inbox />
        </ListItemIcon>
        <ListItemText primary="Admin" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
				<NavLink to="/user/create">
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Create User" onClick={() => {
							navigate("/user/create")
						}}/>
          </ListItemButton>
					</NavLink>
        </List>
				<List component="div" disablePadding>
					<NavLink to="/users">
						<ListItemButton sx={{ pl: 4 }}>
							<ListItemIcon>
								<StarBorder />
							</ListItemIcon>
							<ListItemText primary="Users List" />
						</ListItemButton>

					</NavLink>
        </List>
      </Collapse>
    </List>
		</div>
	)
}



export default Sidebar;