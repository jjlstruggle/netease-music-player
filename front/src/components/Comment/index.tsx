import { createElement } from "react";
import { Comment as Comments, Tooltip } from "antd";
import { LikeOutlined, LikeFilled, MessageOutlined } from "@ant-design/icons";
import { ShareIcon } from "../../assets/svg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Comment = (props: any) => {
  const like = () => {
    //@ts-ignore
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="点赞">
      <span onClick={like}>
        {createElement(props.hasLiked ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{props.likeCount}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-share" title="分享">
      <span className="text-4xl">
        <ShareIcon />
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-reply" title="回复">
      <span className="text-4xl">
        <MessageOutlined />
      </span>
    </Tooltip>,
  ];

  return (
    <Comments
      author={props.author}
      avatar={props.avatar}
      content={props.content}
      actions={actions}
      datetime={
        <Tooltip title={dayjs().format("YYYY-MM-DD HH:mm:ss")}>
          <span>{dayjs().fromNow()}</span>
        </Tooltip>
      }
    />
  );
};

export default Comment;
