import React from "react";
import {
  Button,
  Col,
  Flex,
  Layout,
  Row,
  Select,
  Typography,
  message,
} from "antd";
import { apis } from "./apis";

const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [type, setType] = React.useState("");
  const [news, setNews] = React.useState([]);

  const SearchNews = async () => {
    try {
      if (type === "") {
        messageApi.open({
          type: "warning",
          content: "Please select one of website links!",
        });
      } else {
        const response: any = await apis.ScrapeNews(type);
        if (response.success) {
          setNews(response.news);
        }
      }
    } catch (err: any) {
      messageApi.open({
        type: "error",
        content: err.response.data.message || "Server error!",
      });
    }
  };

  return (
    <Layout.Content
      style={{
        margin: "auto",
        padding: 20,
        maxWidth: 800,
      }}
    >
      {contextHolder}
      <Row>
        <Col span={24}>
          <Typography.Title
            level={1}
            style={{ textAlign: "center", marginBottom: 30 }}
          >
            Gold & Silver news
          </Typography.Title>
        </Col>
        <Col span={18}>
          <Select
            value={type}
            onChange={(value: string) => setType(value)}
            style={{ width: "100%" }}
          >
            <Select.Option value="financial_times">
              Financial Times (www.ft.com)
            </Select.Option>
          </Select>
        </Col>
        <Col span={6}>
          <Flex justify="flex-end">
            <Button onClick={SearchNews}>SCRAPE</Button>
          </Flex>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default App;
