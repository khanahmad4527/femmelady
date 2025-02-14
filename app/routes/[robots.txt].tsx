// export const loader = () => {
//   const robotText = `
//           User-agent: Googlebot
//           Disallow: /nogooglebot/
//           User-agent: *
//           Allow: /
//           Sitemap: ${process.env?.APP_DOMAIN}/sitemap.xml`;

//   return new Response(robotText, {
//     status: 200,
//     headers: {
//       'Content-Type': 'text/plain'
//     }
//   });
// };
export const loader = () => {
  const robotText = `
    User-agent: *
    Disallow: /
  `;

  return new Response(robotText, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain'
    }
  });
};
