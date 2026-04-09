import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import ForestIcon from '@mui/icons-material/Forest';

export default function Navbar() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <AppBar position="fixed" elevation={0}
      sx={{ bgcolor: 'rgba(27,94,32,0.95)', backdropFilter: 'blur(8px)' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ px: 0 }}>
          {/* 로고 */}
          <ForestIcon sx={{ mr: 1, color: '#81C784', fontSize: 28 }} />
          <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1, color: '#fff' }}>
            GreenHope
          </Typography>

          {/* 네비게이션 */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
            <Button sx={{ color: '#ccc' }} onClick={() => scrollTo('activities')}>
              활동 소개
            </Button>
            <Button sx={{ color: '#ccc' }} onClick={() => scrollTo('donations')}>
              투명성 보고
            </Button>
            <Button variant="contained" color="primary" size="small"
              sx={{ ml: 1 }} onClick={() => scrollTo('volunteer')}>
              참여하기
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
