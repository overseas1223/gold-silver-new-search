import { Image } from "antd";

const FinancialTimes = [
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
        title: "Date",
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
];

export const column = {
    FinancialTimes
}