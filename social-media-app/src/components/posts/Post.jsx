//src/components/posts/Post.jsx
import React, { useContext } from "react";
import { LikeFilled,
    CommentOutlined,
    LikeOutlined, MoreOutlined} from '@ant-design/icons';
import { Image, Card, Dropdown, } from "react-bootstrap";
import { Context } from "../Layouts";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import UpdatePost from "./UpdatePost";
import { Link } from "react-router-dom";
import Moment from 'moment';

const MoreToggleIcon = React.forwardRef(({ onClick }, ref) => (
    <a
    href = "#"
    ref = {ref}
    onClick = {(e) => {
        e.preventDefault();
        onClick(e);
    }}
    >
        <MoreOutlined />
    </a>
));

function Post (props) {
    //The refresh function will come from SWR posts.
    //SWR return an object with a mutate method that
    //can be used to trigger the fetching of data.
    const { post, refresh, isSinglePost } = props;
    const { setToaster } = useContext(Context);

    const handleLikeClick = (action) => {
        axiosService.post(`/post/${post.id}/${action}/`)
        .then(() => {
            refresh();
        })
        .catch((err) => console.error(err));
    };

    const user = getUser();

    const handleDelete = () => {
        axiosService.delete(`/post/${post.id}/`)
        .then(() => {
            setToaster({
                type: "warning",
                message: "Post deleted",
                show: true,
                title: "Post Deleted",
            })
            refresh();
        })
        .catch(() => {
            setToaster({
                type: "danger",
                message: "An error occurred.",
                show: true,
                title: "Post Error",
            })
        });
    }


    return (
        <>
            <Card className = "rounded-3 my-4">
                <Card.Body>
                    <></>
                    <Card.Title
                    className = "d-flex flex-row justify-content-between">
                        <div className = "d-flex flex-row">
                            <Image
                            src = {post.author.avatar}
                            roundedCircle
                            width = {48}
                            height = {48}
                            className = "me-2 border border-primary border-2"/>
                            <div
                            className = {"d-flex " +
                                        "flex-column " +
                                        "justify-content-start" +
                                        " align-self-center mt-2"}>
                                
                                <p className = "fs-6 m-0">
                                    {post.author.first_name} {post.author.last_name}
                                </p>
                                <p className = "fs-6 fw-leighter">
                                    <small>
                                        {Moment(post.created).format('dd MMM YY hh:mm:ss')}
                                    </small>
                                </p>
                            </div>
                        </div>
                        {user.email === post.author.email && (
                            <div>
                                <Dropdown>
                                    <Dropdown.Toggle as = {MoreToggleIcon}>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                            
                                            <UpdatePost
                                            post = {post}
                                            refresh = {refresh} />
                                            
                                        <Dropdown.Item
                                        onClick = {handleDelete}
                                        className = "text-danger">
                                            Delete
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        )}
                    </Card.Title>
                    <Card.Text>
                        {post.body}
                    </Card.Text>
                    <div className = "d-flex flex-row">
                        <LikeFilled
                        style = {{
                            color: "#fff",
                            backgroundColor: "#0D6EFD",
                            borderRadius: "50%",
                            width: "18px",
                            height: "18px",
                            fontSize: "75%",
                            padding: "2px",
                            margin: "3px",
                        }}/>
                        <p className = "ms-1 fs-6">
                            <small>
                                {post.likes_count} like
                            </small>
                        </p>
                    </div>
                </Card.Body>
                <Card.Footer className = {"d-flex bg-white w-50 " +
                                            "justify-content-between "+
                                            "border-0"
                }>
                    <div className = "d-flex flex-row">
                        <LikeOutlined 
                        style = {{
                            width: "24px",
                            height: "24px",
                            padding: "2px",
                            fontsize: "20px",
                            color: post.liked ? "#0D6EFD" : "#C4C4C4",
                        }}
                        onClick = {() => {
                            if (post.liked) {
                                handleLikeClick("remove_like");
                            } else {
                                handleLikeClick("like");
                            }
                        }}
                        />
                        <p className = "ms-1">
                            <small>
                                Like
                            </small>
                        </p>
                    </div>
                    {!isSinglePost && (
                                        <div className = "d-flex flex-row">
                                            <CommentOutlined
                                            style = {{
                                                width: "24px",
                                                height: "24px",
                                                padding: "2px",
                                                fontSize: "20px",
                                                color: "#0D6EFD",
                                            }}/>
                                            {!isSinglePost && (
                                            <p className = "ms-1 fs-6">
                                                <small>
                                                    <Link to={`/post/${post.id}/`}>
                                                        Comment
                                                    </Link>
                                                </small>
                                            </p>
                                        )}
                                        </div>
                                    )
                }
                </Card.Footer>
            </Card>
        </>
    );
}

export default Post;

