import TableData from "./TableData";
import Header from "./Info/Header";
import Footer from "./Info/Footer"
import Card from "./Info/Card";
function App() {
  const col = [
    { key: "id", lable: "Id" },
    { key: "name", lable: "Name" },
    { key: "email", lable: "Email" },
    { key: "provider", lable: "Provider" },
  ];
 
  const users = [
    {
      id: 1,
      name: "Hussam",
      email: "test@test.com",
      provider: "Google",
    },
    {
      id: 2,
      name: "Ali",
      email: "Ali@test.com",
      provider: "Google",
    },
  ];
  const col2 = [
    { key: "id", lable: "Id" },
    { key: "name", lable: "Name" },
  ];
  const courses = [
    { id: 1, name: "HTML" },
    { id: 1, name: "CSS" },
  ];
  return (
    <>
    <Header />
      {/* <TableData col={col} data={users} />
      <TableData col={col2} data={courses} /> */}
      <Card />
      <Footer />
    </>
  );
}
 
export default App;