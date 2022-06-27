import "./index.less";
import { ChangeEvent, useEffect, useState } from "react";
import { Input, Button, Tooltip, Avatar, Pagination } from "antd";
import { AtIcon } from "../../../assets/svg";
import { BorderlessTableOutlined } from "@ant-design/icons";
import { getPlaylistComment } from "../../../apis/playlist";
import { Comment as CommentType } from "../../../interface";
import CommentComponent from "../../../components/Comment";
const { TextArea } = Input;
export default function Comment({ pid }: { pid: string }) {
  const [value, setValue] = useState("");
  const [comment, setComment] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getPlaylistComment(pid, page).then((res) => {
      setComment(res.comments);
      setTotal(res.total);
    });
  }, [page]);
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="comment">
      <div className="comment-container">
        {comment.map((item: CommentType, index) => (
          <CommentComponent
            likeCount={item.likedCount}
            hasLiked={item.liked}
            key={index}
            author={item.user.nickname}
            avatar={
              <Avatar
                src={item.user.avatarUrl}
                alt={item.user.nickname}
                size="large"
                className="tl-avatar"
              />
            }
            content={item.content}
          />
        ))}
      </div>
      <div className="comment-head px-12">
        <TextArea
          showCount
          maxLength={140}
          value={value}
          onChange={onChange}
          autoSize={{ minRows: 3 }}
        />
        <br />
        <div className="flex-side-center" style={{ marginTop: 5 }}>
          <div className="text-xl">
            <AtIcon
              style={{ minWidth: 20, minHeight: 20, marginRight: "21px" }}
            />
            <BorderlessTableOutlined />
          </div>
          <Button shape="round">评论</Button>
        </div>
      </div>
      <Pagination
        hideOnSinglePage
        total={total}
        defaultPageSize={20}
        current={page}
        pageSize={20}
        showSizeChanger={false}
        onChange={(page) => setPage(page)}
        className="flex justify-center"
      />
    </div>
  );
}
