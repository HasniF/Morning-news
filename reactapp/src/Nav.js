import React from 'react';
import { Link } from 'react-router-dom';
import {Menu, Icon} from 'antd'

import './App.css';



function Nav() {

  return (
    <nav >
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

        <Menu.Item key="home">
          <Link to='/sources'>
          	<Icon type="home" />Sources
          </Link>
         </Menu.Item>

        <Menu.Item key="read">
          <Link to='/myarticles'>
          	<Icon type="read" />My Articles
          </Link>
        </Menu.Item>

        <Menu.Item key="logout">
         <Link to='/'>
          <Icon type="logout" />Logout
         </Link>
        </Menu.Item>

      </Menu>
    </nav>
  );
}

export default Nav;
