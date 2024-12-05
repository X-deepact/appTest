// src/types/index.ts
export interface Note {
    id: string;
    title: string;
    body: string;
    date: string;
    location: {
      latitude: number;
      longitude: number;
    };
    imageUrl?: string;
  }
    
  export interface User {
    uid: string;
    email: string;
  }
  