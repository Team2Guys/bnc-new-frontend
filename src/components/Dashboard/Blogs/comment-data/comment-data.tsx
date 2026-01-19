"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ProtectedRoute from "hooks/AuthHookAdmin";
import { showAlert } from "utils/Alert";

interface IComment {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  status?: string;
}

const Comments = ({ currentComments }: { currentComments: any[] }) => {
  const token = Cookies.get("2guysAdminToken");
  const superAdminToken = Cookies.get("superAdminToken");
  const finalToken = token || superAdminToken;
  const headers = {
    authorization: `Bearer ${finalToken}`,
  };

  const [disabledButtons, setDisabledButtons] = useState<{ [key: number]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [comments, setComments] = useState(currentComments);

  useEffect(() => {
    setComments(
      currentComments.map((item) => ({
        ...item,
        comments: item.comments.map((comment: IComment) => ({
          ...comment,
          status: comment.status || "PENDING",
        })),
      }))
    );
  }, [currentComments]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const updateCommentStatus = async (commentId: number, itemId: number, newStatus: string) => {
    setComments((prevComments) =>
      prevComments.map((item) =>
        item.id === itemId
          ? {
              ...item,
              comments: item.comments.map((comment: IComment) =>
                comment.id === commentId ? { ...comment, status: newStatus } : comment
              ),
            }
          : item
      )
    );

    setDisabledButtons((prev) => ({ ...prev, [commentId]: true }));

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/comment/status/${commentId}`,
        { status: newStatus },
        { headers }
      );
      showAlert({
        title: newStatus === "APPROVED" ? "Comment approved 🎉" : "Comment rejected ❌",
        icon: "success",
      });
    } catch (error) {
      console.error("Error updating comment status:", error);
      showAlert({ title: "Failed to update comment 😢", icon: "error" });
    } finally {
      setTimeout(() => {
        setDisabledButtons((prev) => ({ ...prev, [commentId]: false }));
      }, 2000);
    }
  };

  const filterComments = (item: any) => {
    const term = searchTerm.toLowerCase();
    if (!item.comments || item.comments.length === 0) return false;

    const titleMatch = item.title.toLowerCase().includes(term);
    const commentMatches = item.comments.some(
      (comment: any) =>
        comment.name.toLowerCase().includes(term) ||
        comment.description.toLowerCase().includes(term) ||
        (comment.createdAt &&
          new Date(comment.createdAt).toLocaleString().toLowerCase().includes(term))
    );

    return titleMatch || commentMatches;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-md";
      case "REJECTED":
        return "bg-gradient-to-r from-red-400 to-red-600 text-white shadow-md";
      default:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-md";
    }
  };

  const renderCommentCard = (comment: any, item: any) => (
    <div
      key={comment.id}
      className="p-6 rounded-2xl shadow-lg border border-gray-200 
               bg-gradient-to-br from-white via-gray-50 to-gray-100 
               dark:from-gray-800 dark:via-gray-900 dark:to-black
               hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h5 className="font-semibold dark:text-white">{comment.name}</h5>
        <span className="text-xs dark:text-white">
          {comment.createdAt && new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm dark:text-white flex-grow">{comment.description}</p>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-6">
        <h3 className="text-sm font-semibold dark:text-white">Status:</h3>
        <div className="flex gap-3">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition 
              ${
                disabledButtons[comment.id]
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-green-700 text-white hover:scale-105 shadow-md"
              }`}
            onClick={() => updateCommentStatus(comment.id, item.id, "APPROVED")}
            disabled={disabledButtons[comment.id]}
          >
            ✅ Approve
          </button>

          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition 
              ${
                disabledButtons[comment.id]
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-red-700 text-white hover:scale-105 shadow-md"
              }`}
            onClick={() => updateCommentStatus(comment.id, item.id, "REJECTED")}
            disabled={disabledButtons[comment.id]}
          >
            ❌ Reject
          </button>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mt-4">
        <span
          className={`px-4 py-1 rounded-full text-xs font-bold tracking-wide ${getStatusBadge(
            comment.status
          )}`}
        >
          {comment.status}
        </span>
      </div>
    </div>
  );

  const sections = ["APPROVED", "REJECTED", "PENDING"];

  return (
    <div className="space-y-8">
      <div className="flex justify-start">
        <input
          className="search_input"
          type="search"
          placeholder="Search Comments"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((status) => (
          <div
            key={status}
            className="p-4 rounded-xl border dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
          >
            <h2 className="text-lg font-bold mb-4 dark:text-white">
              {status} Comments
            </h2>
            <div className="space-y-4">
              {comments.map((item: any) => {
                if (!filterComments(item)) return null;
                return item.comments
                  .filter((c: any) => c.status === status)
                  .map((comment: any) => renderCommentCard(comment, item));
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProtectedRoute(Comments);
