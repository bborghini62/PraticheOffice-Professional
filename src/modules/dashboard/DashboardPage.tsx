import { Box, Chip, Typography } from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { PageContainer, PageTitle, SectionCard } from '../../design/components';
import { dashboardMetrics, recentActivities } from '../../shared/services/dashboardService';
import { formatCurrency } from '../../shared/utils/formatters';

const DashboardPage = () => (
  <PageContainer>
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
      <Box>
        <PageTitle subtitle="Panoramica operativa del giorno e dei principali indicatori di lavoro.">Cruscotto</PageTitle>
      </Box>
      <Chip icon={<TrendingUpRoundedIcon />} label="Aggiornamenti live" color="primary" variant="outlined" />
    </Box>

    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {dashboardMetrics.map((metric) => (
        <Box key={metric.id} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', lg: '1 1 calc(25% - 12px)' } }}>
          <SectionCard sx={{ p: 2.5, height: '100%' }}>
            <Typography variant="body2" color="text.secondary">
              {metric.title}
            </Typography>
            <Typography variant="h4" sx={{ mt: 1 }}>
              {metric.value}
            </Typography>
            <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
              {metric.change}
            </Typography>
          </SectionCard>
        </Box>
      ))}
    </Box>

    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(58% - 8px)' } }}>
        <SectionCard>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            Attività giornaliere
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Il lavoro è in linea con il ritmo previsto, con minori ritardi e migliori passaggi tra i team.
          </Typography>
          <Box sx={{ mt: 3, p: 2.25, borderRadius: 3, bgcolor: 'primary.50' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Impatto economico
            </Typography>
            <Typography variant="h4" color="primary" sx={{ mt: 1 }}>
              {formatCurrency(158400)}
            </Typography>
          </Box>
        </SectionCard>
      </Box>
      <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(42% - 8px)' } }}>
        <SectionCard>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Attività recenti
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {recentActivities.map((activity) => (
              <Box key={activity.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 1.75 }}>
                <Typography variant="subtitle2">{activity.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {activity.detail}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {activity.time}
                  </Typography>
                  <Chip label={activity.status} size="small" variant="outlined" />
                </Box>
              </Box>
            ))}
          </Box>
        </SectionCard>
      </Box>
    </Box>
  </PageContainer>
);

export default DashboardPage;
