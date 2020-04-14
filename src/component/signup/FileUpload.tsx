import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from 'config';
import styled from 'styled-components';

interface Props {
  imgStore: (img: String) => void;
}

const FileUpload = (props: Props) => {
  const [imgUpload, setImgUpload] = useState<any>();

  const isSelectedImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('files', event.target.files);
    if (event.target.files !== null) {
      const fd = new FormData();
      fd.append('filename', event.target.files[0]);
      // console.log(fd);
      axios
        .post(`${URL}/user/profile-upload`, fd)
        .then(res => {
          // console.log(res);
          // console.log(res.data.image_url);
          setImgUpload(res.data.image_url);
          props.imgStore(res.data.image_url);
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  };

  return (
    <Wrapper>
      <ImgBox>
        <Img src={imgUpload} alt="" />
      </ImgBox>
      <InputBox>
        <ImgInput
          type="file"
          accept="image/jpeg, image/jpg"
          onChange={isSelectedImg}
        />
      </InputBox>
    </Wrapper>
  );
};

export default FileUpload;

const Wrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ImgBox = styled.div`
  margin-bottom: 10px;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: lightgray;
  background-size: 100%;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
const InputBox = styled.div``;
const ImgInput = styled.input`
  width: 200px;
  cursor: pointer;
`;
