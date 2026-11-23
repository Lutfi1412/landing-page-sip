export interface ChildItem {
  nama: string;
  link?: string | null;
  deskripsi?: string;
  gambar?: string;
}

export interface ModuleItem {
  modul: string;
  deskripsi?: string;
  link?: string | null;
  ikon?: string;
  child?: ChildItem[];
}

export const hasLink = (link?: string | null): link is string => !!link && link.trim() !== "";
