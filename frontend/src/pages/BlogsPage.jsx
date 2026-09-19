import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// const INITIAL_BLOG_POSTS = [
//   {
//     id: 1,
//     title: "There are many reasons to get down",
//     excerpt:
//       "The only moment, the only life we have is in the NOW. What happened a few moments or several years ago is gone, what will happen this evening, or next month when we go on holidays is not here yet,",
//     date: "10 Oct 21",
//     author: "Jane Ostin",
//     image:
//       "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
//     likesCount: 12,
//   },
//   {
//     id: 2,
//     title: "There are many reasons to get down",
//     excerpt:
//       "The only moment, the only life we have is in the NOW. What happened a few moments or several years ago is gone, what will happen this evening, or next month when we go on holidays is not here yet,",
//     date: "10 Oct 21",
//     author: "Jane Ostin",
//     image:
//       "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=80",
//     likesCount: 24,
//   },
//   {
//     id: 3,
//     title: "There are many reasons to get down",
//     excerpt:
//       "The only moment, the only life we have is in the NOW. What happened a few moments or several years ago is gone, what will happen this evening, or next month when we go on holidays is not here yet,",
//     date: "10 Oct 21",
//     author: "Jane Ostin",
//     image:
//       "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=600&q=80",
//     likesCount: 18,
//   },
//   {
//     id: 4,
//     title: "There are many reasons to get down",
//     excerpt:
//       "The only moment, the only life we have is in the NOW. What happened a few moments or several years ago is gone, what will happen this evening, or next month when we go on holidays is not here yet,",
//     date: "10 Oct 21",
//     author: "Jane Ostin",
//     image:
//       "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=600&q=80",
//     likesCount: 31,
//   },
// ];

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [limit, setLimit] = useState(5);
  const navigate = useNavigate();

  const getAllBlogs = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blogs`, {
        params: {
          limit: limit,
        },
      });
      console.log(res.data?.data);
      setBlogs(res.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, [limit]);

  //   const [likedPosts, setLikedPosts] = useState({});

  //   const toggleLike = (e, id) => {
  //     e.stopPropagation();
  //     setLikedPosts((prev) => ({
  //       ...prev,
  //       [id]: !prev[id],
  //     }));
  //   };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 md:px-8 font-sans text-slate-800 antialiased flex flex-col items-center">
      {}
      <div className="w-full container max-w-6xl mx-auto flex flex-col items-center">
        {}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#333333] tracking-tight mb-10 text-center">
          Blog
        </h1>

        {}
        <div className="w-full space-y-6 md:space-y-8">
          {blogs.map((post) => {
            // const isSelected = selectedPostId === post.id;
            // const isLiked = likedPosts[post.id];

            return (
              <div
                key={post._id}
                className={`w-full bg-white rounded-2xl transition-all duration-200 p-3 sm:p-4 md:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 border ${"border-transparent hover:border-slate-200 hover:shadow-xs"}`}
              >
                {}
                <div className="w-full lg:w-86.75 h-48 lg:h-67.5 shrink-0 rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {}
                <div className="w-full sm:w-7/12 md:w-7/12 flex flex-col justify-between py-1 h-full min-h-42.5">
                  <div>
                    {/* Post Title */}
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#333333] mb-2 leading-snug">
                      {post.title}
                    </h2>

                    {/* Post Excerpt */}
                    <p className="text-xs sm:text-[13px] md:text-sm text-[#666666] font-normal leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {}
                  <div className="flex items-center justify-between pt-2 text-xs md:text-xs">
                    {/* Left: Like & Date Info */}
                    <div className="flex items-center gap-2 text-[#999999] font-medium">
                      <button
                        onClick={(e) => toggleLike(e, post.id)}
                        className="hover:scale-110 active:scale-95 transition-transform p-1 cursor-pointer focus:outline-none"
                        // title={isLiked ? "Unlike" : "Like"}
                      >
                        <FaRegHeart className="w-3.5 h-3.5 text-[#999999] hover:text-red-400" />
                      </button>
                      <span className="text-[11px] sm:text-xs text-[#999999] select-none">
                        {post.createdAt.split("T")[0]}, by {post.author?.name}
                      </span>
                    </div>

                    {/* Right: READ MORE button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/single-blog/${post._id}`)
                      }}
                      className="text-[11px] sm:text-xs font-bold text-[#333333] tracking-widest hover:text-black hover:underline uppercase transition-colors cursor-pointer"
                    >
                      READ MORE
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {}
        <div className="mt-12 flex justify-center w-full">
          {limit < 25 && (
            <button
              onClick={() => {
                setLimit((prev) => prev + 5);
              }}
              className="w-full max-w-[220px] py-2.5 px-6 border border-[#a0a0a0] hover:border-black text-[#555555] hover:text-black font-semibold text-xs rounded-full transition-all duration-200 cursor-pointer text-center bg-white active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs"
            >
              {"Load more 5+"}
            </button>
          )}
        </div>
      </div>

      {}
      {/* {activeArticleModal && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveArticleModal(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveArticleModal(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
            >
              ✕
            </button>
            <img
              src={activeArticleModal.image}
              alt={activeArticleModal.title}
              className="w-full h-52 object-cover rounded-2xl mb-4"
            />
            <div className="text-xs text-[#999999] mb-1 font-medium">
              {activeArticleModal.date} • By {activeArticleModal.author}
            </div>
            <h3 className="text-xl font-extrabold text-[#333333] mb-3">
              {activeArticleModal.title}
            </h3>
            <p className="text-sm text-[#555555] leading-relaxed mb-6">
              {activeArticleModal.excerpt} Expanded full article content goes
              here. Discover all the amazing recipes, stories, and culinary
              secrets behind this dish.
            </p>
            <button
              onClick={() => setActiveArticleModal(null)}
              className="w-full bg-slate-900 text-white font-medium py-2.5 rounded-full text-xs hover:bg-black transition-colors cursor-pointer"
            >
              Close Article
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};
export default BlogsPage;
