import type React from 'react';

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactElement<{ className?: string }>;
}

export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

export interface Music {
  title: string;
  artist: string;
  coverUrl: string;
  listenUrl: string;
}

export interface Podcast {
  title: string;
  description: string;
  thumbnailUrl: string;
  listenUrl: string;
}
