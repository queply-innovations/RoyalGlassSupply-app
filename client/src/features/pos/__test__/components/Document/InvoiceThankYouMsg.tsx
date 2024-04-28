import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		marginTop: 12,
	},
	reportTitle: {
		fontSize: 12,
		textAlign: 'center',
		textTransform: 'uppercase',
	},
});

export const InvoiceThankYouMsg = () => (
	<View style={styles.titleContainer}>
		<Text style={styles.reportTitle}>Thank you for your business</Text>

		<Text style={styles.reportTitle}>{new Date().getUTCSeconds()}</Text>
	</View>
);
