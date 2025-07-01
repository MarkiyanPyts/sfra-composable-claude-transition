import React, {useState, useRef} from 'react'
import {
    Box,
    Heading,
    Image,
    Link,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    IconButton,
    HStack,
    useBreakpointValue
} from '@chakra-ui/react'
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'

interface Category {
    id: string
    tabId: string
    title: string
    image: string
    link: string
}

interface TabItem {
    id: string
    label: string
}

interface CategoryCarouselTabsProps {
    tabs: TabItem[]
    categories: Category[]
}

const CategoryCarouselTabs: React.FC<CategoryCarouselTabsProps> = ({tabs, categories}) => {
    const [selectedTab, setSelectedTab] = useState(0)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const isMobile = useBreakpointValue({base: true, md: false})

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

    const filteredCategories = categories.filter(
        cat => cat.tabId === tabs[selectedTab]?.id
    )

    return (
        <Box py={['2rem', '3rem', '4rem']} px={['1rem', '2rem', '4rem']}>
            <HStack justify="space-between" mb={['2rem', '3rem']}>
                <Heading
                    as="h2"
                    fontSize={['1.5rem', '2rem', '2.5rem']}
                    fontWeight="bold"
                    textTransform="uppercase"
                >
                    By Category
                </Heading>
                
                <Link
                    href="/shop-all"
                    fontSize={['0.875rem', '1rem']}
                    fontWeight="medium"
                    textDecoration="underline"
                    _hover={{textDecoration: 'none'}}
                >
                    SHOP ALL
                </Link>
            </HStack>

            <Tabs index={selectedTab} onChange={setSelectedTab} variant="unstyled">
                <TabList
                    borderBottom={isMobile ? 'none' : '1px solid'}
                    borderColor="gray.200"
                    mb={['1rem', '2rem']}
                >
                    {tabs.map((tab) => (
                        <Tab
                            key={tab.id}
                            fontSize={['0.875rem', '1rem']}
                            fontWeight="medium"
                            pb={['0.5rem', '1rem']}
                            px={['1rem', '2rem']}
                            position="relative"
                            _selected={{
                                color: 'black',
                                _after: {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    backgroundColor: 'black'
                                }
                            }}
                            _hover={{color: 'gray.600'}}
                        >
                            {tab.label}
                        </Tab>
                    ))}
                </TabList>

                <TabPanels>
                    {tabs.map((tab) => (
                        <TabPanel key={tab.id} p={0}>
                            <Box position="relative">
                                {!isMobile && (
                                    <>
                                        <IconButton
                                            aria-label="Scroll left"
                                            icon={<ChevronLeftIcon boxSize={6} />}
                                            position="absolute"
                                            left="-20px"
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
                                            right="-20px"
                                            top="50%"
                                            transform="translateY(-50%)"
                                            backgroundColor="white"
                                            borderRadius="full"
                                            boxShadow="md"
                                            zIndex={2}
                                            onClick={() => handleScroll('right')}
                                            _hover={{backgroundColor: 'gray.100'}}
                                        />
                                    </>
                                )}

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
                                    <HStack
                                        spacing={['1rem', '1.5rem', '2rem']}
                                        align="stretch"
                                        display="inline-flex"
                                    >
                                        {filteredCategories.map((category) => (
                                            <Box
                                                key={category.id}
                                                as={Link}
                                                href={category.link}
                                                display="block"
                                                width={['200px', '250px', '300px']}
                                                textDecoration="none"
                                                _hover={{textDecoration: 'none'}}
                                                flexShrink={0}
                                            >
                                                <Box
                                                    position="relative"
                                                    width="100%"
                                                    height={['250px', '300px', '350px']}
                                                    overflow="hidden"
                                                    mb="1rem"
                                                >
                                                    <Image
                                                        src={category.image}
                                                        alt={category.title}
                                                        objectFit="cover"
                                                        width="100%"
                                                        height="100%"
                                                        transition="transform 0.3s"
                                                        _hover={{transform: 'scale(1.05)'}}
                                                    />
                                                </Box>
                                                <Text
                                                    fontSize={['0.875rem', '1rem']}
                                                    fontWeight="bold"
                                                    textTransform="uppercase"
                                                    color="black"
                                                >
                                                    {category.title}
                                                </Text>
                                            </Box>
                                        ))}
                                    </HStack>
                                </Box>
                            </Box>
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>

            {isMobile && (
                <HStack justify="center" mt="1rem" spacing="0.5rem">
                    {filteredCategories.map((_, index) => (
                        <Box
                            key={index}
                            width="0.5rem"
                            height="0.5rem"
                            borderRadius="full"
                            backgroundColor={index === 0 ? 'black' : 'gray.300'}
                        />
                    ))}
                </HStack>
            )}
        </Box>
    )
}

export default CategoryCarouselTabs