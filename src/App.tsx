import "./App.css";
import { MiniSidebar } from "./components/sidebar/SideBar";
import { LeftPanel } from "./components/leftPanel/LeftPanel";
import { Box } from "@mui/material";
import MiddlePanel from "./components/middlePanel/MiddlePanel";
import { RightPanel } from "./components/rightPanel/RightPanel";

function App() {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <MiniSidebar />
      <LeftPanel />
      <MiddlePanel />
      <RightPanel />
    </Box>
  );
}

export default App;
