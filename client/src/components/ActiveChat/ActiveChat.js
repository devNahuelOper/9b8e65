import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";
import { setRead } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column"
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between"
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user, setRead } = props;
  const conversation = props.conversation || {};
  const { id: conversationId, otherUser, unreadMessageCount, messages } = conversation || {};

  if (unreadMessageCount) {
    setRead(conversationId, user?.id, otherUser?.id);
  }

  return (
    <Box className={classes.root}>
      {otherUser && (
        <>
          <Header
            username={otherUser.username}
            online={otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={messages}
              otherUser={otherUser}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) => conversation.otherUser.username === state.activeConversation
      )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRead: (conversationId, userId, otherUserId) => {
      dispatch(setRead(conversationId, userId, otherUserId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChat);
