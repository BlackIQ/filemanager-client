import { Loader } from "@/components";
import API from "@/api";

import { useRouter } from "next/router";

import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  colors,
  Box,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { Folder, InsertDriveFile, CloudUpload } from "@mui/icons-material";

import { useState, useEffect } from "react";

function Manager({ path }) {
  const [source, setSource] = useState(null);
  const [tree, setTree] = useState(null);

  const router = useRouter();

  useEffect(() => {
    getTree();
  }, [path]);

  const getTree = async () => {
    try {
      const { data } = await API.post("tree", { path });

      setSource(data);
      setTree(data);
    } catch (error) {
      alert("Error");
    }
  };

  const total = {};

  if (source) {
    total["directories"] = tree.children.filter(
      ({ type }) => type === "directory"
    ).length;

    total["files"] = tree.children.filter(({ type }) => type === "file").length;
  }

  return source !== null ? (
    <Box>
      <Box
        sx={{
          pb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <IconButton size="large">
            <CloudUpload color="primary" />
          </IconButton>
        </Box>
        <TextField
          variant="outlined"
          size="small"
          label="Search"
          placeholder="Search for it!"
          type="search"
          onChange={(e) => {
            setTree({
              children: source.children.filter((item) =>
                item.name.includes(e.target.value)
              ),
            });
          }}
        />
      </Box>

      <List disablePadding>
        <ListItemButton
          onClick={() =>
            router.push(
              `/${path
                .split("/")
                .slice(0, path.split("/").length - 1)
                .join("/")}`
            )
          }
        >
          <ListItemIcon>
            <Folder sx={{ color: colors.amber[500] }} />
          </ListItemIcon>
          <ListItemText primary="../" />
        </ListItemButton>
        <Divider />
        {tree.children.map((item) => {
          return (
            <ListItemButton onClick={() => router.push(item.path)}>
              <ListItemIcon>
                {item.type === "directory" ? (
                  <Folder sx={{ color: colors.amber[500] }} />
                ) : (
                  <InsertDriveFile sx={{ color: colors.blue[500] }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                sx={{
                  color: item.name.startsWith(".") ? colors.grey[700] : "black",
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
      <br />
      <Box sx={{ px: 2 }}>
        <Typography variant="body1">
          {total.directories} Directories, {total.files} Files.
        </Typography>
      </Box>
    </Box>
  ) : (
    <Loader />
  );
}

export default Manager;
