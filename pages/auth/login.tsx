import Wrapper from "@/layout/wrapper/Wrapper";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React from "react";
import { inputLabelClasses } from "@mui/material/InputLabel";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { useRouter } from "next/router";

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

const Login = () => {
    const router=useRouter()

  return (
    <Wrapper>
      <div>
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
              <strong>
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
              sx={{ my: 4, ml: 3, }}
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
              <Typography sx={{textAlign:'center', margin:'auto', mx:30, }}>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt:3, p:2 }}
                >
                  Log In
                </Button>
              </Typography>
            </Box>
            <Typography sx={{textAlign:'center', margin:'auto', fontSize:'30px', color:'#2C589A' }}>New To SATURN</Typography>
            
            <Typography sx={{textAlign:'center', margin:'auto', ml:30, mr:28 }}>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt:3, p:2 }}
                  onClick={()=>router.push('/auth/signup')}
                >
                  Creaet An Account
                </Button>
              </Typography>
          </Box>
        </section>
      </div>
    </Wrapper>
  );
};

export default Login;
