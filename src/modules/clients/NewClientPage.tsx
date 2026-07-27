import { Box, Paper, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../core/runtime/useNotification';
import { appRoutes } from '../../core/router/routes';
import { PageContainer, PageTitle } from '../../design/components';
import { ClientForm, type ClientFormErrors, type ClientFormValues } from './components/ClientForm';
import { addClient, getClientById, getClients, updateClient } from './services/clientsService';
import { getNextClientCode } from './services/clientCodeService';
import type { ClientRecord, ClientStatus, ClientType } from './clients.types';
import { useParams } from 'react-router-dom';

const buildInitialValues = (client?: ClientRecord): ClientFormValues => {
  if (client) {
    return {
      code: client.code,
      clientType: client.clientType,
      companyName: client.companyName,
      firstName: client.firstName,
      lastName: client.lastName,
      vatNumber: client.vatNumber,
      fiscalCode: client.fiscalCode,
      contactPerson: client.contactPerson,
      email: client.email,
      pec: client.pec,
      phone: client.phone,
      mobile: client.mobile,
      address: client.address,
      postalCode: client.postalCode,
      city: client.city,
      province: client.province,
      country: client.country,
      notes: client.notes,
      status: client.status,
    };
  }

  const existingClients = getClients();
  return {
    code: getNextClientCode(existingClients.map((client) => client.code)),
    clientType: '',
    companyName: '',
    firstName: '',
    lastName: '',
    vatNumber: '',
    fiscalCode: '',
    contactPerson: '',
    email: '',
    pec: '',
    phone: '',
    mobile: '',
    address: '',
    postalCode: '',
    city: '',
    province: '',
    country: 'Italia',
    notes: '',
    status: 'active',
  };
};

const NewClientPage = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const existingClient = useMemo(() => (clientId ? getClientById(clientId) : undefined), [clientId]);
  const isEditMode = Boolean(existingClient);
  const [values, setValues] = useState<ClientFormValues>(() => buildInitialValues(existingClient));
  const [errors, setErrors] = useState<ClientFormErrors>({});

  const validate = (): ClientFormErrors => {
    const nextErrors: ClientFormErrors = {};

    if (!values.clientType) {
      nextErrors.clientType = 'Il tipo cliente è obbligatorio.';
    }

    const hasCompanyName = values.companyName.trim().length > 0;
    const hasPersonalName = values.firstName.trim().length > 0 || values.lastName.trim().length > 0;

    if (!hasCompanyName && !hasPersonalName) {
      nextErrors.companyName = 'Inserire la ragione sociale oppure nome e cognome.';
    }

    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = 'Inserire un indirizzo email valido.';
    }

    if (values.pec && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.pec)) {
      nextErrors.pec = 'Inserire un indirizzo PEC valido.';
    }

    if (!values.vatNumber && !values.fiscalCode) {
      nextErrors.fiscalCode = 'Inserire almeno Partita IVA o Codice fiscale.';
    }

    return nextErrors;
  };

  const handleChange = (field: keyof ClientFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const now = new Date().toISOString();
    const baseClient: ClientRecord = {
      id: isEditMode && existingClient ? existingClient.id : `client-${values.code}`,
      code: values.code,
      clientType: values.clientType as ClientType,
      companyName: values.companyName.trim(),
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      vatNumber: values.vatNumber.trim(),
      fiscalCode: values.fiscalCode.trim(),
      contactPerson: values.contactPerson.trim(),
      email: values.email.trim(),
      pec: values.pec.trim(),
      phone: values.phone.trim(),
      mobile: values.mobile.trim(),
      address: values.address.trim(),
      postalCode: values.postalCode.trim(),
      city: values.city.trim(),
      province: values.province.trim(),
      country: values.country.trim(),
      notes: values.notes.trim(),
      status: values.status as ClientStatus,
      createdAt: isEditMode && existingClient ? existingClient.createdAt : now,
      createdBy: isEditMode && existingClient ? existingClient.createdBy : 'local',
      updatedAt: now,
      updatedBy: 'local',
      version: isEditMode && existingClient ? existingClient.version : 1,
    };

    try {
      if (isEditMode) {
        await updateClient(baseClient);
        showNotification({ message: 'Cliente aggiornato correttamente', severity: 'success' });
        navigate(appRoutes.clientDetail.path.replace(':clientId', baseClient.id));
        return;
      }

      await addClient(baseClient);
      showNotification({ message: 'Cliente creato correttamente', severity: 'success' });
      navigate(appRoutes.clients.path);
    } catch (error) {
      showNotification({ message: error instanceof Error ? error.message : 'Impossibile salvare il cliente.', severity: 'error' });
    }
  };

  const handleCancel = () => {
    navigate(appRoutes.clients.path);
  };

  return (
    <PageContainer>
      <Box>
        <PageTitle>{isEditMode ? 'Modifica cliente' : 'Nuovo cliente'}</PageTitle>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
          {isEditMode ? 'Aggiorna i dati dell’anagrafica cliente.' : 'Compila i dati per creare una nuova anagrafica cliente.'}
        </Typography>
      </Box>
      <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
        <ClientForm values={values} errors={errors} onChange={handleChange} onSubmit={handleSubmit} onCancel={handleCancel} />
      </Paper>
    </PageContainer>
  );
};

export default NewClientPage;
