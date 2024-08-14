import { CustomHeader } from "../../components";
import { withSize } from "react-sizeme";
const JiraPage = ({ size }) => {
  return (
    <>
      <CustomHeader title="Жира үзүүлэлт" />
      <main>
        <iframe
          title="Jira"
          width={size.width - 25}
          height={window.innerHeight - 120}
          src="https://app.powerbi.com/view?r=eyJrIjoiZGEzMDdiOTctYzM5Mi00NzA1LTk0N2QtOWE4OWJkY2ZjOTFhIiwidCI6IjZmMDk0N2Q1LWU1ZmUtNDMxZC04ZGNiLWZmZjgxZmYyZTk1ZSIsImMiOjEwfQ%3D%3D"
          frameborder="0"
          allowFullScreen="false"
        ></iframe>
      </main>
    </>
  );
};

export default withSize()(JiraPage);
