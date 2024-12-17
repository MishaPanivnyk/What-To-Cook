import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const SidebarNav = styled.nav`
  width: 70px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 10px;
  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 30px rgba(227, 228, 237, 0.37);
  border: 2px solid rgba(255, 255, 255, 0.18);
  @media only screen and (min-width: 768px) {
  }

  @media only screen and (min-width: 1440px) {
  }
`;
export const SidebarList = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  @media only screen and (min-width: 768px) {
  }

  @media only screen and (min-width: 1440px) {
  }
`;

export const SidebarItem = styled.li`
  margin: 10px 0;
  svg {
    color: white;
    width: 20px;
    height: 20px;

    transition: all 0.2s ease-in-out;
    @media only screen and (min-width: 768px) {
      width: 40px;
      height: 40px;
    }
    &:hover,
    &:focus {
      color: red;
    }
  }
  @media only screen and (min-width: 768px) {
  }

  @media only screen and (min-width: 1440px) {
  }
`;
export const SidebarItemLink = styled(NavLink)`
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
    transform: scale(1.2);
  }

  @media only screen and (min-width: 768px) {
  }

  @media only screen and (min-width: 1440px) {
  }
`;
