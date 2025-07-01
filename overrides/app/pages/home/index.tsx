import React, {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {Box} from '@chakra-ui/react'

// Project Components
import Seo from '@salesforce/retail-react-app/app/components/seo'
import BannerCarousel from '../../components/banner-carousel'
import CategoryCarouselTabs from '../../components/category-carousel-tabs'
import MasterCategoryCTAs from '../../components/master-category-ctas'
import FullScreenCTA from '../../components/full-screen-cta'
import ZoomModalCarousel from '../../components/zoom-modal-carousel'
import ProductsCarousel from '../../components/products-carousel'
import HoverZoomCategoryTiles from '../../components/hover-zoom-category-tiles'
import BrandLogosCarousel from '../../components/brand-logos-carousel'

// Hooks
import useEinstein from '@salesforce/retail-react-app/app/hooks/use-einstein'
import {useServerContext} from '@salesforce/pwa-kit-react-sdk/ssr/universal/hooks'
import {useProductSearch} from '@salesforce/commerce-sdk-react'

// Constants
import {
    HOME_SHOP_PRODUCTS_CATEGORY_ID,
    HOME_SHOP_PRODUCTS_LIMIT,
    MAX_CACHE_AGE,
    STALE_WHILE_REVALIDATE
} from '../../constants'

// Sample data - In production, this would come from your CMS or API
const bannerSlides = [
    {
        title: 'YOUR SUMMER',
        subtitle: 'YOUR STYLE',
        image: 'https://picsum.photos/1200/600?random=1',
        imageDesktop: 'https://picsum.photos/1200/600?random=1',
        imageMobile: 'https://picsum.photos/600/400?random=1',
        ctaText: 'SHOP NOW',
        ctaLink: '/shop/summer-collection'
    },
    {
        title: 'NEW ARRIVALS',
        subtitle: 'FRESH LOOKS',
        image: 'https://picsum.photos/1200/600?random=40',
        imageDesktop: 'https://picsum.photos/1200/600?random=40',
        imageMobile: 'https://picsum.photos/600/400?random=41',
        ctaText: 'DISCOVER NOW',
        ctaLink: '/shop/new-arrivals'
    }
]

const categoryTabs = [
    {id: 'women', label: 'Women'},
    {id: 'men', label: 'Men'},
    {id: 'kids', label: 'Kids'}
]

const categories = [
    {
        id: '1',
        tabId: 'women',
        title: 'CLOTHING',
        image: 'https://picsum.photos/300/350?random=2',
        link: '/women/clothing'
    },
    {
        id: '2',
        tabId: 'women',
        title: 'FOOTWEAR',
        image: 'https://picsum.photos/300/350?random=3',
        link: '/women/footwear'
    },
    {
        id: '3',
        tabId: 'women',
        title: 'ACCESSORIES',
        image: 'https://picsum.photos/300/350?random=4',
        link: '/women/accessories'
    },
    {
        id: '4',
        tabId: 'women',
        title: 'SWIMWEAR',
        image: 'https://picsum.photos/300/350?random=5',
        link: '/women/swimwear'
    },
    {
        id: '5',
        tabId: 'men',
        title: 'CLOTHING',
        image: 'https://picsum.photos/300/350?random=6',
        link: '/men/clothing'
    },
    {
        id: '6',
        tabId: 'men',
        title: 'FOOTWEAR',
        image: 'https://picsum.photos/300/350?random=7',
        link: '/men/footwear'
    },
    {
        id: '7',
        tabId: 'men',
        title: 'ACCESSORIES',
        image: 'https://picsum.photos/300/350?random=8',
        link: '/men/accessories'
    },
    {
        id: '8',
        tabId: 'kids',
        title: 'CLOTHING',
        image: 'https://picsum.photos/300/350?random=9',
        link: '/kids/clothing'
    },
    {
        id: '9',
        tabId: 'kids',
        title: 'FOOTWEAR',
        image: 'https://picsum.photos/300/350?random=10',
        link: '/kids/footwear'
    },
    {
        id: '10',
        tabId: 'kids',
        title: 'TOYS',
        image: 'https://picsum.photos/300/350?random=11',
        link: '/kids/toys'
    }
]

const masterCategories = [
    {
        title: 'RUNNING & TRAINING',
        image: 'https://picsum.photos/600/400?random=12',
        links: [
            {label: 'MEN', url: '/men/running'},
            {label: 'WOMEN', url: '/women/running'},
            {label: 'SHOP ALL', url: '/running'}
        ]
    },
    {
        title: 'LIONS JERSEY',
        image: 'https://picsum.photos/600/400?random=13',
        links: [
            {label: 'ADULTS', url: '/adults/lions-jersey'},
            {label: 'KIDS', url: '/kids/lions-jersey'},
            {label: 'SHOP ALL', url: '/lions-jersey'}
        ]
    }
]

const feedItems = [
    {
        id: '1',
        image: 'https://picsum.photos/300/300?random=14',
        products: [
            {
                id: 'p1',
                name: 'Ripstop Anorak Windbreaker Half...',
                image: 'https://picsum.photos/200/200?random=15',
                price: 89.99,
                link: '/product/windbreaker'
            }
        ]
    },
    {
        id: '2',
        image: 'https://picsum.photos/300/300?random=16',
        products: [
            {
                id: 'p2',
                name: 'Classic Sneakers',
                image: 'https://picsum.photos/200/200?random=17',
                price: 120.00,
                link: '/product/sneakers'
            }
        ]
    },
    {
        id: '3',
        image: 'https://picsum.photos/300/300?random=18',
        products: [
            {
                id: 'p3',
                name: 'Summer Collection',
                image: 'https://picsum.photos/200/200?random=19',
                price: 65.00,
                link: '/product/summer'
            }
        ]
    },
    {
        id: '4',
        image: 'https://picsum.photos/300/300?random=20',
        products: [
            {
                id: 'p4',
                name: 'Beach Essentials',
                image: 'https://picsum.photos/200/200?random=21',
                price: 45.00,
                link: '/product/beach'
            }
        ]
    },
    {
        id: '5',
        image: 'https://picsum.photos/300/300?random=22',
        products: [
            {
                id: 'p5',
                name: 'Athletic Wear',
                image: 'https://picsum.photos/200/200?random=23',
                price: 75.00,
                link: '/product/athletic'
            }
        ]
    }
]

const categoryTiles = [
    {
        title: "WOMEN'S",
        image: 'https://picsum.photos/350/350?random=24',
        link: '/women'
    },
    {
        title: "MEN'S",
        image: 'https://picsum.photos/350/350?random=25',
        link: '/men'
    },
    {
        title: "KIDS'",
        image: 'https://picsum.photos/350/350?random=26',
        link: '/kids'
    },
    {
        title: 'BOOTROOM',
        image: 'https://picsum.photos/350/350?random=27',
        link: '/bootroom'
    }
]

const brands = [
    {
        name: 'ATAK',
        logo: 'https://picsum.photos/120/60?random=28',
        link: '/brands/atak'
    },
    {
        name: 'On',
        logo: 'https://picsum.photos/120/60?random=29',
        link: '/brands/on'
    },
    {
        name: 'Speedo',
        logo: 'https://picsum.photos/120/60?random=30',
        link: '/brands/speedo'
    },
    {
        name: 'Tavistock',
        logo: 'https://picsum.photos/120/60?random=31',
        link: '/brands/tavistock'
    },
    {
        name: 'Converse',
        logo: 'https://picsum.photos/120/60?random=32',
        link: '/brands/converse'
    },
    {
        name: 'Columbia',
        logo: 'https://picsum.photos/120/60?random=33',
        link: '/brands/columbia'
    },
    {
        name: 'Berghaus',
        logo: 'https://picsum.photos/120/60?random=34',
        link: '/brands/berghaus'
    }
]

const Home: React.FC = () => {
    const einstein = useEinstein()
    const {pathname} = useLocation()
    const {res} = useServerContext()

    if (res) {
        res.set(
            'Cache-Control',
            `s-maxage=${MAX_CACHE_AGE}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}`
        )
    }

    const {data: productSearchResult} = useProductSearch({
        parameters: {
            refine: [`cgid=${HOME_SHOP_PRODUCTS_CATEGORY_ID}`, 'htype=master'],
            expand: ['promotions', 'variations', 'prices', 'images', 'custom_properties'],
            perPricebook: true,
            allVariationProperties: true,
            limit: HOME_SHOP_PRODUCTS_LIMIT
        }
    })

    useEffect(() => {
        einstein.sendViewPage(pathname)
    }, [pathname, einstein])

    // Transform API products to match our component interface
    const summerProducts = productSearchResult?.hits?.map((hit, index) => ({
        id: hit.productId,
        name: hit.name,
        brand: hit.brand || 'Brand',
        price: hit.price,
        originalPrice: hit.price * 1.2,
        image: hit.image?.link || `https://picsum.photos/260/300?random=${36 + index}`,
        badge: hit.productPromotions?.[0]?.promotionalMessage || '',
        link: `/product/${hit.productId}`
    })) || []

    return (
        <Box data-testid="home-page">
            <Seo
                title="Home Page"
                description="Commerce Cloud Retail React App"
                keywords="Commerce Cloud, Retail React App, React Storefront"
            />

            <BannerCarousel slides={bannerSlides} />
            
            <CategoryCarouselTabs tabs={categoryTabs} categories={categories} />
            
            <MasterCategoryCTAs categories={masterCategories} />
            
            <FullScreenCTA
                logo="bear-races"
                title="LIFE"
                subtitle="STYLE SPORTS"
                backgroundImage="https://picsum.photos/1200/600?random=35"
                ctaText="ENTER NOW"
                ctaLink="/bear-races"
            />
            
            <ZoomModalCarousel
                title="SHOP THE FEED"
                subtitle="Tap to @henrysjeans to be featured"
                items={feedItems}
            />
            
            {summerProducts.length > 0 && (
                <ProductsCarousel
                    title="SUMMER EDIT"
                    products={summerProducts}
                />
            )}
            
            <HoverZoomCategoryTiles categories={categoryTiles} />
            
            <BrandLogosCarousel brands={brands} />
        </Box>
    )
}

Home.getTemplateName = () => 'home'

export default Home