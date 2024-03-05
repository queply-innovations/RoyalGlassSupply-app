import React from 'react';
import ReactLoading from 'react-loading';
 
export const Loading = (props: any) => (
	<ReactLoading className="loading" type="spin" color="#16A116" height={props.height} width={props.width} />
);