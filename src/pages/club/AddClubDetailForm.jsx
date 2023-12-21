import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import "./ClubCommoncss.css";
import { useState } from "react";

const AddClubDetailForm = ({ onPrev, onNext, data }) => {
  const [formData, setFormData] = useState({
    categoryId: data.categoryId || "", // 기존 데이터가 있으면 사용, 없으면 빈 문자열
    title: data.title || "", // 기존 데이터가 있으면 사용, 없으면 빈 문자열
    content: data.content || "", // 기존 데이터가 있으면 사용, 없으면 빈 문자열
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handlePrevClick = () => {
    onPrev();
  };

  const handleNextClick = () => {
    // 입력 받은 데이터를 formData에 추가
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    // onNext 함수 호출
    onNext({ title, content });
  };

  return (
    <>
      <div>
        <Typography
          variant="h4"
          style={{ marginTop: "20px", marginLeft: "30px" }}
        >
          모임을 소개해주세요 !
        </Typography>

        <Container style={{ marginTop: "30px", marginLeft: "20px" }}>
          <Typography variant="h5" style={{ marginLeft: "" }}>
            모임명
          </Typography>
          <Box
            sx={{
              width: 300,
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              label="모임명을 입력해주세요"
              id="title" // ID 추가
              color="secondary"
              value={formData.title}
              onChange={handleInputChange}
            />
          </Box>
        </Container>

        <Container style={{ marginTop: "30px", marginLeft: "20px" }}>
          <Typography variant="h5" style={{ marginLeft: "" }}>
            모임소개
          </Typography>
          <Box
            sx={{
              width: 300,
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              label="모임 소개를 입력해주세요"
              id="content" // ID 추가
              color="secondary"
              value={formData.content}
              onChange={handleInputChange}
            />
          </Box>
        </Container>
      </div>

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <Button
          variant="contained"
          color="secondary"
          style={backButtonStyle}
          onClick={handlePrevClick}
        >
          이전
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={nextButtonStyle}
          onClick={handleNextClick}
        >
          다음
        </Button>
      </Paper>
    </>
  );
};

export default AddClubDetailForm;

const nextButtonStyle = {
  position: "fixed",

  bottom: 20,
  right: 30, // 변경된 부분
  width: "45%",
  padding: "5px",
  textAlign: "center",
};

const backButtonStyle = {
  position: "fixed",

  bottom: 20,
  left: 40,
  width: "20%",
  padding: "5px",
  textAlign: "center",
};
