import { Box, Container, Typography, Grid, Link, Divider } from '@mui/material';
import ForestIcon from '@mui/icons-material/Forest';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#1a1a1a', color: '#aaa', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" gap={1} mb={1.5}>
              <ForestIcon sx={{ color: '#4CAF50', fontSize: 26 }} />
              <Typography variant="h6" fontWeight={700} color="#fff">
                GreenHope
              </Typography>
            </Box>
            <Typography variant="body2" lineHeight={1.8}>
              더 나은 세상을 위한 투명한 기업의 사회적 책임 활동.
              <br />우리의 모든 활동은 공개됩니다.
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" color="#fff" fontWeight={700} mb={1.5}>
              활동
            </Typography>
            {['봉사 활동', '교육 지원', '환경 보호', '노인 복지'].map((t) => (
              <Typography key={t} variant="body2" mb={0.8} sx={{ cursor: 'pointer',
                '&:hover': { color: '#4CAF50' } }}>{t}</Typography>
            ))}
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" color="#fff" fontWeight={700} mb={1.5}>
              정보
            </Typography>
            {['회사 소개', '투명성 보고', '파트너십', '뉴스'].map((t) => (
              <Typography key={t} variant="body2" mb={0.8} sx={{ cursor: 'pointer',
                '&:hover': { color: '#4CAF50' } }}>{t}</Typography>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="#fff" fontWeight={700} mb={1.5}>
              문의
            </Typography>
            <Typography variant="body2" mb={0.5}>📧 contact@greenhope.com</Typography>
            <Typography variant="body2" mb={0.5}>📞 02-1234-5678</Typography>
            <Typography variant="body2">📍 서울특별시 강남구 테헤란로 123</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: '#333', my: 4 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
          <Typography variant="body2">
            © 2026 GreenHope. All rights reserved.
          </Typography>
          <Box display="flex" gap={2}>
            {['개인정보처리방침', '이용약관', '문의하기'].map((t) => (
              <Link key={t} underline="hover" sx={{ color: '#aaa', cursor: 'pointer', fontSize: 13,
                '&:hover': { color: '#4CAF50' } }}>{t}</Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
