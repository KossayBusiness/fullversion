import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScientificHighlightedText from "@/components/ui/ScientificHighlightedText";
import ProblemRotator from "@/components/quiz/ProblemRotator";
import LabEffects from '@/components/quiz/LabEffects';
import { Beaker, Check, Microscope, Brain, BookOpen, Award, Leaf, ChevronRight, Calendar, HeartPulse, Dumbbell, Shield, ArrowRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from '@/components/SEOHead';
import QuickNavigationCards from '@/components/QuickNavigationCards';
import ScientificTestimonials from "@/components/ScientificTestimonials"; // Added import

// Images (replace with your own images)
const labImage = "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&auto=format&fit=crop&q=80";
const nutritionImage = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80";
const researchImage = "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=80";

const HomePage = () => {
  return (
    <>
      <SEOHead 
        title="Natural Pure Academy | Science-Based Nutrition"
        description="Discover natural approaches to your health based on scientific evidence. Test your nutritional profile for free."
      />

      <Navbar />

      <main className="overflow-hidden">
        {/* Hero Section with animation */}
        <section className="relative bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 pt-20 pb-16 md:pb-24 md:pt-32 overflow-hidden">
          <LabEffects />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Natural solutions</span>
                    <br />validated by science
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <p className="text-lg md:text-xl text-slate-700">
                    Discover your personalized nutritional profile and recommendations based on scientific evidence.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button asChild size="lg" className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-full px-8">
                    <Link to="/quiz">
                      Start your free test
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full border-slate-300 hover:bg-slate-100">
                    <Link to="/articles">
                      Explore our articles
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-center gap-5 pt-2"
                >
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br ${
                        ['from-sky-400 to-blue-500', 'from-teal-400 to-green-500', 'from-purple-400 to-indigo-500', 'from-amber-400 to-orange-500'][i]
                      } flex items-center justify-center text-white text-xs font-medium`}>
                        {['JD', 'MR', 'AS', 'KL'][i]}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-slate-600">
                    <strong>4,800+</strong> people have already discovered their nutritional profile
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="relative bg-white p-6 rounded-2xl shadow-xl overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-teal-100 rounded-full opacity-60"></div>
                  <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-100 rounded-full opacity-60"></div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <HeartPulse className="h-6 w-6 text-rose-500" />
                        <h3 className="text-lg font-semibold">Nutritional Profile</h3>
                      </div>
                      <div className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                        Example
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Digestive health</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Energy level</span>
                          <span className="text-sm font-medium">63%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full" style={{ width: '63%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Sleep quality</span>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <h4 className="font-medium mb-2">Personalized recommendations</h4>
                        <ul className="space-y-2">
                          {['Increase magnesium intake', 'Reduce refined sugar consumption', 'Integrate more probiotic-rich foods'].map((rec, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600">
                        Discover my profile
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
        </section>

        {/* Solutions for your health - Visual and interactive section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-3">
                Our solutions
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">How can we help you?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <HeartPulse className="h-8 w-8 text-rose-500" />,
                  title: "Energy & Vitality",
                  desc: "Natural solutions to combat fatigue and regain your vitality",
                  color: "from-rose-50 to-red-50",
                  iconBg: "bg-rose-100",
                  hover: "group-hover:shadow-rose-200"
                },
                {
                  icon: <Brain className="h-8 w-8 text-indigo-500" />,
                  title: "Cognition & Focus",
                  desc: "Improve your concentration and mental performance",
                  color: "from-indigo-50 to-blue-50",
                  iconBg: "bg-indigo-100",
                  hover: "group-hover:shadow-indigo-200"
                },
                {
                  icon: <Shield className="h-8 w-8 text-green-500" />,
                  title: "Immunity & Defense",
                  desc: "Strengthen your natural defenses with essential nutrients",
                  color: "from-green-50 to-emerald-50",
                  iconBg: "bg-green-100",
                  hover: "group-hover:shadow-green-200"
                },
              ].map((item, i) => (
                <div key={i} className={`bg-gradient-to-br ${item.color} rounded-xl p-6 shadow-sm transition-all duration-300 group hover:shadow-lg ${item.hover}`}>
                  <div className={`w-16 h-16 ${item.iconBg} rounded-xl flex items-center justify-center mb-5`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-slate-600 mb-5">{item.desc}</p>
                  <Button asChild variant="ghost" className="p-0 h-auto">
                    <Link to="/quiz" className="flex items-center gap-1 font-medium">
                      Discover solutions
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>

            {/* Interactive symptoms map */}
            <div className="mt-16 pt-6 border-t border-slate-100">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Select your symptoms</h3>
                <p className="text-slate-600">Explore our targeted solutions for your specific needs</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  { name: "Fatigue", icon: "⚡️" },
                  { name: "Stress", icon: "😓" },
                  { name: "Digestive issues", icon: "🔄" },
                  { name: "Sleep problems", icon: "😴" },
                  { name: "Joint pain", icon: "🦴" },
                  { name: "Skin problems", icon: "🧴" },
                  { name: "Weak immunity", icon: "🛡️" },
                  { name: "Weight gain", icon: "⚖️" },
                  { name: "Focus", icon: "🧠" },
                  { name: "Mood swings", icon: "🎭" },
                  { name: "Allergies", icon: "🤧" },
                  { name: "Inflammation", icon: "🔥" }
                ].map((item, i) => (
                  <Link to="/quiz" key={i} className="group">
                    <div className="bg-white rounded-lg border border-slate-200 p-3 flex flex-col items-center text-center transition-all hover:border-teal-300 hover:shadow hover:-translate-y-1">
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <span className="text-sm font-medium text-slate-700">{item.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our approach - Redesigned and more visual section */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                  Our approach
                </span>
                <h2 className="text-3xl font-bold mb-4">Science made accessible for everyone</h2>
                <p className="text-lg text-slate-600 mb-6">
                  Our scientific approach is rigorous yet accessible. We translate complex research into simple, practical recommendations.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                  {[
                    {
                      icon: <Microscope className="h-5 w-5 text-indigo-600" />,
                      title: "Advanced Research",
                      desc: "Rigorous analysis of recent scientific studies"
                    },
                    {
                      icon: <BookOpen className="h-5 w-5 text-green-600" />,
                      title: "Simplicity",
                      desc: "Clear explanations without complicated jargon"
                    },
                    {
                      icon: <Shield className="h-5 w-5 text-amber-600" />,
                      title: "Transparency",
                      desc: "Verifiable sources and scientific references"
                    },
                    {
                      icon: <Award className="h-5 w-5 text-rose-600" />,
                      title: "Proven Results",
                      desc: "Recommendations validated by concrete data"
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-start rounded-xl p-4 hover:bg-white hover:shadow-sm transition-all">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{item.title}</h3>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/scientific-methodology" className="flex items-center gap-2">
                    Discover our methodology 
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute -top-5 -left-5 w-24 h-24 bg-blue-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-teal-100 rounded-full opacity-60"></div>

                  <img 
                    src={researchImage} 
                    alt="Our scientific approach" 
                    className="rounded-xl shadow-lg relative z-10 w-full h-80 object-cover"
                  />

                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow z-20">
                    <div className="flex gap-3 items-center">
                      <Brain className="h-8 w-8 text-indigo-500" />
                      <div>
                        <h4 className="font-semibold">Scientific publications</h4>
                        <p className="text-sm text-slate-600">Over 450 studies analyzed in 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why take our test - Redesigned and more visual section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-3">
                Your health profile
              </span>
              <h2 className="text-3xl font-bold mb-4">
                A personalized plan in 3 minutes
              </h2>
              <p className="text-lg text-slate-600">
                Answer a few questions and discover your specific nutritional needs
              </p>
            </div>

            <div className="relative mb-16">
              {/* Process steps */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {[
                  {
                    number: "1",
                    title: "Answer the questionnaire",
                    desc: "A quick, scientific 3-minute quiz",
                    icon: <Calendar className="h-6 w-6 text-white" />,
                    color: "bg-gradient-to-br from-blue-500 to-indigo-600"
                  },
                  {
                    number: "2",
                    title: "Get your profile",
                    desc: "Complete analysis of your nutritional needs",
                    icon: <HeartPulse className="h-6 w-6 text-white" />,
                    color: "bg-gradient-to-br from-rose-500 to-pink-600"
                  },
                  {
                    number: "3",
                    title: "Follow your plan",
                    desc: "Personalized recommendations and progress tracking",
                    icon: <Dumbbell className="h-6 w-6 text-white" />,
                    color: "bg-gradient-to-br from-teal-500 to-green-600"
                  }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mb-4 shadow-lg`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Leaf className="h-10 w-10 text-green-500" />,
                  title: "Personalized recommendations",
                  desc: "Advice tailored to your specific needs, symptoms, and lifestyle."
                },
                {
                  icon: <HeartPulse className="h-10 w-10 text-rose-500" />,
                  title: "Health tracking",
                  desc: "Visualize your progress and adjust your habits based on your results."
                },
                {
                  icon: <Calendar className="h-10 w-10 text-blue-500" />,
                  title: "Precise action plan",
                  desc: "Concrete, achievable steps to naturally improve your health."
                }
              ].map((item, i) => (
                <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className={`p-1 ${['bg-gradient-to-r from-green-100 to-teal-100', 'bg-gradient-to-r from-rose-100 to-pink-100', 'bg-gradient-to-r from-blue-100 to-indigo-100'][i]}`}>
                    <CardContent className="bg-white p-6 rounded-t-lg">
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${['bg-green-50', 'bg-rose-50', 'bg-blue-50'][i]}`}>
                          {item.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                        <p className="text-slate-600">{item.desc}</p>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/quiz">
                  Take the free test
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials - Improved and more attractive section */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-3">
                Testimonials
              </span>
              <h2 className="text-3xl font-bold mb-4">
                What our users are saying
              </h2>
              <p className="text-lg text-slate-600">
                Real results that change lives
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "After years of chronic fatigue, the personalized recommendations helped me regain my energy in just 3 weeks.",
                  author: "Marie L.",
                  role: "Teacher, 42",
                  avatar: "M",
                  stars: 5
                },
                {
                  quote: "The test identified exactly my nutritional imbalances. The recommended supplements transformed my digestion and sleep.",
                  author: "Thomas R.",
                  role: "Engineer, 35",
                  avatar: "T",
                  stars: 5
                },
                {
                  quote: "Finally advice based on science and not on trends! I was able to solve my inflammation problems by following their approach.",
                  author: "Sophie G.",
                  role: "Physical Therapist, 38",
                  avatar: "S",
                  stars: 5
                }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 flex items-center">
                      {[...Array(item.stars)].map((_, j) => (
                        <Star key={j} className="h-5 w-5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-slate-700 flex-grow mb-6 text-lg">"{item.quote}"</p>

                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium bg-gradient-to-br ${
                        ['from-teal-400 to-green-500', 'from-blue-400 to-indigo-500', 'from-rose-400 to-pink-500'][i]
                      }`}>
                        {item.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{item.author}</p>
                        <p className="text-sm text-slate-500">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ScientificTestimonials/> {/* Added ScientificTestimonials component */}

        {/* Recent articles - Section with a more lively presentation */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <div>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-2">
                  Latest articles
                </span>
                <h2 className="text-3xl font-bold">Our advice and research</h2>
              </div>

              <Button asChild variant="outline" className="hidden md:flex items-center gap-2">
                <Link to="/articles">
                  All our articles
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "10 essential nutrients to strengthen your immune system",
                  excerpt: "Discover scientifically proven supplements to support your natural defenses.",
                  image: nutritionImage,
                  category: "Nutrition",
                  date: "May 2, 2025"
                },
                {
                  title: "How magnesium can transform your sleep",
                  excerpt: "A recent study reveals the major impact of this mineral on sleep quality and energy.",
                  image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=80",
                  category: "Sleep",
                  date: "April 28, 2025"
                },
                {
                  title: "Probiotics: complete guide for digestive health",
                  excerpt: "Everything you need to know about good bacteria and their impact on your microbiome.",
                  image: "https://images.unsplash.com/photo-1612460627213-2d2d1cfb9fb8?w=800&auto=format&fit=crop&q=80",
                  category: "Digestion",
                  date: "April 15, 2025"
                }
              ].map((article, i) => (
                <Card key={i} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all group">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-teal-600">{article.category}</span>
                      <span className="text-xs text-slate-500">{article.date}</span>
                    </div>
                    <h3 className="font-semibold text-xl mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">{article.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    <Button asChild variant="link" className="p-0 h-auto">
                      <Link to="/articles" className="flex items-center gap-1 text-teal-600">
                        Read article
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Button asChild variant="outline">
                <Link to="/articles">
                  View all our articles
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Final CTA - Attractive section with more visual impact */}
        <section className="py-20 bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-3xl mx-auto">
              Discover your personalized nutritional profile today
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join more than 4,800 people who have already transformed their health with our science-based recommendations
            </p>
            <div className="inline-block bg-white/10 backdrop-blur-sm p-1 rounded-full shadow-lg mb-4">
              <Button asChild size="lg" className="bg-white text-teal-600 hover:bg-slate-100 rounded-full px-8">
                <Link to="/quiz">
                  Start free test
                </Link>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-4 max-w-md mx-auto mt-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <p className="text-sm ml-1">Free test</p>
              </div>
              <div className="w-1 h-1 bg-white/30 rounded-full"></div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
                <p className="text-sm ml-1">3 minutes</p>
              </div>
              <div className="w-1 h-1 bg-white/30 rounded-full"></div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <p className="text-sm ml-1">Immediate results</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;