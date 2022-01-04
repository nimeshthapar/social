import React, { Fragment, useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';

import PostList from '../../Components/Feed/post/PostList';
import Share from '../../Components/Feed/share/Share';
import ErrorModal from '../../Components/UI/ErrorModal/ErrorModal';
import LoadingSpinner from '../../Components/UI/LoadingSpinner/LoadingSpinner';
import useHttp from '../../hooks/useHttp';
import { AuthContext } from '../../store/auth-context';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatedPost, setUpdatedPost] = useState();

  const { token, isLoggedIn } = useContext(AuthContext);

  const { isLoading, error, sendRequest: fetchPosts, clearError } = useHttp();

  useEffect(() => {
    const fetchRequest = async () => {
      if (isLoggedIn) {
        try {
          const data = await fetchPosts(
            `${process.env.REACT_APP_BACKEND_URL}/posts/?page=${page}`,
            'GET',
            null,
            { Authorization: `Bearer ${token}` }
          );
          setTotalPages(data.totalPages);
          setPosts([...data.posts]);
        } catch (err) {}
      }
    };

    const cleanUptimer = setTimeout(() => {
      fetchRequest();
    });

    return () => {
      clearTimeout(cleanUptimer);
    };
  }, [fetchPosts, page, token, isLoggedIn]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_ASSET_URL);

    socket.on('create-post', (data) => {
      setUpdatedPost(data.post);
    });
  }, []);

  const loadPrevPostsHandler = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const loadMoreHandler = () => {
    setPage((prev) => (prev <= totalPages ? prev + 1 : prev));
  };

  const requestHandler = async () => {
    try {
      const data = await fetchPosts(
        `${process.env.REACT_APP_BACKEND_URL}/posts/?page=1`,
        'GET',
        null,
        { Authorization: `Bearer ${token}` }
      );
      setTotalPages(data.totalPages);
      setPosts([...data.posts]);
    } catch (err) {}

    setUpdatedPost(null);
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal onClose={clearError} text={error} onlyBack overlay />
      )}
      <Share onAdd={requestHandler} />
      {!isLoading && !error && (
        <PostList
          posts={posts}
          onUpdate={requestHandler}
          onNext={loadMoreHandler}
          onPrev={loadPrevPostsHandler}
          page={page}
          totalPages={totalPages}
          isLoading={isLoading}
          updatedPost={updatedPost}
        />
      )}
      {isLoading && <LoadingSpinner center />}
    </Fragment>
  );
};

export default Feed;
