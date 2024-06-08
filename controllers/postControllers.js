let posts = [
  {
    id: 1,
    title: "Post 1",
  },
  {
    id: 2,
    title: "Post 2",
  },
  {
    id: 3,
    title: "Post 3",
  },
];

// @desc Get all posts
// @route GET /api/posts
const getPosts = (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
};

// @desc Get single post
// @route GET /api/posts/:id
const getPost = (req, res, next) => {
  const id = req.params.id;
  const post = posts.find((post) => post.id == id);
  if (!post) {
    const error = new Error(`Post not found with id ${id}`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json({ post, status: "success" });
};

// @desc Create new post
// @route POST /api/posts
const createPost = (req, res, next) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };
  if (!newPost.title) {
    const error = new Error(`Please add a title to the post`);
    error.status = 400;
    return next(error);
  }
  posts.push(newPost);
  res.status(201).json({ posts, status: "success" });
};

// @desc Update post
// @route PUT /api/posts/:id
const updatePost = (req, res, next) => {
  const id = req.params.id;
  const post = posts.find((post) => post.id == id);
  if (!post) {
    const error = new Error(`Post not found with id ${id}`);
    error.status = 404;
    return next(error);
  }
  post.title = req.body.title;
  res.status(200).json({ post, status: "success" });
};

// @desc Delete post
// @route DELETE /api/posts/:id
const deletePost = (req, res, next) => {
  const id = req.params.id;
  const post = posts.find((post) => post.id == id);
  if (!post) {
    const error = new Error(`Post not found with id ${id}`);
    error.status = 404;
    return next(error);
  }
  posts = posts.filter((post) => post.id != id);
  res.status(200).json({ posts, status: "success" });
};

export { getPosts, getPost, createPost, updatePost, deletePost };
