'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { User, Heart, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Comment = {
  id: number;
  author: string;
  text: string;
  time: string;
  likes: number;
  isLiked: boolean;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  comments: Comment[];
};

export function CommentModal({ isOpen, onClose, postId, comments: initialComments }: Props) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleLikeComment = (commentId: number) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, isLiked: !comment.isLiked, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 }
        : comment
    ));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: 'Ahmet Yılmaz',
        text: newComment,
        time: 'Şimdi',
        likes: 0,
        isLiked: false,
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Yorumlar" size="lg">
      <div className="space-y-4 max-h-[60vh] overflow-y-auto mb-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="font-semibold text-sm text-gray-900 mb-1">{comment.author}</p>
                <p className="text-sm text-gray-700">{comment.text}</p>
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span>{comment.time}</span>
                <button
                  onClick={() => handleLikeComment(comment.id)}
                  className={`flex items-center gap-1 ${comment.isLiked ? 'text-red-600 font-semibold' : ''}`}
                >
                  <Heart className={`h-3 w-3 ${comment.isLiked ? 'fill-red-600' : ''}`} />
                  {comment.likes > 0 && comment.likes}
                </button>
                <button className="hover:underline">Yanıtla</button>
              </div>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Henüz yorum yapılmamış</p>
            <p className="text-sm text-gray-400 mt-1">İlk yorumu sen yap!</p>
          </div>
        )}
      </div>

      {/* Add Comment */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              placeholder="Yorum yaz..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d6ff00] focus:border-transparent"
            />
            <Button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className="bg-[#d6ff00] text-black hover:bg-[#c5ee00] rounded-full"
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
