import { useEffect, useState } from 'react';
import { Box, Container, Typography, Table, TableHead, TableBody,
         TableRow, TableCell, TableContainer, Paper, Chip, CircularProgress } from '@mui/material';
import { getPayments } from '../api/csrApi';

const FALLBACK = [
  { id: 1, title: '초록우산 어린이재단', amount: 50000000, category: '아동교육', date: '2025-04-15' },
  { id: 2, title: '굿네이버스',          amount: 30000000, category: '식품지원', date: '2025-04-01' },
  { id: 3, title: '대한적십자사',        amount: 20000000, category: '의료지원', date: '2025-03-20' },
];

const CATEGORY_COLORS = {
  아동교육: 'success', 식품지원: 'warning', 의료지원: 'error',
  환경보호: 'primary', 노인복지: 'secondary',
};

const fmtMoney = (v) => `₩${Number(v).toLocaleString()}`;
const fmtDate  = (d) => String(d).slice(0, 10);

export default function DonationTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPayments()
      .then(({ data }) => setRows(data.length ? data : FALLBACK))
      .catch(() => setRows(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box id="donations" sx={{ py: 10, bgcolor: '#f9fbe7' }}>
      <Container maxWidth="lg">
        <Typography variant="overline" color="primary" letterSpacing={3}>
          TRANSPARENCY
        </Typography>
        <Typography variant="h4" fontWeight={700} mb={1}>
          기부 집행 내역
        </Typography>
        <Box className="section-divider" />
        <Typography variant="body1" color="text.secondary" mb={4}>
          모든 기부금은 투명하게 집행되며 실시간으로 공개됩니다.
        </Typography>

        {loading ? (
          <Box textAlign="center" py={6}><CircularProgress color="primary" /></Box>
        ) : (
          <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#4CAF50' }}>
                  {['날짜', '지원 단체', '분야', '금액'].map((h) => (
                    <TableCell key={h} sx={{ color: '#fff', fontWeight: 700 }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((r, idx) => (
                  <TableRow key={r.id}
                    sx={{ bgcolor: idx % 2 === 0 ? '#fff' : '#f1f8e9',
                          '&:hover': { bgcolor: '#e8f5e9' } }}>
                    <TableCell>{fmtDate(r.date)}</TableCell>
                    <TableCell fontWeight={500}>{r.title}</TableCell>
                    <TableCell>
                      <Chip label={r.category} size="small"
                        color={CATEGORY_COLORS[r.category] || 'default'} />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#2E7D32' }}>
                      {fmtMoney(r.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
}
