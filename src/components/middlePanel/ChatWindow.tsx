import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Paper,
  Chip,
  Divider,
  Badge,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Send,
  AttachFile,
  EmojiEmotions,
  TextSnippet,
  PauseCircle,
  Cancel,
  CheckCircle,
  MoreVert,
  WhatsApp,
  Sms,
  Instagram,
  Language,
} from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";
import {
  useSelectedThread,
  useChatStore,
  type ChatMessage,
} from "../../hooks/useChatStore";
import { SlashCommandMenu } from "./SlashCommandMenu";

const MessageBubble = ({ message }: { message: ChatMessage }) => {
  const isUserMessage = message.sender === "user";
  const isSystemMessage = message.sender === "system";

  if (isSystemMessage) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: 2,
        }}
      >
        <Chip
          label={message.content}
          size="small"
          sx={{
            backgroundColor: "#e0f2fe",
            color: "#0369a1",
            fontSize: "0.75rem",
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isUserMessage ? "row-reverse" : "row",
        mb: 3,
        alignItems: "flex-start",
      }}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          mx: 1,
          backgroundColor: isUserMessage ? "#dc2626" : "#6b7280",
        }}
        alt={isUserMessage ? "User" : "Agent"}
      >
        {isUserMessage ? "U" : "A"}
      </Avatar>
      <Box sx={{ maxWidth: "70%" }}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: isUserMessage ? "#3b82f6" : "#f3f4f6",
            color: isUserMessage ? "white" : "#111827",
            border: "1px solid #e2e8f0",
          }}
        >
          <Typography variant="body2">{message.content}</Typography>
        </Paper>
        <Box
          sx={{
            display: "flex",
            justifyContent: isUserMessage ? "flex-end" : "flex-start",
            alignItems: "center",
            mt: 0.5,
            px: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {formatMessageTime(message.timestamp)}
          </Typography>
          {!isUserMessage && message.status && (
            <CheckCircle
              sx={{
                ml: 0.5,
                fontSize: 12,
                color:
                  message.status === "read"
                    ? "#22c55e"
                    : message.status === "delivered"
                    ? "#64748b"
                    : "#d1d5db",
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

// Helper function to format timestamps
const formatMessageTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// Helper function to format date headers
const formatDateHeader = (date: Date): string => {
  return date.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

// Helper function to group messages by date
const groupMessagesByDate = (messages: ChatMessage[]) => {
  const groups: { [key: string]: ChatMessage[] } = {};

  messages.forEach((message) => {
    const dateKey = message.timestamp.toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(message);
  });

  return Object.entries(groups).map(([dateKey, messages]) => ({
    date: new Date(dateKey),
    messages,
  }));
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

// Message component
const Message = ({ message }: { message: ChatMessage }) => {
  const isUserMessage = message.sender === "user";
  const isSystemMessage = message.sender === "system";

  if (isSystemMessage) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: 2,
        }}
      >
        <Chip
          label={message.content}
          size="small"
          sx={{
            backgroundColor: "#f3f4f6",
            color: "#6b7280",
            fontSize: "0.75rem",
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isUserMessage ? "row" : "row-reverse",
        mb: 2,
        maxWidth: "80%",
        alignSelf: isUserMessage ? "flex-start" : "flex-end",
      }}
    >
      {isUserMessage && (
        <Avatar
          sx={{ width: 32, height: 32, mr: 1 }}
          alt="User"
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            "User"
          )}&background=random`}
        />
      )}
      <Box>
        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            borderRadius: 2,
            backgroundColor: isUserMessage ? "#f3f4f6" : "#2563eb",
            color: isUserMessage ? "text.primary" : "white",
            maxWidth: "100%",
          }}
        >
          <Typography variant="body2">{message.content}</Typography>
        </Paper>
        <Box
          sx={{
            display: "flex",
            justifyContent: isUserMessage ? "flex-start" : "flex-end",
            alignItems: "center",
            mt: 0.5,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {formatMessageTime(message.timestamp)}
          </Typography>
          {!isUserMessage && message.status && (
            <CheckCircle
              sx={{
                ml: 0.5,
                fontSize: 12,
                color:
                  message.status === "read"
                    ? "#22c55e"
                    : message.status === "delivered"
                    ? "#64748b"
                    : "#d1d5db",
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

// Quick action buttons component
const QuickActionButtons = ({
  onActionClick,
}: {
  onActionClick: (action: string) => void;
}) => {
  return (
    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
      <Button
        variant="contained"
        size="small"
        sx={{
          backgroundColor: "#2563eb",
          color: "white",
          textTransform: "none",
          borderRadius: 2,
          fontSize: "0.75rem",
        }}
        onClick={() => onActionClick("Retry Checking the Balance")}
      >
        Retry Checking the Balance
      </Button>
      <Button
        variant="contained"
        size="small"
        sx={{
          backgroundColor: "#2563eb",
          color: "white",
          textTransform: "none",
          borderRadius: 2,
          fontSize: "0.75rem",
        }}
        onClick={() => onActionClick("Speak to a Representative")}
      >
        Speak to a Representative
      </Button>
    </Box>
  );
};

const ChatWindow = () => {
  const selectedThread = useSelectedThread();
  //   const messages = useMessages(selectedThread?.id || null);
  const { messages, sendMessage } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageInput, setMessageInput] = useState("");
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const threadMessages = selectedThread
    ? messages[selectedThread.id] || []
    : [];

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [threadMessages]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedThread) return;

    sendMessage(selectedThread.id, messageInput);
    setMessageInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessageInput(value);

    if (value === "/") {
      setShowSlashMenu(true);
    } else if (!value.startsWith("/")) {
      setShowSlashMenu(false);
    }
  };

  const handleQuickActionClick = (action: string) => {
    if (selectedThread) {
      sendMessage(selectedThread.id, action);
    }
  };

  const handleSlashCommand = (command: string, template: string) => {
    setMessageInput(template);
    setShowSlashMenu(false);
  };
  if (!selectedThread) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          p: 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: selectedThread.isOnline
                  ? "#22c55e"
                  : "#d1d5db",
                boxShadow: `0 0 0 2px white`,
              },
            }}
          >
            <Avatar
              alt={selectedThread.customerName}
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                selectedThread.customerName
              )}&background=random`}
              sx={{ width: 36, height: 36, mr: 1.5 }}
            />
          </Badge>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {selectedThread.customerName}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                {selectedThread.isOnline ? "Online" : "Offline"}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<PauseCircle />}
            sx={{
              borderRadius: 4,
              textTransform: "none",
              borderColor: "#d1d5db",
              color: "#6b7280",
            }}
          >
            Pause
          </Button>
          <Button
            size="small"
            variant="contained"
            startIcon={<Cancel />}
            sx={{
              borderRadius: 4,
              textTransform: "none",
              backgroundColor: "#1f2937",
            }}
          >
            Close
          </Button>
          <IconButton size="small">
            <MoreVert />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: 3,
          backgroundColor: "#f9fafb",
        }}
      >
        {threadMessages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {selectedThread.status === "open" && (
          <QuickActionButtons onActionClick={handleQuickActionClick} />
        )}

        <div ref={messagesEndRef} />
      </Box>
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid #e2e8f0",
          backgroundColor: "white",
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
          <Box sx={{ flex: 1, position: "relative" }}>
            <TextField
              fullWidth
              placeholder="Type '/' to use template message"
              value={messageInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <IconButton size="small" sx={{ color: "#6b7280" }}>
                        <AttachFile fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: "#6b7280" }}>
                        <EmojiEmotions fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: "#6b7280" }}>
                        <TextSnippet fontSize="small" />
                      </IconButton>
                    </Box>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#f9fafb",
                },
              }}
            />
            {showSlashMenu && (
              <SlashCommandMenu
                open={showSlashMenu}
                onSelect={handleSlashCommand}
              />
            )}
          </Box>
          <Button
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              minWidth: "auto",
              px: 2,
              borderColor: "#d1d5db",
              color: "#6b7280",
            }}
          >
            Assign to Form
          </Button>
          <Button
            variant="contained"
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            sx={{
              minWidth: "auto",
              px: 2,
              backgroundColor: "#dc2626",
              "&:hover": {
                backgroundColor: "#b91c1c",
              },
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatWindow;
