import { useNavigate } from "react-router-dom";
import "./App.css";
import { Box, Button } from "@mui/material";

function App() {
  const navigate = useNavigate();

  const toUsers = () => {
    navigate("/users");
  };

  const toPosts = () => {
    navigate("/posts");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: 'url("/images/bg.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        display: "grid",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gap: 4,
          alignSelf: "center",
          justifySelf: "center",
          backgroundImage: "linear-gradient(45deg, #FFD306, #28bf7e)",
          padding: "2rem",
          borderRadius: "25px",
        }}
      >
        <Button sx={{ fontWeight: 600, fontSize: 16 }} onClick={toUsers}>
          Go To Users Page
        </Button>
        <Button sx={{ fontWeight: 600, fontSize: 16 }} onClick={toPosts}>
          Go To Posts Page
        </Button>
      </Box>
    </div>
  );
}

export default App;
