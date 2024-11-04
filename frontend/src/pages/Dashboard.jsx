import React, { useEffect, useState } from "react";
import CourseTiles from "../components/CourseTiles";
import { useAuthContext } from "../hooks/useAuthContext";
import { useChapterContext } from "../hooks/useChapterContext";
import Slider from "react-slick";
import Layout from "../components/Layout/Layout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../index.css";

const sampleChapters = [
  {
    _id: "1",
    title: "Introduction to React",
    description:
      "Learn the basics of React, including components, state, and props.",
    image:
      "https://img.freepik.com/free-photo/programming-languages_1203-1920.jpg?w=996&t=st=1695842324~exp=1695842924~hmac=da69fa43d2cb2b1e2e4d40a9e173b79fc1be151734c0cbe9a5672b4f484f2c79",
  },
  {
    _id: "2",
    title: "Advanced JavaScript",
    description:
      "Deep dive into JavaScript concepts like closures, promises, and async programming.",
    image:
      "https://img.freepik.com/free-photo/flat-lay-computer-keyboard-laptop-with-javascript-code_23-2148724886.jpg?w=1060&t=st=1695842420~exp=1695843020~hmac=ba914d353ddce7f77230d9248ad73a9c7d1416bfc560f5c77957379b5750b15e",
  },
  {
    _id: "3",
    title: "CSS Flexbox and Grid",
    description: "Master modern CSS layout techniques with Flexbox and Grid.",
    image:
      "https://img.freepik.com/free-vector/flat-css-website-template_23-2148928002.jpg?w=996&t=st=1695842475~exp=1695843075~hmac=4f7cf1c3b61451b5f56f5c2cc2c093840e7ac84d93f05e603d1c457b89e57607",
  },
  {
    _id: "4",
    title: "Node.js Basics",
    description:
      "Get started with Node.js and learn how to build server-side applications.",
    image:
      "https://img.freepik.com/free-photo/flat-lay-tech-scene-with-node-js_23-2148735920.jpg?w=996&t=st=1695842521~exp=1695843121~hmac=276a4d39b38843b6cc15e53af5e23e5c28250ca2341cd9de5d24eb50d19296d7",
  },
  {
    _id: "5",
    title: "Python for Data Science",
    description:
      "Learn Python programming and data analysis techniques for data science.",
    image:
      "https://img.freepik.com/free-photo/python-programming-language-concept_23-2148798801.jpg?w=996&t=st=1695842552~exp=1695843152~hmac=67cb3b1f7b2b73a13562e41c7d2fd70763e96aeb4b29a57aa18f2d90e09d85e9",
  },
  {
    _id: "6",
    title: "Machine Learning with Python",
    description:
      "Introduction to machine learning concepts and algorithms using Python.",
    image:
      "https://img.freepik.com/free-photo/modern-ml-artificial-intelligence-concept_23-2148734363.jpg?w=996&t=st=1695842601~exp=1695843201~hmac=9297c8e36e59b4fd36b8fc1e1fc47444bb1b24ee7eb236ff6937f881a5726f80",
  },
  {
    _id: "7",
    title: "Understanding APIs",
    description:
      "Learn how to work with APIs and integrate them into your applications.",
    image:
      "https://img.freepik.com/free-photo/programming-apis_23-2148728314.jpg?w=996&t=st=1695842638~exp=1695843238~hmac=8038977e0a0c5ab4bc6e5cf583ec5dff554f61f5b46c93a9738f7bc89a2ca71e",
  },
  {
    _id: "8",
    title: "Web Development Bootcamp",
    description:
      "Comprehensive bootcamp covering HTML, CSS, JavaScript, and more.",
    image:
      "https://img.freepik.com/free-photo/front-view-website-development_23-2148735983.jpg?w=996&t=st=1695842677~exp=1695843277~hmac=945942ea29051984db2d364431057c8c813e45a07a624e18588e56c1bcfc8059",
  },
  {
    _id: "9",
    title: "Data Structures and Algorithms",
    description:
      "Learn essential data structures and algorithms for efficient programming.",
    image:
      "https://img.freepik.com/free-photo/data-structure-programming_1098-18460.jpg?w=996&t=st=1695842722~exp=1695843322~hmac=24d7e1745588d4f68d9e24f93a7bf1783fbe6a774d5e12d93e8096b2bce0f660",
  },
  {
    _id: "10",
    title: "Git and Version Control",
    description:
      "Learn Git commands and version control to manage your code repositories.",
    image:
      "https://img.freepik.com/free-photo/git-concept-illustration_23-2148806253.jpg?w=996&t=st=1695842767~exp=1695843367~hmac=ff2b832ff5dc085c6851c20c7de588e7d269c2b86975e1a462a5b53d1f4fb9b3",
  },
  {
    _id: "11",
    title: "Intro to Docker and Containers",
    description:
      "Discover Docker and containerization to build and deploy scalable applications.",
    image:
      "https://img.freepik.com/free-photo/modern-software-containerization-concept_23-2148754801.jpg?w=996&t=st=1695842803~exp=1695843403~hmac=5c7b3a8796e0b612ebbb3e09abf5219fa63d6349b2b547b1a81c65f27b3a2e6f",
  },
  {
    _id: "12",
    title: "Cloud Computing with AWS",
    description:
      "Learn the fundamentals of cloud computing and services on AWS.",
    image:
      "https://img.freepik.com/free-photo/cloud-computing-data-security-concept_23-2148653610.jpg?w=996&t=st=1695842835~exp=1695843435~hmac=a1e5efc9242ab9fd163dcd5df5fabe246b5a04ed812c9fbb2fb687b7c42835a7",
  },
  {
    _id: "13",
    title: "Intro to Cybersecurity",
    description:
      "Understand the basics of cybersecurity to protect data and applications.",
    image:
      "https://img.freepik.com/free-photo/cybersecurity-information-technology-security_1098-18461.jpg?w=996&t=st=1695842877~exp=1695843477~hmac=acef0378436b3c9ecf121032b40bc52eeb58eeb03d3c9e73b8a1e8d8d8d63618",
  },
  {
    _id: "14",
    title: "DevOps Fundamentals",
    description:
      "Learn about the practices and tools used in DevOps for efficient software delivery.",
    image:
      "https://img.freepik.com/free-photo/devops-conceptual-illustration_23-2148805467.jpg?w=996&t=st=1695842912~exp=1695843512~hmac=adb8cb9e845e9d874f7e8d9a9487e52771a579fa0f01766c53f1bc69c92de012",
  },
  {
    _id: "15",
    title: "Building RESTful APIs",
    description:
      "Learn how to design and build RESTful APIs with best practices.",
    image:
      "https://img.freepik.com/free-photo/developing-api-programming_1098-18457.jpg?w=996&t=st=1695842954~exp=1695843554~hmac=c2d0a72b41ae1d1bfb6f7ae77e9c28a484c6bb6e0adf93fe82c95af4bc4f5e5f",
  },
  {
    _id: "16",
    title: "Introduction to TypeScript",
    description:
      "Learn how TypeScript enhances JavaScript with static types and interfaces.",
    image:
      "https://img.freepik.com/free-photo/type-script-concept-illustration_23-2148806470.jpg?w=996&t=st=1695843005~exp=1695843605~hmac=ed6c146f46dc423eafddae9f4e091007d82c528e60d48226cf0372545a0677b",
  },
  {
    _id: "17",
    title: "Responsive Web Design",
    description:
      "Master techniques for creating responsive and accessible web designs.",
    image:
      "https://img.freepik.com/free-photo/responsive-web-design-concept_23-2148721456.jpg?w=996&t=st=1695843053~exp=1695843653~hmac=5d882213e7077db87bfa12b6f9f04de9678b25ca9f14e0e2d5be0f1441f19157",
  },
  {
    _id: "18",
    title: "Introduction to SQL Databases",
    description:
      "Understand the fundamentals of SQL databases and how to manage them.",
    image:
      "https://img.freepik.com/free-photo/sql-database-concept_23-2148721112.jpg?w=996&t=st=1695843101~exp=1695843701~hmac=9d573c15b06f3b093665cb9b7eae0a305d04bca88d7ca5f30dc4e3c487c53735",
  },
  {
    _id: "19",
    title: "User Experience (UX) Design",
    description:
      "Learn the principles of UX design to create user-friendly applications.",
    image:
      "https://img.freepik.com/free-photo/user-experience-design-concept_23-2148721262.jpg?w=996&t=st=1695843156~exp=1695843756~hmac=27dcd166924fbc68c3f8db13b641a5e54f1ee6eeb982ae5f7b173f3e0cc6170",
  },
  {
    _id: "20",
    title: "Blockchain Technology Fundamentals",
    description:
      "Explore the principles of blockchain and its applications in various fields.",
    image:
      "https://img.freepik.com/free-photo/blockchain-technology-concept_23-2148721952.jpg?w=996&t=st=1695843206~exp=1695843806~hmac=99d226a6ae536a093588cf7da78b14c2909c65b0f62b967f5e3e640069491c93",
  },
];

const Dashboard = () => {
  const { dispatch } = useChapterContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarkedChapters, setBookmarkedChapters] = useState([]);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [error, setError] = useState(null);

  // Notifications and achievements setup
  const notifications = [
    { id: 1, message: "New chapter on Docker has been added!" },
    { id: 2, message: "You have completed 3 chapters this week!" },
    { id: 3, message: "Don't forget to check your upcoming quizzes!" },
    { id: 4, message: "New assignment: Build a REST API using Node.js!" },
    { id: 5, message: "Course completion certificates are now available!" },
    { id: 6, message: "Join our live Q&A session this Friday!" },
    { id: 7, message: "New video tutorial: Introduction to Kubernetes!" },
    { id: 8, message: "Your course subscription will expire in 5 days." },
    { id: 9, message: "New resources added to the Machine Learning chapter!" },
    { id: 10, message: "You have received feedback on your last assignment!" },
  ];

  useEffect(() => {
    const fetchChapters = async () => {
      setLoading(true);
      setError(null); // Reset error state on new fetch
      const endpoint =
        user.role === "Admin"
          ? "http://localhost:4000/api/chapters/"
          : "http://localhost:4000/api/chapters/st";

      try {
        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_CHAPTERS", payload: json });
        } else {
          setError("Failed to load chapters.");
        }
      } catch (err) {
        setError("Network error, please try again.");
      }
      setLoading(false);
    };

    if (user) {
      fetchChapters();
    }
  }, [dispatch, user]);

  const filteredChapters = sampleChapters.filter((chapter) =>
    chapter.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex flex-col mx-4 lg:mx-10 bg-gradient-to-b from-blue-500 to-indigo-700 min-h-screen text-white">
        <div className="mb-6 text-center">
          <h1 className="mt-10 text-3xl font-bold">
            {user
              ? `Hello ${user.name}, Welcome back`
              : "Welcome to the Dashboard"}
          </h1>
          <div className="flex items-center justify-center mt-2">
            <h2 className="text-2xl font-black">Your Dashboard Today</h2>
          </div>
        </div>

        {/* Search Bar */}
        {/* <input
          type="text"
          placeholder="Search chapters..."
          className="my-4 p-2 rounded bg-gray-100 border-2 border-gray-300"
          onChange={(e) => setSearchTerm(e.target.value)}
        /> */}

        {/* Notifications */}
        <div className="my-4 p-4 bg-blue-400 rounded">
          <h3 className="font-bold">Notifications</h3>
          <ul>
            {notifications.map((note) => (
              <li key={note.id} className="my-2">
                {note.message}
              </li>
            ))}
          </ul>
        </div>

        {/* Achievements */}
        {/* <div className="my-4">
          <h3>Achievements</h3>
          <ul>
            {unlockedBadges.map((badge) => (
              <li key={badge.id} className="badge">
                {badge.name}
              </li>
            ))}
          </ul>
        </div> */}

        <div className="my-4">
          <h2 className="my-4 text-xl font-bold text-center">Overview</h2>
          {/* Slider for Mobile */}
          <div className="md:hidden">
            <Slider
              dots={true}
              slidesToShow={1}
              slidesToScroll={1}
              autoplay={isAutoplay}
              autoplaySpeed={3000}
              className="swiper"
              style={{ background: "transparent" }}
            >
              {filteredChapters.map((chapter) => (
                <div key={chapter._id} className="px-2">
                  <CourseTiles chapter={chapter} />
                </div>
              ))}
            </Slider>

            {/* <button onClick={() => setIsAutoplay(!isAutoplay)}>
              {isAutoplay ? "Pause" : "Play"}
            </button> */}
          </div>

          {/* Slider for Tablet */}
          <div className="hidden md:flex md:visible lg:hidden">
            <Slider
              dots={true}
              slidesToShow={2}
              slidesToScroll={2}
              autoplay={isAutoplay}
              autoplaySpeed={3000}
              className="swiper"
              style={{ background: "transparent" }}
            >
              {filteredChapters.map((chapter) => (
                <div key={chapter._id} className="px-2">
                  <CourseTiles chapter={chapter} />
                </div>
              ))}
            </Slider>
            {/* <button onClick={() => setIsAutoplay(!isAutoplay)}>
              {isAutoplay ? "Pause" : "Play"}
            </button> */}
          </div>

          {/* Slider for Desktop */}
          <div className="hidden lg:flex">
            <Slider
              dots={true}
              slidesToShow={4}
              slidesToScroll={2}
              autoplay={isAutoplay}
              autoplaySpeed={3000}
              className="swiper"
              style={{ background: "transparent" }}
            >
              {filteredChapters.map((chapter) => (
                <div key={chapter._id} className="px-2">
                  <CourseTiles
                    chapter={chapter}
                    onBookmark={() => {
                      if (bookmarkedChapters.includes(chapter._id)) {
                        setBookmarkedChapters(
                          bookmarkedChapters.filter((id) => id !== chapter._id)
                        );
                      } else {
                        setBookmarkedChapters([
                          ...bookmarkedChapters,
                          chapter._id,
                        ]);
                      }
                    }}
                    isBookmarked={bookmarkedChapters.includes(chapter._id)}
                  />
                </div>
              ))}
            </Slider>
            {/* <button onClick={() => setIsAutoplay(!isAutoplay)}>
              {isAutoplay ? "Pause" : "Play"}
            </button> */}
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div
              className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-500">
            {error}{" "}
            {/* <button onClick={fetchChapters} className="underline">
              Retry
            </button> */}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
