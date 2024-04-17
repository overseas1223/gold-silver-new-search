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
  Image,
} from "antd";
import { apis } from "./apis";

const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [type, setType] = React.useState("");
  const [news, setNews] = React.useState([]);
  // const [columns, setColumns] = React.useState([]);
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
  const columns = [
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (_: any, ele: any) => (
        <a href={ele.link} target="_blank">
          {ele.title}
        </a>
      ),
    },
    {
      title: "PostedAt",
      dataIndex: "date",
      key: "date",
      render: (text: string) => <span>{new Date(text).toLocaleString()}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text: string) => <Image width={200} src={text} />,
    },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];

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
