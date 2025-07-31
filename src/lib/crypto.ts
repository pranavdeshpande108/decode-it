// Web Crypto API utilities for AES-256-GCM encryption

export interface EncryptionResult {
  encryptedData: string;
  iv: string;
  salt: string;
}

export interface DecryptionInput {
  encryptedData: string;
  iv: string;
  salt: string;
  password: string;
}

// Generate a cryptographic key from password using PBKDF2
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

// Encrypt a message using AES-256-GCM
export async function encryptMessage(message: string, password: string): Promise<EncryptionResult> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  
  // Generate random salt and IV
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  
  // Derive key from password
  const key = await deriveKey(password, salt);
  
  // Encrypt the data
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    data
  );
  
  // Convert to base64 for easy transmission
  const encryptedArray = new Uint8Array(encryptedBuffer);
  const encryptedData = btoa(String.fromCharCode(...encryptedArray));
  const ivString = btoa(String.fromCharCode(...iv));
  const saltString = btoa(String.fromCharCode(...salt));
  
  return {
    encryptedData,
    iv: ivString,
    salt: saltString,
  };
}

// Decrypt a message using AES-256-GCM
export async function decryptMessage(input: DecryptionInput): Promise<string> {
  try {
    // Convert base64 back to arrays
    const encryptedData = new Uint8Array(
      atob(input.encryptedData).split('').map(char => char.charCodeAt(0))
    );
    const iv = new Uint8Array(
      atob(input.iv).split('').map(char => char.charCodeAt(0))
    );
    const salt = new Uint8Array(
      atob(input.salt).split('').map(char => char.charCodeAt(0))
    );
    
    // Derive key from password
    const key = await deriveKey(input.password, salt);
    
    // Decrypt the data
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      key,
      encryptedData
    );
    
    // Convert back to string
    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  } catch (error) {
    throw new Error('Decryption failed. Please check your password and try again.');
  }
}

// Generate a secure random password
export function generateSecurePassword(length: number = 16): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  const randomValues = new Uint8Array(length);
  window.crypto.getRandomValues(randomValues);
  
  return Array.from(randomValues)
    .map(value => charset[value % charset.length])
    .join('');
}