import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  Users,
  Target,
  Award,
  Star,
  CheckCircle,
  Sparkles,
  Zap,
  Rocket,
} from "lucide-react";

const Home: React.FC = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Track record of increasing client ROI by 300% on average",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Certified professionals with 10+ years of digital marketing experience",
    },
    {
      icon: Target,
      title: "Targeted Strategy",
      description:
        "Data-driven campaigns tailored to your specific business goals",
    },
    {
      icon: Award,
      title: "Award Winning",
      description:
        "Recognized industry leader with multiple marketing excellence awards",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc",
      rating: 5,
      comment:
        "DigitalFlow transformed our online presence. Our leads increased by 400% in just 3 months!",
    },
    {
      name: "Mike Chen",
      company: "E-commerce Plus",
      rating: 5,
      comment:
        "The ROI from their campaigns exceeded all expectations. Professional team, outstanding results.",
    },
    {
      name: "Emily Rodriguez",
      company: "Local Services Co",
      rating: 5,
      comment:
        "Finally found a marketing agency that understands our business. Highly recommend DigitalFlow!",
    },
  ];

  const stats = [
    { number: "500+", label: "Successful Campaigns" },
    { number: "300%", label: "Average ROI Increase" },
    { number: "50+", label: "Happy Clients" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-700 to-emerald-800 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-400/10 rounded-full blur-2xl animate-spin-slow"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="particle absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="particle absolute top-40 right-32 w-1 h-1 bg-blue-300/40 rounded-full"></div>
          <div className="particle absolute bottom-32 left-1/4 w-3 h-3 bg-purple-300/30 rounded-full"></div>
          <div className="particle absolute bottom-20 right-20 w-2 h-2 bg-emerald-300/40 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center relative z-10">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Rocket className="h-16 w-16 text-yellow-400 animate-bounce-slow" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
            </div>

            <h1
              style={{ lineHeight: "1.3", overflow: "visible" }}
              className="text-4xl md:text-5xl lg:text-7xl font-black mb-8"
            >
              Grow Your Business with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-emerald-300 block animate-gradient-text">
                Digital Marketing Excellence
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-4xl mx-auto leading-relaxed font-medium">
              We help ambitious businesses achieve exponential growth through
              data-driven digital marketing strategies that deliver measurable
              results.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/services"
                className="btn-interactive bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-600 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-110 hover:shadow-2xl flex items-center justify-center group animate-glow"
              >
                <Zap className="mr-3 h-6 w-6 animate-pulse" />
                Get Started Now
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>

              <Link
                to="/portfolio"
                className="glass-effect-strong text-white hover:bg-white/20 px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center group border-2 border-white/30"
              >
                <Sparkles className="mr-3 h-5 w-5 group-hover:animate-spin" />
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center text-center bg-gray-200 hover:bg-gray-300 rounded-2xl p-8 border border-gray-300 shadow-md transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  {stat.number}
                </div>
                <div className="text-gray-800 font-bold text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50 animate-float"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full blur-3xl opacity-50 animate-float delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 relative z-10">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
                <Star className="h-8 w-8 text-white animate-spin-slow" />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Why Choose DigitalFlow?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed">
              We combine cutting-edge technology with proven strategies to
              deliver exceptional results for your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group card-interactive p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <feature.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-32 left-32 w-48 h-48 bg-blue-200/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-56 h-56 bg-purple-200/20 rounded-full blur-2xl animate-pulse delay-700"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Comprehensive digital marketing solutions to accelerate your
              growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 relative z-10">
            {[
              { name: "SEO Optimization", desc: "Improve search rankings" },
              { name: "Social Media Marketing", desc: "Build brand awareness" },
              { name: "PPC / Google Ads", desc: "Targeted ad campaigns" },
              { name: "Content Marketing", desc: "Engaging content strategy" },
              {
                name: "Web Design & Development",
                desc: "Beautiful, responsive websites",
              },
              {
                name: "Branding & Graphic Design",
                desc: "Create a strong visual identity",
              },
              {
                name: "Email Marketing",
                desc: "Automated campaigns that convert",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="card-interactive bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">
                  {service.desc}
                </p>

                <div className="flex items-center text-blue-600 text-sm font-bold group-hover:text-purple-600 transition-colors duration-300">
                  <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  Learn More
                </div>
              </div>
            ))}
          </div>

          <div className="text-center relative z-10">
            <Link
              to="/services"
              className="btn-interactive bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl inline-flex items-center"
            >
              <Sparkles className="mr-3 h-5 w-5 animate-pulse" />
              View All Services
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full blur-3xl opacity-50 animate-float"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full blur-3xl opacity-50 animate-float delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Success stories from businesses we've helped grow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="card-interactive bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:border-yellow-200 group"
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-6 w-6 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 italic text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  "{testimonial.comment}"
                </p>

                <div>
                  <div className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-spin-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative z-10">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Rocket className="h-12 w-12 text-white animate-bounce-slow" />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Transform Your Business?
            </h2>

            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
              Join hundreds of successful businesses that trust DigitalFlow for
              their marketing needs.
            </p>

            <Link
              to="/contact"
              className="btn-interactive bg-white text-blue-600 hover:bg-gray-100 px-12 py-5 rounded-2xl text-xl font-bold transition-all duration-300 hover:scale-110 hover:shadow-2xl inline-flex items-center group"
            >
              <Sparkles className="mr-3 h-6 w-6 text-purple-600 group-hover:animate-spin" />
              Start Your Journey
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
