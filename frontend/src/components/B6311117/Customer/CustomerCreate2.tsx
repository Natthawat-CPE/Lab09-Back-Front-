import React, { useEffect, useState } from "react";

import { Box, Button, Container, FormControl, Grid, Paper, styled, Typography } from '@mui/material';
import CircularProgress, {
    circularProgressClasses,
    CircularProgressProps,
  } from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Margin } from "@mui/icons-material";
import Divider from '@mui/material/Divider';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import {GenderInterface,
  CareerInterface,
  PrefixInterface,
  CustomerInterface} from "../../../interfaces/CustomerUI"
import TextField from "@mui/material/TextField";
import Chip from '@mui/material/Chip';
import { Link as RouterLink, Route } from "react-router-dom";
import CreateForm from "./CreateForm";


import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


//Grid
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

//process ข้างบน
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));
function FacebookCircularProgress(props: CircularProgressProps) {
    return (
      <Box sx={{ position: 'relative' }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color: (theme) =>
              theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
          }}
          size={40}
          thickness={4}
          {...props}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          sx={{
            color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
            animationDuration: '550ms',
            position: 'absolute',
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: 'round',
            },
          }}
          size={40}
          thickness={4}
          {...props}
        />
      </Box>
    );
  }



function CustomerCreate2({ formCreate, setFormCreate, activeStep, setActiveStep, steps }: any) {

    // const [Name, setName] = useState('');
    // const [ID_card, setID_card] = useState('');
    // const [DOB, setDOB] = useState<Dayjs | null>(dayjs());
    // const [Phone, setPhone] = useState('');

    // const [GENDER_ID, setGENDER_ID] = useState('');
    // const [CAREER_ID, setCAREER_ID] = useState('');
    // const [PREFIX_ID, setPREFIX_ID] = useState('');

    // const [Email, setEmail] = useState(''); 
    // const [Password, setPassword] = useState(''); 
    // const [RePassword, setRePassword] = useState(''); 

    //Alert
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
      props,
      ref,
      ) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

      const [success, setSuccess] = React.useState(false);
      const [error, setError] = React.useState(false);

      const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setSuccess(false);
        setError(false);
      };

    const handleBack = () => {
      setActiveStep(activeStep - 1);
    };

    const [Customer, setCustomer] = React.useState<Partial<CustomerInterface>>({});
    const [genderID, setGenderID] = useState<number>(0);

      //สร้างฟังก์ชันสำหรับ คอยรับการกระทำ เมื่อคลิ๊ก หรือ เลือก
      const {Email, Password, RePassword} = formCreate


      const convertType = (data: string | number | undefined | Float32Array) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
      };

    const [message, setAlertMessage] = React.useState("");

    function submit() {
      let data = {
        Name: formCreate.Name,          
        ID_card: formCreate.ID_card,      
        DOB: formCreate.DOB,
        Phone: formCreate.Phone,

        GENDER_ID: convertType(formCreate.GENDER_ID as number),
        // genderID: formCreate.GENDER_ID,
        CAREER_ID: convertType(formCreate.CAREER_ID as number),
        PREFIX_ID: convertType(formCreate.PREFIX_ID as number),

        Email: formCreate.Email,
        Password: formCreate.Password,
      };

      console.log(data);
        const apiUrl = "http://localhost:8080/CreateCustomer";
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    // successAlert();
                    setTimeout(() => {
                        setActiveStep(0)
                    }, 1500)
                    console.log("Success");
                    setAlertMessage("บันทึกข้อมูลสำเร็จ")
                    setSuccess(true);
                    // return {status: true, message: res.data}
                } else {
                    // errorAlert();
                    setAlertMessage(res.error)
                    // console.log(res.error);
                    setError(true);
                    // return {status: false, message: res.error}
                }
            });
  
      
  
  
  
    }



    return(
        <Paper style={{ backgroundColor: "#182E3E" }}>
      {/* <Bar /> */}
      <Box sx={{ bgcolor: "#182E3E", height: "100vh" }} >

      <div style={{ height: "auto", width: "100%", marginTop: "0px", paddingTop: "30px" }}>
        <Box sx={{ maginX: 0, maginY: 0, height: "10px" }}>
          <center>
            <Typography
              component="h2"
              variant="h4"
              //color="#182E3E"
              gutterBottom
              //align="center"
              fontFamily="Arial"
            >
              <b style={{ font: "#FFFFFF", color: "#FFFFFF" }} >
                Sign - Up
              </b>
              <br />

            </Typography>
          </center>
        </Box>
      </div>
      <br /><br />

      <Container maxWidth="md">

      <Snackbar
        id="success"
        open={success}
        autoHideDuration={9000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          {message} 
        </Alert>
      </Snackbar>
      <Snackbar
        id="error"
        open={error}
        autoHideDuration={8000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          {message} 
        </Alert>
      </Snackbar>

        <Box sx={{ bgcolor: '#f1f8e9', height: '75vh', marginY: 4 }} >

            <Grid container spacing={2} paddingX={1} paddingY={0}>

                <Grid item xs={6}>
                    <center>
                    <b style={{ font: "Arial", color: "#000000", fontSize: 13 }} >
                        Profile Information
                    </b>
                    </center>
                </Grid>

                <Grid item xs={6}>
                <center>
                    <b style={{ font: "Arial", color: "#000000", fontSize: 13 }} >
                        Create Account
                    </b>
                    </center>
                </Grid>

            </Grid>
        
            <Grid container spacing={1} paddingX={1} paddingY={1}>
                <Grid item xs={12}>
                    <BorderLinearProgress variant="determinate" value={50} />
                </Grid>
            </Grid>
            <br />

            <Divider />

            <Grid container spacing={1} paddingX={30} paddingY={1}>
                <Grid item xs={10} md={12}  >
                    <b style={{ font: "Arial", color: "#000000", fontSize: 13 }} >
                            E-mail
                        </b>
                </Grid>
                <Grid item xs={10} md={12}  >
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            id="Email"
                            variant="outlined"
                            type="string"
                            size="medium"
                            value={Email}
                            onChange={(event) => setFormCreate(({...formCreate,Email:event.target.value}))}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={10} md={12}  >
                    <b style={{ font: "Arial", color: "#000000", fontSize: 13 }} >
                            Password
                        </b>
                </Grid>
                <Grid item xs={10} md={12}  >
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            id="Password"
                            variant="outlined"
                            type="string"
                            size="medium"
                            value={Password}
                            onChange={(event) => setFormCreate(({...formCreate,Password:event.target.value}))}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={10} md={12}  >
                    <b style={{ font: "Arial", color: "#000000", fontSize: 13 }} >
                            Type - Password again
                        </b>
                </Grid>
                <Grid item xs={10} md={12}  >
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            id="RePassword" //!อย่าลืมกลับมาดู Type Password again ว่่าจะทำไหม
                            variant="outlined"
                            type="string"
                            size="medium"
                            value={RePassword}
                            onChange={(event) => setFormCreate(({...formCreate,RePassword:event.target.value}))}
                        />
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={1} paddingX={2} paddingY={1} >
                <Grid item xs={7} padding={2}>
                  <Button
                    style={{ float: "right", fontSize: 20 }}
                    onClick={submit}
                    // component={RouterLink} to="/CustomerCreate1" 
                    variant="contained"
                    color="success"
                    size="large"
                  >
                    <b>Sign - Up</b>
                  </Button>
                </Grid>
                <Grid item xs={7} padding={2} marginTop={0} marginLeft={85}>
                <Button size="large" sx={{ backgroundColor: "#C70039", fontSize: 20 }} onClick={handleBack} variant="contained"  >
                <b>Back</b>
                  </Button>
                </Grid>
            </Grid>
            
            </Box>
            </Container>


        

        </Box>
      </Paper>
    )



  }
  export default CustomerCreate2;
