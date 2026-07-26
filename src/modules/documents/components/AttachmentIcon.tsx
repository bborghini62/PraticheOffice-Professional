import { Box } from '@mui/material';
import type { ReactElement } from 'react';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded';
import ArchitectureRoundedIcon from '@mui/icons-material/ArchitectureRounded';
import type { DocumentAttachmentPreviewType } from '../documents.types';

interface AttachmentIconProps {
  previewType: DocumentAttachmentPreviewType;
}

export const AttachmentIcon = ({ previewType }: AttachmentIconProps) => {
  const iconMap: Record<DocumentAttachmentPreviewType, ReactElement> = {
    pdf: <PictureAsPdfRoundedIcon color="error" />, 
    image: <ImageRoundedIcon color="primary" />, 
    text: <DescriptionRoundedIcon color="info" />, 
    office: <TableChartRoundedIcon color="secondary" />, 
    cad: <ArchitectureRoundedIcon color="warning" />, 
    unsupported: <DataObjectRoundedIcon color="action" />, 
  };

  return <Box sx={{ display: 'flex', alignItems: 'center' }}>{iconMap[previewType]}</Box>;
};
