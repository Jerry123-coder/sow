import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Sun, 
  Moon, 
  Calendar,
  Heart,
  Users,
  Music,
} from 'lucide-react';
import { FaPrayingHands } from 'react-icons/fa';
import { LiaPrayingHandsSolid } from 'react-icons/lia';

const MassScheduleSection = () => {
  const weeklySchedule = [
    {
      day: "Sunday",
      services: [
        { 
          time: "6:30 AM", 
          type: "First Mass",
          icon: Sun,
          details: "Morning Mass with choir"
        },
        { 
          time: "9:00 AM", 
          type: "Second Mass",
          icon: Sun,
          details: "Main Service with full choir"
        }
      ],
      highlight: true
    },
    {
      day: "Wednesday",
      services: [
        { 
          time: "7:00 PM", 
          type: "Evening Mass",
          icon: Moon,
          details: "Midweek evening service"
        }
      ]
    },
    {
      day: "Friday",
      services: [
        { 
          time: "7:00 PM", 
          type: "Evening Mass",
          icon: Moon,
          details: "Evening service with confessions available"
        }
      ]
    },
    {
      day: "Saturday",
      services: [
        { 
          time: "6:00 AM", 
          type: "Adoration",
          icon: FaPrayingHands,
          details: "Holy hour and adoration"
        },
        { 
          time: "6:30 AM", 
          type: "Mass",
          icon: Sun,
          details: "Morning Mass"
        }
      ]
    }
  ];

  const specialServices = [
    {
      title: "First Friday",
      description: "Special devotion to the Sacred Heart",
      icon: Heart,
      time: "5:00 AM"
    },
    {
      title: "Hour of Grace",
      description: "First Sunday of the month",
      icon: LiaPrayingHandsSolid,
      time: "6:00 - 7:00 PM"
    },
    {
      title: "Children's Mass",
      description: "Every Sunday",
      icon: Users,
      time: "During regular Mass times"
    },
    {
      title: "Choir Practice",
      description: "Weekly rehearsal",
      icon: Music,
      time: "Saturdays 7:00 PM"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Mass Times</h2>
          <p className="text-xl text-gray-600">Join us in prayer and worship throughout the week</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Regular Schedule */}
          <div className="lg:col-span-2">
            <div className="grid gap-6">
              {weeklySchedule.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-white rounded-xl shadow-md overflow-hidden ${
                    day.highlight ? 'border-l-4 border-purple-500' : ''
                  }`}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{day.day}</h3>
                    <div className="space-y-4">
                      {day.services.map((service, serviceIndex) => (
                        <div 
                          key={serviceIndex}
                          className="flex items-start space-x-4"
                        >
                          <service.icon className="w-5 h-5 text-purple-600 mt-1" />
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{service.time}</span>
                              <span className="text-sm text-purple-600">
                                {service.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{service.details}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Special Services */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-purple-50 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-6">Special Services</h3>
              <div className="space-y-6">
                {specialServices.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <service.icon className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <div className="font-medium">{service.title}</div>
                      <p className="text-sm text-gray-600">{service.description}</p>
                      <p className="text-sm text-purple-600 mt-1">{service.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md p-6 mt-6"
            >
              <h4 className="font-semibold mb-4">Important Notes</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span>Please arrive 10 minutes early</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span>Special feast day schedules may vary</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>Children's liturgy available on Sundays</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MassScheduleSection;