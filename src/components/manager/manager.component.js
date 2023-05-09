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
  Button,
  Tooltip,
} from "@mui/material";

import {
  Folder,
  InsertDriveFile,
  CloudUpload,
  CloudDownload,
  Home,
} from "@mui/icons-material";

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

  const menu = [
    {
      icon: <Home color="success" />,
      help: "Go to home!",
      onClick: () => router.push(source.home),
    },
    {
      icon: <CloudUpload color="primary" />,
      help: "Upload a new file",
      onClick: () => console.log("Will be add!"),
    },
  ];

  return source !== null ? (
    <Box>
      <head>
        <title>{tree.name}</title>
      </head>
      <Box>
        You are at:{" "}
        {source.path.split("/").map((item, index) => (
          <Button
            key={`${item}-${index}`}
            onClick={() => {
              const url = `/${source.path
                .split("/")
                .slice(1, index + 1)
                .join("/")}`;

              router.push(url);
            }}
          >
            {index === 0 ? "/" : item}
          </Button>
        ))}
      </Box>
      <Box
        sx={{
          pb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          {menu.map((mnu, index) => (
            <Tooltip key={`mnu-${index}`} title={mnu.help}>
              <IconButton onClick={mnu.onClick}>{mnu.icon}</IconButton>
            </Tooltip>
          ))}
        </Box>
        <TextField
          variant="outlined"
          size="small"
          label="Search"
          placeholder="Search for it!"
          type="search"
          onChange={(e) => {
            setTree({
              ...source,
              children: source.children.filter((item) =>
                item.name.includes(e.target.value)
              ),
            });
          }}
        />
      </Box>
      <Divider />
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
        {/* <Divider /> */}
        {tree.children.map((item) => {
          return (
            <ListItemButton
              key={`Item${item.name}`}
              onClick={() =>
                item.type === "directory"
                  ? router.push(item.path)
                  : alert("Files are not supported. Soon will be add!")
              }
            >
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
