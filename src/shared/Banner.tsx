import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  title: String;
  menu1: String;
  menu2?: String;
  menu3?: String;
  menu4?: String;
  routes1: any;
  routes2?: any;
  routes3?: any;
  routes4?: any;
  background: any;
  navBackground: any;
}

const Banner: React.FC<Props> = (props: Props) => {
  return (
    <BannerComponent>
      <BannerContainer style={{ backgroundColor: props.background }}>
        <BannerHolder>
          <BannerTitle>{props.title}</BannerTitle>
        </BannerHolder>
      </BannerContainer>
      <NavConatiner
        style={{
          backgroundColor: props.navBackground,
        }}
      >
        <NavHolder>
          <NavWrapper>
            <NavList>
              <NavLink>
                <Link to={props.routes1}>{props.menu1}</Link>
              </NavLink>
            </NavList>
            <NavList>
              <NavLink>
                <Link to={props.routes2}>{props.menu2}</Link>
              </NavLink>
            </NavList>
            <NavList>
              <NavLink>
                <Link to={props.routes3}>{props.menu3}</Link>
              </NavLink>
            </NavList>
            <NavList>
              <NavLink>
                <Link to={props.routes4}>{props.menu4}</Link>
              </NavLink>
            </NavList>
          </NavWrapper>
        </NavHolder>
      </NavConatiner>
    </BannerComponent>
  );
};

export default Banner;

const BannerComponent = styled.div``;
const NavConatiner = styled.nav`
  width: 100%;
  height: 40px;
  background-color: #a91419;
  font-size: 13px;
  line-height: 15px;
  color: #fff;
  width: 100%;
  text-transform: uppercase;
  margin: 0 0 60px;
`;

const NavHolder = styled.div`
  /* padding: 10px 15px 9px 5px; */
  max-width: 1070px;
  margin: 0 auto;
`;

const NavWrapper = styled.ul`
  position: static !important;
  left: 0 !important;
  top: 0 !important;
  height: auto !important;
  width: auto !important;
  margin: 0 !important;
  padding: 0 !important;
`;

const NavList = styled.li`
  float: left;
  height: 40px;
  padding-top: 10px;
  cursor: pointer;
  :hover {
    background-color: transparent;
    opacity: 50%;
  }
  :acitve {
    opacity: 0.3;
  }
`;

const NavLink = styled.li`
  color: #fff;
  text-decoration: none;
  outline: 0;
  letter-spacing: 1px;
  margin: 0 8px;
`;

const BannerContainer = styled.div`
  background: #333;
  text-align: center;

  position: relative;
  background-color: #ed1941;
`;

const BannerHolder = styled.div`
  max-width: 1090px;
  padding: 61px 15px 22px;
  margin: 0 auto;
  min-height: 180px;
  position: relative;
`;

const BannerTitle = styled.h1`
  font: 4em/1.036em 'Bebas Neue', cursive;
  color: #fff;
  font-weight: 400;
  text-transform: uppercase;
  margin: 0 0 33px;
`;
