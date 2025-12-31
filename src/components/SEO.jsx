import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, keywords }) => {
    // 1. Centralized Variables (Easy to change later)
    const siteUrl = "https://igfest.nihalt.in/";
    const registerUrl =
        "https://docs.google.com/forms/d/e/1FAIpQLSdq6vwMMFyfPaXFA-j_gz50heXiX0pvhf7XU4eJaG7mjvsMjQ/viewform";
    const posterImage = "https://igfest.nihalt.in/assets/img/poster.jpg";
    const logoImage =
        "https://igfest.nihalt.in/assets/img/Blue%20Tosca%20Modern%20Game%20Logo.png";

    // 2. Fixed Schema (This now passes Google's validation)
    const eventSchema = {
        "@context": "https://schema.org",
        "@type": "Event",
        name: "IG Fest 2026 (TIQNIA)",
        startDate: "2026-01-08T09:00:00+05:30",
        endDate: "2028-01-16T17:00:00+05:30", // Note: This is a 1-month duration. If it's 2 days, change Feb to Jan.
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
            "@type": "Place", // FIXED: Must be "Place"
            name: "WMO IG Arts and Science College",
            address: {
                "@type": "PostalAddress", // FIXED: Must be "PostalAddress"
                streetAddress:
                    "CH Village, Kappumchal, Cherukattor P.O, Panamaram",
                addressLocality: "Wayanad",
                postalCode: "670721",
                addressRegion: "Kerala",
                addressCountry: "IN",
            },
        },
        image: [posterImage],
        description: description,
        offers: {
            "@type": "Offer",
            url: registerUrl,
            price: "0",
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            validFrom: "2025-12-01T09:00",
        },
        organizer: {
            "@type": "Organization",
            name: "WMO IG Dept of Computer Applications",
            url: siteUrl,
        },
    };

    return (
        <Helmet>
            {/* --- Browser & SEO Basics --- */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1"
            />
            <meta name="author" content="TIQNIA" />
            <link rel="canonical" href={siteUrl} />

            {/* FIXED: Use absolute path or full URL for favicon to prevent errors on sub-pages */}
            <link rel="shortcut icon" type="image/png" href={logoImage} />

            {/* --- Open Graph (WhatsApp / Facebook / LinkedIn) --- */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl} />
            {/* FIXED: Use the dynamic title so it matches the page */}
            <meta property="og:title" content={title} />
            <meta
                property="og:description"
                content="Register now for the biggest IT Fest in Wayanad!"
            />
            <meta property="og:image" content={posterImage} />

            {/* --- Twitter Cards (X) --- */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={posterImage} />

            {/* --- Google Structured Data --- */}
            <script type="application/ld+json">
                {JSON.stringify(eventSchema)}
            </script>
        </Helmet>
    );
};

export default SEO;
