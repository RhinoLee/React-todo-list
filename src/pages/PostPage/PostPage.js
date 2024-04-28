import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useParams } from "react-router-dom";
import { getPost } from "../../WebAPI";

const Root = styled.div``

const PostContent = styled.div``

export default function PostPage() {
  const [post, setPost] = useState(null)
  const params = useParams()
  
  useEffect(() => {
    getPost(params.postId).then(post => {
      setPost(post[0])
    })
  }, [params.postId])

  return (
    <Root>
      {post && <PostContent>{post.body}</PostContent>}
    </Root>
  )
}
