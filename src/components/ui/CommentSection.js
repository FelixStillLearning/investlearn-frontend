import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const CommentSection = ({ targetType, targetId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/comments/${targetType}/${targetId}`);
        setComments(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError(err.response?.data?.msg || 'Failed to fetch comments');
        setLoading(false);
      }
    };
    fetchComments();
  }, [targetType, targetId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post('/api/comments', {
        targetType,
        targetId,
        content: newComment,
      });
      setComments([...comments, res.data]);
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
      setError(err.response?.data?.msg || 'Failed to add comment');
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (err) {
      console.error('Error deleting comment:', err);
      setError(err.response?.data?.msg || 'Failed to delete comment');
    }
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Comments</h3>
      <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="border-b border-gray-200 pb-4">
              <div className="flex items-center mb-2">
                <img
                  src={comment.userId.profile.avatar || 'https://via.placeholder.com/30'}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover mr-2"
                />
                <p className="font-medium text-gray-800">{comment.userId.username}</p>
                <p className="text-gray-500 text-sm ml-auto">{new Date(comment.createdAt).toLocaleString()}</p>
              </div>
              <p className="text-gray-700 mb-2">{comment.content}</p>
              {user && user._id === comment.userId._id && (
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
      {user && (
        <form onSubmit={onSubmit} className="flex items-center">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default CommentSection;