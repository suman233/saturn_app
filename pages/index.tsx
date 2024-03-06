import { fetchCMS } from "@/api/functions/cms.api";
import StorySec from "@/components/StorySec/StorySec";
import assest from "@/json/assest";
import { cardList } from "@/json/mock/cardlist.mock";
import Wrapper from "@/layout/wrapper/Wrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Box, Container, Grid, Paper, Rating } from "@mui/material";
import Typography from "@mui/material/Typography";
import { color, height } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Carousel from "react-material-ui-carousel";
import Slider from "react-slick";
import styles from "@/styles/pages/home.module.scss";
import { deleteCookie, getCookie } from "cookies-next";
import { toast } from "sonner";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 400,
  color: "white",
  // borderTop: "4px solid orange",
  // bgcolor: "rgba(192,192,192,0.4)",
  // borderBottom: "2px solid #000",
  // boxShadow: 24,
  m: "auto",
  px: 4,
};

const settings = {
  dots: false,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SampleNextArrow />,
};
function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ background: "orange" }}
      onClick={onClick}
    />
  );
}

export default function Home() {
  const router = useRouter();

  const { isLoading, data, error } = useQuery({
    queryKey: ["Home"],
    queryFn: fetchCMS,
  });

  console.log("cms", data);
  const bannerUrl = "https://admin.yoursaturn.com/storage/cms";

  return (
    <Wrapper>
      {/* <Typography>Saturn</Typography> */}
      <Carousel>
        {data?.homebanner.map((item, i) => {
          return (
            <div key={i}>
              <img
                src={`${item?.banner_image_path}`}
                alt=""
                height={"90vh"}
                width={"100%"}
              />
              <Box sx={{ ...style, textAlign: "center" }}>
                {/* <p dangerouslySetInnerHTML={{__html: item?.banner_title}}/> */}
                <Typography
                  sx={{ color: "white", fontWeight: "bold", fontSize: "90px" }}
                >
                  {item?.banner_title}
                </Typography>
                <p
                  dangerouslySetInnerHTML={{ __html: item.banner_description }}
                  style={{ fontSize: "25px", color: "white", margin: 1 }}
                />
                {/* {item?.banner_description.replace(/(<([^>]+)>)/gi, "")}/> */}
                <CustomButtonPrimary
                  onClick={() => router.push(`${item.banner_link}`)}
                  type="button"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3 }}
                >
                  <Typography>{item?.banner_link_text}</Typography>
                </CustomButtonPrimary>
              </Box>
            </div>
          );
        })}
      </Carousel>
      <section
        style={{ marginTop: 10, marginBottom: 60, backgroundColor: "#FEF9F6" }}
      >
        <Container >
          <Typography
            sx={{
              color: "#2C4867",
              fontSize: "50px",
              textAlign: "center",
              
            }}
          >
            {data?.what_help_section_title}
          </Typography>
          <Grid container rowSpacing={3} sx={{ mt: 4, textAlign: "center" }}>
            <Grid item md={4}>
              <Box sx={{ '&:hover': {
                    backgroundImage: "black",
                    backgroundColor:'white'
                  },}}>
                <img
                  src={`${data?.what_help_section1_image_path}`}
                  alt=""
                  // height={300}
                  width={"40%"}
                  style={{
                    padding: "30px",
                    borderRadius: "50%",
                    color:'white',
                    backgroundImage: "linear-gradient(to right, #F8CAA6 , #FDD893)",
                   
                  }}
                />
              </Box>

              <Typography sx={{ fontSize: "20px", mt: 3, color: "#256396" }}>
                {data?.what_help_section1_title}
              </Typography>
            </Grid>
            <Grid item md={4}>
              <img
                src={`${data?.what_help_section2_image_path}`}
                alt=""
                height={500}
                width={"40%"}
                style={{
                  padding: "30px",
                  borderRadius: "50%",
                  backgroundImage:
                    "linear-gradient(to right, #F8CAA6 , #FDD893)",
                }}
              />
              <Typography sx={{ fontSize: "20px", mt: 3, color: "#256396" }}>
                {data?.what_help_section2_title}
              </Typography>
            </Grid>
            <Grid item md={4}>
              <img
                src={`${data?.what_help_section3_image_path}`}
                alt=""
                height={500}
                width={"40%"}
                style={{
                  padding: "30px",
                  borderRadius: "50%",
                  backgroundImage:
                    "linear-gradient(to right, #F8CAA6 , #FDD893)",
                }}
              />
              <Typography sx={{ fontSize: "20px", mt: 3, color: "#256396" }}>
                {data?.what_help_section3_title}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </section>
      <Container sx={{ mb: 10 }}>
        <Paper
          sx={{
            backgroundImage: "linear-gradient(to right, #F8CAA6 , #FDD893)",
            height: 400,
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "40px",
              color: "#2C4867",
              pt: 10,
              mb: 3,
            }}
          >
            {data?.birth_chart_report_title}
          </Typography>
          <p
            style={{
              textAlign: "center",
              fontSize: "20px",
              color: "#2C4867",
              width: "80%",
              margin: "auto",
            }}
            dangerouslySetInnerHTML={{
              __html: data?.birth_chart_report_desc as string,
            }}
          />
          <CustomButtonPrimary
            onClick={() => router.push(`/birthreport`)}
            type="button"
            variant="contained"
            color="primary"
            sx={{ m: "auto", my: 3 }}
          >
            <Typography>{data?.birth_chart_report_link_text}</Typography>
          </CustomButtonPrimary>
        </Paper>
      </Container>
      <section style={{ marginTop: 10, marginBottom: 20, backgroundColor: "#FEF9F6"}}>

      <Container sx={{  
      }}>
        <div className={styles.image_slider_container}>
          <Slider {...settings}>
            <div>
              <img
                src={data?.what_client_say_image1_path}
                // width={'100%'}
                style={{
                  float: "left",
                  height: 500,
                  width: 500,
                  backgroundColor: "#2C4867",
                  borderRadius: "50%",
                }}
              />
              <div style={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: "50px", color: "#2C4867", mt: 5 }}>
                  {data?.what_client_say_title1}
                </Typography>
                <Rating defaultValue={5} readOnly sx={{ my: 1 }} />
                <Typography
                  sx={{
                    fontSize: "22px",
                    color: "#2C4867",
                    my: 3,
                    fontStyle: "italic",
                  }}
                >
                  {data?.what_client_say_topic1}!
                </Typography>

                <p
                  dangerouslySetInnerHTML={{
                    __html: data?.what_client_say_description1 as string,
                  }}
                  style={{
                    fontSize: "16px",
                    color: "gray",
                    marginTop: 5,
                    fontStyle: "italic",
                  }}
                />
                <Typography sx={{ fontSize: "22px", color: "#2C4867", mt: 3 }}>
                  -{data?.what_client_say_name1}
                </Typography>
                <Typography sx={{ fontSize: "22px", mb: 3, color: "gray" }}>
                  {data?.what_client_say_location1}
                </Typography>
              </div>
            </div>
            <div>
              <img
                src={data?.what_client_say_image2_path}
                // width={'100%'}
                style={{
                  float: "left",
                  height: 500,
                  width: 500,
                  backgroundColor: "#2C4867",
                  borderRadius: "50%",
                }}
              />
              <div style={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: "50px", color: "#2C4867", mt: 5 }}>
                  {data?.what_client_say_title2}
                </Typography>
                <Rating defaultValue={5} readOnly sx={{ my: 1 }} />
                <Typography
                  sx={{
                    fontSize: "22px",
                    color: "#2C4867",
                    my: 3,
                    fontStyle: "italic",
                  }}
                >
                  {data?.what_client_say_topic2}!
                </Typography>
                <p
                  dangerouslySetInnerHTML={{
                    __html: data?.what_client_say_description2 as string,
                  }}
                  style={{
                    fontSize: "16px",
                    color: "gray",
                    marginTop: 5,
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    fontStyle: "italic",
                  }}
                />
                <Typography sx={{ fontSize: "22px", color: "#2C4867", mt: 3 }}>
                  -{data?.what_client_say_name2}
                </Typography>
                <Typography sx={{ fontSize: "22px", mb: 3, color: "gray" }}>
                  {data?.what_client_say_location2}
                </Typography>
              </div>
            </div>
            <div>
              <img
                src={data?.what_client_say_image3_path}
                // width={'100%'}
                style={{
                  float: "left",
                  height: 500,
                  width: 500,
                  backgroundColor: "#2C4867",
                  borderRadius: "50%",
                }}
              />
              <div style={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: "50px", color: "#2C4867", mt: 5 }}>
                  {data?.what_client_say_title3}
                </Typography>
                <Rating defaultValue={5} readOnly sx={{ my: 1 }} />

                <Typography
                  sx={{
                    fontSize: "22px",
                    color: "#2C4867",
                    my: 3,
                    fontStyle: "italic",
                  }}
                >
                  {data?.what_client_say_topic3}!
                </Typography>

                <p
                  dangerouslySetInnerHTML={{
                    __html: data?.what_client_say_description3 as string,
                  }}
                  style={{
                    fontSize: "16px",
                    color: "gray",
                    marginTop: 5,
                    marginLeft: 6,
                    marginRight: 6,
                    fontStyle: "italic",
                  }}
                />
                <Typography sx={{ fontSize: "22px", color: "#2C4867", mt: 3 }}>
                  {data?.what_client_say_name3}
                </Typography>
                <Typography sx={{ fontSize: "22px", mb: 3, color: "gray" }}>
                  {data?.what_client_say_location3}
                </Typography>
              </div>
            </div>
          </Slider>
        </div>
      </Container>
      </section>

      <section>
        
      </section>

    </Wrapper>
  );
}
