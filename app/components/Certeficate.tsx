import { Document, Page, Text, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  fullName: {
    position: "absolute",
    top: "42%",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  course: {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: 18,
    textAlign: "center",
  },
});

interface Props {
  fullName: string;
  courseName: string;
  backgroundImage: string;
}

export const CertificateTemplate = ({
  fullName,
  courseName,
  backgroundImage,
}: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image style={styles.background} src={backgroundImage} />
      <Text style={styles.course}>{courseName} tili kursini</Text>
      <Text style={styles.fullName}>{fullName}</Text>
    </Page>
  </Document>
);
