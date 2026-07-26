import { Box, Chip, IconButton, InputAdornment, MenuItem, Stack, TextField, Typography } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded';
import { useMemo, useState } from 'react';
import { PageContainer, PageTitle, SectionCard, PrimaryButton } from '../../design/components';
import { EmptyGroupsState } from './components/EmptyGroupsState';
import { GroupFormDialog } from './components/GroupFormDialog';
import { archiveGroup, createGroup, filterGroups, getGroups, reactivateGroup, updateGroup } from './services/groupsService';
import type { GroupRecord, GroupsFilters } from './groups.types';

export const GroupsPage = () => {
  const [groups, setGroups] = useState<GroupRecord[]>(() => getGroups());
  const [filters, setFilters] = useState<GroupsFilters>({ search: '', status: 'all' });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<GroupRecord | undefined>(undefined);

  const filteredGroups = useMemo(() => filterGroups(groups, filters.search, filters.status), [filters.search, filters.status, groups]);

  const handleEditGroup = (group: GroupRecord) => {
    setSelectedGroup(group);
    setOpenDialog(true);
  };

  const handleSubmit = (payload: Omit<GroupRecord, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedGroup) {
      updateGroup(selectedGroup.id, payload);
    } else {
      createGroup(payload);
    }

    setGroups(getGroups());
    setOpenDialog(false);
    setSelectedGroup(undefined);
  };

  const handleArchiveToggle = (group: GroupRecord) => {
    if (group.status === 'active') {
      archiveGroup(group.id);
    } else {
      reactivateGroup(group.id);
    }

    setGroups(getGroups());
  };

  return (
    <PageContainer>
      <Box>
        <PageTitle subtitle="Gestisci il catalogo condiviso dei gruppi operativi e delle classificazioni.">Gruppi e classificazioni</PageTitle>
      </Box>
      <SectionCard>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Catalogo gruppi
          </Typography>
          <PrimaryButton onClick={() => {
            setSelectedGroup(undefined);
            setOpenDialog(true);
          }}>
            Nuovo gruppo
          </PrimaryButton>
        </Box>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
          <TextField
            value={filters.search}
            onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
            placeholder="Cerca gruppo"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            select
            label="Stato"
            value={filters.status}
            onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value as GroupsFilters['status'] }))}
            sx={{ minWidth: 220 }}
          >
            <MenuItem value="all">Tutti</MenuItem>
            <MenuItem value="active">Attivi</MenuItem>
            <MenuItem value="archived">Archiviati</MenuItem>
          </TextField>
        </Stack>
        {filteredGroups.length === 0 ? (
          <EmptyGroupsState onCreate={() => {
            setSelectedGroup(undefined);
            setOpenDialog(true);
          }} />
        ) : (
          <Box sx={{ display: 'grid', gap: 1.25 }}>
            {filteredGroups.map((group) => (
              <Box key={group.id} sx={{ p: 1.5, borderRadius: 2, border: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Typography variant="subtitle2">{group.name}</Typography>
                    <Chip label={group.status === 'active' ? 'Attivo' : 'Archiviato'} color={group.status === 'active' ? 'success' : 'default'} size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                    {group.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                    Responsabile: {group.responsible}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton size="small" onClick={() => handleEditGroup(group)}>
                    <EditRoundedIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleArchiveToggle(group)}>
                    {group.status === 'active' ? <ArchiveRoundedIcon /> : <RestoreRoundedIcon />}
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </SectionCard>

      <GroupFormDialog
        open={openDialog}
        group={selectedGroup}
        onClose={() => {
          setOpenDialog(false);
          setSelectedGroup(undefined);
        }}
        onSubmit={handleSubmit}
      />
    </PageContainer>
  );
};

export default GroupsPage;
