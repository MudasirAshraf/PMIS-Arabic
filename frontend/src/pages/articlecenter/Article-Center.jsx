import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowForwardCircle } from "react-icons/io5";
import ArticleCard from "../../cards/articlecard/article-card";
import ArticleModal from "../../modals/article-modal/ArticleModal";
import M1 from "../../assets/png/M1.jpg";
import M2 from "../../assets/png/M2.jpg";
import M3 from "../../assets/png/M3.jpg";
import M4 from "../../assets/png/M4.jpg";
import "./articlecenter.scss";

const articles = [
  {
    title: "الذكاء الاصطناعي",
    image: M1,
    description:
      "تعرف على أحدث تقنيات الذكاء الاصطناعي وكيف تؤثر على حياتنا اليومية. يعد الذكاء الاصطناعي أحد أهم التطورات التكنولوجية التي شهدها العالم في العقود الأخيرة. يتطور بوتيرة متسارعة ليشمل مجالات متعددة مثل الطب، والتعليم، والصناعة، وحتى الترفيه. تعتمد الشركات العالمية على الذكاء الاصطناعي في تحليل البيانات وتحسين الخدمات المقدمة للعملاء. بالإضافة إلى ذلك، يمكن للذكاء الاصطناعي التنبؤ بالاتجاهات الاقتصادية والصحية بدقة عالية. هل يمكن أن يحل الذكاء الاصطناعي محل الإنسان في بعض الوظائف؟ ما هي التحديات الأخلاقية التي يواجهها هذا المجال؟ كل هذه الأسئلة تحتاج إلى إجابات مدروسة لضمان مستقبل مستدام ومتوازن.",
  },
  {
    title: "ريادة الأعمال",
    image: M2,
    description:
      "اكتشف الخطوات الأساسية لبناء مشروع ناجح في عالم ريادة الأعمال. تعد ريادة الأعمال من أهم المجالات التي تسهم في النمو الاقتصادي وخلق فرص العمل. يتطلب بدء مشروع ناجح معرفة دقيقة بالسوق، وتحديد الجمهور المستهدف، وتطوير نموذج عمل مستدام. كما يلعب التمويل دورًا رئيسيًا في نجاح المشاريع الناشئة، حيث يمكن لرواد الأعمال الحصول على دعم مالي من المستثمرين أو برامج الحاضنات. من التحديات التي تواجه رواد الأعمال القدرة على التكيف مع تغيرات السوق والمنافسة القوية. لكن بالإصرار والتخطيط الجيد، يمكن لأي شخص بناء مشروع يحقق النجاح والاستدامة.",
  },
  {
    title: "وسائل التواصل",
    image: M3,
    description:
      "كيف تؤثر وسائل التواصل الاجتماعي على حياتنا الشخصية والمهنية؟ أصبحت وسائل التواصل الاجتماعي جزءًا لا يتجزأ من حياتنا اليومية، حيث يستخدمها الملايين حول العالم للتواصل مع الآخرين، ومشاركة الأفكار، والتسويق للمنتجات والخدمات. مع ذلك، هناك تأثيرات سلبية مثل الإدمان على الاستخدام المفرط والتأثير على الصحة النفسية. تلعب هذه الوسائل دورًا كبيرًا في تكوين الرأي العام ونشر الأخبار بسرعة غير مسبوقة، مما يجعل من الضروري التحقق من صحة المعلومات قبل تصديقها أو مشاركتها. كما يمكن لوسائل التواصل أن تكون أداة قوية للنمو الشخصي والمهني عند استخدامها بشكل ذكي ومتوازن.",
  },
  {
    title: "السفر بتكلفة قليلة",
    image: M4,
    description:
      "نصائح حول كيفية السفر حول العالم دون إنفاق الكثير من المال. يمكن لأي شخص تحقيق حلم السفر دون الحاجة إلى ميزانية ضخمة، وذلك من خلال البحث عن الرحلات الاقتصادية، واختيار أماكن الإقامة المناسبة، والاستفادة من العروض والتخفيضات. يمكن أيضًا استخدام وسائل النقل العامة بدلاً من السيارات الخاصة، وتجربة الأطعمة المحلية منخفضة التكلفة للحصول على تجربة ثقافية حقيقية. التخطيط المسبق والمرونة في اختيار الوجهات يساعدان على تقليل النفقات بشكل كبير. بالإضافة إلى ذلك، يمكن العمل عن بُعد أو التطوع في بعض الدول للحصول على إقامة مجانية أو دعم مالي أثناء السفر. كل هذه الأفكار تجعل من السفر تجربة ممتعة وغير مكلفة.",
  },
];

const ArticleCenter = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(4);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setArticlesPerPage(4);
      } else if (window.innerWidth <= 768) {
        setArticlesPerPage(6);
      } else {
        setArticlesPerPage(12);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(articles.length / articlesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNavigation = () => {
    navigate("/Knowledge-Center");
  };

   const openModal = (article) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="main-contaier-article-center">
      {/* Header */}
      <div className="header-container-video-center">
        {/* Back Icon */}
        <IoArrowForwardCircle
          className="back-icon"
          onClick={handleNavigation}
        />
        {/* Header */}
        <header className="header-video-center fs-lg fw-700 lh-1-3">
          مركز المقالات - استعرض مقالاتك بسهولة
        </header>
      </div>

      {/* Grid-Section */}
      <section className="article-grid">
        {currentArticles.map((article, index) => (
          <ArticleCard
            key={index}
            title={article.title}
            image={article.image}
            description={article.description}
            onView={() => openModal(article)}
          />
        ))}
      </section>
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

          {[...Array(Math.ceil(articles.length / articlesPerPage)).keys()].map(
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
              currentPage === Math.ceil(articles.length / articlesPerPage)
                ? "disabled"
                : ""
            }`}
            onClick={nextPage}
            disabled={
              currentPage === Math.ceil(articles.length / articlesPerPage)
            }
          >
            ›
          </button>
          <button
            className={`video-pagination-btn ${
              currentPage === Math.ceil(articles.length / articlesPerPage)
                ? "disabled"
                : ""
            }`}
            onClick={() =>
              setCurrentPage(Math.ceil(articles.length / articlesPerPage))
            }
            disabled={
              currentPage === Math.ceil(articles.length / articlesPerPage)
            }
          >
            »
          </button>
        </div>
      </div>
      {/* Modal Component */}
      {selectedArticle && <ArticleModal article={selectedArticle} onClose={closeModal} />}
    </div>
  );
};

export default ArticleCenter;
