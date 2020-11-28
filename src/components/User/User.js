import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';

export const User = (props) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then((data) => data.json())
			.then((postsData) => {
				setLoading(false);
				setData(postsData);
			});
	}, []);

	const columns = [
		{ field: 'id', headerName: 'ID', flex: 1 },
		{ field: 'userId', headerName: 'First name', flex: 1 },
		{ field: 'title', headerName: 'Title', flex: 2 }
	];

	const onUserClick = () => ({ data: { userId } }) => {
		props.history.push({
			pathname: `/user/${userId}`
		});
	};

	return (
		<div style={{ height: '100vh', width: '100%' }}>
			<DataGrid
				loading={loading}
				rows={data}
				columns={columns}
				pageSize={20}
				onRowClick={onUserClick()}
			/>
		</div>
	);
};
