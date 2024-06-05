const socialLinks = (quote, platform) => {
  const shareQuote = `${quote.author} once said: "${quote.content}"`;
  const encodedQuote = encodeURIComponent(shareQuote);

  const urls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedQuote}`,
    whatsapp: `https://wa.me/?text=${encodedQuote}`,
    telegram: `https://t.me/share/url?url=${encodedQuote}`,
  };

  const link = urls[platform] || urls.twitter;
  window.open(link, "_blank");
};

export default socialLinks;
