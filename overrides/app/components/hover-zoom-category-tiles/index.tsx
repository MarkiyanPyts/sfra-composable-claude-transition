import React from 'react'
import {Box, Grid, Heading, Image, Link} from '@chakra-ui/react'

interface CategoryTile {
    title: string
    image: string
    link: string
}

interface HoverZoomCategoryTilesProps {
    categories: CategoryTile[]
}

const HoverZoomCategoryTiles: React.FC<HoverZoomCategoryTilesProps> = ({categories}) => {
    return (
        <Box py={['2rem', '3rem', '4rem']} px={['1rem', '2rem', '4rem']}>
            <Grid
                templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
                gap={['1rem', '1.5rem', '2rem']}
            >
                {categories.map((category, index) => (
                    <Link
                        key={index}
                        href={category.link}
                        display="block"
                        position="relative"
                        overflow="hidden"
                        height={['250px', '300px', '350px']}
                        _hover={{textDecoration: 'none'}}
                        group
                    >
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            width="100%"
                            height="100%"
                            background={`linear-gradient(135deg, 
                                ${index === 0 ? 'rgba(144, 238, 144, 0.3), rgba(60, 179, 113, 0.3)' : 
                                 index === 1 ? 'rgba(255, 228, 181, 0.3), rgba(255, 165, 0, 0.3)' :
                                 index === 2 ? 'rgba(255, 182, 193, 0.3), rgba(255, 105, 180, 0.3)' :
                                 'rgba(173, 216, 230, 0.3), rgba(70, 130, 180, 0.3)'}
                            )`}
                            zIndex={1}
                        />
                        
                        <Image
                            src={category.image}
                            alt={category.title}
                            objectFit="cover"
                            width="100%"
                            height="100%"
                            transition="transform 0.5s ease"
                            _groupHover={{transform: 'scale(1.1)'}}
                        />
                        
                        <Box
                            position="absolute"
                            bottom="0"
                            left="0"
                            right="0"
                            padding={['1.5rem', '2rem']}
                            zIndex={2}
                        >
                            <Heading
                                as="h3"
                                fontSize={['1.25rem', '1.5rem', '1.75rem']}
                                fontWeight="bold"
                                textTransform="uppercase"
                                color="black"
                                backgroundColor="white"
                                display="inline-block"
                                px="1rem"
                                py="0.5rem"
                                letterSpacing="wider"
                            >
                                {category.title}
                            </Heading>
                        </Box>
                    </Link>
                ))}
            </Grid>
        </Box>
    )
}

export default HoverZoomCategoryTiles