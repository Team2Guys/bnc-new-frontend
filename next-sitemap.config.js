/** @type {import('next-sitemap').IConfig} */

//eslint-disable-next-line
const { fetchCategories, fetchProducts, generateSlug, fetchSubCategories } = require('./src/utils/sitemap-data');

const excludePages = [
    '/dashboard*',
    '/login',
    '/search/{search_term_string}',
    "/forgot-password",
    "/register",
    "/thankyou",
    "/thank-you",
]

module.exports = {
    siteUrl: 'https://ppc.blindsandcurtains.ae/',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    sitemapSize: 5000,
    outDir: './public', // Will be generated after build
    exclude: excludePages, // optional
    trailingSlash: true,

    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                disallow: excludePages
            },
        ],
        additionalSitemaps: ['https://ppc.blindsandcurtains.ae/sitemap.xml']
    },


    additionalPaths: async () => {
        const [products, subcategories, categories] = await Promise.all([
            fetchProducts(),
            fetchSubCategories(),
            fetchCategories(),
        ])

        const categoryPaths = categories.map((category) => ({
            loc: `/${category.categoryCustomUrl || generateSlug(category.title)}/`,
            lastmod: new Date().toISOString(),
        }));



        const productPaths = products.filter((val) => val.status == 'PUBLISHED').map((product) => ({
            loc: `/${product.category?.productCustomUrl || generateSlug(product.category.name)}/${product.customUrl ?? generateSlug(product.title)}/`,
            lastmod: new Date().toISOString(),
        }));


        const subcategoriesPaths = subcategories.filter((val) => val.status == 'PUBLISHED').map((product) => ({
            loc: `/${product.category?.productCustomUrl || generateSlug(product.category.name)}/${product.customUrl ?? generateSlug(product.title)}/`,
            lastmod: new Date().toISOString(),
        }));


        return [...categoryPaths, ...productPaths, ...subcategoriesPaths];

    },

    transform: async (config, path) => {
        return {
            loc: path,
            lastmod: new Date().toISOString(),
        };
    },
};


