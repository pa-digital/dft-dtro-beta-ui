import {useState, useEffect } from "react";
import styles from "./publisher-account.module.css";
import TextComponent, { TypographyType } from "../../components/text/typography.component";
import ActionLinkComponent from "../../components/action-link/action-link.component";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import axios from "axios";


const PublisherAccountPage: React.FC = () => {
  const [canPublishApps, setCanPublishApps] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get();
        setCanPublishApps(response.data.canPublish);
      } catch (error) {
        setError(`Error fetching data from ${}`);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
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
            <ActionLinkComponent link="#" text="Request new publisher app" enabled={canPublishApps}/>
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
