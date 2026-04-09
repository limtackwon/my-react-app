import { Box, Container, Typography, Button, Stack } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function HeroSection() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <Box className="hero-section">
      <Box className="hero-overlay" />
      <Container maxWidth="md" className="hero-content">
        <Typography variant="overline" sx={{ color: '#81C784', letterSpacing: 4, mb: 2, display: 'block' }}>
          GREENHOPE CSR PLATFORM
        </Typography>

        <Typography variant="h2" fontWeight={700} sx={{ color: '#fff', mb: 2, lineHeight: 1.2 }}>
          함께 만드는<br />더 나은 세상
        </Typography>

        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4, fontWeight: 400, maxWidth: 520 }}>
          우리의 작은 나눔이 더 큰 변화를 만듭니다.<br />
          투명한 기부와 적극적인 봉사로 사회에 기여합니다.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button variant="contained" color="primary" size="large"
            onClick={() => scrollTo('volunteer')}
            sx={{ px: 4, py: 1.5, fontSize: 16 }}>
            참여하기
          </Button>
          <Button variant="outlined" size="large"
            onClick={() => scrollTo('activities')}
            sx={{ px: 4, py: 1.5, fontSize: 16, borderColor: '#fff', color: '#fff',
                  '&:hover': { borderColor: '#81C784', color: '#81C784' } }}>
            더 알아보기
          </Button>
        </Stack>
      </Container>

      {/* 스크롤 안내 아이콘 */}
      <Box sx={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
                 animation: 'bounce 1.5s infinite' }}>
        <KeyboardArrowDownIcon sx={{ color: 'rgba(255,255,255,0.6)', fontSize: 36 }} />
      </Box>

      <style>{`
        @keyframes bounce {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%      { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </Box>
  );
}
