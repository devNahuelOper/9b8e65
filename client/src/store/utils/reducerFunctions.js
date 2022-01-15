export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null && message) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    return [...state, newConvo];
  }

  return state.map((convo) => {
    if (message && convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages = [...convo.messages, message];
      convoCopy.latestMessageText = message.text;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const setMessageReadToStore = (state, message) => {
  if (message) {
    const readMessage = { ...message, read: true };
    const matchedConvo = state.find(
      (convo) => convo.id === message.conversationId
    );
    if (matchedConvo) {
      const otherMessages = matchedConvo.messages.filter(
        (msg) => msg.id !== message.id
      );
      const updatedConvo = {
        ...matchedConvo,
        messages: [...otherMessages, readMessage],
      };
      const otherConvos = state.filter((convo) => convo.id !== updatedConvo.id);
      return [updatedConvo, ...otherConvos];
    }
  }
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: true };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: false };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId && message) {
      const convoCopy = { ...convo, id: message.conversationId, latestMessageText: message.text };
      convoCopy.messages = [...convo.messages, message];
      return convoCopy;
    } else {
      return convo;
    }
  });
};
