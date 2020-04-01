import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FileUpload = () => {
  const [img, setImg] = useState<string>('');

  const isSelectedImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setImg(event.target.value);
  };

  const isUploadedImg = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const fd = new FormData();
    fd.append('image', img);
    axios
      .post('gs://pizza-project-98584.appspot.com/', fd)
      //백엔드 api주소 넣기
      .then(res => {
        console.log(res);
      });
  };
  return (
    <>
      <Wrapper>
        <ImgBox>
          <ImgLabel></ImgLabel>
          <ImgInput
            type="file"
            accept="image/png, image/jpeg"
            onChange={isSelectedImg}
          />
          <ImgBtn type="submit" onClick={isUploadedImg}>
            Upload
          </ImgBtn>
        </ImgBox>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div``;
const ImgBox = styled.div``;
const ImgLabel = styled.label``;
const ImgInput = styled.input`
  width: 140px;
  cursor: pointer;
`;
const ImgBtn = styled.button`
  cursor: pointer;
`;

export default FileUpload;
