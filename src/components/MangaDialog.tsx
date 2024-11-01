import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem
} from '@mui/material';

interface MangaDialogProps {
  open: boolean;
  manga?: {
    id?: number;
    titre: string;
    tomes_total: number;
    tomes_possedes: string;
    tomes_lus: string;
    statut: string;
  };
  onClose: () => void;
  onSave: (manga: Omit<MangaDialogProps['manga'], 'id'>) => void;
}

const STATUTS = ['En cours', 'Terminé', 'En attente', 'Abandonné'];

export default function MangaDialog({ open, manga, onClose, onSave }: MangaDialogProps) {
  const [formData, setFormData] = useState({
    titre: '',
    tomes_total: 0,
    tomes_possedes: '',
    tomes_lus: '',
    statut: 'En cours'
  });

  useEffect(() => {
    if (manga) {
      setFormData({
        titre: manga.titre,
        tomes_total: manga.tomes_total,
        tomes_possedes: manga.tomes_possedes,
        tomes_lus: manga.tomes_lus,
        statut: manga.statut
      });
    } else {
      setFormData({
        titre: '',
        tomes_total: 0,
        tomes_possedes: '',
        tomes_lus: '',
        statut: 'En cours'
      });
    }
  }, [manga]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {manga ? 'Modifier le manga' : 'Ajouter un nouveau manga'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Titre"
              fullWidth
              required
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
            />
            <TextField
              label="Nombre total de tomes"
              type="number"
              fullWidth
              required
              value={formData.tomes_total}
              onChange={(e) => setFormData({ ...formData, tomes_total: parseInt(e.target.value) || 0 })}
            />
            <TextField
              label="Tomes possédés (ex: 1-3,5,7-9)"
              fullWidth
              value={formData.tomes_possedes}
              onChange={(e) => setFormData({ ...formData, tomes_possedes: e.target.value })}
              helperText="Utilisez des virgules et des tirets pour les séries (ex: 1-3,5,7-9)"
            />
            <TextField
              label="Tomes lus (ex: 1-3,5,7-9)"
              fullWidth
              value={formData.tomes_lus}
              onChange={(e) => setFormData({ ...formData, tomes_lus: e.target.value })}
              helperText="Utilisez des virgules et des tirets pour les séries (ex: 1-3,5,7-9)"
            />
            <TextField
              select
              label="Statut"
              fullWidth
              value={formData.statut}
              onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
            >
              {STATUTS.map((statut) => (
                <MenuItem key={statut} value={statut}>
                  {statut}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Annuler</Button>
          <Button type="submit" variant="contained" color="primary">
            {manga ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}