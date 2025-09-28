import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import LoadingBar from "./LoadingBar";
import fishingPark1 from "@/assets/fishing-park-1.jpg";
import fishingPark2 from "@/assets/fishing-park-2.jpg";
import fishingPark3 from "@/assets/fishing-park-3.jpg";
import fishingGuide from "@/assets/fishing-guide.jpg";

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
  const handleAdvanceCarousel = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleCardClick = (index: number) => {
    if (index === currentIndex) return;
    
    setIsTransitioning(true);
    const clickedCard = cardRefs.current[index];
    
    if (clickedCard) {
      // Get card position for transition effect
      const cardRect = clickedCard.getBoundingClientRect();
      const expandingElement = document.createElement('div');
      expandingElement.style.position = 'fixed';
      expandingElement.style.left = `${cardRect.left}px`;
      expandingElement.style.top = `${cardRect.top}px`;
      expandingElement.style.width = `${cardRect.width}px`;
      expandingElement.style.height = `${cardRect.height}px`;
      expandingElement.style.backgroundImage = `url(${carouselData[index].background})`;
      expandingElement.style.backgroundSize = 'cover';
      expandingElement.style.backgroundPosition = 'center';
      expandingElement.style.zIndex = '40';
      expandingElement.style.borderRadius = '0.5rem';
      expandingElement.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      
      document.body.appendChild(expandingElement);
      
      // Trigger expansion
      setTimeout(() => {
        expandingElement.style.left = '0px';
        expandingElement.style.top = '0px';
        expandingElement.style.width = '100vw';
        expandingElement.style.height = '100vh';
        expandingElement.style.borderRadius = '0px';
      }, 10);
      
      // Complete transition
      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
        document.body.removeChild(expandingElement);
      }, 800);
    } else {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }
  };

  const currentSlide = carouselData[currentIndex];

  return (
    <>
      {/* Loading Bar */}
      <LoadingBar duration={3000} onComplete={handleAdvanceCarousel} />
      
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
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-md lg:max-w-4xl">
              {carouselData.map((item, index) => (
                <Card 
                  key={index}
                  ref={(el) => cardRefs.current[index] = el}
                  className={`nature-card p-0 cursor-pointer transition-all duration-500 overflow-hidden ${
                    index === currentIndex 
                      ? 'scale-110 shadow-2xl ring-2 ring-primary' 
                      : 'scale-100 opacity-80 hover:opacity-100'
                  }`}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="aspect-video lg:aspect-square w-full h-40 lg:h-56">
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
            onClick={() => handleCardClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
      </div>
    </>
  );
};

export default HeroCarousel;