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
  Table,
} from "antd";
import { apis } from "./apis";
import { column } from "./components/Column";

const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [type, setType] = React.useState("");
  const [news, setNews] = React.useState([]);
  const [columns, setColumns] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);

  const SearchNews = async () => {
    try {
      if (type === "") {
        messageApi.open({
          type: "warning",
          content: "Please select one of website links!",
        });
      } else {
        setLoading(true);
        const response: any = await apis.ScrapeNews(type);
        if (response.success) {
          if (type) {
          }
          setNews(response.news);
        }
        setLoading(false);
      }
    } catch (err: any) {
      messageApi.open({
        type: "error",
        content: err?.response?.data?.message || "Server error!",
      });
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setNews([]);
    switch (type) {
      case "financial_times":
        setColumns(column.FinancialTimes)
        break;
      default:
        setColumns(column.FinancialTimes);
        break
    }
  }, [type]);

  return (
    <Layout.Content
      style={{
        margin: "auto",
        padding: 20,
        maxWidth: 1200,
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
            <Select.Option value="gold_playbook">
              Gold Playbook (www.goldplaybook.com)
            </Select.Option>
          </Select>
        </Col>
        <Col span={6}>
          <Flex justify="flex-end">
            <Button onClick={SearchNews} loading={loading}>
              SCRAPE
            </Button>
          </Flex>
        </Col>
        <Col span={24} style={{ marginTop: 20 }}>
          <Table columns={columns} dataSource={news} />
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default App;
