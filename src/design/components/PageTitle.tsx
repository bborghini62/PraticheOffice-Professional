import { Typography, type TypographyProps } from '@mui/material';

interface PageTitleProps extends TypographyProps {
  subtitle?: string;
}

export const PageTitle = ({ sx, subtitle, children, ...props }: PageTitleProps) => (
  <>
    <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em', ...sx }} {...props}>
      {children}
    </Typography>
    {subtitle ? (
      <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.5 }}>
        {subtitle}
      </Typography>
    ) : null}
  </>
);
