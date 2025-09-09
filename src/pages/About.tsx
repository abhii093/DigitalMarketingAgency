import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Lightbulb, Award, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const teamMembers = [
    {
      name: 'Aman',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      description: 'Digital marketing veteran with 15+ years experience building successful campaigns.'
    },
    {
      name: 'Ishaan',
      role: 'Technical Lead',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      description: 'Full-stack developer and marketing technologist ensuring seamless campaign execution.'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'Every strategy is designed with measurable outcomes and clear KPIs in mind.'
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Your success is our success. We treat your business goals as our own.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We stay ahead of industry trends to give you competitive advantages.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality work and service standards.'
    }
  ];

  const achievements = [
    'Certified Google Partners',
    'Facebook Marketing Partners',
    'HubSpot Solutions Provider',
    'Analytics Certified Professionals',
    '500+ Successful Campaigns',
    '95% Client Retention Rate'
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              About DigitalFlow
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We're a team of passionate digital marketing experts dedicated to helping businesses 
              achieve extraordinary growth through innovative strategies and proven methodologies.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                At DigitalFlow, we believe every business deserves to thrive in the digital landscape. 
                Our mission is to democratize access to world-class digital marketing by providing 
                strategies that are both cutting-edge and accessible.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We combine the latest technology with human creativity to craft campaigns that not 
                only drive traffic and conversions but also build lasting relationships between 
                brands and their customers.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" 
                alt="Team collaboration"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-emerald-500 text-white p-4 rounded-lg shadow-xl">
                <div className="text-2xl font-bold">10+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 text-center group hover:scale-105 border border-gray-100 hover:border-blue-200 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <value.icon className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{value.title}</h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              Experienced professionals passionate about your success
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 hover:border-blue-200 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3 group-hover:text-purple-600 transition-colors duration-300">{member.role}</p>
                  <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-blue-100">
              Recognized excellence in digital marketing
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-500 hover:scale-105 group"
              >
                <div className="flex items-center text-white group-hover:text-emerald-100 transition-colors duration-300">
                  <CheckCircle className="h-6 w-6 text-emerald-400 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium group-hover:font-semibold transition-all duration-300">{achievement}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-60 h-60 bg-emerald-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
            Ready to Work with Us?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">
            Let's discuss how we can help your business achieve its digital marketing goals.
          </p>
          <Link
            to="/contact"
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-flex items-center group relative z-10"
          >
            <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            Get In Touch
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;