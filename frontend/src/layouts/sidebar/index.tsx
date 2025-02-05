import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Drawer,
  ListItemIcon,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import * as Icons from "@mui/icons-material"; 

const sidebarItems = {
  ADMIN: [
    { label: "All Users", path: "/users", icon: "People" },
    { label: "Profile", path: "/profile", icon: "AccountCircle" },
    { label: "Security", path: "/changePassword", icon: "Security" },
  ],
  USER: [
    { label: "Profile", path: "/profile", icon: "AccountCircle" },
    { label: "Security", path: "/changePassword", icon: "Security" },
  ],
};

interface SidebarProps {
  role: "ADMIN" | "USER";
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const items = sidebarItems[role];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        height: "calc(100% - 64px)",
        top: 64,
        position: "fixed",
      }}
    >
      <List sx={{ paddingTop: "70px", width: "220px" }}>
        {items.map((item) => {
          const IconComponent = Icons[item.icon as keyof typeof Icons] || Icons.HelpOutline; // Default icon if not found

          return (
            <ListItem
              button
              key={item.label}
              component={NavLink}
              to={item.path}
              sx={{
                "&.active": {
                  backgroundColor: "primary.main",
                  color: "white",
                },
                "&:hover": {
                  backgroundColor: "rgba(63, 66, 68, 0.08)",
                },
              }}
            >
              <ListItemIcon>
                <IconComponent />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
