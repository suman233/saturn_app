import validationText from '@/json/messages/validationText';
import Wrapper from '@/layout/wrapper/Wrapper'
import { Box, Button, Container, Divider, TextField, Typography } from '@mui/material'
import React from 'react'
import * as yup from "yup";
import { emailRegex } from "@/lib/functions/_helpers.lib";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { LoginInput } from '@/interface/common.interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { loginMutation } from '@/api/functions/user.api';
import { inputLabelClasses } from "@mui/material/InputLabel";
import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import { toast } from 'sonner';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 400,
    // color: "white",
    // borderTop: "4px solid orange",
    // bgcolor: "rgba(192,192,192,0.4)",
    // borderBottom: "2px solid #000",
    // boxShadow: 24,
    m: "auto",
    px: 4,
  };
  const sessionSchema = yup
  .object({
    email: yup
      .string()
      .trim()
      .required(validationText.error.enter_email)
      .matches(emailRegex, validationText.error.email_format),
  })
  .required();
export type LoginSchema = yup.InferType<typeof sessionSchema>;

const AuthLogin =async () => {
    const router=useRouter()
    const {email, session_id}=router.query

    const {register, handleSubmit}=useForm<LoginInput>({
        resolver: yupResolver(sessionSchema)
    })


    let sessiondata=null;
    let body=null
    if (router.query){
        body: {
            email: email
            token: session_id
        }
    }
    let {data: auth_data}= await axiosInstance.post(
        endpoints.auth.getUser, 
        body
    )
    const {mutate, data, isPending}=useMutation({
        mutationFn: loginMutation
    })

    const getprofile= localStorage.getItem('profilelink')
    
    
      const handleLogin = (data: LoginSchema) => {
        mutate(
          { ...data },
          {
            onSuccess: (resp) => {
              if (resp.data.code === 200){ 
              console.log('ss', resp);
              
              toast.success(resp.data.message);
              
              router.push('/')
              }
              else {
                console.log(resp.data, 'err');
                toast.error(resp.data.validation_errors)
              }
            },
          
          }
        );
      };

  return (
    <Wrapper>
        <section
          style={{
            height: 800,
            backgroundImage: "linear-gradient(to bottom, #F1E7E4, #F0EFEE)",
          }}
        >
          <Box sx={{ ...style }}>
            <Typography
              sx={{ textAlign: "center", fontSize: "46px", color: "#394F67" }}
            >
              Session <strong>
                <i>Login</i>
              </strong>{" "}
              To Your <br />
              Account Or{" "}
              <strong>
                <i>Sign Up</i>
              </strong>
              <br /> Here
            </Typography>

            <Divider
              sx={{
                mt: 3,
                borderBottomWidth: "3px",
                fontWeight: "bold",
                backgroundColor: "#394F67",
              }}
            />
            <Divider
              sx={{
                mt: 1,
                borderBottomWidth: "1px",
                fontWeight: "bold",
                backgroundColor: "#394F67",
              }}
            />

            <Box
              component={"form"}
              sx={{ my: 4, ml: 3 }}
              onSubmit={handleSubmit(handleLogin)}
            >
              <div style={{ borderBottom: "15px" }}>
                <label style={{ color: "#617C9D" }}>
                  Enter Your Email Address
                </label>{" "}
                <br />
                <TextField
                  id="filled-size-normal"
                  variant="outlined"
                  fullWidth
                  {...register("email")}
                  placeholder="Enter Your Email Address"
                  sx={{
                    mr: 2,
                    mt: 1,
                    backgroundColor: "#f2f6f7",
                    color: "black",
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "black",
                      [`&.${inputLabelClasses.shrink}`]: {
                        color: "gray",
                      },
                    },
                  }}
                  InputProps={{
                    sx: {
                      color: "black",
                    },
                  }}
                />
              </div>
              <Typography sx={{ textAlign: "center", margin: "auto", mx: 30 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, p: 2 }}
                >
                  Log In
                </Button>
              </Typography>
            </Box>
            <Typography
              sx={{
                textAlign: "center",
                margin: "auto",
                fontSize: "30px",
                color: "#2C589A",
              }}
            >
              New To SATURN
            </Typography>

            <Typography
              sx={{ textAlign: "center", margin: "auto", ml: 30, mr: 28 }}
            >
              <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3, p: 2 }}
                onClick={() => router.push("/auth/signup")}
              >
                Creaet An Account
              </Button>
            </Typography>
          </Box>
        </section>
    <Container>

    </Container>
    </Wrapper>
  )
}

export default AuthLogin