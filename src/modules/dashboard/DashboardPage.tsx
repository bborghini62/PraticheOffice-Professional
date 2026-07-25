// Dashboard module entry page.

import { Box, Chip, Paper, Typography } from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { dashboardMetrics, recentActivities } from '../../shared/services/dashboardService';
import { formatCurrency } from '../../shared/utils/formatters';

const DashboardPage = () => (
  <Box>
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2, mb: 3 }}>
      <Box>
        <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
          Operations overview
        </Typography>
        <Typography variant="h4">Executive control center</Typography>
        <Typography variant="body1" color="text.secondary">
          Track your workflows, service quality, and team progress from one place.
        </Typography>
      </Box>
      <Chip icon={<TrendingUpRoundedIcon />} label="Live insights" color="primary" variant="outlined" />
    </Box>

    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
      {dashboardMetrics.map((metric) => (
        <Box key={metric.id} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', lg: '1 1 calc(25% - 12px)' } }}>
          <Paper sx={{ p: 2.5, height: '100%' }}>
            <Typography variant="body2" color="text.secondary">
              {metric.title}
            </Typography>
            <Typography variant="h4" sx={{ mt: 1 }}>
              {metric.value}
            </Typography>
            <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
              {metric.change}
            </Typography>
          </Paper>
        </Box>
      ))}
    </Box>

    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(58% - 8px)' } }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Daily operations
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The office is maintaining a healthy pace with fewer delays and stronger handoffs.
          </Typography>
          <Box sx={{ mt: 3, p: 2, borderRadius: 3, bgcolor: 'primary.50' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Revenue impact
            </Typography>
            <Typography variant="h4" color="primary" sx={{ mt: 1 }}>
              {formatCurrency(158400)}
            </Typography>
          </Box>
        </Paper>
      </Box>
      <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(42% - 8px)' } }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Recent activity
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
        </Paper>
      </Box>
    </Box>
  </Box>
);

export default DashboardPage;
