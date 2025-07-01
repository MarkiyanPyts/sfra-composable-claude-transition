import React, {useState, useEffect} from 'react'
import {Box, Button, Heading, IconButton, Image, Text, useBreakpointValue} from '@chakra-ui/react'
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'

interface BannerSlide {
    title: string
    subtitle: string
    image: string
    imageDesktop: string
    imageMobile: string
    ctaText: string
    ctaLink: string
}

interface BannerCarouselProps {
    slides: BannerSlide[]
    autoPlayInterval?: number
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({slides, autoPlayInterval = 5000}) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const isMobile = useBreakpointValue({base: true, md: false})

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, autoPlayInterval)

        return () => clearInterval(interval)
    }, [slides.length, autoPlayInterval])

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    if (!slides.length) return null

    const currentSlideData = slides[currentSlide]

    return (
        <Box position="relative" width="100%" height={['400px', '500px', '600px']} overflow="hidden">
            <Image
                src={isMobile ? currentSlideData.imageMobile : currentSlideData.imageDesktop}
                alt={currentSlideData.title}
                objectFit="cover"
                width="100%"
                height="100%"
            />
            
            <Box
                position="absolute"
                top="0"
                left="0"
                width={['100%', '100%', '50%']}
                height="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems={['center', 'center', 'flex-start']}
                padding={['2rem', '3rem', '4rem']}
                textAlign={['center', 'center', 'left']}
                background={[
                    'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3))',
                    'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3))',
                    'none'
                ]}
            >
                <Box
                    position={['static', 'static', 'absolute']}
                    left={['auto', 'auto', '0']}
                    top={['auto', 'auto', '50%']}
                    transform={['none', 'none', 'translateY(-50%)']}
                    width={['100%', '100%', '45%']}
                    height={['auto', 'auto', '70%']}
                    background={['none', 'none', 'linear-gradient(135deg, #5B5FDE 0%, #8E92FF 100%)']}
                    clipPath={['none', 'none', 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)']}
                    padding={['0', '0', '4rem']}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                >
                    <Heading
                        as="h1"
                        fontSize={['2rem', '3rem', '4rem']}
                        color={['white', 'white', '#FF006E']}
                        fontWeight="bold"
                        lineHeight="1.2"
                        mb="1rem"
                    >
                        {currentSlideData.title.split(' ').map((word, index) => (
                            <React.Fragment key={index}>
                                {word}
                                {index < currentSlideData.title.split(' ').length - 1 && <br />}
                            </React.Fragment>
                        ))}
                    </Heading>
                    
                    <Text
                        fontSize={['1.5rem', '2rem', '3rem']}
                        color={['white', 'white', '#FF006E']}
                        fontWeight="bold"
                        mb="2rem"
                    >
                        {currentSlideData.subtitle}
                    </Text>
                    
                    <Button
                        size="lg"
                        backgroundColor="white"
                        color="black"
                        fontWeight="bold"
                        borderRadius="full"
                        px="3rem"
                        py="1.5rem"
                        fontSize="1rem"
                        _hover={{backgroundColor: 'gray.100'}}
                        onClick={() => window.location.href = currentSlideData.ctaLink}
                    >
                        {currentSlideData.ctaText}
                    </Button>
                </Box>
            </Box>

            <IconButton
                aria-label="Previous slide"
                icon={<ChevronLeftIcon boxSize={8} />}
                position="absolute"
                left="1rem"
                top="50%"
                transform="translateY(-50%)"
                backgroundColor="white"
                borderRadius="full"
                size="lg"
                onClick={handlePrevSlide}
                _hover={{backgroundColor: 'gray.100'}}
            />

            <IconButton
                aria-label="Next slide"
                icon={<ChevronRightIcon boxSize={8} />}
                position="absolute"
                right="1rem"
                top="50%"
                transform="translateY(-50%)"
                backgroundColor="white"
                borderRadius="full"
                size="lg"
                onClick={handleNextSlide}
                _hover={{backgroundColor: 'gray.100'}}
            />

            <Box
                position="absolute"
                bottom="2rem"
                left="50%"
                transform="translateX(-50%)"
                display="flex"
                gap="0.5rem"
            >
                {slides.map((_, index) => (
                    <Box
                        key={index}
                        width="0.5rem"
                        height="0.5rem"
                        borderRadius="full"
                        backgroundColor={index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.5)'}
                        cursor="pointer"
                        onClick={() => setCurrentSlide(index)}
                        transition="all 0.3s"
                    />
                ))}
            </Box>
        </Box>
    )
}

export default BannerCarousel