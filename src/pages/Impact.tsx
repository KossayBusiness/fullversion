
import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  FileText,
  Award,
  Microscope,
  Book,
  HeartPulse,
  GraduationCap,
  ArrowRight,
  BarChart3,
  Globe
} from 'lucide-react';

const Impact = () => {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="bg-gradient-to-b from-indigo-50 to-white py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="indigo" className="mb-4">
              <BarChart3 className="h-3 w-3 mr-1" />
              Our Impact
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Making a Difference Through Science
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
              At Natural Pure Academy, our mission is to improve global health through scientific research and education. 
              Here's how our work is creating tangible impact for communities and individuals worldwide.
            </p>
          </div>
        </Container>
      </div>

      {/* Key metrics */}
      <section className="py-16">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Impact by the Numbers</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { 
                  number: "25,000+", 
                  label: "People Helped", 
                  icon: <Users className="h-8 w-8 text-indigo-600 mb-2" />,
                  description: "Individuals who have directly benefited from our programs"
                },
                { 
                  number: "42", 
                  label: "Research Papers", 
                  icon: <FileText className="h-8 w-8 text-indigo-600 mb-2" />,
                  description: "Peer-reviewed scientific publications produced by our team"
                },
                { 
                  number: "12", 
                  label: "Research Grants", 
                  icon: <Award className="h-8 w-8 text-indigo-600 mb-2" />,
                  description: "Competitive grants secured to advance our micronutrient research"
                },
                { 
                  number: "8", 
                  label: "Clinical Studies", 
                  icon: <Microscope className="h-8 w-8 text-indigo-600 mb-2" />,
                  description: "Clinical trials completed or in progress"
                }
              ].map((metric, i) => (
                <div key={i} className="text-center bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <div className="flex justify-center">
                    {metric.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-indigo-700 mb-1">{metric.number}</h3>
                  <p className="text-lg font-medium text-slate-800 mb-2">{metric.label}</p>
                  <p className="text-sm text-slate-600">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      
      {/* Success stories */}
      <section className="py-16 bg-slate-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-4">
                <HeartPulse className="h-3 w-3 mr-1" />
                Success Stories
              </Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Real Results for Real People</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Our research and educational programs have made a significant difference in many lives.
                Here are some stories of individuals who have benefited from our work.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  name: "Dr. James Wilson",
                  role: "Medical Doctor, Chicago",
                  image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300",
                  quote: "The continuing education programs from Natural Pure Academy have completely transformed how I approach nutritional recommendations with my patients. The science-based approach and emphasis on micronutrient balance has filled a major gap in traditional medical education."
                },
                {
                  name: "Sarah Johnson",
                  role: "Nutrition Educator",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300",
                  quote: "I've incorporated Natural Pure Academy's research into our community health programs, reaching over 500 low-income families. The clear, accessible way they present complex nutritional science has helped us improve health outcomes in our community."
                }
              ].map((story, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <blockquote className="text-slate-700 italic mb-4 flex-1">
                      "{story.quote}"
                    </blockquote>
                    <div>
                      <h4 className="font-semibold text-slate-900">{story.name}</h4>
                      <p className="text-slate-600 text-sm">{story.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-indigo-50 rounded-xl p-8 border border-indigo-100">
              <div className="md:flex items-center">
                <div className="md:w-3/4 mb-6 md:mb-0 md:pr-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Community Impact Program
                  </h3>
                  <p className="text-slate-700 mb-4">
                    Our research directly informs our community education programs, which have been implemented 
                    in 14 communities across the United States. These programs have shown a measurable improvement 
                    in health literacy and nutritional habits among participants.
                  </p>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 h-5 w-5 text-indigo-600 mr-2 mt-0.5">✓</span>
                      <span>87% of participants reported improved understanding of nutrition</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 h-5 w-5 text-indigo-600 mr-2 mt-0.5">✓</span>
                      <span>62% made significant changes to their dietary habits</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 h-5 w-5 text-indigo-600 mr-2 mt-0.5">✓</span>
                      <span>3,200+ families reached through community partnerships</span>
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/4 flex justify-center">
                  <div className="bg-white p-5 rounded-full h-32 w-32 flex items-center justify-center shadow-sm">
                    <div>
                      <div className="text-3xl font-bold text-indigo-700 text-center">14</div>
                      <div className="text-xs text-slate-600 text-center">Communities</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Research impact */}
      <section className="py-16">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <Badge variant="indigo" className="mb-4">
                <Book className="h-3 w-3 mr-1" />
                Research Impact
              </Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Advancing Scientific Knowledge</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Our research has contributed to the scientific understanding of micronutrients 
                and their role in human health, influencing both clinical practice and public health policy.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: "Vitamin D Research",
                  image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300",
                  description: "Our research on Vitamin D has identified optimal supplementation protocols for individuals with different genetic profiles, leading to more personalized recommendations.",
                  outcome: "Influenced vitamin D guidelines in 3 healthcare systems"
                },
                {
                  title: "Magnesium Bioavailability",
                  image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300",
                  description: "We've conducted comparative studies on magnesium forms, identifying those with superior bioavailability and effectiveness for specific health conditions.",
                  outcome: "Published in leading nutritional journals with 500+ citations"
                },
                {
                  title: "Gut Microbiome & Nutrients",
                  image: "https://images.unsplash.com/photo-1530026054970-71a0a321a59c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300",
                  description: "Our pioneering research on the relationship between gut health and micronutrient absorption has opened new avenues for improving nutritional outcomes.",
                  outcome: "Led to 2 clinical trials and a patent-pending diagnostic tool"
                }
              ].map((research, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={research.image} 
                      alt={research.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{research.title}</h3>
                    <p className="text-slate-700 mb-4 flex-1">{research.description}</p>
                    <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                      <p className="text-sm text-emerald-800">
                        <strong>Outcome:</strong> {research.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button asChild variant="outline" size="lg">
                <Link to="/bibliotheque-scientifique">
                  View our scientific publications
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Education impact */}
      <section className="py-16 bg-slate-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <Badge variant="secondary" className="mb-4">
                <GraduationCap className="h-3 w-3 mr-1" />
                Educational Impact
              </Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Empowering Through Knowledge</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Our educational programs translate complex scientific research into accessible, 
                actionable information for healthcare professionals and the general public.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 mb-12">
              <div className="md:flex">
                <div className="md:w-1/3 bg-indigo-600 text-white p-8 rounded-l-xl flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-4">Educational Reach</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <span className="inline-flex items-center justify-center rounded-full bg-indigo-500 h-6 w-6 mr-3">✓</span>
                      <span>17,500+ Online course participants</span>
                    </li>
                    <li className="flex items-center">
                      <span className="inline-flex items-center justify-center rounded-full bg-indigo-500 h-6 w-6 mr-3">✓</span>
                      <span>4,200+ Healthcare professionals trained</span>
                    </li>
                    <li className="flex items-center">
                      <span className="inline-flex items-center justify-center rounded-full bg-indigo-500 h-6 w-6 mr-3">✓</span>
                      <span>85+ Educational webinars conducted</span>
                    </li>
                    <li className="flex items-center">
                      <span className="inline-flex items-center justify-center rounded-full bg-indigo-500 h-6 w-6 mr-3">✓</span>
                      <span>92% Satisfaction rate among students</span>
                    </li>
                  </ul>
                </div>
                <div className="md:w-2/3 p-8">
                  <h4 className="text-xl font-semibold text-slate-900 mb-4">Program Highlights</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Nutrition Science Certificate Program",
                        description: "Professional development program for healthcare providers, focusing on evidence-based nutritional interventions.",
                        metric: "1,200+ Graduates"
                      },
                      {
                        title: "Public Health Education Initiative",
                        description: "Community-focused workshops delivered in partnership with local health departments and community centers.",
                        metric: "32 Communities Served"
                      },
                      {
                        title: "Micronutrient Science Portal",
                        description: "Free online resource providing accessible scientific information on vitamins, minerals, and other micronutrients.",
                        metric: "230,000+ Annual Visitors"
                      },
                      {
                        title: "Continuing Medical Education Credits",
                        description: "Accredited courses for physicians, dietitians, and nurses focusing on nutritional therapies.",
                        metric: "9,000+ CME Credits Awarded"
                      }
                    ].map((program, i) => (
                      <div key={i} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h5 className="font-medium text-slate-900 mb-2">{program.title}</h5>
                        <p className="text-sm text-slate-600 mb-3">{program.description}</p>
                        <div className="text-sm font-medium text-indigo-700">{program.metric}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                <Link to="/quiz">
                  Take our personalized nutrition quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Global impact */}
      <section className="py-16">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <Badge variant="indigo" className="mb-4">
                <Globe className="h-3 w-3 mr-1" />
                Global Reach
              </Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Worldwide Impact</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                While based in the United States, our work extends across borders through research collaborations, 
                educational partnerships, and knowledge sharing.
              </p>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-8 mb-12">
              <div className="md:flex">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">International Research Collaborations</h3>
                  <ul className="space-y-3">
                    {[
                      "ETH Zürich - Micronutrient bioavailability research",
                      "University of Tokyo - Polyphenol metabolism studies",
                      "Oxford University - Vitamin D and immune function",
                      "University of Cape Town - Nutritional interventions for vulnerable populations",
                      "National University of Singapore - Micronutrient status in aging populations"
                    ].map((collaboration, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 h-5 w-5 text-indigo-600 mr-2 mt-0.5">✓</span>
                        <span className="text-slate-700">{collaboration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:w-1/2 md:pl-8 md:border-l border-slate-200">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Global Knowledge Translation</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { metric: "18", label: "Countries with active programs" },
                      { metric: "7", label: "Languages for educational resources" },
                      { metric: "42", label: "International partnerships" },
                      { metric: "12,400+", label: "International program participants" }
                    ].map((item, i) => (
                      <div key={i} className="bg-white p-4 rounded-lg border border-slate-200 text-center">
                        <div className="text-2xl font-bold text-indigo-700 mb-1">{item.metric}</div>
                        <div className="text-sm text-slate-600">{item.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 bg-white p-4 rounded-lg border border-slate-200">
                    <h4 className="font-medium text-slate-900 mb-2">Featured Global Initiative</h4>
                    <p className="text-slate-700 text-sm">
                      Our "Nutrition Knowledge Bridge" program provides training and resources to healthcare 
                      providers in underserved regions, empowering them with the latest nutritional science to address 
                      local health challenges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Future Goals</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Expand Research Scope",
                    description: "Launch 5 new clinical studies focusing on micronutrient interactions with chronic disease management."
                  },
                  {
                    title: "Enhance Educational Reach",
                    description: "Develop mobile learning platforms to reach healthcare providers in remote and underserved areas."
                  },
                  {
                    title: "Build Community Programs",
                    description: "Expand our community impact programs to 10 additional communities in the next 2 years."
                  }
                ].map((goal, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h4 className="text-lg font-semibold text-slate-900 mb-3">{goal.title}</h4>
                    <p className="text-slate-700">{goal.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-indigo-600 text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Support Our Mission</h3>
              <p className="text-lg opacity-90 max-w-3xl mx-auto mb-6">
                Join us in our mission to advance scientific knowledge and improve global health through evidence-based nutrition education.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="secondary" size="lg">
                  <Link to="/about">
                    Learn More About Us
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-white text-indigo-700 hover:bg-slate-100">
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Impact;
