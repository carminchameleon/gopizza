import React, { useState } from 'react';
import axios from 'axios';
import { URL } from 'config';
import styled from 'styled-components';

interface Props {
  image: string;
}

const FileUpload = (props: Props) => {
  const [img, setImg] = useState<any>();
  const [imgUpload, setImgUpload] = useState<any>();
  // console.log(props.image);

  const isSelectedImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('files', event.target.files);
    if (event.target.files !== null) {
      setImg(event.target.files[0]);
    }
  };

  const isUploadedImg = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const fd = new FormData();
    fd.append('filename', img);
    console.log('formdata', fd);

    const token = window.sessionStorage.getItem('token');
    // console.log(token);

    axios
      .post(`${URL}/user/profile-upload`, fd, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log(res);
        console.log('이미지 주소', res.data.image_url);
        setImgUpload(res.data.image_url);

        if (token) {
          fetch(`${URL}/user/image`, {
            method: 'POST',
            headers: { Authorization: token },
            body: JSON.stringify({
              image_url: res.data.image_url,
            }),
          }).then(res => console.log(res));
        }
      })

      .catch(error => {
        console.log(error.response);
      });
  };
  return (
    <Wrapper>
      {/* 부모컴포넌트에서 받아오는 이미지: 기존 이미지 */}
      <ImgBox image={props.image}>
        {/* style={{ backgroundImage: `url(${props.image})` }} */}
        <Img src={imgUpload} alt="" />
        {/* 새로운 이미지업로드후 부모에게 보내는 함수  */}
      </ImgBox>
      <InputBox>
        <ImgInput
          type="file"
          accept=" image/jpeg, image/jpg"
          onChange={isSelectedImg}
        />
        <ImgBtn type="submit" onClick={isUploadedImg}>
          Upload
        </ImgBtn>
      </InputBox>
    </Wrapper>
  );
};

export default FileUpload;

const Wrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ImgBox = styled.div<{ image: string }>`
  margin-bottom: 30px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-image: url(${props =>
    props.image
      ? props.image
      : 'https://www.nelson-chambers.co.uk/front/images/default-user.jpg'});
  /* background-image: url('https://www.nelson-chambers.co.uk/front/images/default-user.jpg'); */
  /* background-color: lightgray; */
  background-size: 100%;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
const InputBox = styled.div``;
const ImgInput = styled.input`
  width: 160px;
  font-size: 13px;
  cursor: pointer;
`;
const ImgBtn = styled.button`
  width: 70px;
  color: white;
  border-radius: 5px;
  background-color: orange;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background-color: orangered;
  }
`;
