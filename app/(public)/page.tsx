'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Clock,
  Star,
  ShoppingBag,
  Truck,
  Users,
  ChefHat,
  Heart,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Zap,
  Globe,
  Camera,
  Play,
} from 'lucide-react';
import Image from 'next/image';
import {
  featureImages,
  foodSlides,
  heroSlides,
  testimonials,
} from '../utils/constants';

const RestaurantLanding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [currentFoodSlide, setCurrentFoodSlide] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    const foodTimer = setInterval(() => {
      setCurrentFoodSlide((prev) => (prev + 1) % foodSlides.length);
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
      clearInterval(foodTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-black to-red-900/20"></div>
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: 'all 0.3s ease-out',
          }}
        ></div>
      </div>

      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-110'
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt="Delicious Food"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div
                className={`absolute inset-0 bg-gradient-to-t ${slide.overlay}`}
              ></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <h1 className="text-7xl md:text-9xl font-black mb-6 leading-none">
            <span
              className="block bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent transform transition-all duration-1000"
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              {heroSlides[currentSlide].title}
            </span>
            <span
              className="block bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent transform transition-all duration-1000"
              style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
            >
              {heroSlides[currentSlide].subtitle}
            </span>
          </h1>

          <p className="text-2xl md:text-4xl text-white/90 mb-12 font-light tracking-wide">
            {heroSlides[currentSlide].accent}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 text-white px-12 py-6 rounded-full text-xl font-bold tracking-wider hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105">
              <span className="relative z-10 flex items-center justify-center">
                DISCOVER LOCATIONS
                <MapPin className="ml-3 w-6 h-6 group-hover:bounce transition-transform duration-500" />
              </span>
            </button>

            <button className="group relative overflow-hidden bg-white/10 backdrop-blur-sm text-white px-12 py-6 rounded-full text-xl font-bold tracking-wider hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40">
              <span className="flex items-center justify-center">
                VIEW MENU
                <ChefHat className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Floating Food Showcase */}
      <section className="relative -mt-32 z-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/10 p-8">
            <div className="grid md:grid-cols-4 gap-6">
              {foodSlides.map((food, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${
                    index === currentFoodSlide
                      ? 'scale-105 ring-4 ring-orange-500/50'
                      : 'scale-100'
                  }`}
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={food.image}
                      alt={food.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-sm mb-1">
                      {food.title}
                    </h3>
                    <p className="text-white/70 text-xs">{food.description}</p>
                  </div>

                  {index === currentFoodSlide && (
                    <div className="absolute top-2 right-2">
                      <Sparkles className="w-5 h-5 text-orange-400 animate-pulse" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chef's Special Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-900/10 to-black"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-6xl md:text-7xl font-black mb-8">
                <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  CHEF&apos;S
                </span>
                <br />
                <span className="bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                  MASTERPIECES
                </span>
              </h2>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Our award-winning chefs craft each dish with passion, precision,
                and the finest ingredients. Every plate tells a story of
                culinary excellence that will leave you craving more.
              </p>
              <div className="space-y-4">
                {[
                  '🔥 Wood-fired cooking techniques',
                  '🌿 Locally sourced premium ingredients',
                  '👨‍🍳 Michelin-trained chefs',
                  '🎨 Instagram-worthy presentation',
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center text-white/80 text-lg"
                  >
                    <span className="mr-3">{feature.split(' ')[0]}</span>
                    <span>{feature.substring(feature.indexOf(' ') + 1)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {featureImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative h-64 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Happy Customers Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                HAPPY
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                CUSTOMERS
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-orange-500/30 transition-all duration-500 hover:scale-105"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 ring-2 ring-orange-500/50"
                  />
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {testimonial.name}
                    </h3>
                    <p className="text-orange-400 text-sm">
                      {testimonial.dish}
                    </p>
                    <div className="flex mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-white/80 italic leading-relaxed">
                  &quot;{testimonial.comment}&quot;
                </p>
                <div className="absolute top-4 right-4">
                  <Heart className="w-6 h-6 text-red-500 group-hover:animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Experience Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-900/10 to-black"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                YOUR WAY
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                icon: <Users className="w-16 h-16" />,
                title: 'DINE-IN EXPERIENCE',
                description:
                  'Immerse yourself in our vibrant atmosphere with live cooking shows and craft cocktails.',
                image:
                  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                cta: 'RESERVE TABLE',
                gradient: 'from-purple-600 to-blue-600',
              },
              {
                icon: <ShoppingBag className="w-16 h-16" />,
                title: 'QUICK PICKUP',
                description:
                  'Skip the wait! Order ahead and grab your favorites fresh from our kitchen.',
                image:
                  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                cta: 'ORDER PICKUP',
                gradient: 'from-orange-600 to-red-600',
              },
              {
                icon: <Truck className="w-16 h-16" />,
                title: 'PREMIUM DELIVERY',
                description:
                  'Restaurant-quality meals delivered hot to your door with our insulated packaging.',
                image:
                  'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                cta: 'ORDER DELIVERY',
                gradient: 'from-green-600 to-teal-600',
              },
            ].map((option, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl"
              >
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={option.image}
                    alt={option.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${option.gradient} opacity-70 group-hover:opacity-80 transition-opacity duration-300`}
                  ></div>
                </div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                      {option.icon}
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4 tracking-wider">
                      {option.title}
                    </h3>
                    <p className="text-white/90 mb-6 font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {option.description}
                    </p>
                    <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-bold tracking-wider hover:bg-white/30 transition-all duration-300 border border-white/30 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                      {option.cta}{' '}
                      <ArrowRight className="inline w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Restaurant atmosphere"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-orange-900/60 to-red-900/80"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-wider">
            TASTE THE
            <br />
            <span className="bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">
              DIFFERENCE
            </span>
          </h2>
          <p className="text-2xl text-white/90 mb-12 font-light max-w-3xl mx-auto">
            Join thousands of food lovers who've discovered their new favorite
            dining destination. Your table awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <button className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 text-white px-16 py-6 rounded-full text-xl font-black tracking-wider hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-110">
              <span className="relative z-10 flex items-center justify-center">
                FIND LOCATIONS
                <MapPin className="ml-3 w-6 h-6 group-hover:bounce transition-transform duration-500" />
              </span>
            </button>
            <button className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-16 py-6 rounded-full text-xl font-black tracking-wider hover:bg-white/20 hover:border-white/50 transition-all duration-300">
              <span className="flex items-center justify-center">
                EXPLORE MENU
                <ChefHat className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default RestaurantLanding;
