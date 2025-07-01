import React, {useState, useRef} from 'react'
import {
    Box,
    Button,
    Heading,
    IconButton,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    HStack,
    VStack,
    useDisclosure
} from '@chakra-ui/react'
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'

interface Product {
    id: string
    name: string
    image: string
    price: number
    link: string
}

interface FeedItem {
    id: string
    image: string
    products: Product[]
}

interface ZoomModalCarouselProps {
    title: string
    subtitle: string
    items: FeedItem[]
}

const ZoomModalCarousel: React.FC<ZoomModalCarouselProps> = ({title, subtitle, items}) => {
    const [selectedItem, setSelectedItem] = useState<FeedItem | null>(null)
    const [currentProductIndex, setCurrentProductIndex] = useState(0)
    const {isOpen, onOpen, onClose} = useDisclosure()
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const handleItemClick = (item: FeedItem) => {
        setSelectedItem(item)
        setCurrentProductIndex(0)
        onOpen()
    }

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300
            const currentScroll = scrollContainerRef.current.scrollLeft
            scrollContainerRef.current.scrollTo({
                left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    const handleProductNav = (direction: 'prev' | 'next') => {
        if (!selectedItem) return
        
        if (direction === 'prev') {
            setCurrentProductIndex((prev) => 
                prev === 0 ? selectedItem.products.length - 1 : prev - 1
            )
        } else {
            setCurrentProductIndex((prev) => 
                (prev + 1) % selectedItem.products.length
            )
        }
    }

    return (
        <Box py={['2rem', '3rem', '4rem']} px={['1rem', '2rem', '4rem']}>
            <VStack spacing="1rem" mb={['2rem', '3rem']}>
                <Heading
                    as="h2"
                    fontSize={['1.5rem', '2rem', '2.5rem']}
                    fontWeight="bold"
                    textTransform="uppercase"
                >
                    {title}
                </Heading>
                <Text fontSize={['0.875rem', '1rem']} color="gray.600">
                    {subtitle}
                </Text>
            </VStack>

            <Box position="relative">
                <IconButton
                    aria-label="Scroll left"
                    icon={<ChevronLeftIcon boxSize={6} />}
                    position="absolute"
                    left={['-10px', '-20px']}
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
                    right={['-10px', '-20px']}
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
                    <HStack spacing={['1rem', '1.5rem']} display="inline-flex">
                        {items.map((item) => (
                            <Box
                                key={item.id}
                                width={['200px', '250px', '300px']}
                                height={['200px', '250px', '300px']}
                                flexShrink={0}
                                cursor="pointer"
                                onClick={() => handleItemClick(item)}
                                overflow="hidden"
                                borderRadius="md"
                                transition="transform 0.3s"
                                _hover={{transform: 'scale(1.05)'}}
                            >
                                <Image
                                    src={item.image}
                                    alt="Feed item"
                                    objectFit="cover"
                                    width="100%"
                                    height="100%"
                                />
                            </Box>
                        ))}
                    </HStack>
                </Box>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size={['full', 'full', '6xl']}>
                <ModalOverlay />
                <ModalContent margin={['0', '0', '2rem']}>
                    <ModalCloseButton
                        size="lg"
                        backgroundColor="white"
                        borderRadius="full"
                        boxShadow="md"
                        zIndex={3}
                    />
                    <ModalBody p={0}>
                        {selectedItem && (
                            <HStack
                                spacing={0}
                                align="stretch"
                                height={['auto', 'auto', '600px']}
                                flexDirection={['column', 'column', 'row']}
                            >
                                <Box
                                    width={['100%', '100%', '60%']}
                                    height={['300px', '400px', '100%']}
                                >
                                    <Image
                                        src={selectedItem.image}
                                        alt="Selected item"
                                        objectFit="cover"
                                        width="100%"
                                        height="100%"
                                    />
                                </Box>
                                
                                <VStack
                                    width={['100%', '100%', '40%']}
                                    height="100%"
                                    spacing={0}
                                    align="stretch"
                                    backgroundColor="gray.50"
                                    p={['2rem', '3rem']}
                                    position="relative"
                                >
                                    <Box flex="1" display="flex" alignItems="center">
                                        <HStack spacing="2rem" width="100%">
                                            <IconButton
                                                aria-label="Previous product"
                                                icon={<ChevronLeftIcon boxSize={6} />}
                                                backgroundColor="white"
                                                borderRadius="full"
                                                onClick={() => handleProductNav('prev')}
                                                _hover={{backgroundColor: 'gray.200'}}
                                            />
                                            
                                            <VStack spacing="1rem" flex="1">
                                                <Image
                                                    src={selectedItem.products[currentProductIndex].image}
                                                    alt={selectedItem.products[currentProductIndex].name}
                                                    objectFit="contain"
                                                    height="200px"
                                                />
                                                <Text
                                                    fontSize="0.875rem"
                                                    fontStyle="italic"
                                                    textAlign="center"
                                                >
                                                    {selectedItem.products[currentProductIndex].name}
                                                </Text>
                                            </VStack>
                                            
                                            <IconButton
                                                aria-label="Next product"
                                                icon={<ChevronRightIcon boxSize={6} />}
                                                backgroundColor="white"
                                                borderRadius="full"
                                                onClick={() => handleProductNav('next')}
                                                _hover={{backgroundColor: 'gray.200'}}
                                            />
                                        </HStack>
                                    </Box>
                                    
                                    <Button
                                        size="lg"
                                        width="100%"
                                        backgroundColor="black"
                                        color="white"
                                        fontWeight="bold"
                                        _hover={{backgroundColor: 'gray.800'}}
                                        onClick={() => {
                                            window.location.href = selectedItem.products[currentProductIndex].link
                                        }}
                                    >
                                        SHOP NOW
                                    </Button>
                                </VStack>
                            </HStack>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ZoomModalCarousel