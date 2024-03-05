import validationText from "@/json/messages/validationText";
import Wrapper from "@/layout/wrapper/Wrapper";
import {
  Divider,
  Typography,
  Box,
  Container,
  Button,
  Paper,
} from "@mui/material";
import React from "react";
import * as yup from "yup";
import emailRegex from "@/lib/regex/index";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signUpMutation } from "@/api/functions/user.api";
import { IFormInput } from "@/interface/common.interface";
import { toast } from "sonner";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import Datepickersection from "@/ui/Datepicker/Datepickersection";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 400,
  // color: "white",
  // borderTop: "4px solid orange",
  // bgcolor: "rgba(192,192,192,0.4)",
  // borderBottom: "2px solid #000",
  // boxShadow: 24,
  m: "auto",
  px: 4,
};

const schema = yup
  .object({
    full_name: yup.string().required(validationText.error.fullName),
    email: yup
      .string()
      .trim()
      .required(validationText.error.enter_email)
      .matches(emailRegex.emailRegex, validationText.error.email_format),
    password: yup.string().required(validationText.error.enter_password),
    birth_year: yup.number().required(),
    birth_month: yup.number().required(),
    birth_date: yup.number().required(),
    birth_hour: yup.number().required(),
    birth_minute: yup.number().required(),
    birth_meridian: yup.string().required(),
    birth_place: yup.string().required(validationText.error.enter_password),
    current_location: yup
      .string()
      .required(validationText.error.enter_password),
    lat: yup.number().required(),
    lon: yup.number().required(),
  })
  .required();

export type RegSchema = yup.InferType<typeof schema>;

const Signup = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: signUpMutation,
  });
  const handleReg = (data: RegSchema) => {
    console.log("signup", data);

    mutate(
      { ...data },
      {
        onSuccess: (response) => {
          if (response?.data?.status === true) {
            toast.success(response?.data?.message);
            router.push("/auth/login");
          }
        },
      }
    );
  };
  return (
    <>
      <Wrapper>
        <section
          style={{
            height: 400,
            backgroundImage:
              "linear-gradient(to right, #F8C96B , #F7B86B, #F6AA6C)",
          }}
        >
          <Box sx={{ ...style }}>
            <Typography
              sx={{ textAlign: "center", fontSize: "50px", color: "#394F67" }}
            >
              Get Your Career Astrology Report
            </Typography>
            <p
              style={{
                color: "#394F67",
                fontSize: "18px",
                textAlign: "center",
                marginTop: 5,
              }}
            >
              Have questions about your career and don't know where to start?
              Get the clarity you've been seeking <br /> with Astrology.
            </p>
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
          </Box>
        </section>
        <Container>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "40px",
              my: 4,
            }}
          >
            Sign UP Form
          </Typography>
          <Paper sx={{ backgroundColor: "#FFF5EE" }}>
            <form onSubmit={handleSubmit(handleReg)}>
              <Box sx={{ pt: 4, px: 6 }}>
                <label htmlFor="" style={{ color: "#6185AE" }}>
                  Your Name*
                </label>
                <InputFieldCommon
                  required
                  type="text"
                  placeholder="Full Name"
                  sx={{
                    my: 1,
                  }}
                  {...register("full_name")}
                />
              </Box>
              <Box sx={{ px: 6 }}>
                <label htmlFor="" style={{ color: "#6185AE" }}>
                  Your Email*
                </label>
                <InputFieldCommon
                  required
                  type="email"
                  placeholder="Email"
                  sx={{
                    my: 1,
                  }}
                  {...register("email")}
                />
              </Box>
              <Box sx={{ px: 6 }}>
                <label htmlFor="" style={{ color: "#6185AE" }}>
                  Birth Year*
                </label>
                <InputFieldCommon
                  required
                  type="number"
                  placeholder="Birth_year"
                  sx={{
                    my: 1,
                  }}
                  {...register("birth_year")}
                />
              </Box>
              <Box sx={{ px: 6 }}>
                <label htmlFor="" style={{ color: "#6185AE" }}>
                  Birth Month*
                </label>
                <InputFieldCommon
                  required
                  type="number"
                  placeholder="Birth_month"
                  sx={{
                    my: 1,
                  }}
                  {...register("birth_month")}
                />
              </Box>
              <Box sx={{ px: 6 }}>
                <label htmlFor="" style={{ color: "#6185AE" }}>
                  Birth Date*
                </label>
                <InputFieldCommon
                  required
                  type="number"
                  placeholder="Birth_Date"
                  sx={{
                    my: 1,
                  }}
                  {...register("birth_date")}
                />
              </Box>
              <Box sx={{ px: 6 }}>
                <label htmlFor="" style={{ color: "#6185AE" }}>
                  Birth Hour*
                </label>
                <InputFieldCommon
                  required
                  type="number"
                  placeholder="Birth_hour"
                  sx={{
                    my: 1,
                  }}
                  {...register("birth_hour")}
                />
              </Box>
              <Box sx={{ px: 6 }}>
                <label htmlFor="" style={{ color: "#6185AE" }}>
                  Birth Minute*
                </label>
                <InputFieldCommon
                  required
                  type="number"
                  placeholder="Birth_minute"
                  sx={{
                    my: 1,
                  }}
                  {...register("birth_minute")}
                />
              </Box>
              <Box sx={{ px: 6 }}>
                <label htmlFor="" style={{ color: "#6185AE" }}>
                  Birth Meridian*
                </label>
                <InputFieldCommon
                  required
                  type="text"
                  placeholder="Birth_meridian"
                  sx={{
                    my: 1,
                  }}
                  {...register("birth_meridian")}
                />
              </Box>
              <Box sx={{ px: 6 }}>
                <label htmlFor="" style={{ color: "#6185AE" }}>
                  Birth Place*
                </label>
                <InputFieldCommon
                  required
                  type="text"
                  placeholder="Birth_place"
                  sx={{
                    my: 1,
                  }}
                  {...register("birth_place")}
                />
              </Box>
              <Box sx={{ px: 6 }}>
                <label htmlFor="" style={{ color: "#6185AE" }}>
                  Current Location*
                </label>
                <InputFieldCommon
                  required
                  type="text"
                  placeholder="Current_location"
                  sx={{
                    my: 1,
                  }}
                  {...register("current_location")}
                />
              </Box>
              <Box sx={{ px: 6 }}>
                <label htmlFor="" style={{ color: "#6185AE" }}>
                  Password*
                </label>
                <InputFieldCommon
                  required
                  type="password"
                  placeholder="Password"
                  sx={{
                    my: 1,
                  }}
                  {...register("password")}
                />
              </Box>
              <Box sx={{ px: 6 }}>
                <label htmlFor="" style={{ color: "#6185AE" }}>
                  Latitude*
                </label>
                <InputFieldCommon
                  required
                  type="number"
                  placeholder="Latitude"
                  sx={{
                    my: 1,
                  }}
                  {...register("lat")}
                />
              </Box>
              <Box sx={{ px: 6 }}>
                <label htmlFor="" style={{ color: "#6185AE" }}>
                  Longitude*
                </label>
                <InputFieldCommon
                  required
                  type="number"
                  placeholder="Longitude"
                  sx={{
                    my: 1,
                  }}
                  {...register("lon")}
                />
              </Box>
              <Box sx={{ m:'auto', textAlign:'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    margin: "auto", my:2, py:2, px:4
                  }}
                >
                  <Typography sx={{color:'white'}}>Sign Up</Typography>
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      </Wrapper>
    </>
  );
};

export default Signup;
