export const DomainRef = {
  value: 'zoofi.io',
}
const TWITTER_LINK = 'https://x.com/ZooFinanceIO'
const DISCORD_LINK = 'https://t.co/RJwdwdawe5'

const DECIMAL = BigInt(1e18)
const DECIMAL_PRICE = BigInt(1e8)
const DECIMAL_10 = BigInt(1e10)
const YEAR_SECONDS = BigInt('31536000')

const Day1 = 24 * 60 * 60 * 1000

const DOC_LINK = () => `https://docs.${DomainRef.value}`

export { Day1, DECIMAL, DECIMAL_10, DECIMAL_PRICE, DISCORD_LINK, DOC_LINK, TWITTER_LINK, YEAR_SECONDS }

