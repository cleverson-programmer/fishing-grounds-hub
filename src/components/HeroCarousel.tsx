import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import fishingPark1 from "@/assets/fishing-park-1.jpg";
import fishingPark2 from "@/assets/fishing-park-2.jpg";
import fishingPark3 from "@/assets/fishing-park-3.jpg";
import fishingGuide from "@/assets/fishing-guide.jpg";

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselData = [
    {
      background: fishingPark1,
      title: "Welcome to Pine Lake",
      subtitle: "Experience the serenity of nature's finest fishing destination",
      cardImage: fishingGuide,
      cardTitle: "Expert Guides",
      cardDescription: "Professional guidance for the perfect catch"
    },
    {
      background: fishingPark2,
      title: "Sunset Fishing",
      subtitle: "Discover magical moments as the sun sets over crystal waters",
      cardImage: fishingPark1,
      cardTitle: "Premium Spots",
      cardDescription: "Access to the best fishing locations"
    },
    {
      background: fishingPark3,
      title: "Family Adventures",
      subtitle: "Create lasting memories with family-friendly fishing experiences",
      cardImage: fishingPark2,
      cardTitle: "All Ages Welcome",
      cardDescription: "Perfect for beginners and experts alike"
    }
  ];

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselData.length]);

  const currentSlide = carouselData[currentIndex];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{ 
          backgroundImage: `url(${currentSlide.background})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Side - Title and Subtitle */}
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {currentSlide.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              {currentSlide.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="btn-hero px-8 py-4 text-lg">
                Book Your Adventure
              </button>
              <button className="px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 rounded-lg font-semibold">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side - Image Cards */}
          <div className="flex justify-center lg:justify-end">
            <div className="flex flex-col lg:flex-row gap-4 max-w-md lg:max-w-2xl">
              {carouselData.map((item, index) => (
                <Card 
                  key={index}
                  className={`nature-card p-0 cursor-pointer transition-all duration-500 overflow-hidden ${
                    index === currentIndex 
                      ? 'scale-110 shadow-2xl ring-2 ring-primary' 
                      : 'scale-100 opacity-80 hover:opacity-100'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <div className="aspect-video lg:aspect-square w-full h-32 lg:h-40">
                    <img 
                      src={item.cardImage} 
                      alt={item.cardTitle}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;