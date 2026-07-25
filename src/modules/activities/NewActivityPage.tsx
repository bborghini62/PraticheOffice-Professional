import { Box, Paper } from '@mui/material';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useNotification } from '../../core/runtime/useNotification';
import { appRoutes } from '../../core/router/routes';
import { PageContainer, PageTitle } from '../../design/components';
import { ActivityForm, type ActivityFormErrors, type ActivityFormValues } from './components/ActivityForm';
import { addActivity, getActivities } from './services/activitiesService';
import { getNextActivityCode } from './services/activityCodeService';
import type { ActivityPriority, ActivityRecord, ActivityStatus } from './activities.types';

const initialValues = (practiceId?: string): ActivityFormValues => {
  const existingActivities = getActivities();
  return {
    code: getNextActivityCode(existingActivities.map((activity) => activity.code)),
    title: '',
    description: '',
    practiceId: practiceId ?? '',
    assignee: '',
    group: '',
    status: 'todo',
    priority: 'normal',
    startDate: '',
    dueDate: '',
    notes: '',
  };
};

const NewActivityPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { practiceId } = useParams<{ practiceId: string }>();
  const { showNotification } = useNotification();
  const [values, setValues] = useState<ActivityFormValues>(initialValues(practiceId));
  const [errors, setErrors] = useState<ActivityFormErrors>({});

  const practiceContext = useMemo(() => {
    const match = location.pathname.match(/\/pratiche\/(.+?)\/attivita\/nuova/);
    return match?.[1] ?? practiceId;
  }, [location.pathname, practiceId]);

  const validate = (): ActivityFormErrors => {
    const nextErrors: ActivityFormErrors = {};

    if (!values.title.trim()) {
      nextErrors.title = 'Il titolo è obbligatorio.';
    }

    if (!values.practiceId.trim()) {
      nextErrors.practiceId = 'La pratica è obbligatoria.';
    }

    if (!values.assignee.trim()) {
      nextErrors.assignee = 'L’assegnatario è obbligatorio.';
    }

    if (values.dueDate && values.startDate && values.dueDate < values.startDate) {
      nextErrors.dueDate = 'La data scadenza non può essere precedente alla data inizio.';
    }

    return nextErrors;
  };

  const handleChange = (field: keyof ActivityFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = () => {
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const newActivity: ActivityRecord = {
      id: values.code,
      code: values.code,
      title: values.title.trim(),
      description: values.description.trim(),
      practiceId: values.practiceId.trim(),
      assignee: values.assignee.trim(),
      group: values.group.trim(),
      status: values.status as ActivityStatus,
      priority: values.priority as ActivityPriority,
      startDate: values.startDate,
      dueDate: values.dueDate,
      notes: values.notes.trim(),
      updatedAt: values.startDate || new Date().toISOString().slice(0, 10),
    };

    addActivity(newActivity);
    showNotification({ message: 'Attività creata correttamente', severity: 'success' });

    if (practiceContext) {
      navigate(appRoutes.practiceDetail.path.replace(':practiceId', practiceContext));
      return;
    }

    navigate('/attivita');
  };

  const handleCancel = () => {
    if (practiceContext) {
      navigate(appRoutes.practiceDetail.path.replace(':practiceId', practiceContext));
      return;
    }

    navigate('/attivita');
  };

  return (
    <PageContainer>
      <Box>
        <PageTitle subtitle="Compila i dati per aggiungere una nuova attività operativa.">Nuova attività</PageTitle>
      </Box>
      <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
        <ActivityForm values={values} errors={errors} onChange={handleChange} onSubmit={handleSubmit} onCancel={handleCancel} />
      </Paper>
    </PageContainer>
  );
};

export default NewActivityPage;
