import Wrapper from "@/layout/wrapper/Wrapper";
import { Box, Container, Divider, Typography } from "@mui/material";
import React from "react";

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

const Birth = () => {
  return (
    <Wrapper>
      <section
        style={{
          height: 400,
          backgroundImage:
            "linear-gradient(to right, #F8C96B , #F7B86B, #F6AA6C)",
        }}
      >
        <Box sx={{...style}}>
          <Typography sx={{ textAlign: "center", fontSize:'50px', color:'#394F67'}}>
            Get Your Career Astrology Report
          </Typography>
          <p style={{color:'#394F67', fontSize:'18px', textAlign:'center', marginTop:5}}>Have questions about your career and don't know where to start? Get the clarity you've been seeking <br /> with Astrology.</p>
        <Divider sx={{mt:3, borderBottomWidth:'3px', fontWeight:'bold',backgroundColor:'#394F67' }} />
        <Divider sx={{mt:1, borderBottomWidth:'1px', fontWeight:'bold',backgroundColor:'#394F67' }} />
        </Box>
      </section>

      <Container>
        
      </Container>
    </Wrapper>
  );
};

export default Birth;
