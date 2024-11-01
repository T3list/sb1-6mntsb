import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Manga {
  id: number;
  titre: string;
  tomes_total: number;
  tomes_possedes: string;
  tomes_lus: string;
  statut: string;
}

interface Props {
  mangas: Manga[];
  onEdit: (manga: Manga) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'En cours':
      return 'primary';
    case 'Terminé':
      return 'success';
    case 'En attente':
      return 'warning';
    case 'Abandonné':
      return 'error';
    default:
      return 'default';
  }
};

export default function MangaTable({ mangas, onEdit, onDelete, loading }: Props) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (mangas.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary">
          Aucun manga dans votre collection. Commencez par en ajouter un !
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Titre</TableCell>
            <TableCell align="center">Tomes Total</TableCell>
            <TableCell align="center">Tomes Possédés</TableCell>
            <TableCell align="center">Tomes Lus</TableCell>
            <TableCell align="center">Statut</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mangas.map((manga) => (
            <TableRow key={manga.id} hover>
              <TableCell>
                <Typography variant="subtitle2">{manga.titre}</Typography>
              </TableCell>
              <TableCell align="center">{manga.tomes_total}</TableCell>
              <TableCell align="center">{manga.tomes_possedes}</TableCell>
              <TableCell align="center">{manga.tomes_lus}</TableCell>
              <TableCell align="center">
                <Chip
                  label={manga.statut}
                  size="small"
                  color={getStatusColor(manga.statut) as any}
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => onEdit(manga)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onDelete(manga.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}