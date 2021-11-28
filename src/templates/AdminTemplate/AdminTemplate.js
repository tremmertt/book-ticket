import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  UserOutlined,
  VideoCameraOutlined,
  VideoCameraAddOutlined,
} from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import _ from "lodash";
import { history } from "../../App";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminTemplate = (props) => {
  //path, exact, Component

  const { Component, ...restProps } = props;
  const { userLogin } = useSelector((state) => state.ManageUserReducer);

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    // console.log(collapsed);
    setCollapsed(collapsed);
  };

  //   const toggle = () => {
  //     this.setState({
  //       collapsed: !this.state.collapsed,
  //     });
  //   };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (!localStorage.getItem(USER_LOGIN)) {
    alert("You do not have permission to access this page!");
    return <Redirect to="/" />;
  }

  if (userLogin.maLoaiNguoiDung !== "QuanTri") {
    alert("You do not have permission to access this page!");
    return <Redirect to="/" />;
  }

  const operations = (
    <Fragment>
      {!_.isEmpty(userLogin) ? (
        <Fragment>
          {" "}
          <button
            onClick={() => {
              history.push("/profile");
            }}
          >
            {" "}
            <div
              style={{
                width: 50,
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="text-2xl ml-3 mr-3 rounded-full bg-red-200"
            >
              {userLogin.taiKhoan.substr(0, 1)}
            </div>
          </button>{" "}
          <button
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              history.push("/home");
              window.location.reload();
            }}
            className="text-blue-800"
          >
            Log Out
          </button>{" "}
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //props.location,props.history,props.match

        return (
          <Fragment>
            <Layout style={{ minHeight: "100vh" }}>
              <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo p-5">
                  <Link to="/">
                    <img
                      src="https://khothietke.net/wp-content/uploads/2021/03/PNG00345-phim-truong-cuon-phim-png.png"
                      alt="..."
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Link>
                </div>
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                  <SubMenu key="sub1" icon={<UserOutlined />} title="Users">
                    <Menu.Item key="1" icon={<UserOutlined />}>
                      <NavLink to="/admin/users">Users</NavLink>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<FileOutlined />}>
                      <NavLink to="/admin/users/addnew">Add new</NavLink>
                    </Menu.Item>
                  </SubMenu>

                  <SubMenu key="sub2" icon={<FileOutlined />} title="Films">
                    <Menu.Item key="10" icon={<VideoCameraOutlined />}>
                      <NavLink to="/admin/films">Films</NavLink>
                    </Menu.Item>
                    <Menu.Item key="11" icon={<VideoCameraAddOutlined />}>
                      <NavLink to="/admin/films/addnew">Add new</NavLink>
                    </Menu.Item>
                  </SubMenu>
                  {/* <Menu.Item key="3" icon={<DesktopOutlined />}>
                    <NavLink to="/admin/films/showtime/:id/:tenPhim">
                      Showtime
                    </NavLink>
                  </Menu.Item> */}

                  {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9" icon={<FileOutlined />}>
                            Files
                        </Menu.Item> */}
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="site-layout-background"
                  style={{
                    padding: 0,
                    backgroundColor: "#fff",
                    // alignItems: "center",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <div className="text-right pr-10 pt-1">{operations}</div>
                  {/* {React.createElement(
                    this.state.collapsed
                      ? MenuUnfoldOutlined
                      : MenuFoldOutlined,
                    {
                      className: "trigger",
                      onClick: this.toggle,
                    }
                  )} */}
                </Header>
                <Content style={{ margin: "0 16px" }}>
                  <Breadcrumb style={{ margin: "16px 0" }}>
                    {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
                  </Breadcrumb>
                  <div
                    className="site-layout-background"
                    style={{
                      padding: 24,
                      minHeight: "85vh",
                      backgroundColor: "white",
                    }}
                  >
                    <Component {...propsRoute} />
                  </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  Ant Design ©2018 Created by Ant UED
                </Footer>
              </Layout>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
};

export default AdminTemplate;
