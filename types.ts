export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  groundingChunks?: GroundingChunk[];
  timestamp: number;
}

export interface JobSearchParams {
  query: string;
  location?: string;
}
