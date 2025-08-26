"use client";
import axios from "axios";
import { useAppSelector } from "components/Others/HelperRedux";
import showToast from "components/Toaster/Toaster";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ProtectedRoute from "hooks/AuthHookAdmin";

interface IComment {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  status?: string;
}

const Comments = ({ currentComments }: { currentComments: any[] }) => {
  const loggedInUser = useAppSelector(
    (state: any) => state.usersSlice?.loggedInUser
  );
  const canEditBlog =
    loggedInUser?.role === "Admin" ? loggedInUser?.canEditBlog : true;

  const token = Cookies.get("2guysAdminToken");
  const superAdminToken = Cookies.get("superAdminToken");
  const finalToken = token || superAdminToken;
  const headers = {
    authorization: `Bearer ${finalToken}`,
  };

  const [disabledButtons, setDisabledButtons] = useState<{
    [key: number]: boolean;
  }>({});
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

  const handleApprove = async (id: number, comment: any, item: any) => {
    updateCommentStatus(comment.id, item.id, "APPROVED");
    setDisabledButtons((prev) => ({ ...prev, [comment.id]: true }));

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/comment/status/${comment.id}`,
        { status: "APPROVED" },
        { headers }
      );
      showToast("success", "Comment approved successfully 🎉");
    } catch (error) {
      console.error("Error approving the comment:", error);
      showToast("error", "Failed to approve the comment 😢");
      updateCommentStatus(comment.id, item.id, "PENDING");
    } finally {
      setTimeout(() => {
        setDisabledButtons((prev) => ({ ...prev, [comment.id]: false }));
      }, 2000);
    }
  };

  const handleReject = async (id: number, comment: any, item: any) => {
    updateCommentStatus(comment.id, item.id, "REJECTED");
    setDisabledButtons((prev) => ({ ...prev, [comment.id]: true }));

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/comment/status/${comment.id}`,
        { status: "REJECTED" },
        { headers }
      );
      showToast("success", "Comment rejected successfully ❌");
    } catch (error) {
      console.error("Error rejecting the comment:", error);
      showToast("error", "Failed to reject the comment 😢");
      updateCommentStatus(comment.id, item.id, "PENDING");
    } finally {
      setTimeout(() => {
        setDisabledButtons((prev) => ({ ...prev, [comment.id]: false }));
      }, 2000);
    }
  };

  const updateCommentStatus = (
    commentId: number,
    itemId: number,
    newStatus: string
  ) => {
    setComments((prevComments) =>
      prevComments.map((item) =>
        item.id === itemId
          ? {
              ...item,
              comments: item.comments.map((comment: IComment) =>
                comment.id === commentId
                  ? { ...comment, status: newStatus }
                  : comment
              ),
            }
          : item
      )
    );
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
          new Date(comment.createdAt)
            .toLocaleString()
            .toLowerCase()
            .includes(term))
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
        <h5 className="font-semibold text-gray-800 dark:text-gray-200">
          {comment.name}
        </h5>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {comment.createdAt &&
            new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow">
        {comment.description}
      </p>

      {/* Actions */}
      <div className="flex gap-3 mt-5">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition 
            ${
              disabledButtons[comment.id]
                ? "bg-gray-400 cursor-not-allowed"
                : !canEditBlog || comment.status === "APPROVED"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-green-700 hover:scale-105 text-white shadow-md"
            }`}
          onClick={() => handleApprove(comment.id, comment, item)}
          disabled={
            !canEditBlog ||
            comment.status === "APPROVED" ||
            disabledButtons[comment.id]
          }
        >
          ✅ Approve
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition 
            ${
              disabledButtons[comment.id]
                ? "bg-gray-400 cursor-not-allowed"
                : !canEditBlog || comment.status === "REJECTED"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-red-500 to-red-700 hover:scale-105 text-white shadow-md"
            }`}
          onClick={() => handleReject(comment.id, comment, item)}
          disabled={
            !canEditBlog ||
            comment.status === "REJECTED" ||
            disabledButtons[comment.id]
          }
        >
          ❌ Reject
        </button>
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

  const sections = ["PENDING", "APPROVED", "REJECTED"];

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <input
          className="w-full sm:w-1/2 px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 
                     bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 
                     text-gray-800 dark:text-gray-200 placeholder-gray-400
                     focus:outline-none focus:ring-1 focus:ring-secondary transition-all"
          type="search"
          placeholder="Search comments..."
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
            <h2 className="text-lg font-bold mb-4 text-gray-700 dark:text-gray-200">
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
