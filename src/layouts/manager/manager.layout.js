import { CloudUpload } from "@mui/icons-material";
import { Box, Card, CardContent, Divider, IconButton } from "@mui/material";

const ManagerLayout = ({ children }) => {
  return (
    <Box>
      <Card variant="outlined">
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
};

export default ManagerLayout;
