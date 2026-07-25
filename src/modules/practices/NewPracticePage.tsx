import { Box, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../core/runtime/useNotification';
import { appRoutes } from '../../core/router/routes';
import { PracticeForm, type PracticeFormErrors, type PracticeFormValues } from './components/PracticeForm';
import { getNextPracticeCode } from './services/practiceCodeService';
import { addPractice, getPractices } from './services/practicesService';
import type { PracticePriority, PracticeStatus, PracticeRecord } from './practices.types';

const initialValues = (): PracticeFormValues => {
  const existingPractices = getPractices();
  return {
    code: getNextPracticeCode(existingPractices.map((practice) => practice.code)),
    subject: '',
    customer: '',
    contact: '',
    practiceType: 'Amministrativa',
    responsible: '',
    group: '',
    priority: 'normal',
    status: 'draft',
    openingDate: '',
    dueDate: '',
    description: '',
  };
};

const NewPracticePage = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [values, setValues] = useState<PracticeFormValues>(initialValues);
  const [errors, setErrors] = useState<PracticeFormErrors>({});

  const validate = (): PracticeFormErrors => {
    const nextErrors: PracticeFormErrors = {};

    if (!values.subject.trim()) {
      nextErrors.subject = 'L’oggetto è obbligatorio.';
    }

    if (!values.customer.trim()) {
      nextErrors.customer = 'Il cliente è obbligatorio.';
    }

    if (!values.practiceType.trim()) {
      nextErrors.practiceType = 'Il tipo pratica è obbligatorio.';
    }

    if (!values.responsible.trim()) {
      nextErrors.responsible = 'Il responsabile è obbligatorio.';
    }

    if (!values.openingDate) {
      nextErrors.openingDate = 'La data apertura è obbligatoria.';
    }

    if (values.dueDate && values.openingDate && values.dueDate < values.openingDate) {
      nextErrors.dueDate = 'La scadenza non può essere precedente alla data apertura.';
    }

    return nextErrors;
  };

  const handleChange = (field: keyof PracticeFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = () => {
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const newPractice: PracticeRecord = {
      id: values.code,
      code: values.code,
      subject: values.subject.trim(),
      status: values.status as PracticeStatus,
      priority: values.priority as PracticePriority,
      clientId: values.customer.trim(),
      responsible: values.responsible.trim(),
      group: values.group.trim(),
      dueDate: values.dueDate,
      updatedAt: values.openingDate,
    };

    addPractice(newPractice);

    showNotification({ message: 'Pratica creata correttamente', severity: 'success' });
    navigate(appRoutes.practices.path);
  };

  const handleCancel = () => {
    navigate(appRoutes.practices.path);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2, mb: 3.5 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Nuova pratica
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            Compila i dati per creare una nuova pratica operativa.
          </Typography>
        </Box>
      </Box>

      <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
        <PracticeForm values={values} errors={errors} onChange={handleChange} onSubmit={handleSubmit} onCancel={handleCancel} />
      </Paper>
    </Box>
  );
};

export default NewPracticePage;
