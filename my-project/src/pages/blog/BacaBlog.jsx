import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaHeart,
  FaRegCommentDots,
  FaShareAlt,
  FaArrowLeft,
  FaSearch,
} from "react-icons/fa";

const BacaBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1200);
  const [showComments, setShowComments] = useState(false);
  const [newName, setNewName] = useState("");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    { name: "Anonim", text: "Artikel ini sangat membantu!" },
    { name: "Joko", text: "Wah keren banget pembahasannya" },
    { name: "Putri", text: "Tulisannya enak dibaca 😍" },
  ]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:6001/blog/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Gagal ambil blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const highlightKeyword = (text, keyword) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, idx) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <mark
          key={idx}
          className="bg-[#FE8A8A] text-white font-semibold px-1 rounded"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => prev + (liked ? -1 : 1));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: "Baca artikel ini!",
        url: window.location.href,
      });
    } else {
      alert("Fitur berbagi tidak didukung di browser ini.");
    }
  };

  const handleAddComment = () => {
    if (newName.trim() === "" || newComment.trim() === "") return;

    const newCommentObj = {
      name: newName.trim(),
      text: newComment.trim(),
    };

    setComments((prev) => [newCommentObj, ...prev]);
    setNewName("");
    setNewComment("");
  };

  if (!blog) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800 mt-4 mb-10">
      {/* Header Atas */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
        >
          <FaArrowLeft className="text-lg" />
          <span>Kembali</span>
        </button>
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="text-gray-600 hover:text-black"
        >
          <FaSearch className="text-lg" />
        </button>
      </div>

      {showSearch && (
        <div className="mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Cari di artikel ini..."
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
      )}

      <div className="flex justify-center mb-6">
        <span className="bg-[#ff8a8a] text-white text-sm px-5 py-1.5 rounded-full shadow-sm font-medium">
          Blog
        </span>
      </div>

      <h1 className="text-center text-2xl md:text-5xl font-semibold leading-snug mb-6">
        {blog.title}
      </h1>

      <p className="text-center text-gray-500 text-sm mb-6">
        {new Date(blog.date).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}{" "}
        • 13:44 PM
      </p>

      <img
        src={blog.img}
        alt={blog.title}
        className="mx-auto max-w-md w-full h-auto rounded-2xl mb-6 shadow-md"
      />

      <div className="space-y-4 text-justify leading-relaxed text-[17px]">
        {blog.desc?.split("\n").map((para, idx) => (
          <p key={idx}>{highlightKeyword(para, searchQuery)}</p>
        ))}
      </div>

      {/* Reaksi */}
      <div className="flex items-center gap-6 mt-10 border-t pt-6 justify-center text-gray-500 text-sm">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 hover:text-pink-400 transition-all"
        >
          <FaHeart
            className={`text-lg transition-colors ${
              liked ? "text-[#d33]" : "text-gray-500"
            }`}
          />
          <span>{likeCount.toLocaleString()}</span>
        </button>
        <button
          onClick={() => setShowComments(true)}
          className="flex items-center gap-2 hover:text-pink-400"
        >
          <FaRegCommentDots />
          <span>{comments.length}</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 hover:text-pink-400"
        >
          <FaShareAlt />
          <span>450</span>
        </button>
      </div>

      {/* Komentar Modal Swipe dari Bawah */}
      {showComments && (
        <div className="fixed inset-0 bg-black/20 z-40 flex justify-center items-end">
          <div className="w-full max-w-2xl bg-white rounded-t-2xl shadow-lg animate-slide-up max-h-[65vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Komentar</h3>
              <button
                onClick={() => setShowComments(false)}
                className="text-gray-500 hover:text-black text-sm"
              >
                Tutup
              </button>
            </div>

            {/* Form Tambah Komentar */}
            <div className="p-4 border-t bg-white">
              <input
                type="text"
                placeholder="Nama kamu"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <textarea
                placeholder="Tulis komentar kamu..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                onClick={handleAddComment}
                className="mt-3 bg-[#FE8A8A] hover:bg-[#f86f6f] text-white font-semibold py-2 px-4 rounded-lg float-right transition-all"
              >
                Kirim
              </button>
            </div>

            {/* Daftar Komentar */}
            <div className="p-4 space-y-4 mt-10">
              {comments.map((comment, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 border border-gray-200 rounded-xl p-3 shadow-sm bg-gray-50"
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      comment.name
                    )}&background=FE8A8A&color=fff&bold=true`}
                    alt={comment.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-pink-600">{comment.name}</p>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BacaBlog;
