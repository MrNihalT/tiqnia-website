import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, keywords }) => {
    const siteUrl = "https://igfest.nihalt.in/";
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1"
            />
            <meta name="author" content="TIQNIA" />
            <link rel="canonical" href={siteUrl} />

            <link
                rel="shortcut icon"
                type="image/png"
                href="../../assets/img/Blue Tosca Modern Game Logo.png"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta
                property="og:image"
                content={`${siteUrl}assets/img/poster.jpg`}
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta
                name="twitter:image"
                content={`${siteUrl}assets/img/poster.jpg`}
            />
        </Helmet>
    );
};

export default SEO;
