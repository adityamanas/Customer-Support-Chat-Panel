import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Badge,
  Divider,
  Chip,
  IconButton,
} from "@mui/material";
import {
  useThreads,
  useSelectedThreadId,
  useChatStore,
} from "../../hooks/useChatStore";
import {
  WhatsApp,
  Sms,
  Instagram,
  Language,
  FiberManualRecord,
  FilterList,
  ArrowBack,
} from "@mui/icons-material";

const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  return date.toLocaleDateString();
};

// Helper function to get channel icon
const getChannelIcon = (channel: string) => {
  switch (channel) {
    case "WhatsApp":
      return <WhatsApp sx={{ color: "#25D366" }} />;
    case "SMS":
      return <Sms sx={{ color: "#2563eb" }} />;
    case "Instagram":
      return <Instagram sx={{ color: "#E1306C" }} />;
    case "Web":
      return <Language sx={{ color: "#64748b" }} />;
    default:
      return <Language sx={{ color: "#64748b" }} />;
  }
};

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "open":
      return "#22c55e";
    case "paused":
      return "#f59e0b";
    case "newest":
      return "#2563eb";
    default:
      return "#64748b";
  }
};

const ChatThreadList = () => {
  const threads = useThreads();
  const selectedThreadId = useSelectedThreadId();
  const { selectThread, clearSelectedThread } = useChatStore();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          p: 2.5,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {selectedThreadId && (
          <IconButton
            size="small"
            onClick={clearSelectedThread}
            sx={{ mr: 0.5 }}
          >
            <ArrowBack fontSize="small" />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#111827" }}>
          {"Conversations"}
        </Typography>
      </Box>

      {!selectedThreadId && (
        <Box
          sx={{ px: 2, py: 1, display: "flex", alignItems: "center", gap: 1 }}
        >
          <FilterList sx={{ fontSize: 18, color: "#6b7280" }} />
          <Chip
            label="Open"
            size="small"
            sx={{
              backgroundColor: "#dbeafe",
              color: "#1d4ed8",
              fontSize: "0.75rem",
              height: 24,
            }}
          />
          <Chip
            label="Newest"
            size="small"
            variant="outlined"
            sx={{
              borderColor: "#d1d5db",
              color: "#6b7280",
              fontSize: "0.75rem",
              height: 24,
            }}
          />
        </Box>
      )}

      <List sx={{ width: "100%", overflow: "auto", flex: 1, p: 0 }}>
        {threads.map((thread) => (
          <Box key={thread.id}>
            <ListItem
              alignItems="flex-start"
              sx={{
                py: 1.5,
                px: 2,
                cursor: "pointer",
                backgroundColor:
                  selectedThreadId === thread.id
                    ? "rgba(37, 99, 235, 0.08)"
                    : "transparent",
                "&:hover": {
                  backgroundColor:
                    selectedThreadId === thread.id
                      ? "rgba(37, 99, 235, 0.12)"
                      : "rgba(0, 0, 0, 0.04)",
                },
                position: "relative",
              }}
              onClick={() => selectThread(thread.id)}
            >
              {thread.unread && (
                <Box
                  sx={{
                    position: "absolute",
                    left: 1,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <FiberManualRecord sx={{ color: "#ef4444", fontSize: 10 }} />
                </Box>
              )}
              <ListItemAvatar>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        bgcolor: getStatusColor(thread.status),
                        border: "2px solid white",
                      }}
                    />
                  }
                >
                  <Avatar
                    alt={thread.customerName}
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      thread.customerName
                    )}&background=random`}
                  />
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={thread.unread ? 700 : 400}
                    >
                      {thread.customerName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatTimestamp(thread.timestamp)}
                    </Typography>
                  </Box>
                }
                secondary={
                  // Remove the Box wrapper and use the Typography directly
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{
                      display: "block",
                      fontWeight: thread.unread ? 600 : 400,
                      color: thread.unread ? "text.primary" : "text.secondary",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      mb: 0.5,
                      mt: 0.5, // Added the margin top that was on the Box
                    }}
                  >
                    {thread.lastMessage}
                  </Typography>
                }
              />
            </ListItem>
            <Divider component="li" />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default ChatThreadList;
