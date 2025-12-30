import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, keywords }) => {
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
            <link
                rel="shortcut icon"
                type="image/png"
                href="/assets/img/Blue Tosca Modern Game Logo.png"
            />
        </Helmet>
    );
};

export default SEO;
