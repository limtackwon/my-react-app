import { useEffect, useState } from 'react';
import { Box, Container, Typography, Card, CardMedia,
         CardContent, Chip, CircularProgress } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import GroupIcon from '@mui/icons-material/Group';
import { getActivities } from '../api/csrApi';

const FALLBACK = [
  { id: 1, title: '농촌 일손 돕기 봉사', description: '도농 상생을 위한 농촌 봉사 활동',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400',
    metadata: '{"location":"경기 양평","participants":48,"tags":["농촌","봉사"]}' },
  { id: 2, title: '아동 교육 멘토링', description: '소외 계층 아동 대상 1:1 학습 멘토링',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
    metadata: '{"location":"서울 노원구","participants":32,"tags":["교육","아동"]}' },
  { id: 3, title: '환경 정화 캠페인', description: '한강 둔치 쓰레기 수거 및 환경 보호',
    imageUrl: 'https://images.unsplash.com/photo-1617952986600-802f965dcdbc?w=400',
    metadata: '{"location":"서울 한강공원","participants":65,"tags":["환경","캠페인"]}' },
];

function parseMeta(raw) {
  try { return JSON.parse(raw || '{}'); } catch { return {}; }
}

export default function ActivityCards() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActivities(5)
      .then(({ data }) => setActivities(data.length ? data : FALLBACK))
      .catch(() => setActivities(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box id="activities" sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="overline" color="primary" letterSpacing={3}>
          ACTIVITIES
        </Typography>
        <Typography variant="h4" fontWeight={700} mb={1}>
          최근 활동
        </Typography>
        <Box className="section-divider" />

        {loading ? (
          <Box textAlign="center" py={6}><CircularProgress color="primary" /></Box>
        ) : (
          <Box className="activity-scroll" mt={3}>
            {activities.map((act) => {
              const meta = parseMeta(act.metadata);
              return (
                <Card key={act.id} className="activity-card" elevation={2}>
                  <CardMedia component="img" height={180} image={act.imageUrl}
                    alt={act.title} sx={{ objectFit: 'cover' }} />
                  <CardContent>
                    <Box display="flex" gap={0.5} flexWrap="wrap" mb={1}>
                      {(meta.tags || []).map((tag) => (
                        <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" />
                      ))}
                    </Box>
                    <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                      {act.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1.5}
                      sx={{ display: '-webkit-box', WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {act.description}
                    </Typography>
                    <Box display="flex" gap={2} color="text.secondary">
                      {meta.location && (
                        <Box display="flex" alignItems="center" gap={0.3}>
                          <PlaceIcon fontSize="small" />
                          <Typography variant="caption">{meta.location}</Typography>
                        </Box>
                      )}
                      {meta.participants && (
                        <Box display="flex" alignItems="center" gap={0.3}>
                          <GroupIcon fontSize="small" />
                          <Typography variant="caption">{meta.participants}명</Typography>
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )}
      </Container>
    </Box>
  );
}
