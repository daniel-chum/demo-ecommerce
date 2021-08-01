import Link from "next/link";

const Box = ({ display }) => {
	let [link, page, isActive, isBreak] = display

	let clickable = page ? 'cursor-pointer' : 'pointer-events-none'
	let selected = isActive ? 'text-white bg-primary' : 'text-font-gray bg-gray-100'

	return (
		<Link href={`/shop/${page}`}>
			<li
				className={`w-8 h-8 rounded-lg flex justify-center items-center	${clickable} ${selected} hover:text-white hover:bg-primary transition duration-150`}
			>
				{page ? page : '...'}
			</li>
		</Link>
	)
}

const Pagination = ({ page, next, previous, count, display }) => {

	return (
		<>
			{count ? (
				<>
					{previous &&
						<Link href={`/shop/${parseInt(page) - 1}`}>
						<p
							className='text-gray-600 bg-gray-100 h-8 w-20 rounded-lg
							cursor-pointer flex justify-center items-center
							hover:text-white hover:bg-primary transition duration-150'
						>
							{'< Prev'}
						</p>
						</Link>
					}
					<ol className='flex justify-center items-center gap-x-0.5'>
						{display.map((item, index) => (
							<Box key={index} display={item} />
						))}
					</ol>
					{next &&
						<Link href={`/shop/${parseInt(page) + 1}`}>
							<p
							className='text-gray-600 bg-gray-100 h-8 w-20 rounded-lg
							cursor-pointer flex justify-center items-center
							hover:text-white hover:bg-primary transition duration-150'
						>
							{'Next >'}
						</p>
						</Link>
					}
				</>
			) : null}
        </>
	)
}

export default Pagination;
