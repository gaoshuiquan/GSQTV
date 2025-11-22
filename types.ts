export enum ViewState {
  HOME = 'HOME',
  IPTV = 'IPTV',
  VOD = 'VOD',
  SEARCH = 'SEARCH',
  SETTINGS = 'SETTINGS'
}

export interface IptvChannel {
  id: string;
  name: string;
  url: string;
  group?: string;
  logo?: string;
}

export interface VodConfig {
  spider: string;
  sites: VodSite[];
  lives?: {
    name: string;
    type: number;
    url: string;
  }[];
}

export interface VodSite {
  key: string;
  name: string;
  type: number;
  api: string;
  searchable?: number;
  filterable?: number;
}

export interface MovieItem {
  id: number;
  title: string;
  rating: number;
  cover: string;
  year?: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  items: MovieItem[];
}