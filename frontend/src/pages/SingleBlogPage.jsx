import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaHeart,
  FaRegHeart,
  FaShareAlt,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function SingleBlogPage() {
  const { blogId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(142);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [blog, setBlog] = useState({});

  const cleanBlogId = blogId.replace(":", "");

  const getSingleBlogInfo = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/blogs/${cleanBlogId}`,
      );
      console.log(res.data?.data);
      setBlog(res.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    getSingleBlogInfo();
  }, [blogId]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const toggleLike = () => {
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased flex flex-col selection:bg-orange-100 selection:text-orange-600">
      <main className="flex-1 py-10 md:py-16 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          {/* Article Header */}
          <header className="text-center mb-10 md:mb-12">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-slate-900 leading-snug sm:leading-tight md:leading-tight tracking-tight mb-6">
              {blog.title}
            </h1>

            {/* Article Meta Data */}
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400 font-medium">
              <button
                onClick={toggleLike}
                className="inline-flex items-center gap-1.5 hover:text-red-500 transition-colors focus:outline-none cursor-pointer group"
                aria-label="Like Post"
              >
                {isLiked ? (
                  <FaHeart className="w-4 h-4 text-red-500 animate-in zoom-in duration-150" />
                ) : (
                  <FaRegHeart className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors" />
                )}
              </button>
              <span className="select-none">
                {blog.createdAt?.split("T")[0]}{" "}
                <span className="text-slate-600 font-semibold hover:underline cursor-pointer">
                  {blog.author?.name}
                </span>
              </span>
            </div>
          </header>

          {}
          <div className="prose prose-slate max-w-none text-slate-700 text-xs sm:text-sm md:text-[15px] leading-relaxed md:leading-loose space-y-4 mb-8 md:mb-10">
            <p className="font-semibold text-slate-900 text-sm sm:text-base md:text-lg mb-2">
              {blog.slug}
            </p>
            <p className="text-slate-600">
              {blog.content}
            </p>
          
          </div>

          {}
          <div className="my-8 md:my-12">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-slate-100">
              <img
                src={blog.coverImage}
                alt="Delicious Gourmet Burger Platter with Assorted Sauces and Fries"
                className="w-full h-auto max-h-[500px] object-cover object-center transform hover:scale-[1.01] transition-transform duration-700"
              />
            </div>
            <p className="text-center text-[11px] sm:text-xs text-slate-400 mt-2.5 font-medium italic">
              {blog.excerpt}
            </p>
          </div>

          {}
          <div className="prose prose-slate max-w-none text-slate-700 text-xs sm:text-sm md:text-[15px] leading-relaxed md:leading-loose space-y-4">
            <p className="text-slate-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim
              dapibus quis id convallis vitae auctor feugiat massa. Semper ac
              blandit neque vulputate tincidunt venenatis. Orci lectus enim nunc
              proin lobortis faucibus vulputate in consectetur. Turpis morbi
              morbi pharetra, nunc, eu consequat id cursus.
            </p>
            <p className="text-slate-600">
              Mauris erat gravida viverra et blandit enim nunc amet, placerat.
              Vel, id lacinia arcu, neque etiam morbi consectetur non leo.
              Facilisis eu commodo interdum lectus semper. Enim libero proin
              feugiat dignissim semper ac vulputate vitae. Sed hac nibh aliquam
              blandit tristique tincidunt. Et mi amet, sed hendrerit. Montes,
              adipiscing eget massa tempus turpis. Aliquam, tristique ut augue
              auctor placerat porta vel lorem. Arcu quam urna tortor aliquet.
              Elit volutpat enim, curabitur risus aliquam dapibus mattis sed
              aliquam.
            </p>
          </div>

          {}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            {/* Left: Like & Bookmark */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                  isLiked
                    ? "bg-red-50 border-red-200 text-red-600"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {isLiked ? (
                  <FaHeart className="w-3.5 h-3.5 text-red-500" />
                ) : (
                  <FaRegHeart className="w-3.5 h-3.5" />
                )}
                <span>{likesCount} Likes</span>
              </button>

              <button
                onClick={() => {
                  setIsBookmarked(!isBookmarked);
                  triggerToast(
                    isBookmarked
                      ? "Article removed from bookmarks"
                      : "Article saved to bookmarks!",
                  );
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                  isBookmarked
                    ? "bg-orange-50 border-orange-200 text-[#FF5200]"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {isBookmarked ? (
                  <FaBookmark className="w-3.5 h-3.5" />
                ) : (
                  <FaRegBookmark className="w-3.5 h-3.5" />
                )}
                <span>{isBookmarked ? "Saved" : "Save"}</span>
              </button>
            </div>

            {/* Right: Share */}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Food House Blog Post",
                    url: window.location.href,
                  });
                } else {
                  triggerToast("Link copied to clipboard!");
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-slate-900 hover:bg-black text-white transition-colors cursor-pointer"
            >
              <FaShareAlt className="w-3 h-3" />
              <span>Share Article</span>
            </button>
          </div>
        </article>
      </main>

      {}
    </div>
  );
}
