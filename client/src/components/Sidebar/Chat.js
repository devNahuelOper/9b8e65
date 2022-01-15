import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { updateMessageRead } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { otherUser } = conversation;

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
    const { messages } = conversation;
    if (messages && messages.length) {
      messages.forEach(async ({ id, read, senderId }) => {
        if (id && otherUser && otherUser.id) {
          if (!read && senderId === otherUser.id)
          await props.setRead(id);
        }
      })
    }
  };

  const { messages = [] } = conversation || {};
  const unreadMessages = messages.filter((msg) => !msg.read && msg.senderId === otherUser.id).length;

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent unreadMessages={unreadMessages} conversation={conversation} />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    setRead: id => {
      dispatch(updateMessageRead(id));
    }
  };
};

export default connect(null, mapDispatchToProps)(Chat);
