import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Icon } from '@iconify/react';
// material
import { Box, Grid, Card, Button, Typography, Stack,Link } from '@mui/material';
import EcommerceInvoice from './EcommerceInvoice';
/* import AccountBillingAddressBook from './AccountBillingAddressBook';
import AccountBillingPaymentMethod from './AccountBillingPaymentMethod';
import AccountBillingInvoiceHistory from './AccountBillingInvoiceHistory'; */





export default function AccountBilling() {
  const invoices = {
    id: '1234',
    taxes: 5,
    discount: 10,
    status: 'paid',
  
    
  };
  const [open, setOpen] = useState(false);
  

  const NewCardSchema = Yup.object().shape({
    cardName: Yup.string().required('Name is required'),
    cardNumber: Yup.string().required('Card number is required'),
    cardExpired: Yup.string().required('Card expired is required'),
    cardCvv: Yup.string().required('Cvv is required')
  });

  const formik = useFormik({
    initialValues: {
      cardName: '',
      cardNumber: '',
      cardExpired: '',
      cardCvv: ''
    },
    validationSchema: NewCardSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
     
      handleCancel();
      resetForm();
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
      
    }
  });

  const handleOpenAddCard = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCancel = () => {
    setOpen(false);
    formik.resetForm();
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
            <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
              Your Plan
            </Typography>
            <Typography variant="h4">Premium</Typography>
            <Box
              sx={{
                mt: { xs: 2, sm: 0 },
                position: { sm: 'absolute' },
                top: { sm: 24 },
                right: { sm: 24 }
              }}
            >
              <Button size="small" color="inherit" variant="outlined" sx={{ mr: 1 }}>
                Cancel plan
              </Button>
              <Button size="small" variant="outlined">
                Upgrade plan
              </Button>
            </Box>
          </Card>

          <EcommerceInvoice/>
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
      <Stack spacing={3} alignItems="flex-end">
      <Typography variant="subtitle1" sx={{ width: 1 }}>
        Invoice History
      </Typography>

      <Stack spacing={2} sx={{ width: 1 }}>
       
          <Stack key={invoices.id} direction="row" justifyContent="space-between" sx={{ width: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 160 }}>
              {(invoices.discount)}
            </Typography>
            <Typography variant="body2">120</Typography>
            <Link  to="#">
              PDF
            </Link>
          </Stack>
        
      </Stack>

      <Button size="small" endIcon={<Icon icon="eva:arrow-ios-forward-fill" />}>
        All invoices
      </Button>
    </Stack>
      </Grid>
    </Grid>
  );
}
