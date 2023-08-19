import { Icon } from '@iconify/react';
import * as React from 'react';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
// material
import { Container, Tab, Box, Tabs, Stack, Typography, Button, Paper , Card } from '@mui/material';
import UserNewForm from '../components/forms/students/UserNewForm';
import  AccountBilling  from '../components/forms/students/AccountBilling';

// redux
/* import {
  AccountGeneral,
  AccountBilling,
  
  AccountNotifications,
  
} from '../components/_dashboard/user/account'; */

// ----------------------------------------------------------------------



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function UserAccount() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
   
    <>
      <Helmet>
        <title> Account </title>
      </Helmet>


      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Mi informacion
          </Typography>
        
        </Stack>
        <Box sx={{ width: '100%' }}>
      <Box >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
        <Tab icon={<Icon icon="ic:round-account-box" width={20} height={20}/> } iconPosition="start" label="General" {...a11yProps(0)} />
        <Tab  icon={<Icon icon="ic:round-receipt"  width={20} height={20}/> } iconPosition="start" label="Billing" {...a11yProps(1)} />
        <Tab  icon={<Icon icon="ic:round-receipt"  width={20} height={20}/> } iconPosition="start" label="Ninos" {...a11yProps(1)} />
       
        </Tabs>
       
      </Box>
      <TabPanel value={value} index={0}>
        <UserNewForm/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AccountBilling/>
        
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Card sx={{ p: 3 }}>
            <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
             Mis ninos
            </Typography>
           
            <Box
              sx={{
                mt: { xs: 2, sm: 0 },
                position: { sm: 'absolute' },
                top: { sm: 24 },
                right: { sm: 24 }
              }}
            >
             
              <Button size="small" startIcon={<Icon icon="eva:plus-fill" />}>
          Add new address
        </Button>
            </Box>
            <Paper
           
           sx={{
             p: 3,
             width: 1,
             bgcolor: 'background.neutral'
           }}
         >
           <Typography variant="subtitle1" gutterBottom>
           Jayvion Simon
           </Typography>

           <Typography variant="body2" gutterBottom>
             <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
               Address: &nbsp;
             </Typography>
            41256 Kamille Turnpike, East Sambury, New Hampshire, Kenya 85807
           </Typography>

           <Typography variant="body2" gutterBottom>
             <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
               Phone: &nbsp;
             </Typography>
             365-374-4961
           </Typography>

           <Box sx={{ mt: 1 }}>
             <Button
               color="error"
               size="small"
               startIcon={<Icon icon="eva:trash-2-fill" />}
               onClick={() => {}}
               sx={{ mr: 1 }}
             >
               Delete
             </Button>
             <Button size="small" startIcon={<Icon icon="mingcute:edit-2-fill" />} onClick={() => {}}>
               Edit
             </Button>
           </Box>
         </Paper>
       
          </Card>
   
        
      </TabPanel>
     
     
    </Box>
        </Container>
        </>
  );
}
