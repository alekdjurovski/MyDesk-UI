import { Component } from "react/cjs/react.production.min";
import Sidebar from "../../components/Sidebar/Sidebar";
import Layout, { Content } from "antd/lib/layout/layout";
import UserHead from "../../components/Head/UserHead";

class Dashboard extends Component {
  state = {
    reload: false,
  };

  refreshPage = () => {
    this.setState({ reload: true }, () => this.setState({ reload: false }));
  };

  render() {
    return (
      <Layout>
        <UserHead />
        <Layout className="panelBg">
          <Sidebar selected="1" />
          <Content>
            <h1>Dashboard</h1>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default Dashboard;
