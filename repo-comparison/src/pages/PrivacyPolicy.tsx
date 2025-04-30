
import React from 'react';
import { Container } from '@/components/ui/container';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <div className="prose prose-indigo max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: May 1, 2025
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Introduction</h2>
            <p>
              Natural Pure Academy ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains 
              how we collect, use, disclose, and safeguard your information when you visit our website, including any other 
              media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Site").
            </p>
            <p>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Personal Data</h3>
            <p>
              We may collect personal identification information from you in a variety of ways, including, but not limited to, 
              when you visit our site, register on the site, fill out a form, and in connection with other activities, services, 
              features or resources we make available on our Site. You may be asked for, as appropriate:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Demographic information such as age and gender (for quiz personalization)</li>
              <li>Health information provided in our nutritional assessment quiz</li>
            </ul>
            <p>
              You may, however, visit our site anonymously. We will collect personal identification information from you only 
              if you voluntarily submit such information to us. You can always refuse to supply personal identification information, 
              except that it may prevent you from engaging in certain site-related activities such as receiving personalized recommendations.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Non-Personal Data</h3>
            <p>
              We may collect non-personal identification information about you whenever you interact with our Site. 
              Non-personal identification information may include the browser name, the type of computer or device, 
              and technical information about your means of connection to our Site, such as the operating system, 
              the Internet service providers utilized, and other similar information.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
            <p>
              We may use the information we collect from you in the following ways:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.</li>
              <li>To improve our website in order to better serve you.</li>
              <li>To allow us to better service you in responding to your customer service requests.</li>
              <li>To administer a contest, promotion, survey or other site feature.</li>
              <li>To generate personalized nutritional recommendations based on your quiz responses.</li>
              <li>To send periodic emails regarding our nonprofit activities, educational resources, or research updates.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track the activity on our Site and hold certain information. 
              Cookies are files with small amount of data which may include an anonymous unique identifier. 
              Cookies are sent to your browser from a website and stored on your device.
            </p>
            <p>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
              However, if you do not accept cookies, you may not be able to use some portions of our Site.
            </p>
            <p>
              Examples of Cookies we use:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Session Cookies.</strong> We use Session Cookies to operate our Service.</li>
              <li><strong>Preference Cookies.</strong> We use Preference Cookies to remember your preferences and various settings.</li>
              <li><strong>Security Cookies.</strong> We use Security Cookies for security purposes.</li>
              <li><strong>Analytics Cookies.</strong> We use analytics cookies to track how users interact with our Site, which helps us improve its functionality.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Google Ad Grants</h2>
            <p>
              As a nonprofit organization, we participate in the Google Ad Grants program, which provides free advertising on Google Search. 
              Google Analytics may collect information about your interactions with our ads and our website. This helps us improve our 
              educational outreach and measure the impact of our nonprofit mission.
            </p>
            <p>
              For more information about how Google uses data when you use Google's services, please visit: 
              <a href="https://policies.google.com/privacy?hl=en-US" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                https://policies.google.com/privacy
              </a>
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Third-Party Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal identification information to outside parties unless 
              we provide you with advance notice. This does not include website hosting partners and other parties who assist us 
              in operating our website, conducting our business, or serving you, so long as those parties agree to keep this information confidential.
            </p>
            <p>
              We may also release your information when we believe release is appropriate to comply with the law, 
              enforce our site policies, or protect ours or others' rights, property, or safety.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Security</h2>
            <p>
              We have implemented appropriate technical and organizational security measures designed to protect 
              the security of any personal information we process. However, despite our safeguards and efforts to 
              secure your information, no electronic transmission over the Internet or information storage technology 
              can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, 
              or other unauthorized third parties will not be able to defeat our security and improperly collect, 
              access, steal, or modify your information.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Children's Privacy</h2>
            <p>
              Our Site is not intended for children under the age of 16. We do not knowingly collect personal 
              identifiable information from children under 16. If you are a parent or guardian and you are aware 
              that your child has provided us with personal information, please contact us so that we can take necessary actions.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, such as:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>The right to access the personal information we have about you</li>
              <li>The right to request correction of inaccurate personal information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to object to processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the information provided below.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date at the top of this page. 
              You are advised to review this Privacy Policy periodically for any changes.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none pl-6 mb-4">
              <li>By email: privacy@naturalpureacademy.org</li>
              <li>By mail: Natural Pure Academy, 123 Science Way, San Francisco, CA 94107, United States</li>
            </ul>
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Natural Pure Academy is a registered 501(c)(3) nonprofit organization dedicated to advancing scientific knowledge
                and education in the field of nutrition and micronutrients.
              </p>
              <p className="mt-4">
                <Link to="/" className="text-indigo-600 hover:text-indigo-800">
                  Return to Home
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
