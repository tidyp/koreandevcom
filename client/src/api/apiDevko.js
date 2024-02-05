const API_URL = "http://localhost:3000/api";

// Reads: 전체 게시글 조회
export async function readPosts() {
  try {
    const res = await fetch(`${API_URL}/post`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
}

// Reads: Discuss 게시글 조회
export async function readDiscussPosts(id) {
  try {
    const res = await fetch(`${API_URL}/post/discuss/page/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
}
// Reads: Qna 게시글 조회
export async function readQnaPosts(id) {
  try {
    const res = await fetch(`${API_URL}/post/qna/page/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
}

// Reads: Article 게시글 조회
export async function readArticlePosts() {
  try {
    const res = await fetch(`${API_URL}/post/articles`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
}

// Reads: Event 게시글 조회
export async function readEventPosts(id) {
  try {
    const res = await fetch(`${API_URL}/calendar`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
}

// Reads: Team 게시글 조회
export async function readTeamsPosts(id) {
  try {
    const res = await fetch(`${API_URL}/post/teams/page/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
}

// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

// Read: 게시글 조회
export async function readPost(id) {
  try {
    const res = await fetch(`${API_URL}/post/discuss/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
}
export async function readComments(id) {
  try {
    const res = await fetch(`${API_URL}/post/discuss/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
}

// Read: Post detail 게시글 조회
export async function readDetailPost(category, id) {
  console.log(category, id)
  try {
    const [detailResponse, commentsResponse] = await Promise.all([
      fetch(`${API_URL}/post/${category}/${id}`),
      fetch(`${API_URL}/comment/${category}/${id}`),
    ]);
    if (!detailResponse.ok) {
      throw new Error(
        `Failed to fetch qna details. Status: ${detailResponse.status}`,
      );
    }
    if (!commentsResponse.ok) {
      throw new Error(
        `Failed to fetch comments. Status: ${commentsResponse.status}`,
      );
    }
    console.log(detailResponse);
    const detailData = await detailResponse.json();
    const commentsData = await commentsResponse.json();

    return { discussDetail: detailData, discussComments: commentsData };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
}

// Read: Discuss 게시글 조회

export async function readDiscussComments(id) {
  try {
    const res = await fetch(`${API_URL}/comment/discuss/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
}

// Create: 게시글 작성
export async function createPost(postData) {
  const res = await fetch(`${API_URL}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!res.ok) {
    throw new Error(`Failed to create post. Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
}
// Create: 그룹 게시글 작성
export async function createGroupPost(postData) {
  const res = await fetch(`${API_URL}/team`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!res.ok) {
    throw new Error(`Failed to create post. Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
}

// Update: 게시글 수정
export async function updatePost(params) {
  const url = `${API_URL}/post/${params.category}/${params.postId}`;
  console.log(url);
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: params.userId,
      title: params.title,
      content: params.content,
    }),
  });
  console.log(res);

  if (!res.ok) {
    throw new Error(`Failed to create post. Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
}

// Delete: 게시글 삭제
export async function deletePost(category, id) {
  const res = await fetch(`${API_URL}/post/${category}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // id: params.id,
      // title: params.title,
      // content: params.content,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to create post. Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
}

// Read: user/:id
export async function readUser(id) {
  const res = await fetch(`${API_URL}/user/${id}`);
  const data = await res.json();
  return data;
}

// 검색결과

export async function searchResult(id) {
  try {
    const res = await fetch(`${API_URL}/search/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
}

// Create: 댓글 작성
export async function createComment({
  postId,
  userId,
  commentId,
  commentContent,
  category,
}) {
  const res = await fetch(`${API_URL}/comment/${commentId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId,
      userId,
      commentId,
      content: commentContent,
      category: category,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to create post. Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
}

export async function updateComment() {
  const res = await fetch(`${API_URL}/comment/:id`);
  const data = await res.json();
  return data;
}

// 댓글 삭제
export async function deleteComment(id) {
  const res = await fetch(`${API_URL}/comment/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
}

// READ: userinfo
// -----------------------------------------------------------------
export async function readUserinfo(id) {
  try {
    const res = await fetch(`${API_URL}/profile/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
}

// // READ: Event
// // -----------------------------------------------------------------
// export async function readEventPosts() {
//   try {
//     const res = await fetch(`${API_URL}/calendar`);
//     if (!res.ok) {
//       throw new Error(`Failed to fetch data. Status: ${res.status}`);
//     }
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     throw error;
//   }
// }
