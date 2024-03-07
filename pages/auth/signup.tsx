import validationText from "@/json/messages/validationText";
import Wrapper from "@/layout/wrapper/Wrapper";
import {
  Divider,
  Typography,
  Box,
  Container,
  Button,
  Paper,
  Select,
  MenuItem,
  MenuList,
} from "@mui/material";
import React from "react";
import * as yup from "yup";
import emailRegex from "@/lib/regex/index";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signUpMutation } from "@/api/functions/user.api";
import { IFormInput } from "@/interface/common.interface";
import { toast } from "sonner";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import Datepickersection from "@/ui/Datepicker/Datepickersection";
import { setCookie } from "cookies-next";
// import { setCookie } from "nookies";

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
    full_name: yup.string().required(validationText.error.full_name),
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
    birth_place: yup.string().required(validationText.error.birth_place),
    current_location: yup
      .string()
      .required(validationText.error.current_location), 
    lat: yup.number().required(),
    lon: yup.number().required(),
  })
  .required();

export type RegSchema = yup.InferType<typeof schema>;

const hours = [];

for (let i = 1; i < 13; i++) {
  hours.push(i);
}

let minutes: number[] = [];

for (let i = 1; i < 61; i++) {
  minutes.push(i);
}

const Signup = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: signUpMutation,
  });

  const handleReg: SubmitHandler<IFormInput> = (data) => {
    console.log("signup", data);
    mutate(
      { ...data },
      {
        onSuccess: (response) => {
          if (response?.data?.status === true) {
            toast.success(response?.data?.message);
            setCookie("usertoken", response.data.data.token);
            router.push("/");
          }
        },
        onError: (err) => {
          toast.error(err.message);
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
              fontSize: "40px",
              my: 4,
              fontStyle: "italic",
              color: "#394F67",
            }}
          >
            Step 2: Please Enter Birth Data Below
          </Typography>
          <Paper sx={{ backgroundColor: "#FFF5EE" }}>
            <form onSubmit={handleSubmit(handleReg)}>
              <Box sx={{ pt: 4, px: 6 }}>
                <label htmlFor="" style={{ color: "#6185AE" }}>
                  Your Name*
                </label>
                <InputFieldCommon
                  type="text"
                  placeholder="Full Name"
                  sx={{
                    my: 1,
                  }}
                  {...register("full_name")}
                  helperText={errors.full_name?.message}
                />
              </Box>
              <Box sx={{ px: 6 }}>
                <label htmlFor="" style={{ color: "#6185AE" }}>
                  Your Email Address*
                </label>
                <InputFieldCommon
                  type="email"
                  placeholder="Email Address"
                  sx={{ my: 1 }}
                  {...register("email")}
                  helperText={errors.email?.message}
                />
              </Box>
              <Box
                sx={{
                  px: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <label htmlFor="" style={{ color: "#6185AE" }}>
                    Birth Year*
                  </label>
                  <br />
                  {/* <Controller
                    name="birth_year"
                    control={control}
                    // Set default value if needed
                    render={({ field }) => (
                      <Select
                        style={{
                          width: "17vw",
                          backgroundColor: "#f2f2f2",
                          color: "black",
                          overflow: "scroll",
                        }}
                        inputProps={{ "aria-label": "Without label" }}
                        {...field}
                        {...register("birth_year")}
                      >
                        <MenuList style={{overflowY:'auto'}}>

                        {years.map((item) => (
                          <MenuItem key={item} value={item} >
                            {item}
                          </MenuItem>
                        ))}
                        </MenuList>

                      </Select>
                    )}
                  /> */}
                  <InputFieldCommon
                    type="number"
                    placeholder="Birth_year"
                    sx={{
                      my: 1,
                      width: "30%",
                    }}
                    {...register("birth_year")}
                    
                  />
                </div>

                <div>
                  <label htmlFor="" style={{ color: "#6185AE" }}>
                    Birth Month*
                  </label>
                  <br />
                  <InputFieldCommon
                    type="number"
                    placeholder="Birth_month"
                    sx={{
                      my: 1,
                      width: "30%",
                    }}
                    {...register("birth_month")}
                  />
                </div>
                <div>
                  <label htmlFor="" style={{ color: "#6185AE" }}>
                    Birth Date*
                  </label>
                  <br />
                  <InputFieldCommon
                    type="number"
                    placeholder="Birth_Date"
                    sx={{
                      my: 1,
                      width: "30%",
                    }}
                    {...register("birth_date")}
                  />
                </div>
              </Box>
              <Box
                sx={{
                  px: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <label htmlFor="" style={{ color: "#6185AE" }}>
                    Birth Hour*
                  </label>
                  <br />
                  <InputFieldCommon
                    type="number"
                    placeholder="Birth_hour"
                    sx={{
                      my: 1,
                      width: "30%",
                    }}
                    {...register("birth_hour")}
                  />
                </div>
                <div>
                  <label htmlFor="" style={{ color: "#6185AE" }}>
                    Birth Minute*
                  </label>
                  <br />
                  <InputFieldCommon
                    
                    type="number"
                    placeholder="Birth_minute"
                    sx={{
                      my: 1,
                      width: "30%",
                    }}
                    {...register("birth_minute")}
                  />
                </div>
                {/* <div>
                <label htmlFor="" style={{ color: "#6185AE" }}>
                    Birth Minute*
                  </label>
                  <br />
                 <Controller
                    name="birth_minute"
                    control={control}
                    // Set default value if needed
                    render={({ field }) => (
                      <Select
                        style={{
                          width: "17vw",
                          // backgroundColor: "white",
                          color: "black",
                        }}
                        inputProps={{ "aria-label": "Without label" }}
                        {...field}
                        onChange={(e)=>console.log(e.target.value)
                        }
                        // {...register("birth_minute")}
                      >
                        <MenuList style={{maxHeight: 200, overflowY:'auto'}}>

                        {minutes.map((item) => (
                          <MenuItem value={item} sx={{color:'black'}}>
                            {item}
                          </MenuItem>
                        ))}
                        </MenuList>

                      </Select>
                    )}
                  />
                </div> */}
                <div>
                  <label htmlFor="" style={{ color: "#6185AE" }}>
                    Birth Meridian*
                  </label>
                  <br />
                  <InputFieldCommon
                    type="text"
                    placeholder="Birth_meridian"
                    sx={{
                      my: 1,
                      width: "30%",
                    }}
                    {...register("birth_meridian")}
                  />
                </div>
              </Box>
              <Box sx={{ px: 6 }}>
                <label htmlFor="" style={{ color: "#6185AE" }}>
                  Birth Place*
                </label>
                <InputFieldCommon
                  type="text"
                  placeholder="Birth_place"
                  sx={{
                    my: 1,
                  }}
                  {...register("birth_place")}
                  helperText={errors.birth_place?.message}
                />
                
              </Box>
              <Box sx={{ px: 6 }}>
                <label htmlFor="" style={{ color: "#6185AE" }}>
                  Current Location*
                </label>
                <InputFieldCommon
                  
                  type="text"
                  placeholder="Current_location"
                  sx={{
                    my: 1,
                  }}
                  {...register("current_location")}
                  error={Boolean(errors.current_location)}
                  helperText={errors.current_location?.message}
                />
              </Box>
              <Box sx={{ px: 6 }}>
                <label htmlFor="" style={{ color: "#6185AE" }}>
                  Password*
                </label>
                <InputFieldCommon
                  
                  type="password"
                  placeholder="Password"
                  sx={{
                    my: 1,
                  }}
                  {...register("password")}
                  helperText={errors.password?.message}
                />
              </Box>
              <Box sx={{ px: 6 }}>
                <label htmlFor="" style={{ color: "#6185AE" }}>
                  Latitude*
                </label>
                <InputFieldCommon
                  
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
                  
                  type="number"
                  placeholder="Longitude"
                  sx={{
                    my: 1,
                  }}
                  {...register("lon")}
                  
                />
              </Box>
              <Box sx={{ m: "auto", textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    margin: "auto",
                    my: 2,
                    py: 2,
                    px: 4,
                  }}
                >
                  <Typography sx={{ color: "white" }}>
                    {isLoading ? "Loading..." : "Sign Up"}
                  </Typography>
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
