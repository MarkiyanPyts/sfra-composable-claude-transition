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
        image: '/static/img/hero-banner.jpg',
        imageDesktop: '/static/img/hero-banner-desktop.jpg',
        imageMobile: '/static/img/hero-banner-mobile.jpg',
        ctaText: 'SHOP NOW',
        ctaLink: '/shop/summer-collection'
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
        image: '/static/img/category-women-clothing.jpg',
        link: '/women/clothing'
    },
    {
        id: '2',
        tabId: 'women',
        title: 'FOOTWEAR',
        image: '/static/img/category-women-footwear.jpg',
        link: '/women/footwear'
    },
    {
        id: '3',
        tabId: 'women',
        title: 'ACCESSORIES',
        image: '/static/img/category-women-accessories.jpg',
        link: '/women/accessories'
    },
    {
        id: '4',
        tabId: 'women',
        title: 'SWIMWEAR',
        image: '/static/img/category-women-swimwear.jpg',
        link: '/women/swimwear'
    }
]

const masterCategories = [
    {
        title: 'RUNNING & TRAINING',
        image: '/static/img/master-category-running.jpg',
        links: [
            {label: 'MEN', url: '/men/running'},
            {label: 'WOMEN', url: '/women/running'},
            {label: 'SHOP ALL', url: '/running'}
        ]
    },
    {
        title: 'LIONS JERSEY',
        image: '/static/img/master-category-lions.jpg',
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
        image: '/static/img/feed-1.jpg',
        products: [
            {
                id: 'p1',
                name: 'Ripstop Anorak Windbreaker Half...',
                image: '/static/img/product-windbreaker.jpg',
                price: 89.99,
                link: '/product/windbreaker'
            }
        ]
    },
    {
        id: '2',
        image: '/static/img/feed-2.jpg',
        products: [
            {
                id: 'p2',
                name: 'Classic Sneakers',
                image: '/static/img/product-sneakers.jpg',
                price: 120.00,
                link: '/product/sneakers'
            }
        ]
    },
    {
        id: '3',
        image: '/static/img/feed-3.jpg',
        products: [
            {
                id: 'p3',
                name: 'Summer Collection',
                image: '/static/img/product-summer.jpg',
                price: 65.00,
                link: '/product/summer'
            }
        ]
    },
    {
        id: '4',
        image: '/static/img/feed-4.jpg',
        products: [
            {
                id: 'p4',
                name: 'Beach Essentials',
                image: '/static/img/product-beach.jpg',
                price: 45.00,
                link: '/product/beach'
            }
        ]
    }
]

const categoryTiles = [
    {
        title: "WOMEN'S",
        image: '/static/img/tile-women.jpg',
        link: '/women'
    },
    {
        title: "MEN'S",
        image: '/static/img/tile-men.jpg',
        link: '/men'
    },
    {
        title: "KIDS'",
        image: '/static/img/tile-kids.jpg',
        link: '/kids'
    },
    {
        title: 'BOOTROOM',
        image: '/static/img/tile-bootroom.jpg',
        link: '/bootroom'
    }
]

const brands = [
    {
        name: 'ATAK',
        logo: '/static/img/brand-atak.png',
        link: '/brands/atak'
    },
    {
        name: 'On',
        logo: '/static/img/brand-on.png',
        link: '/brands/on'
    },
    {
        name: 'Speedo',
        logo: '/static/img/brand-speedo.png',
        link: '/brands/speedo'
    },
    {
        name: 'Tavistock',
        logo: '/static/img/brand-tavistock.png',
        link: '/brands/tavistock'
    },
    {
        name: 'Converse',
        logo: '/static/img/brand-converse.png',
        link: '/brands/converse'
    },
    {
        name: 'Columbia',
        logo: '/static/img/brand-columbia.png',
        link: '/brands/columbia'
    },
    {
        name: 'Berghaus',
        logo: '/static/img/brand-berghaus.png',
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
    const summerProducts = productSearchResult?.hits?.map(hit => ({
        id: hit.productId,
        name: hit.name,
        brand: hit.brand || 'Brand',
        price: hit.price,
        originalPrice: hit.price * 1.2,
        image: hit.image?.link || '/static/img/placeholder.jpg',
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
                backgroundImage="/static/img/full-screen-cta-bg.jpg"
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