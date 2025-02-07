/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/covid-data',
            destination: 'https://api.data.gov.sg/v1/covid-19',
          },
        ];
      },
}

module.exports = nextConfig
