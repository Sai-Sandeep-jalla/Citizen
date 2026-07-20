import { useRef, useState } from 'react';
import { UploadCloud, File, Image, Film, X, Check } from 'lucide-react';

export const FileUpload = ({
  onChange,
  accept = 'image/*,application/pdf,.doc,.docx,video/*',
  maxSizeMB = 10,
  label = 'Upload attachment files'
}) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(null); // null, 0-100, or 'done'

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndAddFiles = (newFiles) => {
    const validFiles = [];
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      if (file.size > maxSizeBytes) {
        alert(`File "${file.name}" exceeds the ${maxSizeMB}MB size limit.`);
        continue;
      }
      
      // Generate a mock local URL for previews
      const objectUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
      validFiles.push({
        file,
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        type: file.type,
        preview: objectUrl
      });
    }

    if (validFiles.length > 0) {
      const updatedList = [...files, ...validFiles];
      setFiles(updatedList);
      onChange && onChange(updatedList.map(item => item.file));
      
      // Simulate file upload progress
      simulateUploadProgress();
    }
  };

  const simulateUploadProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploadProgress('done'), 400);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndAddFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndAddFiles(e.target.files);
    }
  };

  const removeFile = (indexToRemove) => {
    const item = files[indexToRemove];
    if (item.preview) {
      URL.revokeObjectURL(item.preview);
    }
    const updated = files.filter((_, idx) => idx !== indexToRemove);
    setFiles(updated);
    onChange && onChange(updated.map(item => item.file));
    if (updated.length === 0) {
      setUploadProgress(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return <Image className="w-5 h-5 text-green-600" />;
    if (type.startsWith('video/')) return <Film className="w-5 h-5 text-blue-500" />;
    return <File className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="w-full space-y-3">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      
      {/* Drag zone */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        className={`
          border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200
          ${dragActive ? 'border-primary bg-lightgreen/50 scale-[1.01]' : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          className="hidden"
          accept={accept}
          multiple
        />
        <UploadCloud className="w-10 h-10 mx-auto text-gray-400 mb-2" />
        <p className="text-sm text-gray-600 font-medium">
          Drag & drop your files here, or <span className="text-primary hover:underline">browse</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Supports: Images, Videos, PDFs, and Documents (Max {maxSizeMB}MB)
        </p>
      </div>

      {/* Upload Progress Indicator */}
      {uploadProgress !== null && (
        <div className="bg-white border border-gray-150 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 w-3/4">
            <div className={`p-1.5 rounded-full ${uploadProgress === 'done' ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600 animate-pulse'}`}>
              {uploadProgress === 'done' ? <Check className="w-4 h-4" /> : <UploadCloud className="w-4 h-4" />}
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-xs font-semibold text-gray-700">
                {uploadProgress === 'done' ? 'Attachments processed successfully' : 'Processing attachments...'}
              </p>
              {typeof uploadProgress === 'number' && (
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
          <span className="text-xs font-bold text-gray-500">
            {typeof uploadProgress === 'number' ? `${uploadProgress}%` : 'Done'}
          </span>
        </div>
      )}

      {/* Files Preview list */}
      {files.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {files.map((fileObj, idx) => (
            <div key={idx} className="flex items-center justify-between bg-white border border-gray-100 rounded-lg p-2.5 shadow-sm">
              <div className="flex items-center space-x-2.5 overflow-hidden">
                {fileObj.preview ? (
                  <img
                    src={fileObj.preview}
                    alt="preview"
                    className="w-10 h-10 object-cover rounded-lg border border-gray-100"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
                    {getFileIcon(fileObj.type)}
                  </div>
                )}
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-gray-700 truncate">{fileObj.name}</p>
                  <p className="text-[10px] text-gray-400">{fileObj.size}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(idx);
                }}
                className="text-gray-400 hover:text-red-500 rounded-md p-1 hover:bg-gray-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default FileUpload;
