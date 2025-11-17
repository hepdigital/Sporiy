'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { User, UserPlus, UserMinus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type UserProfile = {
  id: number;
  name: string;
  username: string;
  bio: string;
  isFollowing: boolean;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  type: 'followers' | 'following';
  users: UserProfile[];
};

export function FollowersModal({ isOpen, onClose, type, users: initialUsers }: Props) {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleFollow = (userId: number) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, isFollowing: !user.isFollowing }
        : user
    ));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={type === 'followers' ? 'Takipçiler' : 'Takip Edilenler'}
      size="md"
    >
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ara..."
            className="pl-10"
          />
        </div>

        {/* Users List */}
        <div className="max-h-[60vh] overflow-y-auto space-y-2">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-6 w-6 text-gray-400" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">{user.name}</h4>
                <p className="text-sm text-gray-600 truncate">@{user.username}</p>
                {user.bio && (
                  <p className="text-sm text-gray-500 truncate">{user.bio}</p>
                )}
              </div>

              <Button
                size="sm"
                onClick={() => handleToggleFollow(user.id)}
                className={user.isFollowing
                  ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  : 'bg-[#d6ff00] text-black hover:bg-[#c5ee00]'
                }
              >
                {user.isFollowing ? (
                  <>
                    <UserMinus className="h-4 w-4 mr-1" />
                    Takiptesin
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-1" />
                    Takip Et
                  </>
                )}
              </Button>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {searchQuery ? 'Kullanıcı bulunamadı' : 'Henüz kimse yok'}
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
