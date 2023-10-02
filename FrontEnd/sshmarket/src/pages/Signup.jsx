import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Login } from "../modules/memberReducer/action";
import StyledButton from "../components/Button/StyledButton";
import SubButton from "./../components/Button/SubButton";

const Container = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const NicknameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
`;

const ProfileContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 6px 12px;
  cursor: pointer;
  background-color: #f9f9f9;
`;

const CursorContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 999;
  background-color: transparent;
`;

const LableContainer = styled.label`
  font-weight: bold;
`;

const NicknameInput = styled.input`
  width: 250px;
  margin-right: 1em;
`;

const ProfileInput = styled.input`
  font-size: 300px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
`;

const PreviewProfileBox = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const DulicateMessage = styled.div`
  color: red;
`;

export default function Signup() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const [inputNickname, setInputNickname] = useState();
  const [inputProfile, setInputProfile] = useState(new File([], "tmp"));
  const [previewProfile, setPreviewProfile] = useState();
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [isDuplicateNickname, setIsDuplicateNickname] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeNickname = (e) => {
    setInputNickname(e.target.value.toString().trim());
  };

  const changeProfile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("정상적인 파일이 아닙니다.");
      return;
    }
    setInputProfile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewProfile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const resetProfile = () => {
    setInputProfile(new File([], "tmp"));
    setPreviewProfile(undefined);
  };

  const checkNickname = () => {
    if (!inputNickname.trim()) return;

    axios({
      baseURL: SERVER_URL,
      url: SERVER_URL + "auth/members/check/" + inputNickname.trim(),
      method: "GET",
    })
      .then((res) => {
        setIsValidNickname(true);
        setIsDuplicateNickname(false);
        alert(res.data.message);
      })
      .catch((e) => {
        setIsDuplicateNickname(true);
        alert(e.response.data.message);
      });
  };

  const register = () => {
    
    if (inputNickname.length < 4 || inputNickname.length > 20) {
      alert("닉네임은 4자 이상 20자 이하로 입력해주세요.");
      return;
    }

    if (!isValidNickname) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("잘못된 접근입니다.");
      navigate("/");
    }

    const formData = new FormData();
    formData.append("code", accessToken);
    formData.append("nickname", inputNickname);
    formData.append("profile", inputProfile);

    axios({
      baseURL: SERVER_URL,
      url: SERVER_URL + "auth/register",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((res) => {
        dispatch(Login({ data: { ...res.data.data } }));
        alert(res.data.message);
        localStorage.removeItem("accessToken");
        navigate("/");
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };

  return (
    <Container>
      <LableContainer for="profile">{"프로필 사진 선택"}</LableContainer>
      <ProfileContainer id="profile">
        <CursorContainer
          onClick={() => document.getElementById("profileupload").click()}
        ></CursorContainer>
        <PreviewProfileBox
          src={previewProfile ? previewProfile : "defaultProfile.png"}
          alt="프로필 사진"
        ></PreviewProfileBox>
        <ProfileInput
          onChange={changeProfile}
          type="file"
          accept=".jpg,.jpeg,.png"
          id="profileupload"
        ></ProfileInput>
      </ProfileContainer>
      <SubButton
        content={"프로필 사진 초기화"}
        onClick={resetProfile}
      ></SubButton>
      <LableContainer for="nickname">{"닉네임 입력"}</LableContainer>
      <NicknameContainer id="nickname">
        <NicknameInput
          onChange={changeNickname}
          type="text"
          placeholder="4자 이상 20자 이하로 입력해주세요."
        ></NicknameInput>
        <SubButton content={"중복확인"} onClick={checkNickname}></SubButton>
        <DulicateMessage hidden={!isDuplicateNickname}>
          {"중복된 닉네임입니다."}
        </DulicateMessage>
      </NicknameContainer>
      <StyledButton content={"회원가입"} onClick={register}></StyledButton>
    </Container>
  );
}
