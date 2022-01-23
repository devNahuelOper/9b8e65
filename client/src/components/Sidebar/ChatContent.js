import React from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
    alignItems: "center",
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
    maxWidth: 300,
  },
  unreadPreviewText: {
    fontSize: 12,
    color: "#000",
    letterSpacing: -0.17,
    maxWidth: 300,
    fontWeight: "bold",
  },
  unreadBadge: {
    right: 30,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation, unreadMessageCount } = props;
  const { latestMessageText, otherUser } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={unreadMessageCount ? classes.unreadPreviewText : classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      {Boolean(unreadMessageCount) && <Badge className={classes.unreadBadge} badgeContent={unreadMessageCount} color="primary"/>}
    </Box>
  );
};

export default ChatContent;
