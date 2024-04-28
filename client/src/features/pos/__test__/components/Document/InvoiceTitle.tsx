import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		marginTop: 24,
	},
	companyName: {
		fontSize: '24pt',
		fontWeight: 'bold',
		color: 'black',
		// letterSpacing: 4,
		// fontSize: 25,
		// textAlign: 'center',
		// textTransform: 'uppercase',
	},
});

export const InvoiceTitle = () => (
	<View style={styles.titleContainer}>
		<Text style={styles.companyName}>Royal Glass Supply</Text>
	</View>
);
