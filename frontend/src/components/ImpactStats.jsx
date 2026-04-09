import { useEffect, useState } from 'react';
import { Box, Container, Grid, Card, CardContent, Typography } from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import GroupsIcon from '@mui/icons-material/Groups';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import { getStats } from '../api/csrApi';

const fmt = (n) => (n >= 100000000
  ? `₩${(n / 100000000).toFixed(1)}억`
  : `₩${n.toLocaleString()}`);

export default function ImpactStats() {
  const [stats, setStats] = useState({
    totalDonation: 0, totalActivities: 0, volunteers: 0, childrenSupported: 0,
  });

  useEffect(() => {
    getStats()
      .then(({ data }) => setStats(data))
      .catch(() => {/* 기본값 유지 */});
  }, []);

  const cards = [
    {
      icon: <VolunteerActivismIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
      label: '총 기부금',
      value: fmt(stats.totalDonation),
      sub: '누적 기부 집행액',
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
      label: '함께한 봉사자',
      value: `${stats.volunteers?.toLocaleString()}명`,
      sub: '연간 참여 인원',
    },
    {
      icon: <ChildCareIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
      label: '지원한 아동 수',
      value: `${stats.childrenSupported?.toLocaleString()}명`,
      sub: '교육·식품 지원 아동',
    },
  ];

  return (
    <Box sx={{ py: 10, bgcolor: '#f1f8e9' }}>
      <Container maxWidth="lg">
        <Typography variant="overline" color="primary" letterSpacing={3}>
          IMPACT
        </Typography>
        <Typography variant="h4" fontWeight={700} mb={1}>
          우리의 변화
        </Typography>
        <Box className="section-divider" />

        <Grid container spacing={4} mt={1}>
          {cards.map((c, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card className="stat-card" elevation={2}
                sx={{ p: 1, textAlign: 'center', height: '100%' }}>
                <CardContent>
                  <Box mb={1}>{c.icon}</Box>
                  <Typography variant="h4" fontWeight={700} color="primary">
                    {c.value}
                  </Typography>
                  <Typography variant="h6" fontWeight={600} mt={0.5}>
                    {c.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={0.5}>
                    {c.sub}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
