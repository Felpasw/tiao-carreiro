export type Album = {
  id?: number;
  name: string;
  year: number;
};

export type Track = {
  id?: number;
  title: string;
  number: number;
  duration: number;
};

export type AlbumAndTracks = {
  id: number;
  name: string;
  year: number;
  tracks: Track[];
};
