import express from "express";
import {
  createPost,
  deletePost,
  getEdit,
  getNew,
  getPost,
  getPostId,
  updatePost,
  updatePostPatch,
} from "../controllers/blogsController.js";

const router = express.Router();

router.get("/", getPost);//home 
router.get("/posts",getPost);//getall
router.get("/posts/:id",getPostId)//get by id

router.get("/new", getNew);

router.post("/api/posts", createPost);//create

router.get("/posts/edit/:id",getEdit);

router.get("/posts/edit/:id", updatePost);//update
router.get("/posts/edit/:id",updatePostPatch)//update partial
router.delete("/posts/delete/:id", deletePost);


export default router;