'use client';

import { useState, useRef } from 'react';
import { Modal } from '@/components/ui/modal';
import { Upload, X, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
  type: 'image' | 'video' | 'both';
};

export function MediaUploadModal({ isOpen, onClose, onUpload, type = 'both' }: Props) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setSelectedFiles(files);

    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    // Revoke old URL
    URL.revokeObjectURL(previews[index]);
    
    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newFiles = [...selectedFiles];
    const newPreviews = [...previews];

    // Swap items
    const draggedFile = newFiles[draggedIndex];
    const draggedPreview = newPreviews[draggedIndex];

    newFiles.splice(draggedIndex, 1);
    newPreviews.splice(draggedIndex, 1);

    newFiles.splice(index, 0, draggedFile);
    newPreviews.splice(index, 0, draggedPreview);

    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleUpload = () => {
    onUpload(selectedFiles);
    handleClose();
  };

  const handleClose = () => {
    // Cleanup
    previews.forEach(url => URL.revokeObjectURL(url));
    setSelectedFiles([]);
    setPreviews([]);
    onClose();
  };

  const acceptTypes = 
    type === 'image' ? 'image/*' :
    type === 'video' ? 'video/*' :
    'image/*,video/*';

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Medya Yükle" size="lg">
      <div className="space-y-4">
        {/* Upload Area */}
        {selectedFiles.length === 0 ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-[#d6ff00] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-900 font-medium mb-2">
              Dosyaları buraya sürükleyin veya tıklayın
            </p>
            <p className="text-sm text-gray-500">
              {type === 'image' && 'PNG, JPG, GIF - Maksimum 10MB'}
              {type === 'video' && 'MP4, MOV, AVI - Maksimum 100MB'}
              {type === 'both' && 'Fotoğraf veya Video - Maksimum 100MB'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Preview Grid with Drag & Drop */}
            <div className="grid grid-cols-2 gap-4">
              {previews.map((preview, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-move ${
                    draggedIndex === index ? 'opacity-50 scale-95' : ''
                  } transition-all`}
                >
                  {selectedFiles[index].type.startsWith('image/') ? (
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  ) : (
                    <video
                      src={preview}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  )}
                  
                  {/* Drag Handle */}
                  <div className="absolute top-2 left-2 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="h-4 w-4 text-white" />
                  </div>

                  {/* Order Badge */}
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                    {index + 1}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/70 hover:bg-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              ))}
            </div>

            {/* Drag & Drop Info */}
            {selectedFiles.length > 1 && (
              <p className="text-xs text-gray-500 text-center">
                Fotoğrafları sürükleyerek sıralayabilirsiniz
              </p>
            )}

            {/* Add More Button */}
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Daha Fazla Ekle
            </Button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={acceptTypes}
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Actions */}
        {selectedFiles.length > 0 && (
          <div className="flex gap-2 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              İptal
            </Button>
            <Button
              onClick={handleUpload}
              className="flex-1 bg-[#d6ff00] text-black hover:bg-[#c5ee00]"
            >
              Yükle ({selectedFiles.length})
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
