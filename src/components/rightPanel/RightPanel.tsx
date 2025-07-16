import { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import {
  Add,
  Edit,
  MoreVert,
  AttachFile,
  EmojiEmotions,
} from "@mui/icons-material";
import {
  useCurrentCustomer,
  useNotes,
  useSelectedThreadId,
} from "../../hooks/useChatStore";

export function RightPanel() {
  const selectedThreadId = useSelectedThreadId();
  const notes = useNotes();
  const currentCustomer = useCurrentCustomer();
  const [showAddAttribute, setShowAddAttribute] = useState(false);
  const [newAttributeKey, setNewAttributeKey] = useState("");
  const [newAttributeValue, setNewAttributeValue] = useState("");
  const [newNote, setNewNote] = useState("");

  const handleAddAttribute = () => {
    if (newAttributeKey && newAttributeValue) {
      setNewAttributeKey("");
      setNewAttributeValue("");
      setShowAddAttribute(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!selectedThreadId) return null;

  return (
    <Box
      sx={{
        width: 300,
        minWidth: 300,
        height: "100vh",
        backgroundColor: "white",
        borderLeft: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: 2.6,
          borderBottom: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            sx={{ width: 24, height: 24 }}
            src="/placeholder.svg?height=24&width=24"
          />
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {currentCustomer.name}
          </Typography>
        </Box>
        <IconButton size="small">
          <Edit fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Typography
              variant="caption"
              sx={{ color: "#6b7280", fontSize: "0.75rem" }}
            >
              Channel
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: "#111827" }}
          >
            {currentCustomer.channel}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="caption"
            sx={{
              color: "#6b7280",
              fontSize: "0.75rem",
              display: "block",
              mb: 0.5,
            }}
          >
            ID
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: "#111827" }}
          >
            {currentCustomer.id}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="caption"
            sx={{
              color: "#6b7280",
              fontSize: "0.75rem",
              display: "block",
              mb: 0.5,
            }}
          >
            Phone number
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: "#111827" }}
          >
            {currentCustomer.phone}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="caption"
            sx={{
              color: "#6b7280",
              fontSize: "0.75rem",
              display: "block",
              mb: 0.5,
            }}
          >
            Address
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: "#111827", lineHeight: 1.4 }}
          >
            {currentCustomer.address}
          </Typography>
        </Box>

        <Button
          startIcon={<Add sx={{ fontSize: 16 }} />}
          onClick={() => setShowAddAttribute(true)}
          sx={{
            textTransform: "none",
            color: "#3b82f6",
            fontSize: "0.875rem",
            p: 0,
            justifyContent: "flex-start",
            fontWeight: 400,
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          Add new attribute
        </Button>
      </Box>

      <Divider />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ p: 2, borderBottom: "1px solid #e2e8f0" }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, mb: 2, color: "#111827" }}
          >
            Notes
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Write a note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            size="small"
            sx={{
              mb: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.5,
                fontSize: "0.875rem",
              },
            }}
          />

          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton size="small" sx={{ color: "#6b7280" }}>
              <AttachFile fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: "#6b7280" }}>
              <EmojiEmotions fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ flex: 1, overflow: "auto" }}>
          <List sx={{ p: 0 }}>
            {notes.map((note) => (
              <ListItem
                key={note.id}
                sx={{
                  borderBottom: "1px solid #f3f4f6",
                  alignItems: "flex-start",
                  py: 2,
                  px: 2,
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "#e5e7eb",
                    color: "#6b7280",
                    fontSize: "0.875rem",
                    mr: 2,
                  }}
                >
                  {note.agent.charAt(0)}
                </Avatar>
                <ListItemText
                  primary={
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 0.5,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: "#111827" }}
                        >
                          {note.agent}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "#6b7280", fontSize: "0.75rem" }}
                        >
                          {formatDate(note.timestamp)}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#374151",
                          lineHeight: 1.4,
                          fontSize: "0.875rem",
                        }}
                      >
                        {note.content}
                      </Typography>
                    </Box>
                  }
                />

                <IconButton size="small" sx={{ color: "#6b7280" }}>
                  <MoreVert fontSize="small" />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      <Dialog
        open={showAddAttribute}
        onClose={() => setShowAddAttribute(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Attribute</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Attribute Name"
            value={newAttributeKey}
            onChange={(e) => setNewAttributeKey(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Attribute Value"
            value={newAttributeValue}
            onChange={(e) => setNewAttributeValue(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddAttribute(false)}>Cancel</Button>
          <Button
            onClick={handleAddAttribute}
            variant="contained"
            disabled={!newAttributeKey || !newAttributeValue}
          >
            Add Attribute
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
