export interface SeriesDTO {
  _id: string;
  show_title: string;
  year: string | null;
  rating: string | null;
  seasons: string | null;
  description: string;

  series_logo: string;
  poster: string;
  fanart: string;

  creators: string[];
  cast: string[];
  starring: string[];
  show_characteristics: string[];
}
