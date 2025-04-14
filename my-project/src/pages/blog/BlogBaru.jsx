import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogBaru = () => {
  const [blogData, setBlogData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:6001/blog");
        setBlogData(res.data);
      } catch (err) {
        console.error("Gagal fetch blog:", err);
      }
    };

    fetchBlogs();
  }, []);

  const mainBlog = blogData[0];               // Blog utama
  const sideBlogs = blogData.slice(1, 5);     // 4 blog kanan
  const remainingBlogs = blogData.slice(5);   // Sisanya ditampilkan di bawah

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 mt-20 mb-20">
      {/* Bagian Atas - BlogDua Style */}
      <div className="flex flex-col md:flex-row gap-10 mb-16">
        {mainBlog && (
          <div
            className="w-full md:flex-[2] relative rounded-3xl overflow-hidden cursor-pointer"
            onClick={() => navigate(`/blog/${mainBlog.id}`)}
          >
            <img
              src={mainBlog.img}
              alt={mainBlog.title}
              className="w-full h-[500px] object-cover rounded-3xl"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-pink-400 text-white text-sm font-semibold px-4 py-1 rounded-full shadow">
                Populer
              </span>
            </div>
            <div className="absolute bottom-4 left-4 text-white pr-6">
              <h2 className="text-xl md:text-2xl font-bold leading-snug drop-shadow-md max-w-md">
                {mainBlog.title}
              </h2>
              <p className="text-sm mt-1 text-gray-200">{mainBlog.date}</p>
            </div>
          </div>
        )}

        {/* Kanan - Side Blogs */}
        <div className="w-full md:flex-[1] flex flex-col justify-between h-[500px] space-y-3">
          {sideBlogs.map((item, i) => (
            <div
              key={i}
              onClick={() => navigate(`/blog/${item.id}`)}
              className="flex items-start gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded-xl transition-all"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-24 h-24 rounded-2xl object-cover"
              />
              <div>
                <p className="text-xs text-gray-400 mb-1">{item.date}</p>
                <h3 className="text-base font-semibold leading-snug">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bagian Tengah - Blog Grid */}
      {remainingBlogs.length > 0 && (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-pink-400 mb-8">
            Trending News
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {remainingBlogs.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/blog/${item.id}`)}
                className="cursor-pointer bg-white rounded-3xl shadow-sm overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-56 object-cover rounded-3xl"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-base md:text-lg leading-snug mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                    {item.desc}
                  </p>
                  <div className="flex items-center text-xs text-gray-400 gap-4">
                    <span>{item.date}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{item.time_read}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogBaru;
