export function imageUriToFile(dataURI: string, fileName: string) {
  // Split the data URI to get the base64 string and the MIME type
  const [header, base64String] = dataURI.split(",");
  if (!header || !base64String) {
    throw new Error("Invalid data URI");
  }
  const mimeString = header.match(/:(.*?);/)?.[1]; // Extract the MIME type (e.g., "image/png")
  if (!mimeString) {
    throw new Error("Invalid data URI");
  }

  // Decode the base64 string
  const byteString = atob(base64String);
  const byteArray = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  // Create a Blob from the byte array
  const blob = new Blob([byteArray], { type: mimeString });

  // Create and return a File object from the Blob
  return new File([blob], fileName, { type: mimeString });
}
