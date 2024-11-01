declare global {
  interface Window {
    electron: {
      getAllMangas: () => Promise<any[]>;
      addManga: (manga: any) => Promise<number>;
      updateManga: (id: number, manga: any) => Promise<boolean>;
      deleteManga: (id: number) => Promise<boolean>;
    };
  }
}

export const db = {
  getAllMangas: async () => {
    return await window.electron.getAllMangas();
  },
  
  addManga: async (manga: any) => {
    return await window.electron.addManga(manga);
  },
  
  updateManga: async (id: number, manga: any) => {
    return await window.electron.updateManga(id, manga);
  },
  
  deleteManga: async (id: number) => {
    return await window.electron.deleteManga(id);
  }
};