import cn from 'classnames'

const Logo = ({ ...props }) => {
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   width="24"
    //   height="24"
    //   viewBox="0 0 24 24"
    //   {...props}
    // >
    //   <path d="M8.53486 14.67732c0 .58909-.47408 1.06665-1.05889 1.06665H6.22186V9.49983l-.83641-.61048h2.09052c.58481 0 1.05889.47753 1.05889 1.06664v4.72133zm.89139-8.65854H2.78331L1.7597 8.27887l1.29208.90397v9.37736h6.37447l2.30177-1.67859V7.74542L9.42625 6.01878zm3.20168 1.72662v9.13621l2.27422 1.67859h6.15761v-4.45563h-2.95845v1.6394h-1.27787c-.55881 0-1.0118-.45631-1.0118-1.01922V9.50119l-.83676-.61184h3.12643v1.78971h2.7117l.71876-4.66028h-2.53171l-.37546.83493-1.11566-.83493h-2.59605L12.62793 7.7454z" />
    // </svg>
    <p className={cn(props.className, 'font-rubik font-semibold leading-none' )} style={{ letterSpacing: '-0.08em', fontSize: '50px'}}>
        <span>Chum</span>
        <span className='text-primary'>.</span>
    </p>
  );
};

export default Logo;
