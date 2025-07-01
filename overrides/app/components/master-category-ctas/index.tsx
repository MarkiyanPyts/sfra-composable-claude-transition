import React from 'react'
import {Box, Grid, Heading, Image, Link, VStack, HStack} from '@chakra-ui/react'

interface CategoryLink {
    label: string
    url: string
}

interface MasterCategory {
    title: string
    image: string
    links: CategoryLink[]
}

interface MasterCategoryCTAsProps {
    categories: MasterCategory[]
}

const MasterCategoryCTAs: React.FC<MasterCategoryCTAsProps> = ({categories}) => {
    return (
        <Box py={['2rem', '3rem', '4rem']} px={['1rem', '2rem', '4rem']}>
            <Grid
                templateColumns={['1fr', '1fr', 'repeat(2, 1fr)']}
                gap={['2rem', '3rem', '4rem']}
            >
                {categories.map((category, index) => (
                    <Box
                        key={index}
                        position="relative"
                        overflow="hidden"
                        borderRadius="lg"
                        height={['300px', '350px', '400px']}
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
                        
                        <Box
                            position="absolute"
                            bottom="0"
                            left="0"
                            right="0"
                            background="linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
                            padding={['1.5rem', '2rem']}
                        >
                            <VStack align="flex-start" spacing="1rem">
                                <Heading
                                    as="h3"
                                    fontSize={['1.25rem', '1.5rem']}
                                    fontWeight="bold"
                                    textTransform="uppercase"
                                    color="white"
                                    backgroundColor="rgba(0, 0, 0, 0.7)"
                                    px="1rem"
                                    py="0.5rem"
                                >
                                    {category.title}
                                </Heading>
                                
                                <HStack spacing={['1rem', '1.5rem']} flexWrap="wrap">
                                    {category.links.map((link, linkIndex) => (
                                        <Link
                                            key={linkIndex}
                                            href={link.url}
                                            fontSize={['0.875rem', '1rem']}
                                            fontWeight="medium"
                                            textTransform="uppercase"
                                            color="white"
                                            textDecoration="underline"
                                            _hover={{
                                                textDecoration: 'none',
                                                opacity: 0.8
                                            }}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </HStack>
                            </VStack>
                        </Box>
                    </Box>
                ))}
            </Grid>
        </Box>
    )
}

export default MasterCategoryCTAs