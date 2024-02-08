import React, { useEffect, useState } from "react";

export const ProgressBar = () => {
	const [completed, setCompleted] = useState(30);

	const containerStyles = {
		height: 20,
		width: '100%',
		backgroundColor: "#e0e0de",
		borderRadius: 50,
		margin: 50
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
		const changing = setInterval(() => {
			setCompleted(completed + Math.floor(Math.random() * 10));
		}, 2000);

		return () => clearInterval(changing);

		// if (completed === 100) {
		// 	return setCompleted(0);
		// }
	}, [completed]);

	return (
		<div style={containerStyles}>
			<div style={fillerStyles}>
				<span style={labelStyles}>{completed}%</span>
			</div>
		</div>
	);
};