interface FilePickerAcceptType {
    description?: string;
    accept: Record<string, string[]>;
  }
  
  interface OpenFilePickerOptions {
    multiple?: boolean;
    types?: FilePickerAcceptType[];
    excludeAcceptAllOption?: boolean;
    id?: string;
    startIn?: FileSystemHandle | string;
  }
  
  interface Window {
    showOpenFilePicker?: (options?: OpenFilePickerOptions) => Promise<FileSystemFileHandle[]>;
  }
  