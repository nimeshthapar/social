import React, { useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import MessageForm from '../../Components/Message/MessageForm';
import MessageList from '../../Components/Message/MessageList';
import useHttp from '../../hooks/useHttp';
import ErrorModal from '../../Components/UI/ErrorModal/ErrorModal';
import LoadingSpinner from '../../Components/UI/LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../../store/auth-context';

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const {
    isLoading,
    error,
    sendRequest: fetchMessages,
    clearError,
  } = useHttp();

  const authCtx = useContext(AuthContext);

  const { token } = authCtx;

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const data = await fetchMessages(
          `${process.env.REACT_APP_BACKEND_URL}/messages/?page=${page}`,
          'GET',
          null,
          { Authorization: `Bearer ${token}` }
        );

        setTotalPages(data.totalPages);
        setMessages([
          ...data.messages.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          ),
        ]);
      } catch (err) {}
    };

    fetchRequest();
  }, [fetchMessages, page, token]);

  const loadPrevMsgHandler = () => {
    setPage((prev) => (prev <= totalPages ? prev + 1 : prev));
  };

  const loadNextMsgHandler = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  useEffect(() => {
    const socket = io(process.env.REACT_APP_ASSET_URL);
    socket.on('new-message', (message) => {
      if (message) {
        setMessages((prev) => [...prev, { ...message.message }]);
      }
    });
  }, []);

  return (
    <>
      {error && (
        <ErrorModal onClose={clearError} text={error} onlyBack overlay />
      )}
      {isLoading && <LoadingSpinner center />}
      <MessageList
        messages={messages}
        username={authCtx.userData.name}
        onPrev={loadPrevMsgHandler}
        onNext={loadNextMsgHandler}
        isLoading={isLoading}
        page={page}
        totalPages={totalPages}
      />
      <MessageForm userData={authCtx.userData} token={token} />
    </>
  );
};

export default Message;
