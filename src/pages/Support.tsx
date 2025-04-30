import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/contexts/LanguageContext';

const Support: React.FC = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: "How do I interpret my quiz results?",
      answer: "Your quiz results provide personalized nutritional insights based on your responses. The recommendations are organized by priority, with the most relevant suggestions listed first. Each recommendation includes scientific explanations and research references for transparency."
    },
    {
      question: "Is the information provided medically validated?",
      answer: "The information provided is based on peer-reviewed scientific research and is educational in nature. However, it should not replace professional medical advice. Always consult with a healthcare provider before making significant changes to your diet or supplement regimen."
    },
    {
      question: "How often should I retake the nutritional assessment?",
      answer: "We recommend retaking the assessment every 3-6 months, or whenever you experience significant changes in your health, lifestyle, or objectives. This ensures your recommendations remain relevant to your current needs."
    },
    {
      question: "Can I download my results or recommendations?",
      answer: "Yes, after completing the quiz, you can download a PDF summary of your results and recommendations from your Health Profile page. This feature is available to all users."
    },
    {
      question: "How is my data protected?",
      answer: "We take data protection seriously. Your quiz responses and health information are stored securely and never shared with third parties. For more details, please review our Privacy Policy."
    }
  ];

  return (
    <Container className="py-8">
      <Helmet>
        <title>Support Center - Natural Pure Academy</title>
        <meta name="description" content="Get help and find answers to your questions about Natural Pure Academy's nutritional assessments, research, and educational resources." />
      </Helmet>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">Support Center</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions and get assistance with using our scientific resources and nutritional assessment tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Get help with our nutritional assessment tool, understanding your results, and implementing recommendations.</p>
            <Button asChild variant="outline" className="w-full">
              <a href="#quiz-faq">View FAQs</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Science & Research</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Questions about our methodologies, research papers, or scientific content? Find answers here.</p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/scientific-methodology">View Methodology</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Can't find what you need? Our team is ready to assist you with any questions or concerns.</p>
            <Button asChild className="w-full">
              <Link to="/contact">Contact Support</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div id="quiz-faq" className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Still Need Help?</h2>
        <p className="mb-4">
          If you couldn't find the answer to your question, please don't hesitate to reach out to our support team. We're here to help you get the most out of Natural Pure Academy's resources.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <Link to="/contact">Email Support</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://www.instagram.com/naturalpure_academy/" target="_blank" rel="noopener noreferrer">Message on Instagram</a>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Support;