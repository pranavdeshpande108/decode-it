# Decode-it Tech Stack

## Overview
Decode-it is a comprehensive web-based cryptographic and decoding application built with modern web technologies.

## Core Technologies

### **React 18.3.1**
- **Purpose**: Frontend framework for building the user interface
- **Usage**: Component-based architecture, state management, event handling
- **Key Features**: Hooks (useState, useRef), JSX components, virtual DOM

### **TypeScript**
- **Purpose**: Type safety and enhanced developer experience
- **Usage**: Type definitions for all components, interfaces, and functions
- **Key Features**: Static typing, better IDE support, compile-time error checking

### **Vite**
- **Purpose**: Build tool and development server
- **Usage**: Fast development with HMR, bundling, optimization
- **Key Features**: Lightning-fast builds, ES module support, plugin ecosystem

### **Tailwind CSS**
- **Purpose**: Utility-first CSS framework for styling
- **Usage**: Custom design system, responsive layouts, dark theme
- **Key Features**: Semantic tokens, gradients, animations, cybersecurity theme

## UI Component Libraries

### **shadcn/ui + Radix UI**
- **Purpose**: Pre-built accessible UI components
- **Usage**: Cards, buttons, inputs, dialogs, tabs, progress bars
- **Components Used**:
  - Card, Button, Input, Label, Textarea
  - Tabs, Progress, Toast, Dialog
  - Accordion, Select, Switch

### **Lucide React**
- **Purpose**: Icon library
- **Usage**: Consistent iconography throughout the app
- **Icons**: Lock, Unlock, Upload, Download, Shield, File, Camera, etc.

## Routing & State Management

### **React Router DOM**
- **Purpose**: Client-side routing
- **Usage**: Navigation between pages, 404 handling
- **Routes**: Home ("/"), NotFound ("*")

### **TanStack Query (React Query)**
- **Purpose**: Server state management and caching
- **Usage**: Future API calls, caching, background refetching

## Cryptographic Libraries

### **Web Crypto API (Native Browser)**
- **Purpose**: Client-side encryption/decryption
- **Usage**: AES-256-GCM encryption, PBKDF2 key derivation
- **Security**: Military-grade encryption, zero-knowledge architecture

### **QR Code Libraries**
- **qrcode**: Generate QR codes from text/data
- **qr-scanner**: Read/decode QR codes from images and camera

## Development Tools

### **ESLint**
- **Purpose**: Code linting and style enforcement
- **Usage**: Maintain code quality and consistency

### **PostCSS**
- **Purpose**: CSS processing
- **Usage**: Autoprefixer, CSS optimizations

## Key Features Implementation

### **Text Encryption/Decryption**
- **Technology**: Web Crypto API (AES-256-GCM + PBKDF2)
- **Files**: `src/lib/crypto.ts`, `src/components/EncryptionCard.tsx`

### **File Encryption/Decryption**
- **Technology**: Web Crypto API with file handling
- **Files**: `src/lib/file-crypto.ts`, `src/components/FileEncryptionCard.tsx`

### **Morse Code Conversion**
- **Technology**: Custom JavaScript implementation
- **Files**: `src/lib/morse-code.ts`, `src/components/MorseCodeCard.tsx`

### **QR Code Generation/Reading**
- **Technology**: qrcode + qr-scanner libraries
- **Files**: `src/lib/qr-code.ts`, `src/components/QRReaderCard.tsx`

### **Password Strength Analysis**
- **Technology**: Custom algorithm
- **Files**: `src/lib/password-strength.ts`, `src/components/PasswordStrengthMeter.tsx`

## Design System

### **Custom CSS Variables**
- **Purpose**: Consistent theming and design tokens
- **File**: `src/index.css`
- **Features**: HSL color system, gradients, shadows, animations

### **Tailwind Configuration**
- **Purpose**: Extended Tailwind with custom design system
- **File**: `tailwind.config.ts`
- **Features**: Custom colors, fonts, animations, utilities

## Security Features

### **Client-Side Only**
- No server required, everything runs in the browser
- Zero-knowledge architecture - no data sent to servers

### **Encryption Standards**
- **AES-256-GCM**: Authenticated encryption
- **PBKDF2**: Key derivation with 100,000 iterations
- **Random IV/Salt**: Each encryption uses unique values

### **File Handling**
- File size limits (10MB)
- Type validation
- Secure file processing in memory

## Performance Optimizations

### **Code Splitting**
- Lazy loading components
- Tree shaking unused code

### **Bundle Optimization**
- Vite's efficient bundling
- CSS and JS minification

### **Memory Management**
- Proper cleanup of file URLs
- Efficient crypto operations

## Browser Compatibility

### **Modern Browser Features Required**
- Web Crypto API support
- File API support
- ES6+ features
- Camera API (for QR scanning)

### **Supported Browsers**
- Chrome 60+
- Firefox 57+
- Safari 11+
- Edge 79+

This tech stack provides a robust, secure, and user-friendly platform for cryptographic operations and data decoding.