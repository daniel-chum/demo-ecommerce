import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons'

const PopUp = (props) => {
    return (
        <>
            { props.display && (
                <div
                    className='fixed w-60 h-40 bg-gray-900 bg-opacity-90 text-white border flex flex-col items-center justify-evenly z-50'
                    style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}
                >
                    <div className='h-20'>
                        {props.loader ?
                            <FontAwesomeIcon icon={faCircleNotch} className='w-full h-full animate-spin' /> :
                            <FontAwesomeIcon icon={faCheckCircle} className='w-full h-full' />
                        }
                    </div>
                    <span className='text-lg font-rubik'>{props.children}</span>
                </div>
                )
            }
        </>
    )
}

export default PopUp