import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowForwardCircle } from "react-icons/io5";
import VideoCard from "../../cards/videocard/video-card";
import VideoI from "../../assets/mp4/Video-I.mp4";
import VideoIII from "../../assets/mp4/Video-III.mp4";
import "./videocenter.scss";

const videos = [
  {
    title: "فيديو الطبيعة الخلابة",
    video: VideoI,
    description:
      "استمتع بجمال الطبيعة والمناظر الخلابة حيث الأشجار الخضراء، والأنهار الجارية، وأصوات الطيور التي تضفي جوًا من الهدوء والسلام.",
  },
  {
    title: "أمواج البحر الرائعة",
    video: VideoIII,
    description:
      "شاهد تلاطم أمواج البحر في يوم مشمس، حيث تمتزج ألوان السماء الزرقاء بزرقة المياه الصافية، مما يخلق مشهدًا خلابًا يجذب الأنظار.",
  },
  {
    title: "مغامرات الطيران",
    video: VideoI,
    description:
      "انطلق في مغامرة جوية مذهلة عبر السماء، حيث يمكنك تجربة متعة التحليق فوق المناظر الطبيعية الساحرة والغيوم المتناثرة في الأفق.",
  },
  {
    title: "رحلة إلى الجبال",
    video: VideoIII,
    description:
      "اكتشف جمال الجبال الشاهقة، حيث القمم المغطاة بالثلوج، والممرات الصخرية الوعرة، والهواء النقي الذي ينعش الروح.",
  },
  {
    title: "هدوء الغابة",
    video: VideoI,
    description:
      "تجول في قلب الغابة واستمع إلى همسات الأشجار، وأصوات الطيور، وخرير المياه المتدفقة، في أجواء هادئة تبعث على التأمل.",
  },
  {
    title: "غروب الشمس الساحر",
    video: VideoIII,
    description:
      "استمتع بمشهد الغروب حيث تغرق الشمس في الأفق، تاركة وراءها تدرجات ساحرة من الألوان الدافئة التي تنعكس على سطح البحر.",
  },
  {
    title: "تسلق الجبال",
    video: VideoI,
    description:
      "خض مغامرة تسلق الجبال وواجه التحديات الصعبة، بينما تستمتع بمشاهدة المناظر الطبيعية الخلابة من أعلى القمم.",
  },
  {
    title: "الحياة البرية",
    video: VideoIII,
    description:
      "شاهد الحياة البرية في أروع صورها، حيث الحيوانات تعيش في بيئتها الطبيعية وسط الغابات والسهول الممتدة.",
  },
  {
    title: "رحلة في الفضاء",
    video: VideoI,
    description:
      "اكتشف سحر الكون الواسع من خلال رحلة مذهلة إلى الفضاء، حيث النجوم اللامعة، والكواكب البعيدة، والمجرات الشاسعة.",
  },
  {
    title: "أضواء المدينة في الليل",
    video: VideoIII,
    description:
      "استمتع بمشهد المدينة في الليل حيث تضيء الأضواء الزاهية الشوارع والمباني، مما يخلق أجواء مليئة بالحياة والطاقة.",
  },
  {
    title: "شلالات المياه العذبة",
    video: VideoI,
    description:
      "شاهد تدفق المياه القوي من الشلالات الشاهقة، حيث يندمج صوت المياه المتدفقة مع الطبيعة المحيطة، ليخلق مشهدًا ساحرًا.",
  },
  {
    title: "الغوص في أعماق البحر",
    video: VideoIII,
    description:
      "اكتشف أعماق المحيط واستمتع بمشاهدة الشعاب المرجانية الملونة والأسماك الغريبة في رحلة غوص ممتعة.",
  },
  {
    title: "رحلة إلى الصحراء",
    video: VideoI,
    description:
      "انطلق في رحلة إلى الصحراء حيث الرمال الذهبية تمتد إلى ما لا نهاية، والسماء الصافية تتيح لك مشاهدة النجوم بكل وضوح.",
  },
  {
    title: "المناظر الطبيعية في الربيع",
    video: VideoIII,
    description:
      "شاهد جمال الطبيعة في فصل الربيع، حيث تتفتح الأزهار، وتكتسي الأرض بسجاد أخضر، مما يخلق لوحة فنية ساحرة.",
  },
  {
    title: "الثلوج في الشتاء",
    video: VideoI,
    description:
      "استمتع بجمال الشتاء حيث تتساقط الثلوج بغزارة، وتتحول الأرض إلى بساط أبيض نقي، في مشهد يعكس روعة هذا الفصل المميز.",
  },
];

const VideoCenter = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage, setVideosPerPage] = useState(15);
  const Navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setVideosPerPage(4);
      } else if (window.innerWidth <= 768) {
        setVideosPerPage(6);
      } else {
        setVideosPerPage(10);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  const nextPage = () => {
    if (currentPage < Math.ceil(videos.length / videosPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNavigation = () => {
    Navigate("/Knowledge-Center");
  };

  return (
    <div className="main-container-video-center">
      <div className="header-container-video-center">
        {/* Logo */}
        <IoArrowForwardCircle
          className="back-icon"
          onClick={handleNavigation}
        />
        {/* Header */}
        <header className="header-video-center fs-lg fw-700 lh-1-3">
          مرحبًا بكم في مركز الفيديو
        </header>
      </div>
      {/* Grid Section */}
      <section className="video-grid">
        {currentVideos.map((video, index) => (
          <VideoCard
            key={index}
            title={video.title}
            video={video.video}
            description={video.description}
          />
        ))}
      </section>

      {/* Pagination  */}
      <div className="main-container-pagination-control">
        <div className="video-pagination-controls">
          <button
            className={`video-pagination-btn ${
              currentPage === 1 ? "disabled" : ""
            }`}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            «
          </button>
          <button
            className={`video-pagination-btn ${
              currentPage === 1 ? "disabled" : ""
            }`}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            ‹
          </button>

          {[...Array(Math.ceil(videos.length / videosPerPage)).keys()].map(
            (page) => (
              <button
                key={page + 1}
                className={`video-pagination-btn ${
                  currentPage === page + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(page + 1)}
              >
                {page + 1}
              </button>
            )
          )}

          <button
            className={`video-pagination-btn ${
              currentPage === Math.ceil(videos.length / videosPerPage)
                ? "disabled"
                : ""
            }`}
            onClick={nextPage}
            disabled={currentPage === Math.ceil(videos.length / videosPerPage)}
          >
            ›
          </button>
          <button
            className={`video-pagination-btn ${
              currentPage === Math.ceil(videos.length / videosPerPage)
                ? "disabled"
                : ""
            }`}
            onClick={() =>
              setCurrentPage(Math.ceil(videos.length / videosPerPage))
            }
            disabled={currentPage === Math.ceil(videos.length / videosPerPage)}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCenter;
