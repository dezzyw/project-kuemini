import { motion } from "framer-motion";

const reviews = [
  {
    name: "Sakeza Larisa",
    username: "@larisazz",
    text: "Setiap aku ulang tahun, pasti pesen kue disini. Selain kue nya enak semua, design nya juga bisa request loh ^_^",
    rating: 4,
    avatar: "/img/profile1.jpg",
  },
  {
    name: "Byeon Woseok",
    username: "@woseok123",
    text: "Setiap aku ulang tahun, pasti pesen kue disini. Selain kue nya enak semua, design nya juga bisa request loh ^_^",
    rating: 4,
    avatar: "/img/byeonwoseok.jpg",
  },
  {
    name: "Bastian Andika",
    username: "@bbastiann",
    text: "Enak tapi kurang thank you beyonce",
    rating: 3,
    avatar: "/img/profile2.jpg",
  },
  {
    name: "Jasmine Alika",
    username: "@jasmminee",
    text: "Enak banget! Bobby juga suka padahal kucing. Horass!!",
    rating: 5,
    avatar: "/img/profile3.jpg",
  },
];

const ReviewCard = ({ review }) => {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2 lg:w-2/5 cursor-default transition-transform transform hover:scale-105 hover:shadow-xl relative"
    >
      <div className="absolute top-4 right-8 flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>★</span>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full" />
        <div>
          <h3 className="text-lg font-semibold text-[#FE8A8A]">{review.name}</h3>
          <p className="text-gray-500">{review.username}</p>
        </div>
      </div>
      <p className="mt-3 text-gray-700">{review.text}</p>
    </motion.div>
  );
};

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FE8A8A] from-0% to-[#FFDCD9] to-100% flex flex-col items-center px-6 py-6 pt-20">
      <h2 className="text-3xl font-bold text-white mb-1 mt-6">Apa Kata Mereka?</h2>
      <p className="text-white text-center mb-16 px-4 max-w-2xl">
        Temukan apa yang dikatakan pengguna lain!
      </p>
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </div>
  );
}
