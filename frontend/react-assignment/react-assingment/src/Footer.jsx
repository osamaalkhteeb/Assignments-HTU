function Footer({ total }) {
  return (
    <footer style={{ marginTop: "30px", padding: "10px", textAlign: "center", background: "#f0f0f0" }}>
      Total Students: {total}
    </footer>
  );
}

export default Footer;