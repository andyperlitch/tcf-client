export function uploadFile({
  file,
  presignedUrl,
  onProgress,
}: {
  file: File;
  presignedUrl: string;
  onProgress?: (progress: number) => void;
}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("PUT", presignedUrl, true);
    xhr.setRequestHeader("Content-Type", file.type); // Set the content type of the file
    // xhr.setRequestHeader("x-amz-acl", "public-read");

    // Track progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = (event.loaded / event.total) * 100;
        onProgress(progress); // Call the progress callback with the percentage
      }
    };

    // Handle upload completion
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response); // Resolve the promise on success
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    };

    // Handle network errors
    xhr.onerror = () => {
      reject(new Error("Upload failed due to a network error"));
    };

    // Start the upload
    xhr.send(file);
  });
}
