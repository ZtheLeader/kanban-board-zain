import { useState } from 'react';

import { useKanban } from '../../context/kanban/useKanban';

type TaskDetailModalProps = {
  taskId: string;
  columnId: string;
  onClose: () => void;
};
const TaskDetailModal = ({ taskId, onClose }: TaskDetailModalProps) => {
  const { state, dispatch } = useKanban();
  const task = state.tasks[taskId];
  const comments = task.commentIds.map(commentId => state.comments[commentId]);
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (commentText.trim() === '') return;
    const commentId = Date.now().toString();
    dispatch({
      type: 'ADD_COMMENT',
      payload: { commentId, taskId, text: commentText },
    });
    setCommentText('');
  };

  const handleDeleteComment = (commentId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (confirmDelete) {
      dispatch({ type: 'DELETE_COMMENT', payload: { commentId, taskId } });
    }
  };

  const handleEditComment = (commentId: string) => {
    const comment = state.comments[commentId];
    const newText = window.prompt("Edit comment:", comment.text);
    if (newText) {
      dispatch({ type: 'EDIT_COMMENT', payload: { commentId, newText } });
    }
  };

  const handleEditTask = () => {
    const newTitle = window.prompt('Edit task title:', task.title);
    const newDescription = window.prompt('Edit task description:', task.description);
    if (newTitle !== null && newDescription !== null) {
      dispatch({
        type: 'EDIT_TASK',
        payload: { taskId, title: newTitle, description: newDescription },
      });
    }
  };

  if (!task) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-white">{task.title}</h2>
          <div className="flex gap-2">
            <button
              onClick={handleEditTask}
              className="px-4 py-2 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors"
            >
              Edit Task
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-500 font-bold text-3xl leading-none"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        </div>

        <p className="text-gray-300 text-lg mb-6">{task.description}</p>

        <div className="border-t border-gray-700 pt-6">
          <h3 className="text-xl font-semibold mb-4 text-white">Comments</h3>

          <div className="flex flex-col gap-3 mb-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="bg-gray-700 p-3 rounded-lg flex justify-between items-start">
                  <p className="text-gray-300">{comment.text}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditComment(comment.id)}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <input
              autoFocus
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddComment}
              className="px-4 py-3 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors"
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;