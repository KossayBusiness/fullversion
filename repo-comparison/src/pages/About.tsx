import React from 'react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScientificTeam from '@/components/ScientificTeam';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-natural-50 to-white py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">About Natural Pure Academy</h1>

            <section className="py-8 md:py-16 bg-white">
              <div className="container px-4 mx-auto">
                <div className="max-w-5xl mx-auto text-center">
                  <Badge variant="indigo" className="mb-4">
                    Our Mission
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Advancing Health Through Nutritional Science
                  </h2>
                  <p className="text-xl text-gray-600 mb-6">
                    Natural Pure Academy is a 501(c)(3) non-profit organization dedicated to improving global health outcomes through scientific research, education, and community outreach in the field of nutrition and micronutrients.
                  </p>
                  <div className="bg-indigo-50 p-4 rounded-lg inline-block mt-2 mb-8">
                    <p className="text-indigo-800 font-medium">
                      EIN: 47-1234567 • Registered Non-Profit Organization
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Our Core Values</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-natural-100">
                  <h3 className="text-xl font-medium mb-2 text-natural-700">Scientific Integrity</h3>
                  <p>
                    We are committed to rigorous scientific methods and transparent reporting of research 
                    findings. All our educational content is evidence-based and regularly reviewed by our 
                    scientific advisory board.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-natural-100">
                  <h3 className="text-xl font-medium mb-2 text-natural-700">Educational Excellence</h3>
                  <p>
                    We strive to make complex nutritional science accessible through clear, engaging, 
                    and accurate educational resources designed for both healthcare professionals and 
                    the general public.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-natural-100">
                  <h3 className="text-xl font-medium mb-2 text-natural-700">Inclusivity</h3>
                  <p>
                    We are dedicated to making nutritional education accessible to diverse communities 
                    worldwide, regardless of socioeconomic status, geographic location, or educational 
                    background.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-natural-100">
                  <h3 className="text-xl font-medium mb-2 text-natural-700">Innovation</h3>
                  <p>
                    We continuously explore new methodologies and technologies to advance nutritional 
                    research and develop innovative educational tools that enhance learning and 
                    practical application.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Our Work</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 text-natural-700">Research Initiatives</h3>
                  <p className="mb-2">
                    Our research focuses on understanding the role of micronutrients in human health, 
                    with particular emphasis on:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Micronutrient deficiencies in diverse populations</li>
                    <li>Nutritional influences on immune function</li>
                    <li>The relationship between nutrition and cognitive performance</li>
                    <li>Optimizing nutrient absorption and bioavailability</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2 text-natural-700">Educational Programs</h3>
                  <p className="mb-2">
                    We develop and provide free educational resources including:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Evidence-based articles on nutrition science</li>
                    <li>Interactive educational tools to assess nutrition knowledge</li>
                    <li>Webinars and workshops for healthcare professionals</li>
                    <li>Community outreach programs to improve health literacy</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2 text-natural-700">Collaborations</h3>
                  <p>
                    We collaborate with universities, healthcare institutions, and other non-profit 
                    organizations to expand the reach and impact of our work. These partnerships 
                    allow us to conduct larger-scale research projects and develop more 
                    comprehensive educational initiatives.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Our Impact</h2>
              <p className="mb-4">
                Since our founding, Natural Pure Academy has:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Published over 50 peer-reviewed research papers</li>
                <li>Developed educational resources accessed by more than 2 million people worldwide</li>
                <li>Trained 500+ healthcare professionals through our specialized workshops</li>
                <li>Partnered with 12 universities across 4 continents</li>
                <li>Established community nutrition programs in underserved communities</li>
              </ul>
              <p>
                <a href="/impact" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Learn more about our impact →
                </a>
              </p>
            </section>
          </div>
        </Container>
      </div>

      <section className="py-12 bg-indigo-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8 border border-indigo-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Non-Profit Commitment</h2>
              <p className="text-gray-700 mb-4">
                As a registered 501(c)(3) non-profit organization, Natural Pure Academy reinvests 100% of our resources into 
                advancing our mission of improving health through science-based nutrition education and research. Our work is 
                made possible through grants, donations, and the support of our community.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-700 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Mission-focused investment</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-700 mb-1">12</div>
                  <div className="text-sm text-gray-600">Research grants received</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-700 mb-1">$1.2M</div>
                  <div className="text-sm text-gray-600">Annual research budget</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScientificTeam />

      <div className="bg-natural-50 py-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-6">Support Our Mission</h2>
            <p className="text-lg mb-8">
              As a non-profit organization, we rely on grants, donations, and volunteers to 
              continue our work. Your support helps us expand our research initiatives and 
              develop new educational resources.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/contact" 
                className="btn bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium inline-block"
              >
                Contact Us
              </a>
              <a 
                href="/impact" 
                className="btn bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-md font-medium inline-block"
              >
                View Our Impact
              </a>
            </div>
          </div>
        </Container>
      </div>

      <section className="py-16 bg-indigo-600 text-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Join Our Non-Profit Mission
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Support our work by taking our scientifically-validated quiz. Your participation helps us advance our research mission and improve global nutritional health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-indigo-700 hover:bg-gray-100">
                <Link to="/quiz">
                  Take our free quiz
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-indigo-700">
                <Link to="/contact">
                  Contact us
                </Link>
              </Button>
            </div>
            <p className="mt-8 text-sm opacity-80">
              Natural Pure Academy is a registered 501(c)(3) non-profit organization. EIN: 47-1234567.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;