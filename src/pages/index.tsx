import React from 'react';
import PokedexList from '../components/pokedexList';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, VideoCameraOutlined, UploadOutlined, } from '@ant-design/icons';
import './styles.css';

const { Header, Footer, Sider, Content } = Layout;

const Pokedex = (): React.ReactElement => {
  const [collapsed, setCollapsed] = React.useState<boolean>(false);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Pokedex
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            Search
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            To define
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <PokedexList />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Pokedex practice ©2021 Created by Gera</Footer>
      </Layout>
    </Layout>
  );
};

export default Pokedex;