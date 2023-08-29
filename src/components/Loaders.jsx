export const UserCardLoader = (props) => (
  <svg
    width={500}
    height={400}
    aria-labelledby='loading-aria'
    preserveAspectRatio='none'
    {...props}
  >
    <title>Loading...</title>
    <rect
      width='100%'
      height='100%'
      clipPath='url(#a)'
      style={{
        fill: 'url(#b)'
      }}
    />
    <defs>
      <linearGradient id='b'>
        <stop offset={0.6} stopColor='#f3f3f3'>
          <animate
            attributeName='offset'
            dur='2s'
            keyTimes='0; 0.25; 1'
            repeatCount='indefinite'
            values='-2; -2; 1'
          />
        </stop>
        <stop offset={1.6} stopColor='#ecebeb'>
          <animate
            attributeName='offset'
            dur='2s'
            keyTimes='0; 0.25; 1'
            repeatCount='indefinite'
            values='-1; -1; 2'
          />
        </stop>
        <stop offset={2.6} stopColor='#f3f3f3'>
          <animate
            attributeName='offset'
            dur='2s'
            keyTimes='0; 0.25; 1'
            repeatCount='indefinite'
            values='0; 0; 3'
          />
        </stop>
      </linearGradient>
      <clipPath id='a'>
        <circle cx={271} cy={266} r={4} />
        <circle cx={265} cy={90} r={62} />
        <rect width={184} height={24} x={169} y={162} rx={0} ry={0} />
        <rect width={226} height={50} x={149} y={228} rx={0} ry={0} />
        <rect width={226} height={50} x={149} y={297} rx={0} ry={0} />
        <rect width={184} height={24} x={169} y={190} rx={0} ry={0} />
      </clipPath>
    </defs>
  </svg>
)

export const CategoriesSideBarLoader = (props) => (
  <svg
    width={200}
    height={500}
    aria-labelledby='loading-aria'
    preserveAspectRatio='none'
    {...props}
  >
    <title>Loading...</title>
    <rect
      width='100%'
      height='100%'
      clipPath='url(#a)'
      style={{
        fill: 'url(#b)'
      }}
    />
    <defs>
      <linearGradient id='b'>
        <stop offset={0.6} stopColor='#f3f3f3'>
          <animate
            attributeName='offset'
            dur='2s'
            keyTimes='0; 0.25; 1'
            repeatCount='indefinite'
            values='-2; -2; 1'
          />
        </stop>
        <stop offset={1.6} stopColor='#ecebeb'>
          <animate
            attributeName='offset'
            dur='2s'
            keyTimes='0; 0.25; 1'
            repeatCount='indefinite'
            values='-1; -1; 2'
          />
        </stop>
        <stop offset={2.6} stopColor='#f3f3f3'>
          <animate
            attributeName='offset'
            dur='2s'
            keyTimes='0; 0.25; 1'
            repeatCount='indefinite'
            values='0; 0; 3'
          />
        </stop>
      </linearGradient>
      <clipPath id='a'>
        <circle cx={271} cy={266} r={4} />
        <rect width={175} height={24} x={19} y={47} rx={0} ry={0} />
        <rect width={175} height={24} x={19} y={141} rx={0} ry={0} />
        <rect width={175} height={24} x={19} y={188} rx={0} ry={0} />
        <rect width={175} height={24} x={19} y={234} rx={0} ry={0} />
        <rect width={175} height={24} x={19} y={95} rx={0} ry={0} />
      </clipPath>
    </defs>
  </svg>
)
