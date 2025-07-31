export async function encryptFile(file: File, password: string): Promise<{
  encryptedData: string;
  iv: string;
  salt: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}> {
  const arrayBuffer = await file.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);
  
  // Generate random salt and IV
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  
  // Derive key from password
  const encoder = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  const key = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );
  
  // Encrypt the file data
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    data
  );
  
  // Convert to base64
  const encryptedArray = new Uint8Array(encryptedBuffer);
  const encryptedData = btoa(String.fromCharCode(...encryptedArray));
  const ivString = btoa(String.fromCharCode(...iv));
  const saltString = btoa(String.fromCharCode(...salt));
  
  return {
    encryptedData,
    iv: ivString,
    salt: saltString,
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
  };
}

export async function decryptFile(encryptedFileData: {
  encryptedData: string;
  iv: string;
  salt: string;
  fileName: string;
  fileType: string;
  password: string;
}): Promise<Blob> {
  // Convert base64 back to arrays
  const encryptedData = new Uint8Array(
    atob(encryptedFileData.encryptedData).split('').map(char => char.charCodeAt(0))
  );
  const iv = new Uint8Array(
    atob(encryptedFileData.iv).split('').map(char => char.charCodeAt(0))
  );
  const salt = new Uint8Array(
    atob(encryptedFileData.salt).split('').map(char => char.charCodeAt(0))
  );
  
  // Derive key from password
  const encoder = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(encryptedFileData.password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  const key = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
  
  // Decrypt the data
  const decryptedBuffer = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    encryptedData
  );
  
  return new Blob([decryptedBuffer], { type: encryptedFileData.fileType });
}