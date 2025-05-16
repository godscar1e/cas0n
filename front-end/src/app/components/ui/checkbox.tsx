import { FaCheck } from "react-icons/fa6"

const Checkbox = (props: {
	id?: string
	label?: string
	extra?: string;
	[x: string]: any
}) => {
	const { extra, id, label, ...rest } = props

	return (
		<div className="flex items-center gap-2 px-[10px]">
			<div className="flex justify-center items-center ">
				<input
					id={id}
					type="checkbox"
					className={` flex w-[15px] h-[15px] appearance-none items-center
          justify-center rounded-md z-10 border z-1 border-secondary outline-none transition ease-linear
          hover:cursor-pointer ${extra}`}
					{...rest}
				/>
				{/* Галочка, которая появляется только когда чекбокс выбран */}
				{rest.checked && (
					<div className="absolute flex items-center justify-center text-secondary z-[0]">
						<FaCheck size={10} /> {/* Smaller checkmark */}
					</div>
				)}
			</div>
			{label && (
				<label htmlFor={id} className="text-[14px] font-light">
					{label}
				</label>
			)}
		</div>
	)
}

export default Checkbox
