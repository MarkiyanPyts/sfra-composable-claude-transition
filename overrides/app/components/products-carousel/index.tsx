import React, {useState, useRef} from 'react'
import {
    Box,
    Heading,
    IconButton,
    Image,
    Text,
    Badge,
    HStack,
    VStack,
    Link
} from '@chakra-ui/react'
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'

interface Product {
    id: string
    name: string
    brand: string
    price: number
    originalPrice?: number
    image: string
    badge?: string
    link: string
}

interface ProductsCarouselProps {
    title: string
    products: Product[]
}

const ProductsCarousel: React.FC<ProductsCarouselProps> = ({title, products}) => {
    const [currentPage, setCurrentPage] = useState(0)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const itemsPerPage = 5

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const itemWidth = scrollContainerRef.current.querySelector('.product-item')?.clientWidth || 0
            const scrollAmount = itemWidth * itemsPerPage
            const currentScroll = scrollContainerRef.current.scrollLeft
            
            scrollContainerRef.current.scrollTo({
                left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
                behavior: 'smooth'
            })

            if (direction === 'left') {
                setCurrentPage(Math.max(0, currentPage - 1))
            } else {
                setCurrentPage(Math.min(Math.ceil(products.length / itemsPerPage) - 1, currentPage + 1))
            }
        }
    }

    const totalPages = Math.ceil(products.length / itemsPerPage)

    return (
        <Box py={['2rem', '3rem', '4rem']} px={['1rem', '2rem', '4rem']}>
            <Heading
                as="h2"
                fontSize={['1.5rem', '2rem', '2.5rem']}
                fontWeight="bold"
                textTransform="uppercase"
                textAlign="center"
                mb={['2rem', '3rem']}
            >
                {title}
            </Heading>

            <Box position="relative">
                <IconButton
                    aria-label="Previous products"
                    icon={<ChevronLeftIcon boxSize={8} />}
                    position="absolute"
                    left={['-15px', '-30px']}
                    top="50%"
                    transform="translateY(-50%)"
                    backgroundColor="white"
                    borderRadius="none"
                    boxShadow="md"
                    zIndex={2}
                    onClick={() => handleScroll('left')}
                    isDisabled={currentPage === 0}
                    _hover={{backgroundColor: 'gray.100'}}
                    size="lg"
                />
                
                <IconButton
                    aria-label="Next products"
                    icon={<ChevronRightIcon boxSize={8} />}
                    position="absolute"
                    right={['-15px', '-30px']}
                    top="50%"
                    transform="translateY(-50%)"
                    backgroundColor="white"
                    borderRadius="none"
                    boxShadow="md"
                    zIndex={2}
                    onClick={() => handleScroll('right')}
                    isDisabled={currentPage === totalPages - 1}
                    _hover={{backgroundColor: 'gray.100'}}
                    size="lg"
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
                    <HStack spacing={['1rem', '1.5rem']} display="inline-flex" align="stretch">
                        {products.map((product) => (
                            <VStack
                                key={product.id}
                                className="product-item"
                                as={Link}
                                href={product.link}
                                width={['180px', '220px', '260px']}
                                spacing="1rem"
                                align="stretch"
                                flexShrink={0}
                                textDecoration="none"
                                _hover={{textDecoration: 'none'}}
                            >
                                <Box
                                    position="relative"
                                    width="100%"
                                    height={['200px', '250px', '300px']}
                                    backgroundColor="gray.100"
                                    overflow="hidden"
                                >
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        objectFit="cover"
                                        width="100%"
                                        height="100%"
                                        transition="transform 0.3s"
                                        _hover={{transform: 'scale(1.05)'}}
                                    />
                                    {product.badge && (
                                        <Badge
                                            position="absolute"
                                            top="1rem"
                                            left="1rem"
                                            backgroundColor="teal.400"
                                            color="white"
                                            px="0.75rem"
                                            py="0.25rem"
                                            fontSize="0.75rem"
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                        >
                                            {product.badge}
                                        </Badge>
                                    )}
                                </Box>
                                
                                <VStack align="flex-start" spacing="0.5rem" px="0.5rem">
                                    <Text
                                        fontSize={['0.75rem', '0.875rem']}
                                        fontWeight="bold"
                                        textTransform="capitalize"
                                        color="black"
                                    >
                                        {product.brand}
                                    </Text>
                                    <Text
                                        fontSize={['0.875rem', '1rem']}
                                        color="black"
                                        noOfLines={2}
                                        whiteSpace="normal"
                                    >
                                        {product.name}
                                    </Text>
                                    <HStack spacing="0.5rem">
                                        <Text
                                            fontSize={['1rem', '1.125rem']}
                                            fontWeight="bold"
                                            color="black"
                                        >
                                            €{product.price.toFixed(2)}
                                        </Text>
                                        {product.originalPrice && (
                                            <Text
                                                fontSize={['0.875rem', '1rem']}
                                                textDecoration="line-through"
                                                color="gray.500"
                                            >
                                                €{product.originalPrice.toFixed(2)}
                                            </Text>
                                        )}
                                    </HStack>
                                </VStack>
                            </VStack>
                        ))}
                    </HStack>
                </Box>
            </Box>

            <HStack justify="center" mt="2rem" spacing="0.5rem">
                {Array.from({length: totalPages}).map((_, index) => (
                    <Box
                        key={index}
                        width={currentPage === index ? '2rem' : '0.5rem'}
                        height="0.5rem"
                        borderRadius="full"
                        backgroundColor={currentPage === index ? 'black' : 'gray.300'}
                        transition="all 0.3s"
                        cursor="pointer"
                        onClick={() => {
                            setCurrentPage(index)
                            if (scrollContainerRef.current) {
                                const itemWidth = scrollContainerRef.current.querySelector('.product-item')?.clientWidth || 0
                                scrollContainerRef.current.scrollTo({
                                    left: itemWidth * itemsPerPage * index,
                                    behavior: 'smooth'
                                })
                            }
                        }}
                    />
                ))}
            </HStack>
        </Box>
    )
}

export default ProductsCarousel