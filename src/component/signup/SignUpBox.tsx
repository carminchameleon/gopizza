import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { URL } from 'config';
import FileUpload from 'component/signup/FileUpload';
import styled from 'styled-components';

interface storeList {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

const SignUpBox: React.FC<RouteComponentProps> = ({
  history,
}: RouteComponentProps) => {
  const [storeData, setStoreData] = useState<any>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordAgain, setPasswordAgain] = useState<string>('');
  const [store, setStore] = useState<string>('대치본점');
  const [storeId, setStoreId] = useState<number>(1);
  const [pwError, setPwError] = useState<Boolean>(false);
  const [img, setImg] = useState<any>('');

  //storeData 저장
  useEffect(() => {
    fetch(`${URL}/store`, { method: 'GET' })
      .then(res => res.json())
      .then(res => setStoreData(res.store_list));
  }, []);

  //input 태그 값 저장
  const handleInput = (e: { target: { value: string } }, option: string) => {
    // console.log('e', typeof e);
    console.log(e.target.value);
    if (option === 'name') setName(e.target.value);
    if (option === 'email') setEmail(e.target.value);
    if (option === 'password') {
      setPassword(e.target.value);
    }
    if (option === 'passwordCheck') {
      setPasswordAgain(e.target.value);
    }
    if (option === 'store') {
      setStore(e.target.value); // 지점 이름 저장
      for (let i = 0; i < storeData.length; i++) {
        // storeData 배열의 요소를 하나씩 돌면서
        if (storeData[i].name === e.target.value) {
          // 현재 선택된 지점과 배열의 요소의 name value가 일치하면
          setStoreId(storeData[i].id); // 해당 요소의 id 값을 저장
        }
      }
    }
  };

  //이메일 인증
  const emailVerification = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (email.length === 0) {
      alert('이메일을 입력해주세요');
    } else if (!(email.includes('@') && email.includes('.'))) {
      alert('이메일 형식을 올바르게 입력해주세요');
    } else {
      fetch(`${URL}/user/email-verification`, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
        }),
      }).then(res => {
        // console.log(res);
        if (res.status === 200) {
          alert('인증 이메일을 보냈습니다:) 확인해주세요!');
        }
        if (res.status === 500) {
          alert('존재하지 않는 이메일 입니다. 이메일을 다시 확인해주세요');
        }
      });
    }
  };

  //비밀번호 유효성 검사
  useEffect(() => checkPassword(), [password]);
  //콜백함수 쓰면 한 박자씩 느린것을 해결할 수 있음
  const checkPassword = () => {
    const check_num = /[0-9]/;
    const check_eng = /[a-z]/;
    if (
      check_num.test(password) &&
      check_eng.test(password) &&
      password.length >= 8
    ) {
      setPwError(false);
    } else {
      setPwError(true);
    }
  };
  //sign-up 버튼 클릭
  const handleAccount = () => {
    let sendData = {
      name: name,
      email: email,
      password: password,
      passwordAgian: passwordAgain,
      store: storeId,
      image_url: img,
    };
    console.log(sendData);

    if (pwError === true) alert('비밀번호 형식을 다시 확인해주세요');
    if (pwError === false && passwordAgain !== password)
      alert('비밀번호가 다릅니다');
    if (pwError === false && passwordAgain === password)
      fetch(`${URL}/user/sign-up`, {
        method: 'POST',
        body: JSON.stringify(sendData),
      }).then(res => {
        console.log(res);
        if (res.status === 403) alert('이메일인증을 진행해주세요');
        if (res.status === 400) alert('이메일 중복 및 빈칸을 확인해주세요');
        if (res.status === 200) {
          alert('회원가입에 성공하셨습니다');
          history.push('/login');
        }
        // if (res.status === 500) alert('회원가입을 다시 진행해주세요');
      });
  };

  //fileUpload 컴포넌트에서 url 가져오기 위한 함수
  const imgStore = (img: String) => {
    setImg(img);
  };

  return (
    <Wrapper>
      <Title>SIGN-UP</Title>
      <FileUpload imgStore={imgStore} />
      <Container>
        <Div>
          <Label>이름(실명)</Label>
          <Input onChange={e => handleInput(e, 'name')} />
        </Div>
        <Div>
          <Label>이메일</Label>
          <Input onChange={e => handleInput(e, 'email')} />
          <EmailBtn onClick={emailVerification}>인증</EmailBtn>
        </Div>
        <Div>
          <Label>비밀번호</Label>
          <Input
            onChange={e => handleInput(e, 'password')}
            placeholder="  영소문자,숫자 혼합, 8자리 이상"
          />
        </Div>
        <Div>
          <Label>비밀번호 확인</Label>
          <Input onChange={e => handleInput(e, 'passwordCheck')} />
        </Div>
        <Div>
          <Label>지점 선택</Label>
          <Select onChange={e => handleInput(e, 'store')}>
            {storeData.map((item: storeList) => {
              return <Option>{item.name}</Option>;
            })}
          </Select>
        </Div>
        <AccountBtn onClick={handleAccount}>CREATE ACCOUNT</AccountBtn>
      </Container>
    </Wrapper>
  );
};

export default withRouter(SignUpBox);

const Wrapper = styled.div`
  width: 380px;
  height: 550px;
  background-color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  margin-bottom: 35px;
  color: orange;
  font-size: 20px;
  font-weight: bold;
`;

const Container = styled.div`
  margin: 0 auto;
`;

const Div = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const Label = styled.label`
  font-size: 12px;
  margin-right: 5px;
`;

const Input = styled.input`
  width: 200px;
  height: 35px;
  background-color: lightgray;
  /* border: 1px solid red; */
`;

const EmailBtn = styled.button`
  height: 35px;
  color: white;
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 12px;
  background-color: orange;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: orangered;
  }
`;

const Select = styled.select`
  width: 200px;
  height: 35px;
  background-color: lightgray;
  &:focus {
    outline: none;
  }
`;

const Option = styled.option``;

const AccountBtn = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  height: 30px;
  background-color: orange;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: orangered;
  }
`;
