"use client";
import { CommentFormData, Comment } from "@/types/comment";
import { createComment } from "@/utils/create-comment";
import { fetchComments } from "@/utils/fetch-comments";
import React, { JSX, useEffect, useState } from "react";

const Comments = ({ id }: { id: number }): JSX.Element => {
  const initialFormData: CommentFormData = {
    text: "",
    parent_id: null,
  };
  const [formData, setFormData] = useState<CommentFormData>(initialFormData);
  const [commentList, setCommentList] = useState<Comment[] | null>([]);

  useEffect(() => {
    const loadComments = async (id: number) => {
      try {
        const result = await fetchComments(id);
        setCommentList(result);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log("Error: " + error.message);
        } else {
          console.log("An unknown error occurred.");
        }
      }
    };
    loadComments(id);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createComment(formData, id);
      const result = await fetchComments(id);
      setCommentList(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Error: " + error.message);
      } else {
        console.log("An unknown error occurred.");
      }
    }
    setFormData(initialFormData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col p-5">
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          className="border-2 border-gray-300 rounded-md"
          placeholder="დაწერე კომენტარი"
        />
        <br />

        <button
          type="submit"
          className="bg-[#DDD2FF] p-2 rounded cursor-pointer hover:bg-[#d1c7f1] active:scale-95 transition-transform ease-in-out duration-150"
        >
          დააკომენტარე
        </button>
      </form>
      {commentList &&
        commentList.map((comment) => (
          <div key={comment.id}>{comment.text}</div>
        ))}
    </div>
  );
};

export default Comments;
