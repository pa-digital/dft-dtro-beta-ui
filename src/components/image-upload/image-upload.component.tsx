import React, { useState } from "react";
import styles from './image-upload.module.css';

interface ImageUploadComponentProps {
  onFilesSelected: (files: File[]) => void;
}

const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({ onFilesSelected }) => {
  const [files, setFiles] = useState<File[]>([]);

  const updateFiles = (newFiles: File[]) => {
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  const openFileDialog = async () => {
    try {
      if (window.showOpenFilePicker) {
        const handles = await window.showOpenFilePicker({
          multiple: true,
          types: [{ description: "All Files", accept: { "*/*": [] } }],
        });

        const fileList = await Promise.all(handles.map((handle) => handle.getFile()));
        updateFiles(fileList);
      } else {
        const input = document.createElement("input");
        input.type = "file";
        input.multiple = true;
        input.onchange = (event: Event) => {
          const target = event.target as HTMLInputElement;
          if (target.files) {
            updateFiles(Array.from(target.files));
          }
        };
        input.click();
      }
    } catch (error) {
      console.error("File selection cancelled or failed", error);
    }
  };

  const handleFiles = (newFiles: FileList | null) => {
    if (newFiles) {
      updateFiles(Array.from(newFiles));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  return (
    <div className={styles.container}>
      <p>Upload files</p>
      <div className={styles.area}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className={styles.selectedFilesContainer}>
          {files.length === 0 ? "No files chosen" : files.length === 1 ? "1 file selected" : `${files.length} files selected`}
        </div>
        <div className={styles.row}>
          <button onClick={openFileDialog}>Choose files</button>
          <p>or drop files</p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadComponent;
