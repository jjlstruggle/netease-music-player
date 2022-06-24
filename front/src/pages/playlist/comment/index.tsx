import "./index.less";
import { ChangeEvent, useEffect, useState } from "react";
import { Input, Button, Tooltip, Avatar } from "antd";
import { AtIcon } from "../../../assets/svg";
import { BorderlessTableOutlined } from "@ant-design/icons";
import { getPlaylistComment } from "../../../apis/playlist";
import { Comment as CommentType } from "../../../interface";
import CommentComponent from "../../../components/Comment";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
const { TextArea } = Input;
dayjs.extend(relativeTime);
export default function Comment({ pid }: { pid: string }) {
  const [value, setValue] = useState("");
  const [contentHeight, setContentHeight] = useState(0);
  const [comment, setComment] = useState([]);
  useEffect(() => {
    getPlaylistComment(pid).then((res) => {
      setComment(res.comments);
    });
    let content = document.querySelector("#content")?.clientHeight!;
    let head =
      document.querySelector(".playlist-top")?.clientHeight! +
      document.querySelector(".playlist .ant-tabs-nav")?.clientHeight! +
      document.querySelector(".comment .comment-head")?.clientHeight! +
      36;
    setContentHeight(content - head);
  }, []);
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="comment">
      <div className="comment-head">
        <TextArea
          showCount
          maxLength={140}
          value={value}
          onChange={onChange}
          autoSize={{ minRows: 3 }}
        />
        <br />
        <div className="flex-side-center" style={{ marginTop: 5 }}>
          <div>
            <AtIcon
              style={{ minWidth: 20, minHeight: 20, marginRight: "21px" }}
            />
            <BorderlessTableOutlined style={{ fontSize: 22 }} />
          </div>
          <Button shape="round">评论</Button>
        </div>
      </div>
      <div
        className="comment-container"
        style={{
          height: contentHeight,
        }}
      >
        {comment.map((item: CommentType, index) => (
          <CommentComponent
            likeCount={item.likedCount}
            hasLiked={item.liked}
            key={index}
            author={item.user.nickname}
            avatar={
              <Avatar src={item.user.avatarUrl} alt={item.user.nickname} />
            }
            content={item.content}
            datetime={
              <Tooltip title={dayjs(item.time).format("YYYY-MM-DD HH:mm:ss")}>
                <span>{dayjs().fromNow()}</span>
              </Tooltip>
            }
          />
        ))}
      </div>
    </div>
  );
}
