import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Badge,
  ListItemButton,
} from "@mui/material";
import {
  Search,
  Inbox,
  Person,
  Message,
  Sms,
  WhatsApp,
  Instagram,
  Language,
} from "@mui/icons-material";

import { useState } from "react";

export function LeftPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    inbox: "all",
    status: "all",
    channel: "all",
  });

  const setFilter = (type: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const agents = [
    { id: 1, name: "Olivia Rhye", status: "online", avatar: "" },
    { id: 2, name: "Alfredo Bayer", status: "online", avatar: "" },
    { id: 3, name: "Brent Runner", status: "offline", avatar: "" },
  ];

  const filterSections = [
    {
      title: "INBOX",
      icon: Inbox,
      items: [
        { label: "All", count: 6, value: "all" },
        { label: "Assigned to me", count: 6, value: "assigned" },
        { label: "Unassigned", count: 6, value: "unassigned" },
      ],
      type: "inbox" as const,
    },
    {
      title: "STATUS",
      icon: Person,
      items: [
        { label: "All", count: 56, value: "all" },
        { label: "Agent", count: 123, value: "agent" },
        { label: "Awaiting agent", count: 34, value: "awaiting" },
        { label: "Paused", count: 89, value: "paused" },
      ],
      type: "status" as const,
    },
    {
      title: "CHANNEL",
      icon: Message,
      items: [
        { label: "All", count: 56, value: "all" },
        { label: "SMS", count: 123, value: "SMS", icon: Sms },
        { label: "Whatsapp", count: 34, value: "WhatsApp", icon: WhatsApp },
        { label: "Instagram", count: 89, value: "Instagram", icon: Instagram },
        { label: "Web", count: 89, value: "Web", icon: Language },
      ],
      type: "channel" as const,
    },
  ];

  return (
    <Box
      sx={{
        width: 280,
        minWidth: 280,
        height: "100vh",
        backgroundColor: "white",
        borderRight: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          placeholder="Search chat"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#9ca3af", fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 1.5,
              backgroundColor: "#f9fafb",
              border: "1px solid #e5e7eb",
              fontSize: "0.875rem",
              "& fieldset": {
                border: "none",
              },
            },
          }}
        />
      </Box>

      <Box sx={{ flex: 1, overflow: "auto", px: 1 }}>
        {filterSections.map((section, sectionIndex) => (
          <Box sx={{ mb: 3 }} key={sectionIndex}>
            <Box
              sx={{
                px: 1,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <section.icon sx={{ fontSize: 16, color: "#6b7280" }} />
              <Typography
                variant="caption"
                sx={{
                  color: "#6b7280",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  fontSize: "0.75rem",
                }}
              >
                {section.title}
              </Typography>
            </Box>
            <List dense sx={{ p: 0 }}>
              {section.items.map((item: any) => {
                const isSelected = selectedFilters[section.type] === item.value;
                return (
                  <ListItem
                    disableGutters
                    key={item.value}
                    sx={{ p: 0, mb: 0.5 }}
                  >
                    <ListItemButton
                      selected={isSelected}
                      onClick={() => setFilter(section.type, item.value)}
                      sx={{
                        borderRadius: 1,
                        py: 0.75,
                        px: 1,
                        "&.Mui-selected": {
                          backgroundColor: "#eff6ff",
                          "&:hover": {
                            backgroundColor: "#dbeafe",
                          },
                        },
                        "&:hover": {
                          backgroundColor: "#f9fafb",
                        },
                      }}
                    >
                      {item.icon && (
                        <Box
                          sx={{
                            mr: 1.5,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <item.icon sx={{ fontSize: 16, color: "#6b7280" }} />
                        </Box>
                      )}
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: "0.875rem",
                          fontWeight: isSelected ? 500 : 400,
                          color: "#374151",
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#6b7280",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                        }}
                      >
                        {item.count}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        ))}

        <Box>
          <Box
            sx={{ px: 1, mb: 1, display: "flex", alignItems: "center", gap: 1 }}
          >
            <Person sx={{ fontSize: 16, color: "#6b7280" }} />
            <Typography
              variant="caption"
              sx={{
                color: "#6b7280",
                fontWeight: 600,
                letterSpacing: "0.05em",
                fontSize: "0.75rem",
              }}
            >
              AGENTS
            </Typography>
          </Box>
          <List dense sx={{ p: 0 }}>
            {agents.map((agent) => (
              <ListItem key={agent.id} sx={{ py: 0.75, px: 1 }}>
                <ListItemAvatar sx={{ minWidth: 40 }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor:
                            agent.status === "online" ? "#10b981" : "#6b7280",
                          border: "2px solid white",
                        }}
                      />
                    }
                  >
                    <Avatar src={agent.avatar} sx={{ width: 28, height: 28 }}>
                      {agent.name.charAt(0)}
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={agent.name}
                  secondary={agent.status === "online" ? "Online" : "Offline"}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#374151",
                  }}
                  secondaryTypographyProps={{
                    fontSize: "0.75rem",
                    color: agent.status === "online" ? "#10b981" : "#6b7280",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
}
