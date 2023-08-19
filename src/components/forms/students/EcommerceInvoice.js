
import { random, sum } from 'lodash';
// material

import {
  Box,
  Grid,
  styled,
  Card,
  Table,
  Divider,
  TableRow,
  Container,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer
} from  '@mui/material';



// import { InvoiceToolbar } from '../../components/_dashboard/e-commerce/invoice';

// ----------------------------------------------------------------------

const INVOICE = {
  id: '1234',
  taxes: 5,
  discount: 10,
  status: 'paid',
  invoiceFrom: {
    name: 'Kathlyn Hauck',
    address: 'DieSachbearbeiter Choriner Straße 49 10435 Berlin',
    company: 'Durgan Group',
    email: 'Dion.collins23@gmail.com',
    phone: '227-940-9869'
  },
  invoiceTo: {
    name: 'Lesly Reichel',
    address: 'Keas 69 Str. 15234, Chalandri Athens, Greece',
    company: 'Stracke LLC',
    email: 'kurt_durgan46@hotmail.com',
    phone: '261-433-6689'
  },
  items: [...Array(3)].map((_, index) => ({
    id: '123',
    title: 'Basico',
    description: 'plan para dos personas',
    qty: random(5),
    price:120
  }))
};

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));

// ----------------------------------------------------------------------

export default function EcommerceInvoice() {


  const subTotal = sum(INVOICE.items.map((item) => item.price * item.qty));
  const total = subTotal - INVOICE.discount + INVOICE.taxes;

  return (
    <>
      
        <Card sx={{ pt: 5, px: 5 }}>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Box component="img" alt="logo" src="/static/brand/logo_full.svg" sx={{ height: 48 }} />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Box sx={{ textAlign: { sm: 'right' } }}>
                <Typography color="success" sx={{ textTransform: 'uppercase', mb: 1 }}>
                  {INVOICE.status}
                </Typography>
                <Typography variant="h6">INV-{INVOICE.id}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                Invoice from
              </Typography>
              <Typography variant="body2">{INVOICE.invoiceFrom.name}</Typography>
              <Typography variant="body2">{INVOICE.invoiceFrom.address}</Typography>
              <Typography variant="body2">Phone: {INVOICE.invoiceFrom.phone}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                Invoice to
              </Typography>
              <Typography variant="body2">{INVOICE.invoiceTo.name}</Typography>
              <Typography variant="body2">{INVOICE.invoiceTo.address}</Typography>
              <Typography variant="body2">Phone: {INVOICE.invoiceTo.phone}</Typography>
            </Grid>
          </Grid>

         
            <TableContainer >
              <Table>
                <TableHead
                  sx={{
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    '& th': { backgroundColor: 'transparent' }
                  }}
                >
                  <TableRow>
                    <TableCell width={40}>#</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left">Qty</TableCell>
                    <TableCell align="right">Unit price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {INVOICE.items.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="left">
                        <Box sx={{ maxWidth: 560 }}>
                          <Typography variant="subtitle2">{row.title}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                            {row.description}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="left">{row.qty}</TableCell>
                      <TableCell align="right">{(row.price)}</TableCell>
                      <TableCell align="right">{(row.price * row.qty)}</TableCell>
                    </TableRow>
                  ))}

                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Box sx={{ mt: 2 }} />
                      <Typography variant="body1">Subtotal</Typography>
                    </TableCell>
                    <TableCell align="right" width={120}>
                      <Box sx={{ mt: 2 }} />
                      <Typography variant="body1">{(subTotal)}</Typography>
                    </TableCell>
                  </RowResultStyle>
                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Typography variant="body1">Discount</Typography>
                    </TableCell>
                    <TableCell align="right" width={120}>
                      <Typography sx={{ color: 'error.main' }}>{(-INVOICE.discount)}</Typography>
                    </TableCell>
                  </RowResultStyle>
                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Typography variant="body1">Taxes</Typography>
                    </TableCell>
                    <TableCell align="right" width={120}>
                      <Typography variant="body1">{(INVOICE.taxes)}</Typography>
                    </TableCell>
                  </RowResultStyle>
                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Typography variant="h6">Total</Typography>
                    </TableCell>
                    <TableCell align="right" width={140}>
                      <Typography variant="h6">{(total)}</Typography>
                    </TableCell>
                  </RowResultStyle>
                </TableBody>
              </Table>
            </TableContainer>
          

          <Divider sx={{ mt: 5 }} />

          <Grid container>
            <Grid item xs={12} md={9} sx={{ py: 3 }}>
              <Typography variant="subtitle2">NOTES</Typography>
              <Typography variant="body2">
                We appreciate your business. Should you need us to add VAT or extra notes let us know!
              </Typography>
            </Grid>
            <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}>
              <Typography variant="subtitle2">Have a Question?</Typography>
              <Typography variant="body2">support@minimals.cc</Typography>
            </Grid>
          </Grid>
        </Card>
      
    </>
  );
}
