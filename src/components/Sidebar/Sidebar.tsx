import React from 'react';
import {
  SidebarItem,
  SidebarItemLink,
  SidebarList,
  SidebarNav,
} from './Sidebar.styled';
import { GoSearch } from 'react-icons/go';
import { MdOutlineLibraryAdd } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import { RiRobot2Line } from 'react-icons/ri';
import { ImExit } from 'react-icons/im';
import { MdFavoriteBorder } from 'react-icons/md';
import logo from 'img/Logo.svg';
import { useNavigate } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');

    navigate('/auth');
  };

  return (
    <SidebarNav>
      <SidebarItemLink to="/">
        <img src={logo} alt="logo" />
      </SidebarItemLink>
      <hr
        style={{
          height: '5px',
          backgroundColor: 'rgba(120, 118, 118, 0.7)',
          width: '100%',
          border: 'none',
        }}
      />
      <SidebarList>
        <SidebarItemLink to="/">
          <SidebarItem>
            <RiRobot2Line />
          </SidebarItem>
        </SidebarItemLink>
        <SidebarItemLink to="/">
          <SidebarItem>
            <RxAvatar />
          </SidebarItem>
        </SidebarItemLink>
        <SidebarItemLink to="/">
          <SidebarItem>
            <MdOutlineLibraryAdd />
          </SidebarItem>
        </SidebarItemLink>
        <SidebarItemLink to="/search">
          <SidebarItem>
            <GoSearch />
          </SidebarItem>
        </SidebarItemLink>
        <SidebarItemLink to="/favorite">
          <SidebarItem>
            <MdFavoriteBorder />
          </SidebarItem>
        </SidebarItemLink>
        <SidebarItemLink
          to="/"
          style={{ marginTop: 'auto' }}
          onClick={handleLogout}
        >
          <SidebarItem>
            <ImExit />
          </SidebarItem>
        </SidebarItemLink>
      </SidebarList>
    </SidebarNav>
  );
};
