"use client";

import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";

interface SlashCommandMenuProps {
  open: boolean;
  onSelect: (command: string, template: string) => void;
}

const slashCommands = [
  {
    command: "/greeting",
    template: "Hello! How can I help you today?",
    description: "Send a greeting message",
  },
  {
    command: "/billing",
    template:
      "I can help you with your billing inquiry. What specific issue are you experiencing?",
    description: "Help with billing inquiries",
  },
  {
    command: "/technical",
    template:
      "Let me assist you with technical support. Can you describe the issue you're facing?",
    description: "Technical support assistance",
  },
  {
    command: "/escalate",
    template:
      "Let me connect you with a specialist who can better assist you with this matter.",
    description: "Escalate to specialist",
  },
  {
    command: "/closing",
    template: "Is there anything else I can help you with today?",
    description: "Closing conversation",
  },
];

export function SlashCommandMenu({ open, onSelect }: SlashCommandMenuProps) {
  if (!open) return null;

  return (
    <Paper
      elevation={8}
      sx={{
        position: "absolute",
        bottom: "100%",
        left: 0,
        right: 0,
        backgroundColor: "white",
        border: "1px solid #e2e8f0",
        borderRadius: 1,
        p: 1,
        boxShadow: 2,
        zIndex: 1000,
      }}
    >
      <Box sx={{ p: 1 }}>
        <Typography
          variant="caption"
          sx={{
            color: "#64748b",
            fontWeight: 600,
            px: 1,
            py: 0.5,
            display: "block",
          }}
        >
          TEMPLATE MESSAGES
        </Typography>
      </Box>
      <List dense>
        {slashCommands.map((cmd) => (
          <ListItem
            key={cmd.command}
            onClick={() => onSelect(cmd.command, cmd.template)}
            sx={{
              borderRadius: 1,
              mx: 1,
              mb: 0.5,
              "&:hover": {
                backgroundColor: "#f8fafc",
              },
            }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "monospace",
                      backgroundColor: "#f1f5f9",
                      px: 1,
                      py: 0.25,
                      borderRadius: 0.5,
                      fontSize: "0.75rem",
                    }}
                  >
                    {cmd.command}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cmd.description}
                  </Typography>
                </Box>
              }
              secondary={
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: "block",
                    mt: 0.5,
                    fontStyle: "italic",
                  }}
                >
                  "{cmd.template.substring(0, 50)}..."
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
