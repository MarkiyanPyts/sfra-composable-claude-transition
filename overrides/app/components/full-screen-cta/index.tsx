import React from 'react'
import {Box, Button, Heading, Image, HStack, VStack} from '@chakra-ui/react'

interface FullScreenCTAProps {
    logo?: string
    title: string
    subtitle: string
    backgroundImage: string
    ctaText: string
    ctaLink: string
}

const FullScreenCTA: React.FC<FullScreenCTAProps> = ({
    logo,
    title,
    subtitle,
    backgroundImage,
    ctaText,
    ctaLink
}) => {
    return (
        <Box
            position="relative"
            width="100%"
            height={['400px', '500px', '600px']}
            overflow="hidden"
        >
            <Image
                src={backgroundImage}
                alt={title}
                objectFit="cover"
                width="100%"
                height="100%"
            />
            
            <Box
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                background="linear-gradient(90deg, rgba(91, 95, 222, 0.9) 0%, rgba(142, 146, 255, 0.7) 50%, transparent 100%)"
                display="flex"
                alignItems="center"
                padding={['2rem', '3rem', '4rem']}
            >
                <HStack
                    spacing={['2rem', '3rem', '4rem']}
                    align="center"
                    maxWidth="1200px"
                    margin="0 auto"
                    width="100%"
                >
                    {logo && (
                        <Box
                            display={['none', 'none', 'block']}
                            flexShrink={0}
                        >
                            <svg
                                width="200"
                                height="200"
                                viewBox="0 0 200 200"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 20L140 40L160 80L140 120L100 140L60 120L40 80L60 40L100 20Z"
                                    stroke="white"
                                    strokeWidth="3"
                                    fill="none"
                                />
                                <path
                                    d="M100 60L120 70L130 90L120 110L100 120L80 110L70 90L80 70L100 60Z"
                                    stroke="white"
                                    strokeWidth="2"
                                    fill="none"
                                />
                            </svg>
                            <Heading
                                as="h3"
                                fontSize="1.5rem"
                                color="white"
                                fontWeight="bold"
                                textAlign="center"
                                mt="-2rem"
                            >
                                BEAR RACES
                            </Heading>
                        </Box>
                    )}
                    
                    <Box
                        borderLeft={logo ? '3px solid white' : 'none'}
                        paddingLeft={logo ? ['2rem', '3rem', '4rem'] : '0'}
                        height={['auto', 'auto', '150px']}
                        display="flex"
                        alignItems="center"
                    >
                        <VStack align="flex-start" spacing="0">
                            <Heading
                                as="h2"
                                fontSize={['2rem', '3rem', '4rem']}
                                color="white"
                                fontWeight="bold"
                                lineHeight="1"
                            >
                                {title}
                            </Heading>
                            <Heading
                                as="h3"
                                fontSize={['2rem', '3rem', '4rem']}
                                color="white"
                                fontWeight="bold"
                                lineHeight="1"
                                borderBottom="4px solid white"
                                paddingBottom="0.5rem"
                            >
                                {subtitle}
                            </Heading>
                        </VStack>
                    </Box>
                    
                    <Box marginLeft="auto">
                        <Button
                            size="lg"
                            backgroundColor="white"
                            color="black"
                            fontWeight="bold"
                            borderRadius="full"
                            px={['2rem', '3rem', '4rem']}
                            py={['1.5rem', '2rem']}
                            fontSize={['1rem', '1.25rem']}
                            _hover={{backgroundColor: 'gray.100'}}
                            onClick={() => window.location.href = ctaLink}
                        >
                            {ctaText}
                        </Button>
                    </Box>
                </HStack>
            </Box>
        </Box>
    )
}

export default FullScreenCTA