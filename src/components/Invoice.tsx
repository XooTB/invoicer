import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  section2: {
    paddingRight: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    marginBottom: 10,
  },
  info: {
    fontSize: 10,
    marginBottom: 5,
  },
  fineprint: {
    fontSize: 8,
    textOverflow: "ellipsis",
    paddingTop: 20,
  },
});

type DocumentProps = {
  type: string;
  model: string;
  id: string;
  pickupDate: string;
  returnDate: string;
  duration: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  total: number;
};

function splitTime(hours: number) {
  // Split the hours into weeks, days, and hours

  const weeks = Math.floor(hours / 168);
  const days = Math.floor((hours % 168) / 24);
  const hoursLeft = hours % 24;

  return { weeks, days, hours: hoursLeft };
}

export const MyDocument = ({
  type,
  model,
  id,
  pickupDate,
  returnDate,
  duration,
  firstName,
  lastName,
  email,
  phone,
  total,
}: DocumentProps) => {
  const timeLog = splitTime(duration);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Car Rental Service</Text>
          <Text style={styles.subheading}>Reservation Details</Text>
          <Text style={styles.info}>Reservation ID: {id}</Text>
          <Text style={styles.subheading}>Customer Info: </Text>
          <Text style={styles.info}>
            Name: {firstName} {lastName}
          </Text>
          <Text style={styles.info}>Email: {email}</Text>
          <Text style={styles.info}>Phone: {phone}</Text>
          <Text style={styles.fineprint}>
            Your rental agreement offers, for an additional charge, an optional
            waiver to cover all or a part of your resposibility for damage to or
            loss of the vehicle. Before deciding whether to purchase the waiver,
            you may wish to determine whether your own automobile insurance or
            credit card agreement provides you coverage for damage to the rental
            vehicle and the amount of the deductible under your own insurance
            coverage. The purchase of the waiver is not mandatory. The waiver is
            not insurance. I have read and understand the above statement.
          </Text>
        </View>
        <View style={styles.section2}>
          <Text style={styles.heading}>Car Details</Text>
          <Text style={styles.info}>Type: {type}</Text>
          <Text style={styles.info}>Model: {model}</Text>
          <Text style={styles.subheading}>Reservation Dates</Text>
          <Text style={styles.info}>Pickup Date: {pickupDate}</Text>
          <Text style={styles.info}>Return Date: {returnDate}</Text>
          <Text style={styles.info}>
            Duration:{" "}
            {`${timeLog.weeks ? `${timeLog.weeks} weeks, ` : ""} ${
              timeLog.days
            } days, ${timeLog.hours} hours`}
          </Text>
          <Text style={styles.subheading}>Total: ${total}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
