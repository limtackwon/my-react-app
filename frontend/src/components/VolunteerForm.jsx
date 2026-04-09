import { useState } from 'react';
import { Box, Container, Typography, Grid, TextField,
         MenuItem, Button, Alert, Snackbar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { submitVolunteer } from '../api/csrApi';

const ACTIVITIES = [
  '농촌 일손 돕기 봉사',
  '아동 교육 멘토링',
  '환경 정화 캠페인',
  '노인 복지관 방문',
  '헌혈 캠페인',
];

const INIT = { name: '', phone: '', activity: '', message: '' };

export default function VolunteerForm() {
  const [form, setForm]       = useState(INIT);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [snack, setSnack]     = useState({ open: false, msg: '', severity: 'success' });

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())     e.name     = '이름을 입력해 주세요';
    if (!form.phone.trim())    e.phone    = '연락처를 입력해 주세요';
    if (!form.activity)        e.activity = '활동을 선택해 주세요';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await submitVolunteer(form);
      setSnack({ open: true, msg: '봉사 신청이 완료되었습니다! 🎉', severity: 'success' });
      setForm(INIT);
    } catch {
      setSnack({ open: true, msg: '신청 중 오류가 발생했습니다. 다시 시도해 주세요.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box id="volunteer" className="volunteer-section" sx={{ py: 10 }}>
      <Container maxWidth="md">
        <Typography variant="overline" sx={{ color: '#a5d6a7', letterSpacing: 3 }}>
          JOIN US
        </Typography>
        <Typography variant="h4" fontWeight={700} sx={{ color: '#fff', mb: 1 }}>
          봉사 활동 신청
        </Typography>
        <Box className="section-divider" sx={{ bgcolor: '#81C784' }} />
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4 }}>
          함께 변화를 만들어 나갈 분들의 지원을 기다립니다.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="이름 *" value={form.name}
                onChange={set('name')} error={!!errors.name} helperText={errors.name}
                InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                sx={inputSx} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="연락처 *" value={form.phone}
                onChange={set('phone')} error={!!errors.phone} helperText={errors.phone}
                placeholder="010-0000-0000"
                InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                sx={inputSx} />
            </Grid>
            <Grid item xs={12}>
              <TextField select fullWidth label="참여 활동 *" value={form.activity}
                onChange={set('activity')} error={!!errors.activity} helperText={errors.activity}
                InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                sx={inputSx}>
                {ACTIVITIES.map((a) => (
                  <MenuItem key={a} value={a}>{a}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={3} label="신청 메시지 (선택)"
                value={form.message} onChange={set('message')}
                InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                sx={inputSx} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" size="large"
                disabled={loading} endIcon={<SendIcon />}
                sx={{ px: 5, py: 1.5, fontSize: 16 }}>
                {loading ? '처리 중...' : '신청하기'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Snackbar open={snack.open} autoHideDuration={4000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snack.severity} variant="filled" sx={{ width: '100%' }}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

const inputSx = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.8)' },
    '&.Mui-focused fieldset': { borderColor: '#81C784' },
  },
  '& .MuiFormHelperText-root': { color: '#ef9a9a' },
};
