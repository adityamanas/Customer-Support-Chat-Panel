import { Box } from "@mui/material";
import ChatThreadList from "./ChatThreadList";
import ChatWindow from "./ChatWindow";
import { useSelectedThreadId } from "../../hooks/useChatStore";

const MiddlePanel = () => {
  const selectedThreadId = useSelectedThreadId();
  return (
    <Box
      sx={{
        flex: 1,
        height: "100vh",
        display: "flex",
        backgroundColor: "#f8fafc",
      }}
    >
      {/* Thread List - Left Side */}
      <Box
        sx={{
          width: selectedThreadId ? 350 : "100%",
          minWidth: selectedThreadId ? 350 : "auto",
          borderRight: selectedThreadId ? "1px solid #e2e8f0" : "none",
          transition: "width 0.3s ease",
        }}
      >
        <ChatThreadList />
      </Box>

      {/* Chat Window - Right Side */}
      {selectedThreadId && (
        <Box sx={{ flex: 1 }}>
          <ChatWindow />
        </Box>
      )}
    </Box>
  );
};

export default MiddlePanel;
