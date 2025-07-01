import React, {useRef, useEffect} from 'react'
import {Box, HStack, IconButton, Image, Link} from '@chakra-ui/react'
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'

interface Brand {
    name: string
    logo: string
    link: string
}

interface BrandLogosCarouselProps {
    brands: Brand[]
    autoScroll?: boolean
    scrollSpeed?: number
}

const BrandLogosCarousel: React.FC<BrandLogosCarouselProps> = ({
    brands,
    autoScroll = true,
    scrollSpeed = 50
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<number | null>(null)

    useEffect(() => {
        if (!autoScroll || !scrollContainerRef.current) return

        let scrollPosition = 0
        const container = scrollContainerRef.current
        const scrollWidth = container.scrollWidth
        const clientWidth = container.clientWidth

        const animate = () => {
            if (scrollPosition >= scrollWidth - clientWidth) {
                scrollPosition = 0
            } else {
                scrollPosition += 1
            }
            
            container.scrollLeft = scrollPosition
            animationRef.current = requestAnimationFrame(animate)
        }

        const timer = setTimeout(() => {
            animationRef.current = requestAnimationFrame(animate)
        }, 1000)

        return () => {
            clearTimeout(timer)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [autoScroll, scrollSpeed])

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200
            const currentScroll = scrollContainerRef.current.scrollLeft
            scrollContainerRef.current.scrollTo({
                left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    const handleMouseEnter = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
        }
    }

    const handleMouseLeave = () => {
        if (!autoScroll || !scrollContainerRef.current) return

        let scrollPosition = scrollContainerRef.current.scrollLeft
        const container = scrollContainerRef.current
        const scrollWidth = container.scrollWidth
        const clientWidth = container.clientWidth

        const animate = () => {
            if (scrollPosition >= scrollWidth - clientWidth) {
                scrollPosition = 0
            } else {
                scrollPosition += 1
            }
            
            container.scrollLeft = scrollPosition
            animationRef.current = requestAnimationFrame(animate)
        }

        animationRef.current = requestAnimationFrame(animate)
    }

    return (
        <Box
            py={['2rem', '3rem', '4rem']}
            px={['1rem', '2rem', '4rem']}
            backgroundColor="gray.50"
            position="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <IconButton
                aria-label="Scroll left"
                icon={<ChevronLeftIcon boxSize={6} />}
                position="absolute"
                left={['10px', '20px']}
                top="50%"
                transform="translateY(-50%)"
                backgroundColor="white"
                borderRadius="full"
                boxShadow="md"
                zIndex={2}
                onClick={() => handleScroll('left')}
                _hover={{backgroundColor: 'gray.100'}}
            />
            
            <IconButton
                aria-label="Scroll right"
                icon={<ChevronRightIcon boxSize={6} />}
                position="absolute"
                right={['10px', '20px']}
                top="50%"
                transform="translateY(-50%)"
                backgroundColor="white"
                borderRadius="full"
                boxShadow="md"
                zIndex={2}
                onClick={() => handleScroll('right')}
                _hover={{backgroundColor: 'gray.100'}}
            />

            <Box
                ref={scrollContainerRef}
                overflowX="auto"
                overflowY="hidden"
                whiteSpace="nowrap"
                css={{
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    scrollbarWidth: 'none'
                }}
            >
                <HStack spacing={['3rem', '4rem', '5rem']} display="inline-flex" py="1rem">
                    {[...brands, ...brands].map((brand, index) => (
                        <Link
                            key={`${brand.name}-${index}`}
                            href={brand.link}
                            display="block"
                            flexShrink={0}
                            _hover={{opacity: 0.8}}
                        >
                            <Image
                                src={brand.logo}
                                alt={brand.name}
                                height={['40px', '50px', '60px']}
                                objectFit="contain"
                                filter="grayscale(100%)"
                                transition="filter 0.3s"
                                _hover={{filter: 'grayscale(0%)'}}
                            />
                        </Link>
                    ))}
                </HStack>
            </Box>
        </Box>
    )
}

export default BrandLogosCarousel