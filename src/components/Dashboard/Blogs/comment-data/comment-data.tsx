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
  const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);
  const canEditBlog =
    loggedInUser && (loggedInUser.role == "Admin" ? loggedInUser.canEditBlog : true);

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
          status: comment.status || "pending",
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
      updateCommentStatus(comment.id, item.id, "pending");
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
      showToast("success", "Comment rejected successfully 🎉");
    } catch (error) {
      console.error("Error rejecting the comment:", error);
      showToast("error", "Failed to reject the comment 😢");
      updateCommentStatus(comment.id, item.id, "pending");
    } finally {
      setTimeout(() => {
        setDisabledButtons((prev) => ({ ...prev, [comment.id]: false }));
      }, 2000);
    }
  };


  const updateCommentStatus = (commentId: number, itemId: number, newStatus: string) => {
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
  };

  const filterComments = (item: any) => {
    const term = searchTerm.toLowerCase();

    const hasComments = item.comments && item.comments.length > 0;
    if (!hasComments) return false;
    const titleMatch = item.title.toLowerCase().includes(term);
    const commentMatches = item.comments.some((comment: any) =>
      comment.name.toLowerCase().includes(term) ||
      comment.description.toLowerCase().includes(term) ||
      (comment.createdAt && new Date(comment.createdAt).toLocaleString().toLowerCase().includes(term))
    );

    return titleMatch || commentMatches;
  };

  return (
    <>
      <div className="flex justify-between mb-4 items-center flex-wrap text-black dark:text-white">
        <input
              className="search_input"
              type="search"
              placeholder="Search Product"
              value={searchTerm}
              onChange={handleSearchChange}
            />
      </div>

      <div className="w-full">
        <div className="p-2 bg-primary rounded-md">
          {comments && comments.length > 0 ? (
            comments.map((item: any) => {
              if (!filterComments(item)) return null;

              return (
                <div key={item.id} className="mt-4 leading-8 border p-2 bg-white rounded-md shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="text-2xl font-semibold">{item.title || "No Title"}</h5>
                    <span className="text-darkgrey">
                      {item?.createdAt ? new Date(item.createdAt).toLocaleString() : ''}
                    </span>
                  </div>
                  <div className="pl-6 border-l-2 mt-4">
                    {item.comments.map((comment: any) => (
                      <div key={comment.id} className="mt-4">
                        <div className="flex justify-between items-center">
                          <h5 className="text-lg font-semibold">{comment.name}</h5>
                          <span className="text-darkgrey">
                            {comment.createdAt && new Date(comment.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="leading-normal text-darkgrey text-base mb-4">
                          {comment.description}
                        </p>
                        <div className="flex gap-4 mb-4">
                          <button
                            className={`text-white px-4 py-1 rounded ${disabledButtons[comment.id]
                              ? "bg-gray-400"
                              : !canEditBlog || comment.status === "APPROVED"
                                ? "bg-gray-400"
                                : "bg-green-600"
                              }`}
                            onClick={() => handleApprove(comment.id, comment, item)}
                            disabled={!canEditBlog || comment.status === 'APPROVED' || disabledButtons[comment.id]}
                          >
                            Approve
                          </button>
                          <button
                            className={`text-white px-4 py-1 rounded ${disabledButtons[comment.id]
                              ? "bg-gray-400"
                              : !canEditBlog || comment.status === "REJECTED"
                                ? "bg-gray-400"
                                : "bg-red-600"
                              }`}
                            onClick={() => handleReject(comment.id, comment, item)}
                            disabled={!canEditBlog || comment.status === 'REJECTED' || disabledButtons[comment.id]}
                          >
                            Reject
                          </button>
                        </div>

                        <div className="mt-2 text-sm text-gray-500">
                          Status: {comment.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No comments available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProtectedRoute(Comments);
