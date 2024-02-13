import React, { useEffect, useState } from "react";

export const ProgressBar = () => {
	const [completed, setCompleted] = useState(Math.floor(Math.random() * 10) + 1);

	const containerStyles = {
		height: 20,
		width: '100%',
		backgroundColor: "#e0e0de",
		borderRadius: 50,
		margin: 20
	}

	const fillerStyles = {
		height: '100%',
		width: `${completed}%`,
		backgroundColor: "#16A116",
		borderRadius: 'inherit',
		textAlign: 'right' as const,
		transition: 'width 1s ease-in-out',
	}

	const labelStyles = {
		padding: 5,
		color: 'white',
		fontWeight: 'bold'
	}

	useEffect(() => {
		if (completed <= 90) {
			const changing = setInterval(() => {
				setCompleted(completed + (Math.floor(Math.random() * 10) + 1));
			}, 500); 

			return () => clearInterval(changing);
		}
	}, [completed]);

	return (
		<div style={containerStyles}>
			<div style={fillerStyles} className="progress-bar progress-bar-animated">
				<span style={labelStyles}>{completed}%</span>
			</div>
		</div>
	);
};