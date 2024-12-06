import { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Calendar, 
  Heart, 
  // Users, 
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  RiHandHeartLine, 
  RiCrossFill,
  RiGuideFill,
  // RiPrayingLine,
  RiHeartsFill,
  RiBookmarkFill,
  RiHealthBookLine,
  // RiBookMarkFill
} from 'react-icons/ri';
import { FaPrayingHands } from "react-icons/fa";
import { anointing, baptism, churchBuilding, community, confirmation, eucharist, growingFaith, marriage, ordination, reconciliation } from '../assets/images';
import MassScheduleSection from '../components/landing/MassScheduleSection';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "WELCOME TO OUR LADY SEAT OF WISDOM",
      subtitle: "A vibrant Catholic community in Oyarifa",
      image: churchBuilding,
      cta: "Join Us Today"
    },
    {
      id: 2,
      title: "FIRST SUNDAY OF ADVENT",
      subtitle: "Your Liberation is Near at Hand – Stay Awake!",
      image: community,
      cta: "Learn More"
    },
    {
      id: 3,
      title: "GROWING IN FAITH TOGETHER",
      subtitle: "Experience spiritual growth through worship and community",
      image: growingFaith,
      cta: "Get Involved"
    }
  ];

 

  const sacraments = [
    {
      title: "Baptism",
      schedule: "First Sunday of the month, 6-7 PM",
      description: "The first of the seven sacraments, washing away original sin and welcoming new members into God's family",
      image: baptism,
      Icon: RiHandHeartLine,
      bgColor: "bg-blue-50",
      requirements: "Preparation classes required for parents and godparents"
    },
    {
      title: "Holy Eucharist",
      schedule: "Available at all Masses",
      description: "The source and summit of our faith, receiving the Body and Blood of Christ in Holy Communion",
      image: eucharist,
      Icon: RiCrossFill,
      bgColor: "bg-red-50",
      requirements: "First Communion preparation for children"
    },
    {
      title: "Confirmation",
      schedule: "Contact parish office for program details",
      description: "Strengthening our bond with the Church through the gifts of the Holy Spirit",
      image: confirmation,
      Icon: RiGuideFill,
      bgColor: "bg-orange-50",
      requirements: "Preparation program required"
    },
    {
      title: "Reconciliation",
      schedule: "Fridays: 6:00-6:45 PM\nSaturdays: 7:00 AM & 6:00 PM",
      description: "Experience God's mercy and forgiveness through the Sacrament of Confession",
      image: reconciliation,
      Icon: FaPrayingHands,
      bgColor: "bg-purple-50",
      requirements: "No preparation required"
    },
    {
      title: "Marriage",
      schedule: "By appointment",
      description: "Unite in the sacred bond of matrimony, celebrating God's love through the union of husband and wife",
      image: marriage,
      Icon: RiHeartsFill,
      bgColor: "bg-pink-50",
      requirements: "6-month preparation period required"
    },
    {
      title: "Anointing of the Sick",
      schedule: "Available 24/7 for emergencies",
      description: "A sacrament of healing for those who are seriously ill, elderly, or preparing for surgery",
      image: anointing,
      Icon: RiHealthBookLine,
      bgColor: "bg-teal-50",
      requirements: "Contact parish office immediately for emergencies"
    },
    {
      title: "Holy Orders",
      schedule: "Contact Diocese for information",
      description: "The Sacrament through which men are ordained as priests to serve God's people",
      image: ordination,
      Icon: RiBookmarkFill,
      bgColor: "bg-green-50",
      requirements: "Contact Diocese for vocational guidance"
    }
];

  const features = [
    {
      icon: User,
      title: "Preparation Guidelines",
      description: "Most sacraments require preparation. Contact us to learn more about requirements."
    },
    {
      icon: Calendar,
      title: "Schedule Early",
      description: "Plan ahead and contact the parish office to arrange sacramental preparations."
    },
    {
      icon: Heart,
      title: "Special Circumstances",
      description: "We're here to help with special arrangements when needed."
    }
  ];

  useEffect(() => {
    let interval: number | undefined;
    if (isAutoPlaying) {
      interval = window.setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img 
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60">
              <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl md:text-7xl font-bold text-white mb-6"
                >
                  {slides[currentSlide].title}
                </motion.h1>
                
                <motion.p
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl md:text-3xl text-white/80 mb-8"
                >
                  {slides[currentSlide].subtitle}
                </motion.p> 
                
                <motion.button
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-purple-600 text-white px-8 py-4 rounded-md hover:bg-purple-500 text-lg"
                >
                  {slides[currentSlide].cta}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentSlide(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 left-4 right-4 flex justify-between transform -translate-y-1/2">
          <button
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
            }}
            className="bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentSlide((prev) => (prev + 1) % slides.length);
            }}
            className="bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* Mass Schedule Section */}
      <MassScheduleSection />
      
      {/* Sacraments Section */}
      <section id="sacraments" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* ... (header remains the same) */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sacraments.map((sacrament, index) => (
              <motion.div
                key={sacrament.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-2xl overflow-hidden">
                  <img 
                    src={sacrament.image}
                    alt={sacrament.title}
                    className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 ${sacrament.bgColor} mix-blend-multiply opacity-60 group-hover:opacity-70 transition-opacity`} />
                  <div className="absolute top-4 right-4 bg-white/90 p-3 rounded-full shadow-lg">
                    <sacrament.Icon className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                
                <div className="p-6 bg-white rounded-2xl mt-[-2rem] relative shadow-md mx-4">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-600 transition-colors">
                    {sacrament.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {sacrament.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-purple-600">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="whitespace-pre-line">{sacrament.schedule}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{sacrament.requirements}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <feature.icon className="w-8 h-8 text-purple-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-lg text-gray-600 mb-6">
              Would you like to learn more about the sacraments or begin preparation?
            </p>
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-500 transition-colors">
              Contact Parish Office
            </button>
          </motion.div>
        </div>
      </section>

      {/* ... (Continue with any remaining sections) ... */}
    </div>
  );
};

export default LandingPage;