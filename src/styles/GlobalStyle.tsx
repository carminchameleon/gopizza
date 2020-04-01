import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap');
${reset}
*{
    box-sizing:border-box;
}
body{
    background-color:#ffffff;
    font-family: 'Noto Sans KR', sans-serif;
    color:black;

}
a {
    color:inherit;
    text-decoration:none;
    cursor: pointer;
}
input, button {
    background-color: transparent;
    border: none;
    outline: none;
}
ol, ul, li {
    list-style:none;
}
img {
    display: block;
    width: 100%;
    height: 100%;
}
`;

export default GlobalStyle;
