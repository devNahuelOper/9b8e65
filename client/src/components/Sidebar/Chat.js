import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { setRead } from "../../store/utils/thunkCreators";
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
  const { conversation, userId } = props;
  const { otherUser } = conversation;

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
    const { messages } = conversation;
    if (messages?.length) {
      messages.forEach(async ({ id, read, senderId }) => {
        if (id && otherUser?.id) {
          if (!read && senderId === otherUser.id)
          await props.setRead(id, userId, otherUser.id);
        }
      })
    }
  };

  const { messages = [] } = conversation || {};
  const unreadMessageCount = messages.filter((msg) => !msg.read && msg.senderId === otherUser.id).length;

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent unreadMessageCount={unreadMessageCount} conversation={conversation} />
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.user.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    setRead: (id, userId, otherUserId) => {
      dispatch(setRead(id, userId, otherUserId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
