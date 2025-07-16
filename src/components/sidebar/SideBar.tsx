import { Box, Avatar, Tooltip, IconButton } from "@mui/material";
import {
  Home,
  Chat,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { useState } from "react";
import { useSidebarStore } from "../../hooks/useSidebarStore";

export function MiniSidebar() {
  const [activeNav, setActiveNav] = useState("Messages");
  const { isCollapsed, toggleCollapse } = useSidebarStore();

  const navigationItems = [
    { icon: Home, label: "Dashboard", id: "Dashboard" },
    { icon: Chat, label: "Messages", id: "Messages" },
    { icon: Settings, label: "Settings", id: "Settings" },
  ];

  const handleNavClick = (navId: string) => {
    setActiveNav(navId);
  };

  return (
    <Box
      sx={{
        width: isCollapsed ? 64 : 200,
        minWidth: isCollapsed ? 64 : 200,
        height: "100vh",
        backgroundColor: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #e2e8f0",
        transition: "width 0.3s ease, min-width 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={toggleCollapse}
          size="small"
          sx={{
            backgroundColor: "#f1f5f9",
            "&:hover": {
              backgroundColor: "#e2e8f0",
            },
            transition: "transform 0.3s ease",
            transform: isCollapsed ? "rotate(0deg)" : "rotate(180deg)",
          }}
        >
          {isCollapsed ? (
            <ChevronRight fontSize="small" />
          ) : (
            <ChevronLeft fontSize="small" />
          )}
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, py: 2, mt: 4 }}>
        {navigationItems.map((item) => {
          const isActive = activeNav === item.id;
          return (
            <Tooltip
              key={item.id}
              title={isCollapsed ? item.label : ""}
              placement="right"
            >
              <Box
                onClick={() => handleNavClick(item.id)}
                sx={{
                  mx: 1,
                  mb: 1,
                  borderRadius: 2,
                  backgroundColor: isActive ? "#2563eb" : "transparent",
                  "&:hover": {
                    backgroundColor: isActive ? "#2563eb" : "#e2e8f0",
                  },
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isCollapsed ? "center" : "flex-start",
                    p: 1.5,
                    color: isActive ? "white" : "#64748b",
                    width: "100%",
                  }}
                >
                  <item.icon sx={{ fontSize: 20, minWidth: 20 }} />
                  {!isCollapsed && (
                    <Box
                      component="span"
                      sx={{
                        ml: 2,
                        fontSize: 14,
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        opacity: isCollapsed ? 0 : 1,
                        transition: "opacity 0.2s ease",
                      }}
                    >
                      {item.label}
                    </Box>
                  )}
                </Box>
              </Box>
            </Tooltip>
          );
        })}
      </Box>

      <Box
        sx={{
          p: 1.5,
          borderTop: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "flex-start",
        }}
      >
        <Avatar
          src="/placeholder.svg?height=32&width=32"
          sx={{ width: 32, height: 32 }}
        />
        {!isCollapsed && (
          <Box
            sx={{
              ml: 2,
              fontSize: 14,
              fontWeight: 500,
              opacity: isCollapsed ? 0 : 1,
              transition: "opacity 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            John Doe
          </Box>
        )}
      </Box>
    </Box>
  );
}
