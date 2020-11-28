import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '100%',
		margin: 20
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	}
}));

export default function UserDetails() {
	let { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState({});
	const [showAddress, setShowAddress] = useState(false);
	const [showCompany, setShowCompany] = useState(false);
	const classes = useStyles();

	useEffect(() => {
		fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
			.then((data) => data.json())
			.then((userDetail) => {
				setUserData(userDetail);
				setLoading(false);
			});
	}, [id]);

	const handleAddressClick = () => {
		setShowAddress(!showAddress);
	};

	const handleCompanyClick = () => {
		setShowCompany(!showCompany);
	};

	if (loading) {
		return <CircularProgress />;
	}

	return (
		<Card className={classes.root} variant="outlined">
			<CardHeader title={userData?.name}></CardHeader>
			<CardContent>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					Id: {userData?.id}
				</Typography>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					User Name: {userData?.username}
				</Typography>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					Email: {userData?.email}
				</Typography>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					Phone: {userData?.username}
				</Typography>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					WebSite: {userData?.website}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					Company Details
				</Typography>
				<IconButton onClick={handleCompanyClick} aria-expanded={showCompany} aria-label="show more">
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={showCompany} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						Name: {userData?.company?.name}
					</Typography>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						Catch Phrase: {userData?.company?.catchPhrase}
					</Typography>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						BS: {userData?.company?.bs}
					</Typography>
				</CardContent>
			</Collapse>
			<CardActions disableSpacing>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					Address
				</Typography>
				<IconButton onClick={handleAddressClick} aria-expanded={showAddress} aria-label="show more">
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={showAddress} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						Street: {userData?.address?.street}
					</Typography>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						Suite: {userData?.address?.suite}
					</Typography>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						City: {userData?.address?.city}
					</Typography>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						Zip Code: {userData?.address?.zipcode}
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
}
