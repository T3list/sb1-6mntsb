import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Paper, AppBar, Toolbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import MangaTable from './components/MangaTable';
import MangaDialog from './components/MangaDialog';
import { db } from './db/database';

interface Manga {
  id: number;
  titre: string;
  tomes_total: number;
  tomes_possedes: string;
  tomes_lus: string;
  statut: string;
}

function App() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMangas();
  }, []);

  const loadMangas = async () => {
    try {
      setLoading(true);
      const data = await db.getAllMangas();
      setMangas(data);
    } catch (error) {
      console.error('Erreur lors du chargement des mangas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddManga = async (manga: Omit<Manga, 'id'>) => {
    try {
      await db.addManga(manga);
      await loadMangas();
      setOpenDialog(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du manga:', error);
    }
  };

  const handleEditManga = (manga: Manga) => {
    setSelectedManga(manga);
    setOpenDialog(true);
  };

  const handleSaveManga = async (manga: Omit<Manga, 'id'>) => {
    try {
      if (selectedManga) {
        await db.updateManga(selectedManga.id, manga);
        setSelectedManga(null);
      } else {
        await db.addManga(manga);
      }
      await loadMangas();
      setOpenDialog(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du manga:', error);
    }
  };

  const handleDeleteManga = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce manga ?')) {
      try {
        await db.deleteManga(id);
        await loadMangas();
      } catch (error) {
        console.error('Erreur lors de la suppression du manga:', error);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <CollectionsBookmarkIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ma Collection de Mangas
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Paper sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" component="h1" color="primary">
              Bibliothèque
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setSelectedManga(null);
                setOpenDialog(true);
              }}
            >
              Ajouter un manga
            </Button>
          </Box>

          <MangaTable
            mangas={mangas}
            onEdit={handleEditManga}
            onDelete={handleDeleteManga}
            loading={loading}
          />
        </Paper>

        <MangaDialog
          open={openDialog}
          manga={selectedManga || undefined}
          onClose={() => {
            setOpenDialog(false);
            setSelectedManga(null);
          }}
          onSave={handleSaveManga}
        />
      </Container>

      <Paper component="footer" square elevation={0} sx={{ py: 2, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Collection Manager
          </Typography>
        </Container>
      </Paper>
    </Box>
  );
}

export default App;