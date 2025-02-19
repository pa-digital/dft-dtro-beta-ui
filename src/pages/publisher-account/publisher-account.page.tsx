import {useState, useEffect } from "react";
import styles from "./publisher-account.module.css";
import TextComponent, { TypographyType } from "../../components/text/typography.component";
import ActionLinkComponent from "../../components/action-link/action-link.component";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import axios from "axios";

const apiUrl = "http://127.0.0.1:5000/canPublish";

const PublisherAccountPage: React.FC = () => {
  const [canPublishApps, setCanPublishApps] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    axios.get(apiUrl)
      .then(response => setCanPublishApps(response.data.canPublish))
      .catch(() => setError(`Error fetching data from ${apiUrl}`))
      .finally(() => setLoading(false));
  }, []);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  return (
    <div className={styles.content}>
        <div className={styles.headerContainer}>
            <NavLinkComponent text="Sign In"/>
            <TextComponent type={TypographyType.SubHeading} content="Publisher account"/>
        </div>
            <ActionLinkComponent link="#" text="Create new test app" enabled={true}/>
            <TextComponent type={TypographyType.SubDescription} content="Generate app credentials for use with the D-TRO test environment."/>
            <ActionLinkComponent link="#" text="Create new consumer app" enabled={true}/>
            <TextComponent type={TypographyType.SubDescription} content="Generate app credentials to consume data from the D-TRO test environment."/>
            <ActionLinkComponent link="#" text="Request new publisher app" enabled={canPublishApps ?? false}/>
            {canPublishApps ? 
                <TextComponent type={TypographyType.SubDescription} content="Request credentials for a new app to publish to the D-TRO production environment."/>
              : <TextComponent type={TypographyType.SubDescription} content="To request access to publish to the DTRO production environment, please contact dtro-cso@dft.org.uk"/>
            }
            <ActionLinkComponent link="#"  text="View/ retrieve credentials" enabled={true}/>
            <TextComponent type={TypographyType.SubDescription} content="View your existing app credentials for test and production environments and generate new credentials for an existing app."/>
    </div>
  );
};

export default PublisherAccountPage;
