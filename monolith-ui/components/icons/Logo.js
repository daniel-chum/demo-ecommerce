import cn from 'classnames'

const Logo = ({ ...props }) => {
  return (
    <p className={cn(props.className, 'font-rubik font-semibold leading-none' )} style={{ letterSpacing: '-0.08em', fontSize: '50px'}}>
        <span>Chum</span>
        <span className='text-primary'>.</span>
    </p>
  );
};

export default Logo;
